MERGE (brown:CourtMapEntity {id: "case:brown"})
SET brown.label = "Brown v. Board of Education",
    brown.type = "case",
    brown.citation = "347 U.S. 483",
    brown.year = 1954;

MERGE (plessy:CourtMapEntity {id: "case:plessy"})
SET plessy.label = "Plessy v. Ferguson",
    plessy.type = "case",
    plessy.citation = "163 U.S. 537",
    plessy.year = 1896;

MERGE (equalProtection:CourtMapEntity {id: "doctrine:equal-protection"})
SET equalProtection.label = "Equal Protection",
    equalProtection.type = "doctrine",
    equalProtection.amendment = "Fourteenth Amendment";

MERGE (fourteenth:CourtMapEntity {id: "amendment:fourteenth"})
SET fourteenth.label = "Fourteenth Amendment",
    fourteenth.type = "amendment";

MATCH (brown:CourtMapEntity {id: "case:brown"}), (plessy:CourtMapEntity {id: "case:plessy"})
MERGE (brown)-[:PRECEDENT_EDGE {type: "OVERRULES", weight: 1.0}]->(plessy);

MATCH (brown:CourtMapEntity {id: "case:brown"}), (equalProtection:CourtMapEntity {id: "doctrine:equal-protection"})
MERGE (brown)-[:PRECEDENT_EDGE {type: "DEVELOPS", weight: 1.0}]->(equalProtection);

MATCH (brown:CourtMapEntity {id: "case:brown"}), (fourteenth:CourtMapEntity {id: "amendment:fourteenth"})
MERGE (brown)-[:PRECEDENT_EDGE {type: "INTERPRETS", weight: 1.0}]->(fourteenth);
