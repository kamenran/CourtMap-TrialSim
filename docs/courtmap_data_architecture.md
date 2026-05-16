# CourtMap Data Architecture

CourtMap should use three complementary legal data sources:

## 1. CourtListener

Primary source for the graph product.

Use CourtListener for:

- Supreme Court opinion clusters
- case names
- citations
- opinion text
- opinions that cite a selected case
- opinions cited by a selected case
- official CourtListener URLs

CourtMap should treat CourtListener as the main ingestion source because its case-law API and citation data fit the graph model directly.

## 2. Supreme Court Database

Structured metadata layer.

Use SCDB for:

- issue area
- decision direction
- justice votes
- majority/minority alignment
- term/year
- legal provision and issue coding

SCDB does not replace CourtListener. It enriches CourtListener cases with structured political-science/legal metadata.

## 3. Caselaw Access Project

Backup and historical full-text layer.

Use CAP for:

- missing historical case text
- alternate citations
- older case metadata
- cross-checking case names and dates

CAP should be a fallback source, not the main graph source, because CourtListener is better aligned with citation graph exploration.

## Pipeline

```text
CourtListener API
        |
        v
cases / opinions / citations
        |
        v
SCDB metadata enrichment
        |
        v
CAP fallback text and historical metadata
        |
        v
CourtMap frontend graph
```

## Database Model

Core tables:

- `cases`
- `opinions`
- `citations`
- `doctrines`
- `case_doctrines`
- `justices`
- `justice_votes`
- `import_runs`

The SQL schema lives at:

```text
database/courtmap_schema.sql
```

## Frontend Loading Strategy

The frontend should never load the full legal database into the browser.

Instead:

1. Search returns paginated case results.
2. Selecting a case loads one case profile.
3. The graph loads a bounded neighborhood:
   - selected case
   - cases it cites
   - cases that cite it
   - direct overruling/narrowing relationships where known
   - doctrine and amendment nodes
4. Users can expand graph neighborhoods intentionally.

This keeps the interface fast and readable even when the backend contains millions of opinions.

## Environment Variables

```bash
COURTLISTENER_TOKEN=
DATABASE_URL=
```

SCDB and CAP can be ingested from downloaded CSV/bulk files, so they do not always need API keys.

## Import Order

1. CourtListener Supreme Court cases and opinions
2. CourtListener citation edges
3. SCDB case metadata and justice votes
4. CAP fallback text for missing cases
5. doctrine tagging and curated constitutional labels

## Why This Is Credible

This architecture lets CourtMap stay focused:

- CourtListener powers the graph.
- SCDB powers the legal/political metadata.
- CAP fills historical gaps.
- PostgreSQL supports search and structured records.
- Neo4j can be added for deeper graph traversal once the first dataset is stable.
