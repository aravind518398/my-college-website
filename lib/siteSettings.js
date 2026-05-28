
import {
  DEFAULT_COLLEGE_CAMPUS_ALT,
  DEFAULT_COLLEGE_CAMPUS_IMAGE,
} from "@/lib/collegeImageDefaults";
import { connectDB } from "@/lib/mongodb";
import {
  buildWhatsappUrl,
  defaultSiteSettings as defaultContactAndSocial,
} from "@/lib/siteSettingsDefaults";
import SiteSettings from "@/models/SiteSettings";
import { revalidatePath } from "next/cache";

export { buildWhatsappUrl, getWhatsappHref } from "@/lib/siteSettingsDefaults";

export const SITE_ROUTES = [
  { label: "Home", path: "/", section: "Main" },
  
 
  
  { label: "UG Programmes", path: "/academics#ug-programmes", section: "Academics" },
  { label: "PG Programmes", path: "/academics#pg-programmes", section: "Academics" },
   { label: "Contact", path: "/contact", section: "Main" },
   { label: "Admission", path: "/admission", section: "Main" },
  { label: "Departments & Faculties", path: "/departments", section: "Main" },
   { label: "Placements", path: "/placements", section: "Main" },
   { label: "Add-On Courses", path: "/add-on-courses", section: "Main" },
  
  { label: "Facilities", path: "/facilities", section: "Main" },
 
 
 
 
  { label: "About Messages", path: "/about#messages", section: "About" },
  {label: "NSS Program Officers", path: "/co-curricular#nss-officers", section: "Co-Curricular"},
];

const defaultRouteContent = SITE_ROUTES.map((route) => ({
  ...route,
  headline: route.label === "Home" ? "KMM College, Kumbalam" : route.label,
  status: "Published",
  note: "",
}));

const defaultSiteSettings = {
  ...defaultContactAndSocial,
  images: {
    navLogo: "/images/kmm-nav-logo.png",
    footerLogo: "/images/kmm-logo.png",
    collegeCampusImage: DEFAULT_COLLEGE_CAMPUS_IMAGE,
    collegeCampusAlt: DEFAULT_COLLEGE_CAMPUS_ALT,
    academicsLab: "/images/computer_lab_photo-2.webp",
    admissionCampus: "/images/kmm_college_kumbalam.webp",
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

  const contact = mergeContact(settings.contact);
  const whatsappHref = buildWhatsappUrl(contact.whatsappNumber);
  const social = {
    ...defaultSiteSettings.social,
    ...(settings.social || {}),
  };

  if (whatsappHref) {
    social.whatsapp = whatsappHref;
  }

  return {
    ...defaultSiteSettings,
    ...settings,
    identity: {
      ...defaultSiteSettings.identity,
      ...(settings.identity || {}),
    },
    contact,
    social,
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

  let settings = await SiteSettings.findOne({ key: "site" }).lean();

  if (!settings) {
    const defaults = mergeSettings({});
    await SiteSettings.findOneAndUpdate(
      { key: "site" },
      { $set: { ...defaults, key: "site" } },
      { upsert: true, new: true }
    );
    settings = defaults;
  }

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

export { defaultSiteSettings };
