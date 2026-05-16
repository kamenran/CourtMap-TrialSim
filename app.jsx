const { useEffect, useMemo, useRef, useState } = React;

const colors = {
  case: "#172033",
  doctrine: "#3b5f82",
  amendment: "#c93636",
  cited: "#6f7d8e",
  overruling: "#8a332f",
  current: "#166534"
};

const precedentCases = [
  {
    id: "brown",
    name: "Brown v. Board of Education",
    citation: "347 U.S. 483",
    year: 1954,
    court: "Warren Court",
    area: "Equal Protection",
    amendment: "Fourteenth Amendment",
    doctrine: "School desegregation",
    status: "Landmark precedent",
    ideologicalSignal: "rights-expanding",
    holding:
      "State-mandated racial segregation in public schools violates the Equal Protection Clause.",
    plainEnglish:
      "The Court held that public schools could not separate students by race. The case became a foundation for modern equal protection doctrine and civil-rights litigation.",
    whyItMatters:
      "Brown shows how constitutional meaning can shift through precedent. It also gives the graph a clean example of doctrine evolution: Plessy is rejected, equal protection expands, and later school-integration cases refine the remedy.",
    officialLink: "https://supreme.justia.com/cases/federal/us/347/483/",
    tags: ["Civil Rights", "Education", "Equal Protection"],
    cites: ["plessy", "sweatt", "mclaurin"],
    citedBy: ["cooper", "green", "swann", "parents"],
    overrules: ["plessy"],
    related: ["Fourteenth Amendment", "Equal Protection", "Civil Rights"],
    vote: {
      count: "9-0",
      result: "Unanimous judgment",
      alignment: "Full Court consensus",
      majority: ["Warren", "Black", "Reed", "Frankfurter", "Douglas", "Jackson", "Burton", "Clark", "Minton"],
      concurrence: [],
      dissent: [],
      notParticipating: [],
      note: "Brown is useful as a graph anchor because the doctrinal shift is dramatic while the vote alignment is unanimous."
    },
    timeline: [
      { year: 1896, title: "Plessy v. Ferguson", detail: "Separate-but-equal doctrine is accepted." },
      { year: 1950, title: "Sweatt and McLaurin", detail: "The Court narrows segregation in graduate education." },
      { year: 1954, title: "Brown", detail: "Segregated public schools are held unconstitutional." },
      { year: 1955, title: "Brown II", detail: "Implementation is ordered with deliberate speed." },
      { year: 1968, title: "Green", detail: "School districts must dismantle dual systems." }
    ],
    evolution: {
      beforeLabel: "Plessy-era doctrine",
      afterLabel: "Brown-era doctrine",
      tokens: [
        { type: "removed", text: "Separate educational facilities are equal if materially comparable." },
        { type: "added", text: "Separate educational facilities are inherently unequal when imposed by the state." },
        { type: "same", text: "The Equal Protection Clause governs state classifications affecting public education." }
      ]
    }
  },
  {
    id: "miranda",
    name: "Miranda v. Arizona",
    citation: "384 U.S. 436",
    year: 1966,
    court: "Warren Court",
    area: "Criminal Procedure",
    amendment: "Fifth Amendment",
    doctrine: "Custodial interrogation",
    status: "Landmark precedent",
    ideologicalSignal: "rights-expanding",
    holding:
      "Before custodial interrogation, police must advise suspects of their rights to remain silent and to counsel.",
    plainEnglish:
      "Miranda created the warning framework people now associate with arrests and police questioning. It connects constitutional text, police practice, and procedural safeguards.",
    whyItMatters:
      "This is a strong CS-law case because it can be represented as a rule system: custody plus interrogation triggers warnings, and later cases modify exceptions and remedies.",
    officialLink: "https://supreme.justia.com/cases/federal/us/384/436/",
    tags: ["Criminal Procedure", "Police", "Due Process"],
    cites: ["escobedo", "gideon"],
    citedBy: ["dickerson", "berghuis", "newyorkquarles"],
    overrules: [],
    related: ["Fifth Amendment", "Sixth Amendment", "Criminal Procedure"],
    vote: {
      count: "5-4",
      result: "Closely divided judgment",
      alignment: "Rights-expanding criminal procedure majority",
      majority: ["Warren", "Black", "Douglas", "Brennan", "Fortas"],
      concurrence: [],
      dissent: ["Harlan", "Stewart", "White", "Clark"],
      notParticipating: [],
      note: "The split shows why Miranda remains a strong example of constitutional procedure becoming an operational rule for institutions."
    },
    timeline: [
      { year: 1963, title: "Gideon", detail: "Right to counsel is incorporated against the states." },
      { year: 1964, title: "Escobedo", detail: "Counsel rights are applied in police interrogation." },
      { year: 1966, title: "Miranda", detail: "Warnings become required before custodial interrogation." },
      { year: 1984, title: "Quarles", detail: "Public-safety exception is recognized." },
      { year: 2000, title: "Dickerson", detail: "Miranda is reaffirmed as constitutional doctrine." }
    ],
    evolution: {
      beforeLabel: "Pre-Miranda interrogation",
      afterLabel: "Miranda rule",
      tokens: [
        { type: "removed", text: "Confession admissibility turns mostly on voluntariness after questioning." },
        { type: "added", text: "Custodial interrogation requires warnings about silence, counsel, and waiver." },
        { type: "same", text: "The Fifth Amendment protects against compelled self-incrimination." }
      ]
    }
  },
  {
    id: "roe",
    name: "Roe v. Wade",
    citation: "410 U.S. 113",
    year: 1973,
    court: "Burger Court",
    area: "Substantive Due Process",
    amendment: "Fourteenth Amendment",
    doctrine: "Privacy and abortion",
    status: "Overruled",
    ideologicalSignal: "rights-expanding",
    holding:
      "The Due Process Clause protected a qualified right to terminate a pregnancy under a trimester framework.",
    plainEnglish:
      "Roe recognized abortion as part of constitutional privacy doctrine. It was later modified by Casey and overruled by Dobbs.",
    whyItMatters:
      "Roe is ideal for precedent mapping because its chain is explicit: recognition, modification, viability standard, then overruling. It teaches how precedent can evolve and collapse.",
    officialLink: "https://supreme.justia.com/cases/federal/us/410/113/",
    tags: ["Privacy", "Due Process", "Reproductive Rights"],
    cites: ["griswold", "eisenstadt"],
    citedBy: ["casey", "dobbs"],
    overrules: [],
    related: ["Fourteenth Amendment", "Privacy", "Stare Decisis"],
    vote: {
      count: "7-2",
      result: "Broad majority",
      alignment: "Substantive due process and privacy coalition",
      majority: ["Blackmun", "Burger", "Douglas", "Brennan", "Stewart", "Marshall", "Powell"],
      concurrence: [],
      dissent: ["White", "Rehnquist"],
      notParticipating: [],
      note: "Roe's large formal majority contrasts with the long-term instability of the doctrine in later precedent."
    },
    timeline: [
      { year: 1965, title: "Griswold", detail: "Privacy right recognized in contraception context." },
      { year: 1973, title: "Roe", detail: "Abortion right recognized under due process." },
      { year: 1992, title: "Casey", detail: "Roe is reaffirmed but reframed around undue burden." },
      { year: 2022, title: "Dobbs", detail: "Roe and Casey are overruled." }
    ],
    evolution: {
      beforeLabel: "Roe / Casey doctrine",
      afterLabel: "Dobbs doctrine",
      tokens: [
        { type: "removed", text: "The Constitution protects a liberty interest in abortion before viability." },
        { type: "added", text: "The Constitution does not confer a right to abortion; regulation returns to elected branches." },
        { type: "same", text: "Substantive due process analysis asks whether a claimed liberty is constitutionally protected." }
      ]
    }
  },
  {
    id: "dobbs",
    name: "Dobbs v. Jackson Women's Health Organization",
    citation: "597 U.S. 215",
    year: 2022,
    court: "Roberts Court",
    area: "Substantive Due Process",
    amendment: "Fourteenth Amendment",
    doctrine: "Abortion and stare decisis",
    status: "Current precedent",
    ideologicalSignal: "rights-limiting",
    holding:
      "The Constitution does not confer a right to abortion, and Roe and Casey are overruled.",
    plainEnglish:
      "Dobbs is the modern endpoint of the abortion-precedent chain. It is a high-signal example of overruling, stare decisis analysis, and constitutional interpretation shifting over time.",
    whyItMatters:
      "The case makes the graph product feel serious because it shows not only citations, but conflict: which precedents survive, which are narrowed, and which are overruled.",
    officialLink: "https://supreme.justia.com/cases/federal/us/597/19-1392/",
    tags: ["Stare Decisis", "Due Process", "Federalism"],
    cites: ["roe", "casey", "washington"],
    citedBy: [],
    overrules: ["roe", "casey"],
    related: ["Fourteenth Amendment", "Stare Decisis", "Federalism"],
    vote: {
      count: "6-3",
      result: "Judgment for Mississippi",
      alignment: "Five-justice overruling coalition plus concurrence in judgment",
      majority: ["Thomas", "Alito", "Gorsuch", "Kavanaugh", "Barrett"],
      concurrence: ["Roberts"],
      dissent: ["Breyer", "Sotomayor", "Kagan"],
      notParticipating: [],
      note: "The judgment was 6-3, while the controlling overruling rationale was carried by five justices."
    },
    timeline: [
      { year: 1973, title: "Roe", detail: "Abortion right recognized." },
      { year: 1992, title: "Casey", detail: "Roe is partly reaffirmed." },
      { year: 2022, title: "Dobbs", detail: "Roe and Casey are overruled." }
    ],
    evolution: {
      beforeLabel: "Roe / Casey framework",
      afterLabel: "Dobbs framework",
      tokens: [
        { type: "removed", text: "Before viability, a state may not impose an undue burden on the abortion decision." },
        { type: "added", text: "Abortion regulation is returned to the political branches unless another constitutional provision applies." },
        { type: "same", text: "Stare decisis analysis asks whether prior constitutional precedent should remain controlling." }
      ]
    }
  },
  {
    id: "gideon",
    name: "Gideon v. Wainwright",
    citation: "372 U.S. 335",
    year: 1963,
    court: "Warren Court",
    area: "Criminal Procedure",
    amendment: "Sixth Amendment",
    doctrine: "Right to counsel",
    status: "Landmark precedent",
    ideologicalSignal: "rights-expanding",
    holding:
      "States must provide counsel to indigent defendants charged with serious crimes.",
    plainEnglish:
      "Gideon made the right to a lawyer meaningful for people who cannot afford one. It is central to criminal procedure and access-to-justice doctrine.",
    whyItMatters:
      "Gideon is a clean access-to-justice node: it connects constitutional rights to institutional capacity, public defense systems, and later procedural cases.",
    officialLink: "https://supreme.justia.com/cases/federal/us/372/335/",
    tags: ["Criminal Procedure", "Access to Justice", "Counsel"],
    cites: ["powell"],
    citedBy: ["miranda", "argersinger"],
    overrules: ["betts"],
    related: ["Sixth Amendment", "Incorporation", "Due Process"],
    vote: {
      count: "9-0",
      result: "Unanimous judgment",
      alignment: "Access-to-counsel consensus",
      majority: ["Black", "Warren", "Douglas", "Clark", "Harlan", "Brennan", "Stewart", "White", "Goldberg"],
      concurrence: [],
      dissent: [],
      notParticipating: [],
      note: "Gideon pairs a unanimous vote with a major institutional consequence: states must provide counsel in serious criminal cases."
    },
    timeline: [
      { year: 1932, title: "Powell", detail: "Counsel required in capital cases with special circumstances." },
      { year: 1942, title: "Betts", detail: "No general right to appointed counsel in state felony cases." },
      { year: 1963, title: "Gideon", detail: "Betts is overruled and counsel becomes required." }
    ],
    evolution: {
      beforeLabel: "Betts rule",
      afterLabel: "Gideon rule",
      tokens: [
        { type: "removed", text: "Appointment of counsel depends on special circumstances in state felony cases." },
        { type: "added", text: "Counsel is fundamental and must be provided to indigent defendants in serious criminal cases." },
        { type: "same", text: "The Sixth Amendment secures assistance of counsel in criminal prosecutions." }
      ]
    }
  },
  {
    id: "carpenter",
    name: "Carpenter v. United States",
    citation: "585 U.S. 296",
    year: 2018,
    court: "Roberts Court",
    area: "Digital Privacy",
    amendment: "Fourth Amendment",
    doctrine: "Cell-site location data",
    status: "Current precedent",
    ideologicalSignal: "privacy-expanding",
    holding:
      "Accessing historical cell-site location records is a search under the Fourth Amendment and usually requires a warrant.",
    plainEnglish:
      "Carpenter updates Fourth Amendment doctrine for digital tracking. It is one of the best cases for showing your technology-law and AI-governance interests.",
    whyItMatters:
      "This is the signature tech-law node. It links constitutional privacy, data trails, surveillance, platform records, and the legal problem of old doctrine meeting new computation.",
    officialLink: "https://supreme.justia.com/cases/federal/us/585/16-402/",
    tags: ["Digital Privacy", "Surveillance", "Fourth Amendment"],
    cites: ["katz", "jones", "smith"],
    citedBy: [],
    overrules: [],
    related: ["Fourth Amendment", "Digital Privacy", "Surveillance"],
    vote: {
      count: "5-4",
      result: "Warrant requirement recognized",
      alignment: "Cross-ideological digital privacy majority",
      majority: ["Roberts", "Ginsburg", "Breyer", "Sotomayor", "Kagan"],
      concurrence: [],
      dissent: ["Kennedy", "Thomas", "Alito", "Gorsuch"],
      notParticipating: [],
      note: "Carpenter is a strong technology-law example because the vote alignment does not map cleanly onto a simple partisan story."
    },
    timeline: [
      { year: 1967, title: "Katz", detail: "Reasonable expectation of privacy test emerges." },
      { year: 1979, title: "Smith", detail: "Third-party doctrine limits privacy in phone metadata." },
      { year: 2012, title: "Jones", detail: "GPS tracking raises long-term surveillance concerns." },
      { year: 2018, title: "Carpenter", detail: "Cell-site records generally require a warrant." }
    ],
    evolution: {
      beforeLabel: "Classic third-party doctrine",
      afterLabel: "Digital-age privacy limit",
      tokens: [
        { type: "removed", text: "Records shared with a third party receive little Fourth Amendment protection." },
        { type: "added", text: "Deep, retrospective location records can require a warrant even when held by a third party." },
        { type: "same", text: "The Fourth Amendment protects reasonable expectations of privacy against government searches." }
      ]
    }
  },
  {
    id: "katz",
    name: "Katz v. United States",
    citation: "389 U.S. 347",
    year: 1967,
    court: "Warren Court",
    area: "Search and Seizure",
    amendment: "Fourth Amendment",
    doctrine: "Reasonable expectation of privacy",
    status: "Landmark precedent",
    ideologicalSignal: "privacy-expanding",
    holding:
      "The Fourth Amendment protects people, not places, and applies where a person has a reasonable expectation of privacy.",
    plainEnglish:
      "Katz moved search doctrine away from only physical trespass and toward privacy expectations, making it foundational for modern surveillance and technology cases.",
    whyItMatters:
      "Katz is a doctrinal bridge from physical spaces to information privacy. It is essential for mapping digital privacy cases like Jones and Carpenter.",
    officialLink: "https://supreme.justia.com/cases/federal/us/389/347/",
    tags: ["Fourth Amendment", "Privacy", "Surveillance"],
    cites: [],
    citedBy: ["smith", "jones", "carpenter"],
    overrules: [],
    related: ["Fourth Amendment", "Privacy", "Surveillance"],
    vote: {
      count: "7-1",
      result: "Fourth Amendment protection recognized",
      alignment: "Privacy expectation majority",
      majority: ["Stewart", "Warren", "Douglas", "Brennan", "White", "Fortas"],
      concurrence: ["Harlan"],
      dissent: ["Black"],
      notParticipating: ["Marshall"],
      note: "Katz is a clean example of doctrine changing form: search analysis moves beyond physical trespass."
    },
    timeline: [
      { year: 1928, title: "Olmstead", detail: "Wiretapping without trespass is outside Fourth Amendment protection." },
      { year: 1967, title: "Katz", detail: "Privacy expectation test changes search doctrine." },
      { year: 2018, title: "Carpenter", detail: "Katz is adapted to historical location data." }
    ],
    evolution: {
      beforeLabel: "Property-based search doctrine",
      afterLabel: "Expectation-of-privacy doctrine",
      tokens: [
        { type: "removed", text: "Fourth Amendment search analysis depends primarily on physical trespass into protected property." },
        { type: "added", text: "A search can occur when the government violates a reasonable expectation of privacy." },
        { type: "same", text: "The Fourth Amendment limits unreasonable government searches and seizures." }
      ]
    }
  },
  {
    id: "marbury",
    name: "Marbury v. Madison",
    citation: "5 U.S. 137",
    year: 1803,
    court: "Marshall Court",
    area: "Judicial Review",
    amendment: "Article III",
    doctrine: "Judicial review",
    status: "Foundational precedent",
    ideologicalSignal: "institutional",
    holding:
      "It is the duty of the judiciary to say what the law is, establishing judicial review of federal statutes.",
    plainEnglish:
      "Marbury is the institutional foundation for Supreme Court power. It explains why precedent mapping matters: courts do not just resolve disputes; they structure constitutional governance.",
    whyItMatters:
      "Marbury gives the product a constitutional-law anchor. It connects legal reasoning to institutional design, separation of powers, and judicial legitimacy.",
    officialLink: "https://supreme.justia.com/cases/federal/us/5/137/",
    tags: ["Judicial Review", "Separation of Powers", "Article III"],
    cites: [],
    citedBy: ["cooper", "dobbs"],
    overrules: [],
    related: ["Article III", "Judicial Review", "Separation of Powers"],
    vote: {
      count: "4-0",
      result: "Unanimous participating judgment",
      alignment: "Institutional authority consensus",
      majority: ["Marshall", "Paterson", "Washington", "Moore"],
      concurrence: [],
      dissent: [],
      notParticipating: ["Chase", "Cushing"],
      note: "Marbury's participating Court was unanimous, which helps frame judicial review as an institutional foundation node."
    },
    timeline: [
      { year: 1803, title: "Marbury", detail: "Judicial review is announced." },
      { year: 1958, title: "Cooper", detail: "Supreme Court constitutional interpretation binds state officials." },
      { year: 2022, title: "Dobbs", detail: "Modern stare decisis debate invokes institutional authority." }
    ],
    evolution: {
      beforeLabel: "Departmental conflict",
      afterLabel: "Judicial review",
      tokens: [
        { type: "removed", text: "A statute may control even when it conflicts with the Constitution in a case before the Court." },
        { type: "added", text: "Courts must apply the Constitution as superior law and decline to enforce conflicting statutes." },
        { type: "same", text: "Article III gives federal courts authority to decide cases arising under federal law." }
      ]
    }
  }
];

