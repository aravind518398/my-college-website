export const defaultPgDocumentsRequired = [
  "SSLC / 10th certificate",
  "Degree certificate and consolidated mark list",
  "Transfer Certificate",
  "Conduct Certificate",
  "Migration / eligibility certificate, if applicable",
  "Community / reservation certificate, if applicable",
];

const pgEligibility = [
  "Candidates should possess a recognised undergraduate degree as required by the programme.",
  "Admission is subject to Mahatma Gandhi University eligibility rules and Government reservation norms.",
  "Candidates should produce original academic, transfer and eligibility documents at the time of admission.",
];

export const defaultPgProgrammes = [
  {
    id: "msc-psychology",
    shortName: "M.Sc Psychology",
    title: "Master of Science in Psychology (Regular)",
    program: "MSc",
    department: "Psychology",
    focus: "Advanced psychology, counselling foundations and applied research",
    seats: 30,
    fees: 11250,
    duration: 2,
    semesters: 4,
    accent: "bg-[#1ab69d]",
    softAccent: "bg-[#1ab69d]/12 text-[#087a68]",
    borderAccent: "border-[#1ab69d]",
    eligibility: pgEligibility,
    specialisations: [
      "Clinical Psychology",
      "Cognitive Psychology",
      "Developmental Psychology",
    ],
    syllabus: [
      {
        label: "MSc Psychology Full Syllabus",
        detail: "Core papers in advanced psychology, counselling foundations and applied research",
        href: "/documents/pg-syllabus/M.Sc_Psychology/syllabus-m.sc_psychology-2019.pdf",
        status: "Available",
      },
    ],
    programType: "Regular",
  },
  {
    id: "mba",
    shortName: "MBA",
    title: "Master of Business Administration (Regular)",
    program: "MBA",
    department: "Business Administration",
    focus: "Leadership, strategy, finance, marketing and organisational practice",
    seats: 30,
    fees: 11250,
    duration: 2,
    semesters: 4,
    accent: "bg-[#224f86]",
    softAccent: "bg-[#224f86]/10 text-[#224f86]",
    borderAccent: "border-[#224f86]",
    eligibility: pgEligibility,
    specialisations: [
      "Management and leadership foundation",
      "Industry-oriented case learning",
      "Pathway to corporate, entrepreneurial and research careers",
    ],
    syllabus: [
      {
        label: "MBA Full Syllabus",
        detail: "Core papers in management, strategy, finance, marketing and organisational practice",
        href: "/documents/pg-syllabus/MBA/mba-syllabus-2021-new.pdf",
        status: "Available",
      },
      
    ],
    programType: "Regular",
  },
  {
    id: "mca",
    shortName: "MCA",
    title: "Master of Computer Applications (Regular)",
    program: "MCA",
    department: "Computer Applications",
    focus: "Advanced programming, software systems, databases and emerging technologies",
    seats: 30,
    fees: 21000,
    duration: 2,
    semesters: 4,
    accent: "bg-[#0284c7]",
    softAccent: "bg-sky-100 text-sky-800",
    borderAccent: "border-sky-500",
    eligibility: [
      "Candidates should possess a recognised undergraduate degree with mathematics / computer science background as applicable.",
      "Admission is subject to Mahatma Gandhi University eligibility rules and Government reservation norms.",
      "Candidates should produce original academic, transfer and eligibility documents at the time of admission.",
    ],
    specialisations: [
      "Software Engineering",
      "Data Analytics",
      "Information Technology Leadership",
    ],
    syllabus: [
      {
        label: "MCA Full Syllabus",
        detail: "Core papers in advanced programming, software systems, databases and emerging technologies",
        href: "/documents/pg-syllabus/MCA/schemesyllabus-of-mca-2020.pdf",
        status: "Available",
      },
      
    ],
    programType: "Regular",
  },
];
