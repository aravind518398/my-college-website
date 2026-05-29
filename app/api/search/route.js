import { NextResponse } from "next/server";

import { defaultAddOnCoursesPage } from "@/lib/addOnCoursesDefaults";
import { defaultFacilitiesPage } from "@/lib/facilitiesDefaults";
import { defaultLatestUpdates } from "@/lib/latestUpdatesDefaults";
import { defaultPlacedStudents } from "@/lib/placementDefaults";
import { defaultPgProgrammes } from "@/lib/pgProgrammeDefaults";
import { defaultUgProgrammes } from "@/lib/ugProgrammeDefaults";

export const runtime = "nodejs";

const staticResults = [
  {
    title: "Home",
    description: "KMM College Kumbalam home page, campus highlights, programmes, and latest updates.",
    category: "Page",
    href: "/",
    keywords: ["college", "campus", "home", "kmm"],
  },
  {
    title: "About KMM College",
    description: "Introduction, vision, messages, code of conduct, and RTI information.",
    category: "Page",
    href: "/about",
    keywords: ["about", "introduction", "vision", "messages", "rti", "code of conduct"],
  },
  {
    title: "Academics",
    description: "Undergraduate programmes, postgraduate programmes, syllabus, and academic calendar.",
    category: "Page",
    href: "/academics",
    keywords: ["academics", "courses", "programmes", "syllabus", "calendar"],
  },
  {
    title: "Departments",
    description: "Commerce, Computer Application, Psychology, Business Administration, Mathematics, and Languages.",
    category: "Page",
    href: "/departments",
    keywords: ["department", "faculty", "commerce", "computer application", "psychology", "business administration"],
  },
  {
    title: "Admissions",
    description: "Admission information and enquiry details for KMM College programmes.",
    category: "Page",
    href: "/admission",
    keywords: ["admission", "apply", "enquiry", "fees", "eligibility"],
  },
  {
    title: "Co-Curricular Activities",
    description: "Activities, NSS, and student development opportunities.",
    category: "Page",
    href: "/co-curricular",
    keywords: ["co curricular", "activities", "nss"],
  },
  {
    title: "Placements",
    description: "Placement highlights and placed student announcements.",
    category: "Page",
    href: "/placements",
    keywords: ["placements", "career", "jobs", "students"],
  },
  {
    title: "Contact",
    description: "Contact details, phone numbers, email, location, and enquiry form.",
    category: "Page",
    href: "/contact",
    keywords: ["contact", "phone", "email", "location", "enquiry"],
  },
  {
    title: "Academic Calendar",
    description: "UG and PG academic calendar, working days, holidays, and semester dates.",
    category: "Academics",
    href: "/academics#academic-calendar",
    keywords: ["calendar", "semester", "holiday", "working days"],
  },
  {
    title: "AICTE Mandatory Disclosure",
    description: "Mandatory disclosure document for AICTE information.",
    category: "Document",
    href: "/documents/AICTE-MANDATORY-DISCLOSURE.pdf",
    keywords: ["aicte", "mandatory disclosure", "document"],
  },
  {
    title: "AICTE Approvals",
    description: "AICTE approval documents.",
    category: "Document",
    href: "/documents/AICTE-APPROVALS.pdf",
    keywords: ["aicte", "approval", "document"],
  },
  {
    title: "Academic Calendar 2024-25",
    description: "Academic calendar PDF for the 2024-25 academic year.",
    category: "Document",
    href: "/documents/Academic-Calendar_2024-25.pdf",
    keywords: ["academic calendar", "2024", "2025", "document"],
  },
];