const supportingCases = [
  ["plessy", "Plessy v. Ferguson", "1896", "Overruled by Brown"],
  ["sweatt", "Sweatt v. Painter", "1950", "Narrowed segregation"],
  ["mclaurin", "McLaurin v. Oklahoma", "1950", "Narrowed segregation"],
  ["cooper", "Cooper v. Aaron", "1958", "Enforced Brown"],
  ["green", "Green v. County School Board", "1968", "Remedies after Brown"],
  ["swann", "Swann v. Charlotte-Mecklenburg", "1971", "Desegregation remedies"],
  ["parents", "Parents Involved", "2007", "Race-conscious school assignment"],
  ["escobedo", "Escobedo v. Illinois", "1964", "Interrogation and counsel"],
  ["dickerson", "Dickerson v. United States", "2000", "Reaffirmed Miranda"],
  ["berghuis", "Berghuis v. Thompkins", "2010", "Miranda waiver"],
  ["newyorkquarles", "New York v. Quarles", "1984", "Public-safety exception"],
  ["griswold", "Griswold v. Connecticut", "1965", "Privacy foundation"],
  ["eisenstadt", "Eisenstadt v. Baird", "1972", "Privacy extension"],
  ["casey", "Planned Parenthood v. Casey", "1992", "Modified Roe"],
  ["washington", "Washington v. Glucksberg", "1997", "Due process methodology"],
  ["powell", "Powell v. Alabama", "1932", "Right to counsel"],
  ["betts", "Betts v. Brady", "1942", "Overruled by Gideon"],
  ["argersinger", "Argersinger v. Hamlin", "1972", "Counsel in misdemeanor cases"],
  ["jones", "United States v. Jones", "2012", "GPS tracking"],
  ["smith", "Smith v. Maryland", "1979", "Third-party doctrine"]
].map(([id, name, year, note]) => ({ id, name, year, note }));

