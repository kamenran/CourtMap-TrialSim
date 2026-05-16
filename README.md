# CourtMap

Interactive graph of Supreme Court precedent for Kamran Eisenberg's personal website.

CourtMap is a focused law + CS portfolio project. It helps users explore landmark Supreme Court cases, citation relationships, constitutional amendments, doctrine shifts, and overruling chains through a clean React/D3 interface.

Scope: CourtMap is focused on **SCOTUS only**. It starts with landmark Supreme Court cases and major constitutional doctrines, then expands toward a full Supreme Court citation graph.

## Current Product

- Minimal portfolio homepage for Kamran Eisenberg
- American flag-inspired visual identity
- Featured CourtMap project tab
- Searchable curated Supreme Court case corpus
- Case detail panel with citation, year, court, constitutional anchor, holding, status, and source link
- Plain-English case summaries
- Doctrine timeline for each selected case
- GitHub-style before/after doctrine shift view for every displayed case
- Interview-ready case brief panel
- Quick doctrine lenses and sorting
- Interactive D3 precedent graph
- Briefly mascot as a precedent-reading assistant

## Stack

- React
- D3.js
- Curated case data for the finished portfolio product
- PostgreSQL-ready relational schema
- Neo4j-ready graph direction for future backend expansion
- CourtListener, Supreme Court Database, and Caselaw Access Project ingestion plan

## Quick Start

```bash
python3 -m http.server 4173
```

Open [http://127.0.0.1:4173/web](http://127.0.0.1:4173/web).

## Deployment

The project deploys the `web/` directory to GitHub Pages using `.github/workflows/pages.yml`.

After GitHub Pages finishes building, the live project should be available at:

```text
https://kamenran.github.io/courtmap-personal-site/
```

## Data Architecture

CourtMap's production data plan uses three legal data sources:

- **CourtListener** as the main source for Supreme Court opinions, case names, opinion text, citations, and citation graph relationships
- **Supreme Court Database** for issue area, decision direction, justice votes, majority/minority metadata, term/year, and legal issue coding
- **Caselaw Access Project** as a fallback for historical full text and missing metadata

The schema is defined in:

```text
database/courtmap_schema.sql
```

The full architecture notes are in:

```text
docs/courtmap_data_architecture.md
```

Generate a local ingestion plan:

```bash
npm run courtmap:plan
```

Preview CourtListener Supreme Court records:

```bash
export COURTLISTENER_TOKEN="optional_token"
npm run courtmap:preview
```

Copy `.env.example` when you are ready to connect real services:

```bash
cp .env.example .env
```

## Product Direction

CourtMap is intentionally not a universal legal research platform. The first version is a polished, finished SCOTUS-focused portfolio demo with a curated case set that shows the concept clearly.

Next upgrades:

- Import Supreme Court citation data from CourtListener
- Enrich cases with Supreme Court Database metadata and justice votes
- Use Caselaw Access Project as a fallback for missing historical text
- Add a legal citation parser
- Store cases and citation edges in Neo4j
- Add justice voting blocs and opinion authorship
- Add doctrine-specific views for privacy, equal protection, criminal procedure, and judicial review
- Add NLP summaries and semantic doctrine-shift scoring
