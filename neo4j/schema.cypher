CREATE CONSTRAINT courtmap_entity_id IF NOT EXISTS
FOR (entity:CourtMapEntity)
REQUIRE entity.id IS UNIQUE;

CREATE INDEX courtmap_entity_type IF NOT EXISTS
FOR (entity:CourtMapEntity)
ON (entity.type);

CREATE INDEX courtmap_entity_label IF NOT EXISTS
FOR (entity:CourtMapEntity)
ON (entity.label);