const pathFinderNodes = [
  ...precedentCases.map((item) => ({
    id: item.id,
    name: item.name,
    meta: `${item.citation} · ${item.year}`,
    type: "landmark"
  })),
  ...supportingCases.map((item) => ({
    id: item.id,
    name: item.name,
    meta: `${item.year} · ${item.note}`,
    type: "supporting"
  }))
].sort((a, b) => a.name.localeCompare(b.name));

function App() {
  const [view, setView] = useState("home");
  const [selectedCaseId, setSelectedCaseId] = useState("brown");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ area: "all", amendment: "all", status: "all" });
  const [sortBy, setSortBy] = useState("influence");
  const selectedCase = precedentCases.find((item) => item.id === selectedCaseId) || precedentCases[0];

  return (
    <main className="shell portfolioShell">
      <SiteNav view={view} setView={setView} />
      {view === "home" ? (
        <PortfolioHome setView={setView} />
      ) : (
        <CourtMapPage
          selectedCase={selectedCase}
          setSelectedCaseId={setSelectedCaseId}
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      )}
      <SiteFooter />
    </main>
  );
}

function SiteNav({ view, setView }) {
  return (
    <nav className="siteNav">
      <button className="wordmark" onClick={() => setView("home")}>
        <span className="miniMark" aria-hidden="true">
          <i className="miniCanton" />
          <i className="miniStripe miniStripeOne" />
          <i className="miniStripe miniStripeTwo" />
          <i className="miniStripe miniStripeThree" />
        </span>
        <span className="wordmarkText">
          <strong>Kamran Eisenberg</strong>
        </span>
      </button>
      <div className="navMotto">May God Bless the United States of America</div>
      <div className="navLinks">
        <button className={view === "home" ? "active" : ""} onClick={() => setView("home")}>Profile</button>
        <button className={view === "precedent" ? "active" : ""} onClick={() => setView("precedent")}>CourtMap</button>
        <a href="mailto:kamrane02@gmail.com">Contact</a>
      </div>
    </nav>
  );
}

function SiteFooter() {
  return (
    <footer className="siteFooter">
      <span>© 2026 Kamran Eisenberg</span>
      <span>Computer Science · Law · Civic Technology</span>
    </footer>
  );
}

