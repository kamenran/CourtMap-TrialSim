# CourtMap + TrialSim

Personal portfolio and legal technology project site for Kamran Eisenberg.

**Live site:** [kamran.codes](https://kamran.codes)

CourtMap + TrialSim is a responsive web portfolio centered on interactive legal technology projects. The site combines a professional profile page with two featured tools: CourtMap, a Supreme Court precedent explorer, and TrialSim, an educational legal scenario simulator.

## Current Product

- Minimal personal profile page for Kamran Eisenberg
- Contact and resume section
- American flag-inspired visual identity
- Briefly mascot for plain-English legal explanation
- Responsive desktop and mobile layout
- GitHub Pages deployment with custom domain support

## CourtMap

CourtMap is an interactive SCOTUS precedent mapping tool. It helps users explore landmark Supreme Court cases as connected legal objects rather than isolated summaries.

Features include:

- Searchable curated Supreme Court case corpus
- Case detail panel with citation, year, court, constitutional anchor, holding, status, and source link
- Plain-English case explanations
- Case brief panel
- Doctrine timeline for selected cases
- GitHub-style before/after doctrine shift view
- Interactive D3 precedent graph
- Doctrine path finder for citation and overruling relationships
- Justice voting alignment view
- Source links for official case pages

Scope: CourtMap is currently focused on **SCOTUS only** using a curated landmark-case dataset. The architecture is designed to expand toward a larger Supreme Court citation graph.

## TrialSim

TrialSim is an educational legal scenario simulator. It does not predict real legal outcomes. Instead, it models how legal variables can affect case pressure in simplified courtroom scenarios.

Features include:

- Scenario presets for criminal procedure, civil liability, AI vendor liability, hiring bias, and fair use disputes
- Adjustable variables for evidence strength, witness reliability, jurisdiction, strategy, and constitutional issues
- Weighted scoring model for case viability, settlement pressure, and dispute risk
- Scenario comparison view showing how exclusion or inclusion of evidence changes modeled results
- Argument panels for strongest points, weaknesses, and likely areas of disagreement
- Transparent explanation that the model is educational, not legal advice or prediction

## Stack

- React
- JavaScript
- CSS
- D3.js
- Local structured data
- GitHub Pages
- Custom domain routing through `kamran.codes`

## Future Data Architecture

CourtMap is designed to support larger legal datasets over time:

- **CourtListener** for Supreme Court opinions, case names, opinion text, citations, and citation graph relationships
- **Supreme Court Database** for issue area, decision direction, justice votes, majority/minority metadata, term/year, and legal issue coding
- **Caselaw Access Project** as a fallback for historical full text and missing metadata
- Neo4j-ready graph direction for citation and doctrine relationships
- PostgreSQL-ready relational schema for structured legal metadata

The schema is defined in:

```text
database/courtmap_schema.sql
```

Architecture notes are in:

```text
docs/courtmap_data_architecture.md
```

## Quick Start

Run a local static server:

```bash
python3 -m http.server 4173
```

Open:

```text
http://127.0.0.1:4173/
```

## Deployment

The live site is served from the `gh-pages` branch. The `web/` directory is published to GitHub Pages and connected to:

```text
https://kamran.codes
```

## Roadmap

- Expand CourtMap beyond the curated SCOTUS dataset
- Import citation relationships from CourtListener
- Add richer justice vote and opinion-author metadata
- Add doctrine-specific graph views for privacy, equal protection, criminal procedure, and judicial review
- Add more TrialSim scenario presets
- Add clearer model explanations for each TrialSim variable
- Improve mobile layout and accessibility
- Add optional backend/database support if the dataset grows