const defaultDepartments = [
  {
    id: "commerce",
    name: "Commerce",
    shortName: "B.Com",
    programmes: ["B.Com Finance and Taxation"],
    description: "Accounting, taxation, banking, finance, and entrepreneurship.",
    focusAreas: ["Accounting and taxation", "Banking and finance", "Business law", "Entrepreneurship"],
  },
  {
    id: "computer-application",
    name: "Computer Application",
    shortName: "BCA / MCA",
    programmes: ["BCA Honours", "MCA"],
    description: "Software, programming, database, and digital problem-solving skills.",
    focusAreas: ["Programming", "Web development", "Databases", "Artificial intelligence and machine learning"],
  },
  {
    id: "psychology",
    name: "Psychology",
    shortName: "BSc / MSc",
    programmes: ["BSc Psychology", "MSc Psychology"],
    description: "Human behaviour, mental health, counselling foundations, and research methods.",
    focusAreas: ["Clinical psychology", "Counselling", "Research methods", "Mental health awareness"],
  },
  {
    id: "business-administration",
    name: "Business Administration",
    shortName: "BBA / MBA",
    programmes: ["BBA Honours", "MBA"],
    description: "Management, leadership, communication, and decision-making skills.",
    focusAreas: ["Management", "Marketing", "Human resources", "Finance"],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    shortName: "Mathematics",
    programmes: ["Foundation and complementary courses"],
    description: "Analytical thinking, quantitative reasoning, and problem-solving skills.",
    focusAreas: ["Pure mathematics", "Statistics", "Applied mathematics", "Problem solving"],
  },
  {
    id: "languages",
    name: "Languages",
    shortName: "English / Malayalam / Hindi",
    programmes: ["English", "Malayalam", "Hindi"],
    description: "Communication, literature, cultural understanding, and language proficiency.",
    focusAreas: ["English literature", "Malayalam", "Hindi"],
  },
];

