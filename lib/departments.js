import {
  faBookOpen,
  faBrain,
  faBriefcase,
  faCode,
  faLanguage,
  faSquareRootVariable,
} from "@fortawesome/free-solid-svg-icons";

import { connectDB } from "@/lib/mongodb";
import Department from "@/models/Department";

export const departmentIconMap = {
  commerce: faBookOpen,
  "computer-application": faCode,
  psychology: faBrain,
  "business-administration": faBriefcase,
  mathematics: faSquareRootVariable,
  languages: faLanguage,
};

export const defaultDepartments = [
  {
    id: "commerce",
    name: "Commerce",
    shortName: "B.Com",
    accent: "#179BD7",
    soft: "bg-[#179BD7]/10 text-[#1469b8]",
    programmes: ["B.Com Finance and Taxation"],
    description:
      "The Department of Commerce prepares students for careers in accounting, taxation, banking, finance, and entrepreneurship through a practical business-focused curriculum.",
    focusAreas: ["Accounting and taxation", "Banking and finance", "Business law", "Entrepreneurship"],
    faculty: [
      { name: "Dr. Sreelakshmi R. Pillai", role: "Head of Department", area: "Financial Accounting and Taxation", initials: "SP" },
      { name: "Dr. Anilkumar T. Nair", role: "Associate Professor", area: "Business Economics", initials: "AN" },
      { name: "Prof. Divya Menon", role: "Assistant Professor", area: "Cost Accounting and Auditing", initials: "DM" },
      { name: "Prof. Jithin K. George", role: "Assistant Professor", area: "Corporate Law and Governance", initials: "JG" },
    ],
  },
  {
    id: "computer-application",
    name: "Computer Application",
    shortName: "BCA / MCA",
    accent: "#1ab69d",
    soft: "bg-[#1ab69d]/10 text-[#12836f]",
    programmes: ["BCA Honours", "MCA"],
    description:
      "The Department of Computer Application builds strong software, programming, database, and digital problem-solving skills for students entering the technology sector.",
    focusAreas: ["Programming", "Web development", "Databases", "Artificial intelligence and machine learning"],
    faculty: [
      { name: "Dr. Binu Varghese", role: "Head of Department", area: "Machine Learning and AI", initials: "BV" },
      { name: "Dr. Asha K. Thomas", role: "Associate Professor", area: "Cloud Computing and Networks", initials: "AT" },
      { name: "Prof. Vishnu P. Krishnan", role: "Assistant Professor", area: "Full Stack Development", initials: "VK" },
      { name: "Prof. Ananya Chandran", role: "Assistant Professor", area: "Data Science and Analytics", initials: "AC" },
    ],
  },
  {
    id: "psychology",
    name: "Psychology",
    shortName: "BSc / MSc",
    accent: "#7c3aed",
    soft: "bg-violet-100 text-violet-700",
    programmes: ["BSc Psychology", "MSc Psychology"],
    description:
      "The Department of Psychology introduces students to human behaviour, mental health, counselling foundations, and research methods with a student-centred academic approach.",
    focusAreas: ["Clinical psychology", "Counselling", "Research methods", "Mental health awareness"],
    faculty: [
      { name: "Dr. Nisha M. Pillai", role: "Head of Department", area: "Clinical Psychology", initials: "NP" },
      { name: "Dr. Priya S. Varma", role: "Associate Professor", area: "Cognitive Neuroscience", initials: "PV" },
      { name: "Prof. Arun J. Kumar", role: "Assistant Professor", area: "Counselling Psychology", initials: "AK" },
      { name: "Prof. Lakshmi R. Nair", role: "Assistant Professor", area: "Child and Adolescent Psychology", initials: "LN" },
    ],
  },
  {
    id: "business-administration",
    name: "Business Administration",
    shortName: "BBA / MBA",
    accent: "#0f766e",
    soft: "bg-teal-100 text-teal-700",
    programmes: ["BBA Honours", "MBA"],
    description:
      "The Department of Business Administration develops management, leadership, communication, and decision-making skills for students pursuing careers in business and administration.",
    focusAreas: ["Management", "Marketing", "Human resources", "Finance"],
    faculty: [
      { name: "Dr. Thomas P. Abraham", role: "Head of Department", area: "Strategic Management", initials: "TA" },
      { name: "Dr. Suja R. Krishnakumar", role: "Associate Professor", area: "Marketing Management", initials: "SK", photo: "/images/faculty/Sumayya.webp" },
      { name: "Prof. Mathew J. Alex", role: "Assistant Professor", area: "Human Resource Management", initials: "MA" },
      { name: "Prof. Ritu S. Chandran", role: "Assistant Professor", area: "Finance", initials: "RC" },
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    shortName: "Mathematics",
    accent: "#1469b8",
    soft: "bg-blue-100 text-blue-700",
    programmes: ["Foundation and complementary courses"],
    description:
      "The Department of Mathematics strengthens analytical thinking, quantitative reasoning, and problem-solving skills across academic programmes.",
    focusAreas: ["Pure mathematics", "Statistics", "Applied mathematics", "Problem solving"],
    faculty: [
      { name: "Dr. K. V. Subramaniam", role: "Head of Department", area: "Abstract Algebra", initials: "KS" },
      { name: "Dr. Radha V. Menon", role: "Associate Professor", area: "Real Analysis", initials: "RM" },
      { name: "Prof. Deepa M. Pillai", role: "Assistant Professor", area: "Statistics", initials: "DP", photo: "/images/faculty/keerthi.webp" },
      { name: "Prof. Sajeev K. Nair", role: "Assistant Professor", area: "Graph Theory", initials: "SN", photo: "/images/faculty/anju.webp" },
    ],
  },
  {
    id: "languages",
    name: "Languages",
    shortName: "English / Malayalam / Hindi",
    accent: "#8a3b1f",
    soft: "bg-orange-100 text-orange-800",
    programmes: ["English", "Malayalam", "Hindi"],
    description:
      "The Department of Languages supports communication, literature, cultural understanding, and language proficiency for students across programmes.",
    focusAreas: ["English literature", "Malayalam", "Hindi"],
    faculty: [
      { name: "Dr. Kavitha R. Menon", role: "Head of Department", area: "Malayalam Literature", initials: "KM" },
      { name: "Dr. Felix P. Joseph", role: "Associate Professor", area: "English Literature", initials: "FJ", photo: "/images/faculty/Gayathry.webp" },
      { name: "Prof. Geetha K. Pillai", role: "Assistant Professor", area: "Hindi Literature", initials: "GP", photo: "/images/faculty/INDU.webp" },
    ],
  },
];

function cleanList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeFaculty(faculty = []) {
  return faculty
    .map((member) => ({
      name: String(member.name || "").trim(),
      role: String(member.role || "").trim(),
      area: String(member.area || "").trim(),
      initials: String(member.initials || "").trim(),
      photo: String(member.photo || "").trim(),
    }))
    .filter((member) => member.name);
}

function normalizeDepartment(department) {
  const defaults = defaultDepartments.find((item) => item.id === department.id) || {};

  return {
    ...defaults,
    ...department,
    programmes: cleanList(department.programmes || defaults.programmes),
    focusAreas: cleanList(department.focusAreas || defaults.focusAreas),
    faculty: normalizeFaculty(department.faculty || defaults.faculty),
    icon: departmentIconMap[department.id] || faBookOpen,
  };
}

export async function getDepartments() {
  await connectDB();

  const existingDepartments = await Department.find({}).lean();
  const existingIds = new Set(existingDepartments.map((department) => department.id));
  const missingDepartments = defaultDepartments.filter((department) => !existingIds.has(department.id));

  if (missingDepartments.length) {
    await Department.insertMany(missingDepartments);
  }

  const savedDepartments = await Department.find({}).lean();
  const departmentMap = new Map(savedDepartments.map((department) => [department.id, department]));

  return defaultDepartments.map((department) =>
    normalizeDepartment(departmentMap.get(department.id) || department)
  );
}

export async function saveDepartments(departments) {
  await connectDB();

  const normalizedDepartments = departments.map(normalizeDepartment);

  await Promise.all(
    normalizedDepartments.map((department) =>
      Department.findOneAndUpdate(
        { id: department.id },
        { $set: department },
        { new: true, upsert: true }
      )
    )
  );

  return normalizedDepartments;
}
