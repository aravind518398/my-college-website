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
      { name: "Dr. Sreelakshmi R. Pillai", role: "Head of Department", qualification: "PhD", experience: "10 Years", initials: "SP" },
      { name: "Dr. Anilkumar T. Nair", role: "Associate Professor", qualification: "PhD", experience: "8 Years", initials: "AN" },
      { name: "Prof. Divya Menon", role: "Assistant Professor", qualification: "MSc", experience: "5 Years", initials: "DM" },
      { name: "Prof. Jithin K. George", role: "Assistant Professor", qualification: "MSc", experience: "6 Years", initials: "JG" },
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
      { name: "Dr. Binu Varghese", role: "Head of Department", qualification: "PhD", experience: "12 Years", initials: "BV" },
      { name: "Dr. Asha K. Thomas", role: "Associate Professor", qualification: "PhD", experience: "10 Years", initials: "AT" },
      { name: "Prof. Vishnu P. Krishnan", role: "Assistant Professor", qualification: "MSc", experience: "7 Years", initials: "VK" },
      { name: "Prof. Ananya Chandran", role: "Assistant Professor", qualification: "MSc", experience: "6 Years", initials: "AC" },
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
      { name: "Dr. Nisha M. Pillai", role: "Head of Department", qualification: "PhD", experience: "10 Years", initials: "NP" },
      { name: "Dr. Priya S. Varma", role: "Associate Professor", qualification: "PhD", experience: "8 Years", initials: "PV" },
      { name: "Prof. Arun J. Kumar", role: "Assistant Professor", qualification: "MSc", experience: "6 Years", initials: "AK" },
      { name: "Prof. Lakshmi R. Nair", role: "Assistant Professor", qualification: "MSc", experience: "5 Years", initials: "LN" },
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
      { name: "Dr. Thomas P. Abraham", role: "Head of Department", qualification: "PhD", experience: "12 Years", initials: "TA" },
      { name: "Dr. Suja R. Krishnakumar", role: "Associate Professor", qualification: "PhD", experience: "10 Years", initials: "SK", photo: "/images/faculty/Sumayya.webp" },
      { name: "Prof. Mathew J. Alex", role: "Assistant Professor", qualification: "MSc", experience: "7 Years", initials: "MA" },
      { name: "Prof. Ritu S. Chandran", role: "Assistant Professor", qualification: "MSc", experience: "6 Years", initials: "RC" },
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
      { name: "Dr. K. V. Subramaniam", role: "Head of Department", qualification: "PhD", experience: "15 Years", initials: "KS" },
      { name: "Dr. Radha V. Menon", role: "Associate Professor", qualification: "PhD", experience: "12 Years", initials: "RM" },
      { name: "Prof. Deepa M. Pillai", role: "Assistant Professor", qualification: "MSc", experience: "8 Years", initials: "DP", photo: "/images/faculty/keerthi.webp" },
      { name: "Prof. Sajeev K. Nair", role: "Assistant Professor", qualification: "MSc", experience: "6 Years", initials: "SN", photo: "/images/faculty/anju.webp" },
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
      { name: "Dr. Kavitha R. Menon", role: "Head of Department", qualification: "PhD", experience: "12 Years", initials: "KM" },
      { name: "Dr. Felix P. Joseph", role: "Associate Professor", qualification: "PhD", experience: "10 Years", initials: "FJ", photo: "/images/faculty/Gayathry.webp" },
      { name: "Prof. Geetha K. Pillai", role: "Assistant Professor", qualification: "MSc", experience: "6 Years", initials: "GP", photo: "/images/faculty/INDU.webp" },
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
      qualification: String(member.qualification || "").trim(),
      experience: String(member.experience || "").trim(),
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