function PortfolioHome({ setView }) {
  return (
    <>
      <header className="personalHero">
        <div className="heroCopy">
          <p className="eyebrow">Computer Science · Law · Public Institutions</p>
          <h1>Building technical tools for legal and political transparency.</h1>
          <p className="heroLead">
            Computer Science student at Towson University focused on the intersection of technology,
            law, public policy, constitutional systems, and AI governance.
          </p>
          <div className="credentialStrip">
            <span>Towson University CS</span>
            <span>AI Governance</span>
            <span>Law School Track</span>
          </div>
          <div className="heroActions">
            <button className="primaryAction" onClick={() => setView("precedent")}>Open CourtMap</button>
            <a className="quietAction" href="mailto:kamrane02@gmail.com">Contact</a>
          </div>
        </div>
        <MascotCard />
      </header>

      <section className="portfolioGrid">
        <article className="profilePanel">
          <p className="label">About Kamran</p>
          <h2>CS student building toward law, policy, and public-interest technology.</h2>
          <p>
            I am a Computer Science student at Towson University interested in technology law,
            AI governance, constitutional law, and civic technology. My work focuses on computational
            tools for public institutions, legal transparency, and accessible legal analysis.
          </p>
        </article>

        <article className="profilePanel compactPanel focusPanel">
          <p className="label">Current Focus</p>
          <ul className="cleanList">
            <li>Technology law</li>
            <li>AI regulation and governance</li>
            <li>Constitutional law</li>
            <li>Computational legal analysis</li>
          </ul>
        </article>
      </section>

      <section className="aiHomeFeature">
        <div>
          <p className="label">Strategic Focus</p>
          <h2>Computational constitutional law</h2>
          <p>
            A graph-first project direction for understanding how Supreme Court precedent evolves:
            citations, overruling chains, constitutional amendments, doctrine shifts, and judicial influence.
          </p>
        </div>
        <div className="aiHomeStats">
          <Metric label="Identity" value="CS + Law" />
        </div>
      </section>

      <section className="portfolioGrid productIdentity">
        <article className="profilePanel">
          <p className="label">Product Thesis</p>
          <h2>CourtMap is GitHub graph analysis for Supreme Court doctrine.</h2>
          <p>
            The project treats cases as connected legal objects: searchable, explainable, citeable,
            and linked to the doctrines they shape. It is designed to show how software engineering
            can make complex legal systems easier to explore.
          </p>
        </article>
        <article className="profilePanel compactPanel">
          <p className="label">Core Product</p>
          <ul className="cleanList">
            <li>Supreme Court case search</li>
            <li>Interactive precedent graph</li>
            <li>Overruling and citation chains</li>
            <li>Plain-English case explanations</li>
            <li>Doctrine evolution view</li>
          </ul>
          <button className="quietAction compact identityLaunch" onClick={() => setView("precedent")}>Open project</button>
        </article>
      </section>

      <section className="featuredProduct">
        <div className="sectionHeader">
          <div>
            <p className="label">Featured Product</p>
            <h2>CourtMap</h2>
          </div>
          <button className="primaryAction small" onClick={() => setView("precedent")}>Launch</button>
        </div>
        <div className="productShowcase">
          <button className="projectCard activeProject" onClick={() => setView("precedent")}>
            <span>Flagship product</span>
            <strong>Interactive graph of Supreme Court precedent</strong>
            <small>Explore landmark cases, citation relationships, doctrine evolution, constitutional amendments, and overruling chains.</small>
          </button>
          <div className="productStats">
            <Metric label="Corpus" value="SCOTUS cases" />
            <Metric label="Stack" value="React · D3 · Neo4j-ready" />
            <Metric label="Theme" value="Law + CS" />
          </div>
        </div>
      </section>

      <CredibilityMarkers />

      <section className="portfolioGrid">
        <article className="profilePanel">
          <p className="label">Project Roadmap</p>
          <h2>Where the platform goes next</h2>
          <ul className="roadmapList">
            <li>Full Supreme Court citation corpus</li>
            <li>Legal citation parser</li>
            <li>Neo4j precedent graph</li>
            <li>Justice voting blocs</li>
            <li>Ideological shift scoring</li>
            <li>Doctrine-specific casebooks</li>
          </ul>
        </article>
        <article className="profilePanel">
          <p className="label">Technical Interests</p>
          <h2>CS methods for legal problems</h2>
          <p>
            AI/ML, NLP, full-stack development, data visualization, graph analysis, and scalable backend
            systems applied to legal reasoning, civic technology, and constitutional systems.
          </p>
        </article>
      </section>
    </>
  );
}

function CourtMapPage({ selectedCase, setSelectedCaseId, query, setQuery, filters, setFilters, sortBy, setSortBy }) {
  const [brieflyFocus, setBrieflyFocus] = useState(null);
  const filteredCases = useMemo(
    () => sortCases(filterCases(precedentCases, query, filters), sortBy),
    [query, filters, sortBy]
  );
  const areas = uniqueOptions(precedentCases.map((item) => item.area));
  const amendments = uniqueOptions(precedentCases.map((item) => item.amendment));
  const statuses = uniqueOptions(precedentCases.map((item) => item.status));
  const stats = getCorpusStats();

  return (
    <>
      <header className="topbar productHero">
        <div>
          <p className="eyebrow">CourtMap</p>
          <h1>Interactive graph of Supreme Court precedent.</h1>
          <p className="productLead">
            Explore landmark cases, citation relationships, constitutional amendments, overruling chains,
            and doctrine shifts through a focused law + CS interface.
          </p>
        </div>
        <div className="status">
          <span className="statusFlag" aria-hidden="true">
            <i className="flagCanton" />
            <i className="flagStripe stripeOne" />
            <i className="flagStripe stripeTwo" />
            <i className="flagStripe stripeThree" />
          </span>
          <span>Curated corpus</span>
          <strong>{precedentCases.length} landmark cases</strong>
        </div>
      </header>

      <section className="insightStrip">
        <Metric label="Citation edges" value={stats.edgeCount} />
        <Metric label="Overruling chains" value={stats.overrulingCount} />
        <Metric label="Doctrine areas" value={stats.areaCount} />
        <Metric label="Complete briefs" value={precedentCases.length} />
      </section>

      <section className="catalogPanel">
        <div className="catalogHeader">
          <div>
            <p className="label">Case Explorer</p>
            <h2>Search precedent by case, doctrine, amendment, or legal theme</h2>
            <p className="sourceNote">Curated Supreme Court corpus with complete case cards, source links, doctrine timelines, and graph-ready citation relationships.</p>
          </div>
          <label className="searchBox">
            <span>Search</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try Brown, privacy, Fourth Amendment..."
            />
          </label>
        </div>
        <div className="catalogControls precedentControls">
          <label>
            <span>Doctrine Area</span>
            <select value={filters.area} onChange={(event) => setFilters({ ...filters, area: event.target.value })}>
              <option value="all">All areas</option>
              {areas.map((area) => <option key={area} value={area}>{area}</option>)}
            </select>
          </label>
          <label>
            <span>Constitutional Anchor</span>
            <select value={filters.amendment} onChange={(event) => setFilters({ ...filters, amendment: event.target.value })}>
              <option value="all">All anchors</option>
              {amendments.map((amendment) => <option key={amendment} value={amendment}>{amendment}</option>)}
            </select>
          </label>
          <label>
            <span>Precedent Status</span>
            <select value={filters.status} onChange={(event) => setFilters({ ...filters, status: event.target.value })}>
              <option value="all">All statuses</option>
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>
          <label>
            <span>Sort</span>
            <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="influence">Influence score</option>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="az">A to Z</option>
            </select>
          </label>
        </div>
        <QuickLenses setQuery={setQuery} setFilters={setFilters} />
        <div className="billGrid">
          {filteredCases.length ? filteredCases.map((item) => (
            <button
              key={item.id}
              className={`billCard ${item.id === selectedCase.id ? "active" : ""}`}
              onClick={() => setSelectedCaseId(item.id)}
            >
              <span>{item.citation} · {item.year}</span>
              <strong>{item.name}</strong>
              <small>{item.area} · {item.status}</small>
            </button>
          )) : (
            <div className="emptyState caseEmpty">
              <strong>No cases match those filters.</strong>
              <p>Try a broader doctrine area, remove the search text, or open one of the quick lenses.</p>
              <button className="quietAction compact" onClick={() => {
                setQuery("");
                setFilters({ area: "all", amendment: "all", status: "all" });
              }}>Reset explorer</button>
            </div>
          )}
        </div>
        <p className="resultNote">{filteredCases.length} case{filteredCases.length === 1 ? "" : "s"} shown</p>
      </section>

      <CaseHeader selectedCase={selectedCase} />
      <CaseSummary selectedCase={selectedCase} />
      <CaseInfoGrid selectedCase={selectedCase} />
      <CaseBriefPanel selectedCase={selectedCase} />
      <JusticeAlignment selectedCase={selectedCase} />
      <PathFinder setSelectedCaseId={setSelectedCaseId} />

      <div className="layout">
        <div className="mainColumn">
          <DoctrineEvolution selectedCase={selectedCase} setSelectedCaseId={setSelectedCaseId} />
          <PrecedentTimeline selectedCase={selectedCase} />
        </div>
        <aside className="sideColumn">
          <BrieflyPanel
            selectedCase={selectedCase}
            setQuery={setQuery}
            setFilters={setFilters}
            setSortBy={setSortBy}
            setBrieflyFocus={setBrieflyFocus}
          />
          <DoctrinePanel
            selectedCase={selectedCase}
            setSelectedCaseId={setSelectedCaseId}
            brieflyFocus={brieflyFocus}
          />
          <RelationshipPanel selectedCase={selectedCase} brieflyFocus={brieflyFocus} />
        </aside>
      </div>

      <section className="networkSection">
        <div className="sectionHeader">
          <div>
            <p className="label">Precedent Graph</p>
            <h2>Citation, doctrine, amendment, and overruling relationships</h2>
          </div>
          <div className="legend">
            <span><i style={{ background: colors.case }} /> Selected case</span>
            <span><i style={{ background: colors.cited }} /> Cited case</span>
            <span><i style={{ background: colors.doctrine }} /> Doctrine</span>
            <span><i style={{ background: colors.amendment }} /> Amendment</span>
            <span><i style={{ background: colors.overruling }} /> Overruled</span>
          </div>
        </div>
        <PrecedentGraph selectedCase={selectedCase} setSelectedCaseId={setSelectedCaseId} />
      </section>

      <ProjectExplanation />
    </>
  );
}

