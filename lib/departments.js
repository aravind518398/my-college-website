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
      { name: "Dr. Anjali Menon", role: "Head of Department", qualification: "MBA", experience: 8, initials: "MT", photo: "/images/faculty/portrait_01.png" },
      { name: "Prof. Rahul Nair", role: "Assistant Professor", qualification: "M.Com", experience: 2, initials: "SK", photo: "/images/faculty/portrait_02.png" },
      { name: "Dr. Meera Krishnan", role: "Assistant Professor", qualification: "M.Com", experience: 5, initials: "LX", photo: "/images/faculty/portrait_03.png" },
      { name: "Prof. Vivek Pillai", role: "Assistant Professor", qualification: "M.Com", experience: 0.5, initials: "JD", photo: "/images/faculty/portrait_04.png" },
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
      { name: "Dr. Lakshmi Suresh", role: "Head of Department", qualification: "MCA", experience: 2.5, initials: "MA", photo: "/images/faculty/portrait_05.png" },
      { name: "Prof. Arun Thomas", role: "Assistant Professor", qualification: "MCA", experience: 2, initials: "A", photo: "/images/faculty/portrait_06.png" },
      { name: "Dr. Sandeep Kumar", role: "Assistant Professor", qualification: "MCA", experience: 2, initials: "SK" , photo: "/images/faculty/portrait_07.png"},
      { name: "Prof. Divya Ramesh", role: "Assistant Professor", qualification: "MCA", experience: 1, initials: "S", photo: "/images/faculty/portrait_08.png" },
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
      { name: "Dr. Revi M. Pillai", role: "Head of Department", qualification: "PhD", experience: 10, initials: "NP", photo: "/images/faculty/portrait_09.png" },
      { name: "Dr. Priya S. Varma", role: "Associate Professor", qualification: "PhD", experience: 8, initials: "PV", photo: "/images/faculty/portrait_10.png" },
      { name: "Prof. Arun J. Kumar", role: "Assistant Professor", qualification: "MSc", experience: 6, initials: "AK", photo: "/images/faculty/portrait_11.png" },
      { name: "Prof. Lakshmi R. Nair", role: "Assistant Professor", qualification: "MSc", experience: 5, initials: "LN", photo: "/images/faculty/portrait_12.png" },
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
  {
    name: "Dr. Sneha Pillai",
    role: "Head of Department",
    qualification: "MBA",
    experience: 3,
    initials: "SA",
    photo: "/images/faculty/portrait_13.png",
  },
  {
    name: "Prof. Rakesh Menon",
    role: "Assistant Professor",
    qualification: "MBA",
    experience: 4,
    initials: "SV",
    photo: "/images/faculty/portrait_14.png",
  },
  {
    name: "Dr. Priya Nair",
    role: "Assistant Professor",
    qualification: "MCom, BEd, KTET III",
    experience: 3,
    initials: "TN",
    photo: "/images/faculty/portrait_15.png",
  },
  {
    name: "Prof. Manu Krishnan",
    role: "Assistant Professor",
    qualification: "BCom",
    experience: 1,
    initials: "DL",
    photo: "/images/faculty/portrait_16.png",
  },
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
  {
    name: "Dr. Reshma Suresh",
    role: "Head of Department",
    qualification: "MSc Mathematics",
    experience: 15,
    initials: "NK",
    photo: "/images/faculty/portrait_17.png",
  },
  {
    name: "Dr. Kiran Das",
    role: "Assistant Professor",
    qualification: "MSc Mathematics",
    experience: 5,
    initials: "FF",
    photo: "/images/faculty/portrait_18.png",
  }, 
  {
    name: "Prof. Sanjay Mohan",
    role: "Assistant Professor",
    qualification: "MSc Mathematics",
    experience: 2,
    initials: "SS",
    photo: "/images/faculty/portrait_19.png",
  },
  {
    name: "Dr. Deepa Nair",
    role: "Assistant Professor",
    qualification: "MSc Mathematics",
    experience: 6,
    initials: "AJ",
    photo: "/images/faculty/portrait_20.png",
  }
  
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
  {
    name: "Prof. Nithin Raj",
    role: "Head of Department",
    qualification: "MA English",
    experience: 6,
    initials: "AJ",
    photo: "/images/faculty/portrait_21.png",
  },
  {
    name: "Dr. Kavya Menon",
    role: "Assistant Professor",
    qualification: "MA, BEd",
    experience: 28,
    initials: "JK",
    photo: "/images/faculty/portrait_22.png",
  },
  {
    name: "Prof. Vishnu Prasad",
    role: "Assistant Professor",
    qualification: "Hindi MA, BEd",
    experience: 16,
    initials: "IK",
    photo: "/images/faculty/portrait_23.png",
  },
  {
    name: "Dr. Divya Mathew",
    role: "Assistant Professor",
    qualification: "MA, BEd, KTET III",
    experience: 0,
    initials: "DM",
    photo: "/images/faculty/portrait_24.png",
  },
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
