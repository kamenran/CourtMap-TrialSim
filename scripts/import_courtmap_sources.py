from __future__ import annotations

import argparse
import csv
import json
import os
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

COURTLISTENER_BASE_URL = "https://www.courtlistener.com/api/rest/v4"


@dataclass
class SourcePlan:
    name: str
    purpose: str
    output_tables: list[str]
    status: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="CourtMap ingestion entry point for CourtListener, SCDB, and CAP.")
    parser.add_argument("--source", choices=["all", "courtlistener", "scdb", "cap"], default="all")
    parser.add_argument("--limit", type=int, default=25)
    parser.add_argument("--output", default="data/courtmap_import_preview.json")
    parser.add_argument("--scdb-csv", help="Path to an SCDB CSV file for metadata/vote enrichment.")
    parser.add_argument("--cap-jsonl", help="Path to a CAP JSONL export for fallback case text.")
    parser.add_argument("--dry-run", action="store_true", help="Write an import plan without network or database writes.")
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    if args.dry_run:
        write_json(Path(args.output), {"mode": "dry-run", "plans": [asdict(plan) for plan in source_plans(args.source)]})
        print(f"Wrote CourtMap import plan to {args.output}")
        return

    payload: dict[str, Any] = {"plans": [asdict(plan) for plan in source_plans(args.source)]}

    if args.source in {"all", "courtlistener"}:
        payload["courtlistener"] = fetch_courtlistener_scotus_preview(args.limit)
    if args.source in {"all", "scdb"}:
        payload["scdb"] = read_scdb_preview(args.scdb_csv, args.limit)
    if args.source in {"all", "cap"}:
        payload["cap"] = read_cap_preview(args.cap_jsonl, args.limit)

    write_json(Path(args.output), payload)
    print(f"Wrote CourtMap import preview to {args.output}")


def source_plans(source: str) -> list[SourcePlan]:
    plans = [
        SourcePlan(
            name="CourtListener",
            purpose="Primary Supreme Court opinions, case names, opinion text, and citation graph edges.",
            output_tables=["cases", "opinions", "citations"],
            status="primary",
        ),
        SourcePlan(
            name="Supreme Court Database",
            purpose="Structured issue areas, decision direction, justice votes, majority/minority metadata, and term coding.",
            output_tables=["cases", "justices", "justice_votes"],
            status="metadata-enrichment",
        ),
        SourcePlan(
            name="Caselaw Access Project",
            purpose="Fallback full text, historical metadata, and alternate citations when CourtListener coverage is incomplete.",
            output_tables=["cases", "opinions"],
            status="fallback",
        ),
    ]
    if source == "all":
        return plans
    wanted = {
        "courtlistener": "CourtListener",
        "scdb": "Supreme Court Database",
        "cap": "Caselaw Access Project",
    }[source]
    return [plan for plan in plans if plan.name == wanted]


def fetch_courtlistener_scotus_preview(limit: int) -> dict[str, Any]:
    token = os.getenv("COURTLISTENER_TOKEN")
    headers = {"Authorization": f"Token {token}"} if token else {}
    params = {
        "court": "scotus",
        "page_size": min(limit, 100),
        "ordering": "-date_filed",
    }
    url = f"{COURTLISTENER_BASE_URL}/clusters/?{urllib.parse.urlencode(params)}"
    request = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        if error.code == 401:
            raise RuntimeError("CourtListener returned 401 Unauthorized. Set COURTLISTENER_TOKEN before running a live import.") from error
        raise
    return {
        "source": "CourtListener",
        "records": [normalize_courtlistener_cluster(item) for item in data.get("results", [])],
    }


def normalize_courtlistener_cluster(item: dict[str, Any]) -> dict[str, Any]:
    return {
        "courtlistener_cluster_id": item.get("id"),
        "case_name": item.get("case_name") or item.get("case_name_full"),
        "citation": first_citation(item),
        "court": "Supreme Court of the United States",
        "decision_date": item.get("date_filed"),
        "summary": item.get("syllabus"),
        "url": absolute_courtlistener_url(item.get("absolute_url")),
        "output_tables": ["cases", "opinions"],
    }


def read_scdb_preview(path: str | None, limit: int) -> dict[str, Any]:
    if not path:
        return {"source": "SCDB", "records": [], "message": "Pass --scdb-csv to preview SCDB enrichment rows."}

    rows = []
    with Path(path).open(newline="", encoding="utf-8-sig") as handle:
        for row in csv.DictReader(handle):
            rows.append(normalize_scdb_row(row))
            if len(rows) >= limit:
                break
    return {"source": "SCDB", "records": rows}


def normalize_scdb_row(row: dict[str, str]) -> dict[str, Any]:
    return {
        "scdb_case_id": row.get("caseId"),
        "case_name": row.get("caseName"),
        "term": row.get("term"),
        "issue_area": row.get("issueArea"),
        "decision_direction": row.get("decisionDirection"),
        "majority_author": row.get("majOpinWriter"),
        "output_tables": ["cases", "justices", "justice_votes"],
    }


def read_cap_preview(path: str | None, limit: int) -> dict[str, Any]:
    if not path:
        return {"source": "CAP", "records": [], "message": "Pass --cap-jsonl to preview CAP fallback rows."}

    rows = []
    with Path(path).open(encoding="utf-8") as handle:
        for line in handle:
            if line.strip():
                rows.append(normalize_cap_case(json.loads(line)))
            if len(rows) >= limit:
                break
    return {"source": "CAP", "records": rows}


def normalize_cap_case(item: dict[str, Any]) -> dict[str, Any]:
    citations = item.get("citations") or []
    citation = citations[0].get("cite") if citations and isinstance(citations[0], dict) else None
    return {
        "cap_case_id": item.get("id"),
        "case_name": item.get("name") or item.get("name_abbreviation"),
        "citation": citation,
        "court": (item.get("court") or {}).get("name"),
        "decision_date": item.get("decision_date"),
        "url": item.get("url"),
        "output_tables": ["cases", "opinions"],
    }


def first_citation(item: dict[str, Any]) -> str | None:
    citations = item.get("citations") or []
    if not citations:
        return None
    first = citations[0]
    if isinstance(first, dict):
        return first.get("cite") or first.get("citation")
    return str(first)


def absolute_courtlistener_url(value: str | None) -> str | None:
    if not value:
        return None
    return value if value.startswith("http") else f"https://www.courtlistener.com{value}"


def write_json(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