function CaseHeader({ selectedCase }) {
  return (
    <section className="billStrip">
      <div>
        <p className="label">Selected Precedent</p>
        <h2>{selectedCase.name}</h2>
        <p>{selectedCase.citation} · {selectedCase.year} · {selectedCase.court}</p>
        <div className="metadataPills">
          <span>{selectedCase.area}</span>
          <span>{selectedCase.amendment}</span>
          <span>{selectedCase.status}</span>
          <span>{selectedCase.ideologicalSignal}</span>
        </div>
      </div>
      <div className="metrics">
        <Metric label="Cites" value={selectedCase.cites.length} />
        <Metric label="Cited By" value={selectedCase.citedBy.length} />
        <Metric label="Overrules" value={selectedCase.overrules.length} />
      </div>
    </section>
  );
}

function CaseSummary({ selectedCase }) {
  return (
    <section className="summaryPanel">
      <div>
        <p className="label">Plain-English Summary</p>
        <h2>{selectedCase.doctrine}</h2>
      </div>
      <div>
        <p>{selectedCase.plainEnglish}</p>
      </div>
    </section>
  );
}

function CaseInfoGrid({ selectedCase }) {
  return (
    <section className="billInfoGrid">
      <article className="infoPanel">
        <p className="label">Official Info</p>
        <dl>
          <div><dt>Case</dt><dd>{selectedCase.name}</dd></div>
          <div><dt>Citation</dt><dd>{selectedCase.citation}</dd></div>
          <div><dt>Year</dt><dd>{selectedCase.year}</dd></div>
          <div><dt>Court</dt><dd>{selectedCase.court}</dd></div>
          <div><dt>Anchor</dt><dd>{selectedCase.amendment}</dd></div>
        </dl>
      </article>
      <article className="infoPanel">
        <p className="label">Why It Matters</p>
        <h3>{selectedCase.area}</h3>
        <p>{selectedCase.whyItMatters}</p>
        <div className="metadataPills infoPills">
          {selectedCase.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <a className="officialLink" href={selectedCase.officialLink} target="_blank" rel="noreferrer">Open source page</a>
      </article>
    </section>
  );
}

function CaseBriefPanel({ selectedCase }) {
  const [copied, setCopied] = useState(false);
  const brief = buildCaseBrief(selectedCase);

  function copyBrief() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(brief).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }).catch(() => setCopied(false));
  }

  return (
    <section className="panel caseBriefPanel">
      <div className="sectionHeader">
        <div>
          <p className="label">Case Brief</p>
          <h2>Interview-ready summary</h2>
        </div>
        <button className="quietAction compact" onClick={copyBrief}>{copied ? "Copied" : "Copy brief"}</button>
      </div>
      <div className="briefGrid">
        <article>
          <span>Issue</span>
          <p>How does {selectedCase.name} shape {selectedCase.doctrine.toLowerCase()} under {selectedCase.amendment}?</p>
        </article>
        <article>
          <span>Holding</span>
          <p>{selectedCase.holding}</p>
        </article>
        <article>
          <span>Rule</span>
          <p>{getControllingRule(selectedCase)}</p>
        </article>
        <article>
          <span>Use In Graph</span>
          <p>{getGraphUse(selectedCase)}</p>
        </article>
      </div>
    </section>
  );
}

function JusticeAlignment({ selectedCase }) {
  const vote = selectedCase.vote;
  const total = vote.majority.length + vote.concurrence.length + vote.dissent.length;
  const majorityShare = total ? (vote.majority.length / total) * 100 : 0;
  const concurrenceShare = total ? (vote.concurrence.length / total) * 100 : 0;
  const dissentShare = total ? (vote.dissent.length / total) * 100 : 0;

  return (
    <section className="panel justicePanel">
      <div className="sectionHeader justiceHeader">
        <div>
          <p className="label">Justice Voting Alignment</p>
          <h2>{vote.count} · {vote.result}</h2>
          <p>{vote.alignment}</p>
        </div>
        <div className="voteCountBadge">
          <strong>{vote.count}</strong>
          <span>decision split</span>
        </div>
      </div>

      <div className="voteSplitBar" aria-label={`${vote.count} voting alignment`}>
        <span className="voteSegment majoritySegment" style={{ width: `${majorityShare}%` }} />
        {vote.concurrence.length > 0 && <span className="voteSegment concurrenceSegment" style={{ width: `${concurrenceShare}%` }} />}
        {vote.dissent.length > 0 && <span className="voteSegment dissentSegment" style={{ width: `${dissentShare}%` }} />}
      </div>

      <div className="justiceGrid">
        <JusticeBloc title="Majority" justices={vote.majority} tone="majority" />
        {vote.concurrence.length > 0 && <JusticeBloc title="Concurrence" justices={vote.concurrence} tone="concurrence" />}
        <JusticeBloc title="Dissent" justices={vote.dissent} tone="dissent" emptyLabel="No dissenting justices" />
        {vote.notParticipating.length > 0 && <JusticeBloc title="Not Participating" justices={vote.notParticipating} tone="neutral" />}
      </div>

      <p className="alignmentNote">{vote.note}</p>
    </section>
  );
}

function JusticeBloc({ title, justices, tone, emptyLabel = "None" }) {
  return (
    <article className={`justiceBloc ${tone}`}>
      <div>
        <span>{title}</span>
        <strong>{justices.length}</strong>
      </div>
      <ul>
        {justices.length ? justices.map((justice) => <li key={`${title}-${justice}`}>{justice}</li>) : <li>{emptyLabel}</li>}
      </ul>
    </article>
  );
}

