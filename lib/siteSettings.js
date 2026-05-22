
import {
  DEFAULT_COLLEGE_CAMPUS_ALT,
  DEFAULT_COLLEGE_CAMPUS_IMAGE,
} from "@/lib/collegeImageDefaults";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { revalidatePath } from "next/cache";

export const SITE_ROUTES = [
  { label: "Home", path: "/", section: "Main" },
  { label: "About", path: "/about", section: "Main" },
  { label: "Code of Conduct", path: "/about/coc", section: "About" },
  { label: "RTI", path: "/about/rti", section: "About" },
  { label: "Academics", path: "/academics", section: "Main" },
  { label: "Departments", path: "/departments", section: "Main" },
  { label: "Admission", path: "/admission", section: "Main" },
  { label: "Co-Curricular", path: "/co-curricular", section: "Main" },
  { label: "Placements", path: "/placements", section: "Main" },
  { label: "Contact", path: "/contact", section: "Main" },
];

const defaultRouteContent = SITE_ROUTES.map((route) => ({
  ...route,
  headline: route.label === "Home" ? "KMM College of Arts & Science" : route.label,
  status: "Published",
  note: "",
}));

export const defaultSiteSettings = {
  identity: {
    collegeName: "K.M.M. College",
    shortName: "KMM College",
    tagline: "Arts & Science",
    affiliation: "Affiliated to MG University",
    announcement:
      "KMM College Kumbalam Affiliated to MG University, Approved by AICTE & Govt. Of Kerala",
    footerText:
      "K.M.M. College, Kumbalam is committed to quality education, professional confidence, and student-focused academic growth.",
  },
  contact: {
    email: "kmmkumbalam@gmail.com",
    enquiryEmail: "kmmkumbalam@gmail.com",
    primaryPhone: "9037002130",
    secondaryPhone: "8590601342",
    address: "K.M.M. College, Kumbalam, Kerala - 682506",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=KMM+College+Kumbalam+Kerala",
    mapEmbedUrl:
      "https://www.google.com/maps?q=KMM%20College%20Kumbalam%20Kerala&output=embed",
  },
  social: {
    facebook: "https://facebook.com/Kmmcollegekumbalam",
    instagram:
      "https://www.instagram.com/kmmcollege_kumbalam?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    youtube: "https://www.youtube.com/@kmmcollegeofartsandscience1164",
    whatsapp: "https://wa.me/919037002130?text=Hi",
  },
  images: {
    navLogo: "/images/kmm-nav-logo.png",
    footerLogo: "/images/kmm-logo.png",
    collegeCampusImage: DEFAULT_COLLEGE_CAMPUS_IMAGE,
    collegeCampusAlt: DEFAULT_COLLEGE_CAMPUS_ALT,
    academicsLab: "/images/lab2.webp",
    admissionCampus: "/images/college2.png",
  },
  routeContent: defaultRouteContent,
};

const LEGACY_CAMPUS_IMAGE_KEYS = new Set(["homeHero", "aboutCampus"]);

function mergeImages(saved = {}) {
  const images = { ...defaultSiteSettings.images };

  for (const [key, value] of Object.entries(saved)) {
    if (value == null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (LEGACY_CAMPUS_IMAGE_KEYS.has(key)) continue;
    images[key] = value;
  }

  if (!String(images.collegeCampusImage || "").trim()) {
    images.collegeCampusImage =
      String(saved.aboutCampus || "").trim() ||
      String(saved.homeHero || "").trim() ||
      DEFAULT_COLLEGE_CAMPUS_IMAGE;
  }

  if (!String(images.collegeCampusAlt || "").trim()) {
    images.collegeCampusAlt = DEFAULT_COLLEGE_CAMPUS_ALT;
  }

  return images;
}

function mergeContact(saved = {}) {
  const contact = { ...defaultSiteSettings.contact };

  for (const [key, value] of Object.entries(saved)) {
    if (value == null) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    contact[key] = value;
  }

  return contact;
}

function mergeSettings(settings = {}) {
  const savedRouteContent = new Map(
    (Array.isArray(settings.routeContent) ? settings.routeContent : []).map((route) => [
      route.path,
      route,
    ])
  );

  return {
    ...defaultSiteSettings,
    ...settings,
    identity: {
      ...defaultSiteSettings.identity,
      ...(settings.identity || {}),
    },
    contact: mergeContact(settings.contact),
    social: {
      ...defaultSiteSettings.social,
      ...(settings.social || {}),
    },
    images: mergeImages(settings.images),
    routeContent: SITE_ROUTES.map((route) => ({
      ...route,
      headline: savedRouteContent.get(route.path)?.headline || route.label,
      status: savedRouteContent.get(route.path)?.status || "Published",
      note: savedRouteContent.get(route.path)?.note || "",
    })),
  };
}

export async function getSiteSettings() {
  await connectDB();

  const settings = await SiteSettings.findOne({ key: "site" }).lean();

  return mergeSettings(settings || {});
}

export async function saveSiteSettings(nextSettings) {
  await connectDB();

  const settings = mergeSettings(nextSettings);

  await SiteSettings.findOneAndUpdate(
    { key: "site" },
    { $set: { ...settings, key: "site" } },
    { new: true, upsert: true }
  );

  // 👇 Add this block after the DB update
  SITE_ROUTES.forEach((route) => {
    revalidatePath(route.path);
  });
  revalidatePath("/", "layout"); // revalidates shared layout too

  return settings;
}