function normalizeText(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function toWords(value) {
  return normalizeText(value).split(" ").filter(Boolean);
}

function compact(value) {
  return Array.isArray(value) ? value.filter(Boolean).join(" ") : String(value || "");
}

function uniqueByHrefAndTitle(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.href}|${item.title}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function scoreResult(result, query) {
  const normalizedQuery = normalizeText(query);
  const words = toWords(query);
  const title = normalizeText(result.title);
  const category = normalizeText(result.category);
  const haystack = normalizeText(
    [
      result.title,
      result.description,
      result.category,
      result.href,
      ...(result.keywords || []),
    ].join(" ")
  );

  let score = 0;

  if (title === normalizedQuery) score += 80;
  if (title.includes(normalizedQuery)) score += 45;
  if (category.includes(normalizedQuery)) score += 20;
  if (haystack.includes(normalizedQuery)) score += 25;

  for (const word of words) {
    if (title.includes(word)) score += 18;
    if (category.includes(word)) score += 8;
    if (haystack.includes(word)) score += 6;
  }

  return score;
}

async function readData(importPath, exportName, fallback) {
  try {
    const searchModule = await import(importPath);
    const value = await searchModule[exportName]();

    return value || fallback;
  } catch {
    return fallback;
  }
}

async function buildSearchIndex() {
  const [ugData, pgData, departments, facilitiesPage, addOnCoursesPage, updates, placedStudents] = await Promise.all([
    readData("@/lib/ugProgrammes", "getUgProgrammes", { programmes: defaultUgProgrammes }),
    readData("@/lib/pgProgrammes", "getPgProgrammes", { programmes: defaultPgProgrammes }),
    readData("@/lib/departments", "getDepartments", defaultDepartments),
    readData("@/lib/facilities", "getFacilitiesPage", defaultFacilitiesPage),
    readData("@/lib/addOnCourses", "getAddOnCoursesPage", defaultAddOnCoursesPage),
    readData("@/lib/latestUpdates", "getLatestUpdates", defaultLatestUpdates),
    readData("@/lib/placements", "getPlacedStudents", defaultPlacedStudents),
  ]);

  const ugResults = (ugData.programmes || []).flatMap((programme) => [
    {
      title: `${programme.shortName} - ${programme.title}`,
      description: compact([programme.department, programme.focus, `${programme.seats || 0} seats`, programme.duration && `${programme.duration} years`]),
      category: "UG Programme",
      href: `/academics#ug-${programme.id}`,
      keywords: [programme.programType, programme.department, programme.focus, ...(programme.specialisations || []), ...(programme.eligibility || [])],
    },
    ...(programme.syllabus || []).map((item) => ({
      title: item.label,
      description: compact([item.detail, programme.shortName, item.status]),
      category: "Syllabus",
      href: item.href || `/academics#ug-${programme.id}`,
      keywords: [programme.title, programme.shortName, programme.department],
    })),
  ]);

  const pgResults = (pgData.programmes || []).flatMap((programme) => [
    {
      title: `${programme.shortName} - ${programme.title}`,
      description: compact([programme.department, programme.focus, `${programme.seats || 0} seats`, programme.duration && `${programme.duration} years`]),
      category: "PG Programme",
      href: `/academics#pg-${programme.id}`,
      keywords: [programme.programType, programme.department, programme.focus, ...(programme.specialisations || []), ...(programme.eligibility || [])],
    },
    ...(programme.syllabus || []).map((item) => ({
      title: item.label,
      description: compact([item.detail, programme.shortName, item.status]),
      category: "Syllabus",
      href: item.href || `/academics#pg-${programme.id}`,
      keywords: [programme.title, programme.shortName, programme.department],
    })),
  ]);

  const departmentResults = departments.map((department) => ({
    title: `Department of ${department.name}`,
    description: compact([department.shortName, department.description, ...(department.programmes || [])]),
    category: "Department",
    href: `/departments#${department.id}`,
    keywords: [...(department.focusAreas || []), ...(department.programmes || [])],
  }));

  const facilityResults = (facilitiesPage.items || []).map((item) => ({
    title: item.title,
    description: item.description || facilitiesPage.hero?.description || "Campus facility at KMM College.",
    category: "Facility",
    href: `/facilities#${item.id}`,
    keywords: [facilitiesPage.hero?.title, facilitiesPage.hero?.eyebrow],
  }));

  const addOnResults = (addOnCoursesPage.groups || []).flatMap((group) => [
    {
      title: `${group.programmeName} Add-On Courses`,
      description: (group.courses || []).join(", "),
      category: "Add-On Course",
      href: `/add-on-courses#${group.id}`,
      keywords: group.courses || [],
    },
    ...(group.courses || []).map((course) => ({
      title: course,
      description: `Add-on course available for ${group.programmeName}.`,
      category: "Add-On Course",
      href: `/add-on-courses#${group.id}`,
      keywords: [group.programmeName],
    })),
  ]);

  const updateResults = updates.map((update) => ({
    title: update.title,
    description: update.date ? `Latest update dated ${update.date}.` : "Latest college update.",
    category: "Latest Update",
    href: "/#latest-updates",
    keywords: [update.date],
  }));

  const placementResults = placedStudents.map((student) => ({
    title: student.title,
    description: student.alt || "Placed student announcement.",
    category: "Placement",
    href: "/placements",
    keywords: ["placement", "placed student", student.alt],
  }));

  return uniqueByHrefAndTitle([
    ...staticResults,
    ...ugResults,
    ...pgResults,
    ...departmentResults,
    ...facilityResults,
    ...addOnResults,
    ...updateResults,
    ...placementResults,
  ]);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = String(searchParams.get("q") || "").trim();

  if (!query) {
    return NextResponse.json({ query, results: [], message: "Enter a search term." });
  }

  try {
    const index = await buildSearchIndex();
    const results = index
      .map((result) => ({ ...result, score: scoreResult(result, query) }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 8)
      .map(({ score, ...result }) => result);

    return NextResponse.json({
      query,
      results,
      message: results.length ? "" : "No results found.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { query, results: [], message: "Search is temporarily unavailable." },
      { status: 500 }
    );
  }
}