function PathFinder({ setSelectedCaseId }) {
  const [startId, setStartId] = useState("plessy");
  const [endId, setEndId] = useState("brown");
  const [pathAnchor, setPathAnchor] = useState("start");
  const endOptions = useMemo(() => pathAnchor === "start" ? filterReachableNodes(startId) : pathFinderNodes, [pathAnchor, startId]);
  const startOptions = useMemo(() => pathAnchor === "end" ? filterReachableNodes(endId) : pathFinderNodes, [pathAnchor, endId]);
  const path = useMemo(() => findShortestPath(startId, endId), [startId, endId]);
  const pathNames = path.map((item) => getPathNode(item.id)?.name || item.id);
  const canOpenEnd = precedentCases.some((item) => item.id === endId);

  function updateStart(nextStartId) {
    const reachableEndIds = getReachableNodeIds(nextStartId);
    setPathAnchor("start");
    setStartId(nextStartId);
    if (!reachableEndIds.includes(endId)) {
      setEndId(pickNearestNode(nextStartId, reachableEndIds));
    }
  }

  function updateEnd(nextEndId) {
    const reachableStartIds = getReachableNodeIds(nextEndId);
    setPathAnchor("end");
    setEndId(nextEndId);
    if (!reachableStartIds.includes(startId)) {
      setStartId(pickNearestNode(nextEndId, reachableStartIds));
    }
  }

  return (
    <section className="panel pathFinderPanel">
      <div className="sectionHeader pathHeader">
        <div>
          <p className="label">Doctrine Path Finder</p>
          <h2>Trace the shortest route between precedents</h2>
          <p>
            A graph-search feature that follows citation, downstream, and overruling relationships
            across the curated SCOTUS network.
          </p>
        </div>
        <div className="pathBadge">
          <strong>{Math.max(path.length - 1, 0)}</strong>
          <span>edge{path.length - 1 === 1 ? "" : "s"}</span>
        </div>
      </div>

      <div className="pathControls">
        <label>
          <span>Start</span>
          <select value={startId} onChange={(event) => updateStart(event.target.value)}>
            {startOptions.map((node) => (
              <option key={`start-${node.id}`} value={node.id}>{node.name}</option>
            ))}
          </select>
        </label>
        <label>
          <span>End</span>
          <select value={endId} onChange={(event) => updateEnd(event.target.value)}>
            {endOptions.map((node) => (
              <option key={`end-${node.id}`} value={node.id}>{node.name}</option>
            ))}
          </select>
        </label>
        <div className="pathPresets">
          <button onClick={() => { setPathAnchor("start"); setStartId("plessy"); setEndId("brown"); }}>Plessy to Brown</button>
          <button onClick={() => { setPathAnchor("start"); setStartId("roe"); setEndId("dobbs"); }}>Roe to Dobbs</button>
          <button onClick={() => { setPathAnchor("start"); setStartId("katz"); setEndId("carpenter"); }}>Katz to Carpenter</button>
        </div>
      </div>

      {path.length ? (
        <>
          <div className="pathRail" aria-label={`Path from ${pathNames[0]} to ${pathNames[pathNames.length - 1]}`}>
            {path.map((step, index) => {
              const node = getPathNode(step.id);
              const knownCase = precedentCases.find((item) => item.id === step.id);
              return (
                <React.Fragment key={`${step.id}-${index}`}>
                  <button
                    className={`pathNode ${knownCase ? "clickable" : ""}`}
                    onClick={() => knownCase && setSelectedCaseId(knownCase.id)}
                    disabled={!knownCase}
                  >
                    <strong>{node?.name || step.id}</strong>
                    <span>{node?.meta || "Mapped relationship"}</span>
                  </button>
                  {index < path.length - 1 && (
                    <span className={`pathConnector ${path[index + 1].tone}`}>
                      {path[index + 1].via}
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <p className="pathExplanation">{explainPath(path)}</p>
          {canOpenEnd && (
            <button className="quietAction compact pathOpenButton" onClick={() => setSelectedCaseId(endId)}>
              Open endpoint case
            </button>
          )}
        </>
      ) : (
        <div className="emptyState">
          <strong>No mapped path yet.</strong>
          <p>These nodes are not connected in the current curated corpus. Adding more SCOTUS citation data will make this graph denser over time.</p>
        </div>
      )}
    </section>
  );
}

function DoctrineEvolution({ selectedCase, setSelectedCaseId }) {
  const rows = buildDoctrineRows(selectedCase.evolution.tokens);
  return (
    <section className="panel comparisonPanel">
      <div className="diffTop">
        <div>
          <p className="label">Doctrine Evolution</p>
          <h2>Before / after legal rule comparison</h2>
        </div>
        <span className="comparisonBadge real">Modeled precedent shift</span>
      </div>
      <div className="commitHeader">
        <div>
          <span className="commitEyebrow">Precedent shift</span>
          <strong>{selectedCase.evolution.beforeLabel} → {selectedCase.evolution.afterLabel}</strong>
          <small>Red = displaced doctrine · Green = new rule</small>
        </div>
      </div>
      <div className="githubDiff">
        <div className="diffFileHeader">
          <span>constitutional-doctrine.txt</span>
          <strong>{selectedCase.name}</strong>
        </div>
        <div className="diffRows">
          {rows.map((row, index) => (
            <div key={`${row.type}-${index}`} className={`diffRow ${row.type}`}>
              <span className="lineNumber">{row.oldLine || ""}</span>
              <span className="lineNumber">{row.newLine || ""}</span>
              <span className="linePrefix">{row.prefix}</span>
              <span className="lineText">{row.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="diffLegend">
        <span><i className="removedSwatch" /> Removed or displaced doctrine</span>
        <span><i className="addedSwatch" /> Added or controlling doctrine</span>
      </div>
    </section>
  );
}

function PrecedentTimeline({ selectedCase }) {
  return (
    <section className="panel">
      <p className="label">Doctrine Timeline</p>
      <h2>{selectedCase.doctrine}</h2>
      <div className="timelineList">
        {selectedCase.timeline.map((event) => (
          <article key={`${event.year}-${event.title}`} className="timelineItem">
            <strong>{event.year}</strong>
            <div>
              <h3>{event.title}</h3>
              <p>{event.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function BrieflyPanel({ selectedCase, setQuery, setFilters, setSortBy, setBrieflyFocus }) {
  function showAnchor() {
    setQuery("");
    setFilters({ area: "all", amendment: selectedCase.amendment, status: "all" });
    setSortBy("influence");
    setBrieflyFocus({
      type: "anchor",
      title: selectedCase.amendment,
      detail: `Showing cases in the corpus connected to ${selectedCase.amendment}.`
    });
    scrollToSelector(".catalogPanel");
  }

  function showDoctrine() {
    setQuery(selectedCase.area);
    setFilters({ area: selectedCase.area, amendment: "all", status: "all" });
    setSortBy("influence");
    setBrieflyFocus({
      type: "doctrine",
      title: selectedCase.area,
      detail: `Highlighting nearby doctrine for ${selectedCase.area}.`
    });
    scrollToSelector(".aiPolicyTrackerPanel");
  }

  function traceOverrulings() {
    setQuery("");
    setFilters({ area: "all", amendment: "all", status: "all" });
    setSortBy("influence");
    setBrieflyFocus({
      type: "overruling",
      title: `${selectedCase.name} chain`,
      detail: getOverrulingGuidance(selectedCase)
    });
    scrollToSelector(".networkSection");
  }

  return (
    <article className="panel brieflyPanel">
      <div className="brieflyTop">
        <Mascot compact />
        <div>
          <p className="label">Briefly</p>
          <h2>Precedent reading assistant</h2>
        </div>
      </div>
      <p className="brieflyMessage">
        {selectedCase.name} is best read as a {selectedCase.area.toLowerCase()} case about {selectedCase.doctrine.toLowerCase()}.
      </p>
      <div className="brieflyActions">
        <button onClick={showAnchor}>Show this constitutional anchor</button>
        <button onClick={showDoctrine}>Find related doctrine</button>
        <button onClick={traceOverrulings}>Trace overruling chains</button>
      </div>
    </article>
  );
}

function DoctrinePanel({ selectedCase, setSelectedCaseId, brieflyFocus }) {
  const connectedIds = [...selectedCase.cites, ...selectedCase.citedBy, ...selectedCase.overrules];
  const connected = precedentCases.filter((item) => connectedIds.includes(item.id));
  return (
    <article className="panel aiPolicyTrackerPanel">
      <p className="label">Connected Doctrine</p>
      <h2>{selectedCase.related[0]}</h2>
      <p>{brieflyFocus?.type === "doctrine" ? brieflyFocus.detail : "Use these nearby cases to follow the doctrine path around the selected precedent."}</p>
      <div className="aiTopicGrid">
        {connected.length ? connected.map((item) => (
          <button key={item.id} onClick={() => setSelectedCaseId(item.id)}>{item.name}</button>
        )) : selectedCase.related.map((item) => (
          <button key={item}>{item}</button>
        ))}
      </div>
    </article>
  );
}

function RelationshipPanel({ selectedCase, brieflyFocus }) {
  const citedNames = selectedCase.cites.map(caseName).filter(Boolean);
  const citingNames = selectedCase.citedBy.map(caseName).filter(Boolean);
  const overruledNames = selectedCase.overrules.map(caseName).filter(Boolean);

  return (
    <article className="panel relationshipPanel">
      <p className="label">Graph Insight</p>
      <h2>{brieflyFocus?.type === "overruling" ? brieflyFocus.title : "How this node behaves"}</h2>
      <ul className="relationshipList">
        <li><strong>{selectedCase.cites.length}</strong><span>case{selectedCase.cites.length === 1 ? "" : "s"} cited or doctrinally upstream</span></li>
        <li><strong>{selectedCase.citedBy.length}</strong><span>case{selectedCase.citedBy.length === 1 ? "" : "s"} downstream</span></li>
        <li><strong>{selectedCase.overrules.length}</strong><span>overruling edge{selectedCase.overrules.length === 1 ? "" : "s"}</span></li>
      </ul>
      <p>
        {brieflyFocus?.type === "overruling" ? brieflyFocus.detail : overruledNames.length
          ? `${selectedCase.name} directly displaces ${overruledNames.join(", ")}.`
          : citedNames.length
            ? `${selectedCase.name} builds from ${citedNames.slice(0, 2).join(", ")}.`
            : `${selectedCase.name} functions as a foundational source node in this corpus.`}
        {brieflyFocus?.type === "overruling" ? "" : citingNames.length ? ` Later mapped cases include ${citingNames.slice(0, 2).join(", ")}.` : ""}
      </p>
    </article>
  );
}

function QuickLenses({ setQuery, setFilters }) {
  const lenses = [
    { label: "Digital privacy", query: "privacy", filters: { area: "all", amendment: "Fourth Amendment", status: "all" } },
    { label: "Civil rights", query: "equal protection", filters: { area: "Equal Protection", amendment: "all", status: "all" } },
    { label: "Criminal procedure", query: "", filters: { area: "Criminal Procedure", amendment: "all", status: "all" } },
    { label: "Overruled doctrine", query: "", filters: { area: "all", amendment: "all", status: "Overruled" } },
    { label: "Foundational cases", query: "", filters: { area: "all", amendment: "all", status: "Foundational precedent" } }
  ];

  return (
    <div className="quickLenses">
      {lenses.map((lens) => (
        <button key={lens.label} onClick={() => {
          setQuery(lens.query);
          setFilters(lens.filters);
        }}>{lens.label}</button>
      ))}
    </div>
  );
}

function PrecedentGraph({ selectedCase, setSelectedCaseId }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    element.innerHTML = "";

    const width = element.clientWidth || 800;
    const height = element.clientHeight || 500;
    const graph = buildGraph(selectedCase);
    const svg = d3.select(element).append("svg").attr("viewBox", `0 0 ${width} ${height}`);

    const simulation = d3.forceSimulation(graph.nodes)
      .force("link", d3.forceLink(graph.links).id((node) => node.id).distance((link) => link.type === "OVERRULES" ? 110 : 86))
      .force("charge", d3.forceManyBody().strength(-360))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(46));

    const link = svg.append("g")
      .selectAll("line")
      .data(graph.links)
      .join("line")
      .attr("stroke-width", (item) => item.type === "OVERRULES" ? 2.4 : 1.6)
      .attr("stroke", (item) => item.type === "OVERRULES" ? colors.overruling : "#d7d0c9");

    const node = svg.append("g")
      .selectAll("g")
      .data(graph.nodes)
      .join("g")
      .attr("cursor", (item) => item.caseId ? "pointer" : "default")
      .call(drag(simulation));

    node.append("circle")
      .attr("r", (item) => item.type === "case" && item.id === selectedCase.id ? 22 : 15)
      .attr("fill", (item) => colors[item.type] || colors.cited)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2);

    node.append("text")
      .attr("x", 20)
      .attr("y", 4)
      .text((item) => item.label)
      .each(function () {
        const text = d3.select(this);
        if (text.text().length > 36) text.text(`${text.text().slice(0, 34)}...`);
      });

    node.on("click", (_, item) => {
      if (item.caseId) setSelectedCaseId(item.caseId);
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (item) => item.source.x)
        .attr("y1", (item) => item.source.y)
        .attr("x2", (item) => item.target.x)
        .attr("y2", (item) => item.target.y);

      node.attr("transform", (item) => `translate(${item.x},${item.y})`);
    });

    return () => simulation.stop();
  }, [selectedCase, setSelectedCaseId]);

  return <div className="network" ref={ref} />;
}

function MascotCard() {
  return (
    <article className="mascotCard">
      <Mascot />
      <p className="label">Briefly</p>
      <h2>Legal systems, made readable.</h2>
      <div className="mascotTools">
        <span>Law + CS</span>
        <span>AI governance</span>
        <span>Civic technology</span>
      </div>
      <p>
        My mission is to build software that makes legal institutions easier to understand:
        tools that connect constitutional law, public accountability, AI policy, and clear technical design.
      </p>
    </article>
  );
}

function Mascot({ compact = false }) {
  return (
    <div className={`mascot profileMascot ${compact ? "compactMascot" : ""}`} aria-hidden="true">
      <i className="mascotPage" />
      <i className="mascotFold" />
      <i className="mascotBar redBar" />
      <i className="mascotBar blueBar" />
      <i className="mascotEye leftEye" />
      <i className="mascotEye rightEye" />
      <i className="mascotSmile" />
      <i className="mascotGavel" />
    </div>
  );
}

function CredibilityMarkers() {
  const stats = getCorpusStats();
  return (
    <section className="credibilityStrip">
      <Metric label="Cases modeled" value={precedentCases.length} />
      <Metric label="Graph edges" value={stats.edgeCount} />
      <Metric label="Doctrines" value={stats.areaCount} />
      <Metric label="Graph engine" value="D3" />
      <Metric label="Backend path" value="Neo4j" />
    </section>
  );
}

function ProjectExplanation() {
  return (
    <section className="projectExplanation">
      <article>
        <p className="label">Why This Project</p>
        <h2>Legal reasoning is networked.</h2>
        <p>
          CourtMap turns Supreme Court doctrine into an interactive graph so users can see how cases cite,
          narrow, extend, and overrule each other.
        </p>
      </article>
      <article>
        <p className="label">Technical Stack</p>
        <h2>Graph-first architecture.</h2>
        <p>
          React for the interface, D3 for visualization, graph-modeled case data, source links for every case,
          and a Neo4j-ready backend path for larger citation ingestion.
        </p>
      </article>
      <article>
        <p className="label">Law + CS Connection</p>
        <h2>Computational legal analysis.</h2>
        <p>
          The project connects constitutional law, NLP, graph analysis, and civic technology in a way that is
          easy to explain in interviews and law-school applications.
        </p>
      </article>
    </section>
  );
}

function Metric({ label, value }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function filterCases(cases, query, filters) {
  const needle = query.trim().toLowerCase();
  return cases.filter((item) => {
    const haystack = [
      item.name,
      item.citation,
      item.area,
      item.amendment,
      item.doctrine,
      item.status,
      item.plainEnglish,
      ...item.tags
    ].join(" ").toLowerCase();
    const matchesQuery = !needle || haystack.includes(needle);
    const matchesArea = filters.area === "all" || item.area === filters.area;
    const matchesAmendment = filters.amendment === "all" || item.amendment === filters.amendment;
    const matchesStatus = filters.status === "all" || item.status === filters.status;
    return matchesQuery && matchesArea && matchesAmendment && matchesStatus;
  });
}

function sortCases(cases, sortBy) {
  return [...cases].sort((a, b) => {
    if (sortBy === "newest") return b.year - a.year;
    if (sortBy === "oldest") return a.year - b.year;
    if (sortBy === "az") return a.name.localeCompare(b.name);
    return influenceScore(b) - influenceScore(a);
  });
}

function influenceScore(item) {
  return item.cites.length + item.citedBy.length * 2 + item.overrules.length * 3 + item.timeline.length;
}

function getCorpusStats() {
  return {
    edgeCount: precedentCases.reduce((total, item) => total + item.cites.length + item.citedBy.length + item.overrules.length + item.related.length, 0),
    overrulingCount: precedentCases.reduce((total, item) => total + item.overrules.length, 0),
    areaCount: uniqueOptions(precedentCases.map((item) => item.area)).length
  };
}

function uniqueOptions(values) {
  return [...new Set(values)].sort();
}

function buildDoctrineRows(tokens) {
  let oldLine = 1;
  let newLine = 1;
  return tokens.map((token) => {
    if (token.type === "removed") {
      return { type: "removed", prefix: "-", text: token.text, oldLine: oldLine++, newLine: "" };
    }
    if (token.type === "added") {
      return { type: "added", prefix: "+", text: token.text, oldLine: "", newLine: newLine++ };
    }
    return { type: "same", prefix: " ", text: token.text, oldLine: oldLine++, newLine: newLine++ };
  });
}

function buildGraph(selectedCase) {
  const nodes = [
    { id: selectedCase.id, label: selectedCase.name, type: "case", caseId: selectedCase.id },
    { id: `doctrine:${selectedCase.doctrine}`, label: selectedCase.doctrine, type: "doctrine" },
    { id: `amendment:${selectedCase.amendment}`, label: selectedCase.amendment, type: "amendment" }
  ];
  const links = [
    { source: selectedCase.id, target: `doctrine:${selectedCase.doctrine}`, type: "DEVELOPS" },
    { source: selectedCase.id, target: `amendment:${selectedCase.amendment}`, type: "INTERPRETS" }
  ];

  const knownById = Object.fromEntries(precedentCases.map((item) => [item.id, item]));
  const supportById = Object.fromEntries(supportingCases.map((item) => [item.id, item]));

  addConnected("CITES", selectedCase.cites);
  addConnected("CITED_BY", selectedCase.citedBy);
  addConnected("OVERRULES", selectedCase.overrules);

  selectedCase.related.slice(0, 3).forEach((item) => {
    const id = `related:${item}`;
    nodes.push({ id, label: item, type: "doctrine" });
    links.push({ source: selectedCase.id, target: id, type: "RELATED_TO" });
  });

  return { nodes: dedupe(nodes), links };

  function addConnected(type, ids) {
    ids.forEach((id) => {
      const known = knownById[id];
      const support = supportById[id];
      const node = known
        ? { id, label: known.name, type: "cited", caseId: id }
        : { id, label: support?.name || id, type: type === "OVERRULES" ? "overruling" : "cited" };
      nodes.push(node);
      links.push({ source: selectedCase.id, target: id, type });
    });
  }
}

function caseName(id) {
  return precedentCases.find((item) => item.id === id)?.name || supportingCases.find((item) => item.id === id)?.name || "";
}

function getPathNode(id) {
  return pathFinderNodes.find((item) => item.id === id);
}

function buildPathGraph() {
  const adjacency = new Map(pathFinderNodes.map((node) => [node.id, []]));

  function connect(source, target, label, tone) {
    if (!adjacency.has(source)) adjacency.set(source, []);
    if (!adjacency.has(target)) adjacency.set(target, []);
    adjacency.get(source).push({ id: target, via: label, tone });
    adjacency.get(target).push({ id: source, via: reversePathLabel(label), tone });
  }

  precedentCases.forEach((item) => {
    item.cites.forEach((id) => connect(item.id, id, "cites", "citation"));
    item.citedBy.forEach((id) => connect(item.id, id, "cited by", "downstream"));
    item.overrules.forEach((id) => connect(item.id, id, "overrules", "overruling"));
  });

  return adjacency;
}

function getReachableNodeIds(startId) {
  const graph = buildPathGraph();
  const visited = new Set([startId]);
  const queue = [startId];

  while (queue.length) {
    const current = queue.shift();
    const neighbors = graph.get(current) || [];
    neighbors.forEach((neighbor) => {
      if (visited.has(neighbor.id)) return;
      visited.add(neighbor.id);
      queue.push(neighbor.id);
    });
  }

  return [...visited];
}

function filterReachableNodes(startId) {
  const reachable = new Set(getReachableNodeIds(startId));
  return pathFinderNodes.filter((node) => reachable.has(node.id));
}

function pickNearestNode(sourceId, candidateIds) {
  const firstOther = candidateIds.find((id) => id !== sourceId);
  return firstOther || candidateIds[0] || sourceId;
}

function reversePathLabel(label) {
  if (label === "cites") return "cited by";
  if (label === "cited by") return "cites";
  if (label === "overrules") return "overruled by";
  if (label === "overruled by") return "overrules";
  return label;
}

function findShortestPath(startId, endId) {
  if (startId === endId) return [{ id: startId, via: "selected", tone: "same" }];
  const graph = buildPathGraph();
  const queue = [[{ id: startId, via: "start", tone: "same" }]];
  const visited = new Set([startId]);

  while (queue.length) {
    const path = queue.shift();
    const current = path[path.length - 1];
    const neighbors = graph.get(current.id) || [];

    for (const neighbor of neighbors) {
      if (visited.has(neighbor.id)) continue;
      const nextPath = [...path, neighbor];
      if (neighbor.id === endId) return nextPath;
      visited.add(neighbor.id);
      queue.push(nextPath);
    }
  }

  return [];
}

function explainPath(path) {
  if (path.length <= 1) {
    const node = getPathNode(path[0]?.id);
    return node ? `${node.name} is selected as both the start and endpoint.` : "Select two different nodes to trace a route.";
  }

  const start = getPathNode(path[0].id)?.name || path[0].id;
  const end = getPathNode(path[path.length - 1].id)?.name || path[path.length - 1].id;
  const relationshipTypes = uniqueOptions(path.slice(1).map((step) => step.via));
  return `${start} reaches ${end} through ${path.length - 1} mapped relationship${path.length - 1 === 1 ? "" : "s"}: ${relationshipTypes.join(", ")}.`;
}

function scrollToSelector(selector) {
  if (typeof document === "undefined") return;
  window.setTimeout(() => {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

function getOverrulingGuidance(selectedCase) {
  const overruledNames = selectedCase.overrules.map(caseName).filter(Boolean);
  const downstreamNames = selectedCase.citedBy.map(caseName).filter(Boolean);

  if (overruledNames.length) {
    return `${selectedCase.name} has a direct overruling edge to ${overruledNames.join(", ")}. The graph view shows that relationship as a conflict path instead of a normal citation path.`;
  }

  if (downstreamNames.length) {
    return `${selectedCase.name} is part of a downstream precedent chain. Later mapped cases include ${downstreamNames.slice(0, 2).join(", ")}, so this button follows how the doctrine moves after the selected case.`;
  }

  return `${selectedCase.name} does not have a direct overruling edge in this curated corpus yet, so the graph treats it as a stable source node for nearby doctrine.`;
}

function getControllingRule(selectedCase) {
  return selectedCase.evolution.tokens.find((token) => token.type === "added")?.text || selectedCase.holding;
}

function getGraphUse(selectedCase) {
  if (selectedCase.overrules.length) {
    return "Use this case to show how overruling chains alter doctrine across time.";
  }
  if (selectedCase.citedBy.length > selectedCase.cites.length) {
    return "Use this case as an influence node: later cases depend on it to develop the doctrine.";
  }
  if (selectedCase.cites.length) {
    return "Use this case as a synthesis node: it draws older doctrine into a newer constitutional rule.";
  }
  return "Use this case as a foundation node for institutional power and constitutional structure.";
}

function buildCaseBrief(selectedCase) {
  return [
    `${selectedCase.name} (${selectedCase.citation})`,
    `Area: ${selectedCase.area}`,
    `Constitutional anchor: ${selectedCase.amendment}`,
    `Issue: How does this case shape ${selectedCase.doctrine.toLowerCase()}?`,
    `Holding: ${selectedCase.holding}`,
    `Rule: ${getControllingRule(selectedCase)}`,
    `Why it matters: ${selectedCase.whyItMatters}`
  ].join("\n");
}

function dedupe(nodes) {
  return Object.values(nodes.reduce((acc, item) => ({ ...acc, [item.id]: item }), {}));
}

function drag(simulation) {
  return d3.drag()
    .on("start", (event, item) => {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      item.fx = item.x;
      item.fy = item.y;
    })
    .on("drag", (event, item) => {
      item.fx = event.x;
      item.fy = event.y;
    })
    .on("end", (event, item) => {
      if (!event.active) simulation.alphaTarget(0);
      item.fx = null;
      item.fy = null;
    });
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
