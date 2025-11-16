export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  tags: string[];
  description: string;
  postedAt: string;
  commitment: "Full-time" | "Part-time" | "Contract" | "Internship";
  remote: boolean;
};

export const jobCatalog: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Nebula Labs",
    location: "Remote (UTC-5 ±2)",
    salary: "$160k - $190k",
    tags: ["React", "TypeScript", "Next.js", "Design Systems"],
    description:
      "Lead the frontend platform for a fast-growing SaaS analytics product. Collaborate with design and data science to craft polished UI experiences.",
    postedAt: "2024-05-05",
    commitment: "Full-time",
    remote: true,
  },
  {
    id: "2",
    title: "AI Product Manager",
    company: "Atlas Intelligence",
    location: "New York, NY",
    salary: "$140k - $180k + equity",
    tags: ["AI", "Product", "User Research"],
    description:
      "Own roadmap for agentic AI platform focused on enterprise automation. Partner with engineering to ship features with measurable impact.",
    postedAt: "2024-05-03",
    commitment: "Full-time",
    remote: false,
  },
  {
    id: "3",
    title: "Developer Advocate",
    company: "OrbitDB",
    location: "Berlin, Germany",
    salary: "€85k - €105k",
    tags: ["Web3", "Content", "Community"],
    description:
      "Create technical content, run workshops, and represent the developer perspective for a cutting-edge distributed database startup.",
    postedAt: "2024-04-29",
    commitment: "Full-time",
    remote: true,
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "LayerAI",
    location: "Austin, TX",
    salary: "$135k - $165k",
    tags: ["Python", "ML", "Forecasting"],
    description:
      "Build predictive models that power personalized recommendations for millions of users. Collaborate closely with engineering and product.",
    postedAt: "2024-05-01",
    commitment: "Full-time",
    remote: true,
  },
  {
    id: "5",
    title: "Staff Backend Engineer",
    company: "Carbon Cloud",
    location: "San Francisco, CA",
    salary: "$180k - $220k",
    tags: ["Go", "Distributed Systems", "Postgres"],
    description:
      "Design and scale core services ingesting billions of events per day. Champion observability and developer experience.",
    postedAt: "2024-04-25",
    commitment: "Full-time",
    remote: false,
  },
  {
    id: "6",
    title: "UX Researcher",
    company: "Orbit Health",
    location: "Remote (Americas)",
    salary: "$110k - $125k",
    tags: ["Healthcare", "User Research", "Journey Mapping"],
    description:
      "Uncover insights that shape patient-facing telehealth products. Lead mixed-method research programs with product and design.",
    postedAt: "2024-04-22",
    commitment: "Full-time",
    remote: true,
  },
];

export type PersonaSignal = {
  timestamp: string;
  summary: string;
  boost: string[];
  suppress: string[];
};

export const personaTimeline: PersonaSignal[] = [
  {
    timestamp: "2024-05-06T09:10:00Z",
    summary:
      "User engaged with roles requiring hands-on React work and saved two remote-first positions.",
    boost: ["React", "Remote", "Design Systems"],
    suppress: ["Onsite-only", "Junior"],
  },
  {
    timestamp: "2024-05-05T16:45:00Z",
    summary:
      "User dismissed Web3 opportunities and spent extra time on data-heavy SaaS roles.",
    boost: ["Data", "SaaS", "Analytics"],
    suppress: ["Web3"],
  },
  {
    timestamp: "2024-05-04T11:30:00Z",
    summary:
      "Initial onboarding survey prioritized remote-friendly leadership positions with clear compensation ranges.",
    boost: ["Remote", "Leadership", "Salary Transparency"],
    suppress: ["Unpaid", "Internship"],
  },
];
