CREATE TABLE IF NOT EXISTS import_runs (
  id BIGSERIAL PRIMARY KEY,
  source_name TEXT NOT NULL,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'running',
  records_seen INTEGER NOT NULL DEFAULT 0,
  records_written INTEGER NOT NULL DEFAULT 0,
  message TEXT
);

CREATE TABLE IF NOT EXISTS cases (
  id BIGSERIAL PRIMARY KEY,
  courtlistener_cluster_id INTEGER UNIQUE,
  scdb_case_id TEXT UNIQUE,
  cap_case_id TEXT UNIQUE,
  case_name TEXT NOT NULL,
  citation TEXT,
  court TEXT NOT NULL DEFAULT 'Supreme Court of the United States',
  decision_date DATE,
  term INTEGER,
  summary TEXT,
  holding TEXT,
  issue_area TEXT,
  decision_direction TEXT,
  majority_author TEXT,
  url TEXT,
  source_priority TEXT NOT NULL DEFAULT 'courtlistener',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS opinions (
  id BIGSERIAL PRIMARY KEY,
  case_id BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  courtlistener_opinion_id INTEGER UNIQUE,
  opinion_type TEXT,
  author TEXT,
  joined_by TEXT,
  plain_text TEXT,
  html_with_citations TEXT,
  source_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS citations (
  id BIGSERIAL PRIMARY KEY,
  citing_case_id BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  cited_case_id BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  citation_type TEXT NOT NULL DEFAULT 'cites',
  depth INTEGER,
  source_name TEXT NOT NULL DEFAULT 'courtlistener',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (citing_case_id, cited_case_id, citation_type)
);

CREATE TABLE IF NOT EXISTS doctrines (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  amendment TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS case_doctrines (
  case_id BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  doctrine_id BIGINT NOT NULL REFERENCES doctrines(id) ON DELETE CASCADE,
  confidence NUMERIC(4, 3) NOT NULL DEFAULT 1.0,
  source_name TEXT NOT NULL DEFAULT 'curated',
  PRIMARY KEY (case_id, doctrine_id)
);

CREATE TABLE IF NOT EXISTS justices (
  id BIGSERIAL PRIMARY KEY,
  scdb_justice_id TEXT UNIQUE,
  name TEXT NOT NULL,
  first_term INTEGER,
  last_term INTEGER
);

CREATE TABLE IF NOT EXISTS justice_votes (
  id BIGSERIAL PRIMARY KEY,
  case_id BIGINT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  justice_id BIGINT NOT NULL REFERENCES justices(id) ON DELETE CASCADE,
  vote TEXT,
  opinion_joined TEXT,
  majority BOOLEAN,
  direction TEXT,
  UNIQUE (case_id, justice_id)
);

CREATE INDEX IF NOT EXISTS idx_cases_name ON cases USING GIN (to_tsvector('english', case_name));
CREATE INDEX IF NOT EXISTS idx_cases_issue_area ON cases (issue_area);
CREATE INDEX IF NOT EXISTS idx_cases_decision_date ON cases (decision_date);
CREATE INDEX IF NOT EXISTS idx_cases_citation ON cases (citation);
CREATE INDEX IF NOT EXISTS idx_citations_citing ON citations (citing_case_id);
CREATE INDEX IF NOT EXISTS idx_citations_cited ON citations (cited_case_id);
CREATE INDEX IF NOT EXISTS idx_opinions_case ON opinions (case_id);
