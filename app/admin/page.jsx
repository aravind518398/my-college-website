import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DepartmentStickyHeader from "@/components/admin/DepartmentStickyHeader";
import {
  faArrowRightFromBracket,
  faBriefcase,
  faBullhorn,
  faBuilding,
  faBuildingColumns,
  faChartLine,
  faLandmark,
  faEnvelope,
  faFloppyDisk,
  faGlobe,
  faGraduationCap,
  faHouse,
  faCalendarDays,
  faImage,
  faLink,
  faLocationDot,
  faPenToSquare,
  faPhone,
  faQuoteLeft,
  faRoute,
  faShareNodes,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  AdminCmsNavLink,
  AdminCmsProvider,
  AdminCmsSection,
  AdminStickySave,
} from "@/components/admin/AdminCmsLayout";
import AdminSidebar from "@/components/admin/AdminSidebar";
import MobileNavToggle from "@/components/admin/MobileNavToggle";
import AboutMessagesPanel from "@/components/admin/AboutMessagesPanel";
import AddOnCoursesPanel from "@/components/admin/AddOnCoursesPanel";
import FacilitiesPanel from "@/components/admin/FacilitiesPanel";
import HomeProgrammeCardsPanel from "@/components/admin/HomeProgrammeCardsPanel";
import ImageUploadField from "@/components/admin/ImageUploadField";
import PlacedStudentsPanel from "@/components/admin/PlacedStudentsPanel";
import PgProgrammesPanel from "@/components/admin/PgProgrammesPanel";
import UgProgrammesPanel from "@/components/admin/UgProgrammesPanel";
import { auth, signOut } from "@/auth";
import {
  getCampusSections,
  MAX_CAMPUS_SECTIONS,
  saveCampusSections,
} from "@/lib/campusSections";
import {
  getCarouselSlides,
  MAX_CAROUSEL_SLIDES,
  saveCarouselSlides,
} from "@/lib/carousel";
import {
  getAddOnCoursesPage,
  MAX_ADD_ON_GROUPS,
  saveAddOnCoursesPage,
} from "@/lib/addOnCourses";
import {
  getAboutMessages,
  MAX_ABOUT_MESSAGES,
  saveAboutMessages,
} from "@/lib/aboutMessages";
import { getFacilitiesPage, MAX_FACILITIES, saveFacilitiesPage } from "@/lib/facilities";
import {
  getHomeProgrammeCards,
  MAX_HOME_PROGRAMME_CARDS,
  saveHomeProgrammeCards,
} from "@/lib/homeProgrammeCards";
import {
  getLatestUpdates,
  MAX_LATEST_UPDATES,
  saveLatestUpdates,
} from "@/lib/latestUpdates";
import { getDepartments, saveDepartments } from "@/lib/departments";
import { getPlacedStudents, savePlacedStudents } from "@/lib/placements";
import { getPgProgrammes, savePgProgrammes } from "@/lib/pgProgrammes";
import { getUgProgrammes, saveUgProgrammes } from "@/lib/ugProgrammes";
import { buildWhatsappUrl } from "@/lib/siteSettingsDefaults";
import { getSiteSettings, saveSiteSettings, SITE_ROUTES } from "@/lib/siteSettings";

export const metadata = {
  title: "Admin Dashboard | KMM College Kumbalam",
  description: "Administrator workspace for KMM College Kumbalam.",
};




function value(formData, key) {
  return String(formData.get(key) || "").trim();
}

function lines(formData, key) {
  return value(formData, key)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

async function updatePlacedStudents(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const existingStudents = await getPlacedStudents();
  const currentSettings = await getSiteSettings();

  const rowCount = Number(formData.get("placed-row-count") || 0);
  const students = [];
  let firstSubmittedImage = "";

  for (let studentIndex = 0; studentIndex < rowCount; studentIndex += 1) {
    const prefix = `placed-${studentIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const title = value(formData, `${prefix}-title`);
    const submittedImage = value(formData, `${prefix}-image`);

    // Preserve existing student image when no new image was uploaded
    const finalImage = submittedImage || (existingStudents?.[studentIndex]?.image || "");

    if (submittedImage && !firstSubmittedImage) {
      firstSubmittedImage = submittedImage;
    }

    if (!title || !finalImage) {
      continue;
    }

    students.push({
      id: value(formData, `${prefix}-id`) || `placed-${Date.now()}-${studentIndex}`,
      title,
      image: finalImage,
      alt: value(formData, `${prefix}-alt`),
    });
  }

  await savePlacedStudents(students);

  // If any new image was uploaded in this save, persist it to site settings
  if (firstSubmittedImage) {
    await saveSiteSettings({
      ...currentSettings,
      images: {
        ...currentSettings.images,
        collegeCampusImage: firstSubmittedImage,
      },
    });
    revalidatePath("/", "layout");
    revalidatePath("/about");
  }

  revalidatePath("/placements");
  redirect("/admin?placedStudentsSaved=1#placed-students");
}

async function updateUgProgrammes(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const existingProgrammes = await getUgProgrammes();
  const existingById = new Map(
    existingProgrammes.programmes.map((programme) => [programme.id, programme])
  );
  const rowCount = Number(formData.get("ug-programme-row-count") || 0);
  const programmes = [];

  for (let programmeIndex = 0; programmeIndex < rowCount; programmeIndex += 1) {
    const prefix = `ug-programme-${programmeIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const id = value(formData, `${prefix}-id`);
    const shortName = value(formData, `${prefix}-shortName`);
    const title = value(formData, `${prefix}-title`);

    if (!id || !shortName || !title) {
      continue;
    }

    const syllabusCount = Number(formData.get(`${prefix}-syllabus-count`) || 0);
    const syllabus = [];

    for (let syllabusIndex = 0; syllabusIndex < syllabusCount + 3; syllabusIndex += 1) {
      const syllabusPrefix = `${prefix}-syllabus-${syllabusIndex}`;
      const syllabusDeleted = formData.get(`${syllabusPrefix}-delete`) === "on";

      if (syllabusDeleted) {
        continue;
      }

      const label = value(formData, `${syllabusPrefix}-label`);

      if (!label) {
        continue;
      }

      syllabus.push({
        label,
        detail: value(formData, `${syllabusPrefix}-detail`),
        href: value(formData, `${syllabusPrefix}-href`),
        status: value(formData, `${syllabusPrefix}-status`) || "Not Available",
      });
    }

    const existingProgramme = existingById.get(id);

    programmes.push({
      id,
      shortName,
      title,
      department: value(formData, `${prefix}-department`),
      focus: value(formData, `${prefix}-focus`),
      seats: Number(value(formData, `${prefix}-seats`) || 0),
      fees: Number(value(formData, `${prefix}-fees`) || 0),
    duration: Number(value(formData, `${prefix}-duration`) || 0),
      semesters: Number(value(formData, `${prefix}-semesters`) || 0),
      accent: existingProgramme?.accent,
      softAccent: existingProgramme?.softAccent,
      borderAccent: existingProgramme?.borderAccent,
      eligibility: lines(formData, `${prefix}-eligibility`),
      specialisations: lines(formData, `${prefix}-specialisations`),
      syllabus,
    programType: value(formData, `${prefix}-programType`),
    });
  }

  await saveUgProgrammes({
    programmes,
    documentsRequired: lines(formData, "ug-documents-required"),
  });

  revalidatePath("/academics");
  redirect("/admin?ugProgrammesSaved=1#ug-programmes");
}

async function updatePgProgrammes(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const existingProgrammes = await getPgProgrammes();
  const existingById = new Map(
    existingProgrammes.programmes.map((programme) => [programme.id, programme])
  );
  const rowCount = Number(formData.get("pg-programme-row-count") || 0);
  const programmes = [];

  for (let programmeIndex = 0; programmeIndex < rowCount; programmeIndex += 1) {
    const prefix = `pg-programme-${programmeIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const id = value(formData, `${prefix}-id`);
    const shortName = value(formData, `${prefix}-shortName`);
    const title = value(formData, `${prefix}-title`);

    if (!id || !shortName || !title) {
      continue;
    }

    const syllabusCount = Number(formData.get(`${prefix}-syllabus-count`) || 0);
    const syllabus = [];

    for (let syllabusIndex = 0; syllabusIndex < syllabusCount + 3; syllabusIndex += 1) {
      const syllabusPrefix = `${prefix}-syllabus-${syllabusIndex}`;
      const syllabusDeleted = formData.get(`${syllabusPrefix}-delete`) === "on";

      if (syllabusDeleted) {
        continue;
      }

      const label = value(formData, `${syllabusPrefix}-label`);

      if (!label) {
        continue;
      }

      syllabus.push({
        label,
        detail: value(formData, `${syllabusPrefix}-detail`),
        href: value(formData, `${syllabusPrefix}-href`),
        status: value(formData, `${syllabusPrefix}-status`) || "Not Available",
      });
    }

    const existingProgramme = existingById.get(id);

    programmes.push({
      id,
      shortName,
      title,
      department: value(formData, `${prefix}-department`),
      focus: value(formData, `${prefix}-focus`),
      seats: Number(value(formData, `${prefix}-seats`) || 0),
      fees: Number(value(formData, `${prefix}-fees`) || 0),
      duration: Number(value(formData, `${prefix}-duration`) || 0),
      semesters: Number(value(formData, `${prefix}-semesters`) || 0),
      accent: existingProgramme?.accent,
      softAccent: existingProgramme?.softAccent,
      borderAccent: existingProgramme?.borderAccent,
      eligibility: lines(formData, `${prefix}-eligibility`),
      specialisations: lines(formData, `${prefix}-specialisations`),
      syllabus,
      programType: value(formData, `${prefix}-programType`),
    });
  }

  await savePgProgrammes({
    programmes,
    documentsRequired: lines(formData, "pg-documents-required"),
  });

  revalidatePath("/academics");
  redirect("/admin?pgProgrammesSaved=1#pg-programmes");
}

async function updateCampusSections(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }
  const currentSections = await getCampusSections();
  const rowCount = Number(formData.get("campus-row-count") || 0);
  const sections = [];

  for (let sectionIndex = 0; sectionIndex < rowCount; sectionIndex += 1) {
    const prefix = `campus-${sectionIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const title = value(formData, `${prefix}-title`);
    const submittedImg = value(formData, `${prefix}-img`);

    // Preserve existing image when no new image was uploaded
    const finalImg = submittedImg || (currentSections?.[sectionIndex]?.img || "");

    if (!title || !finalImg) {
      continue;
    }

    sections.push({
      id: value(formData, `${prefix}-id`) || `campus-${Date.now()}-${sectionIndex}`,
      title,
      label: value(formData, `${prefix}-label`),
      img: finalImg,
      alt: value(formData, `${prefix}-alt`),
      description: value(formData, `${prefix}-description`),
    });
  }

  await saveCampusSections(sections.slice(0, MAX_CAMPUS_SECTIONS));

  revalidatePath("/");
  redirect("/admin?campusSaved=1#campus-sections");
}

async function updateCarousel(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const currentSlides = await getCarouselSlides();
  const rowCount = Number(formData.get("carousel-row-count") || 0);
  const slides = [];

  for (let slideIndex = 0; slideIndex < rowCount; slideIndex += 1) {
    const prefix = `carousel-${slideIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const title = value(formData, `${prefix}-title`);
    const image = value(formData, `${prefix}-image`);

    // fallback to existing slide image when the submitted image value is empty
    const finalImage = image || (currentSlides?.[slideIndex]?.image || "");

    // debug: log received image values for troubleshooting
    try {
      // eslint-disable-next-line no-console
      console.log(`updateCarousel: slide ${slideIndex} image received ->`, image, "final ->", finalImage);
    } catch (err) {}

    if (!title || !finalImage) {
      continue;
    }

    slides.push({
      id: value(formData, `${prefix}-id`) || `slide-${Date.now()}-${slideIndex}`,
      title,
      eyebrow: value(formData, `${prefix}-eyebrow`),
      description: value(formData, `${prefix}-description`),
      image: finalImage,
      alt: value(formData, `${prefix}-alt`),
    });
  }

  await saveCarouselSlides(slides.slice(0, MAX_CAROUSEL_SLIDES));

  revalidatePath("/");
  redirect("/admin?carouselSaved=1#carousel");
}

async function updateLatestUpdates(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const rowCount = Number(formData.get("latest-updates-row-count") || 0);
  const newRows = [];
  const existingRows = [];

  for (let updateIndex = 0; updateIndex < rowCount; updateIndex += 1) {
    const prefix = `latest-updates-${updateIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const title = value(formData, `${prefix}-title`);

    if (!title) {
      continue;
    }

    const idValue = value(formData, `${prefix}-id`);
    const entry = {
      id: idValue || `update-${Date.now()}-${updateIndex}`,
      title,
      date: value(formData, `${prefix}-date`),
    };

    if (!idValue) {
      newRows.push(entry);
    } else {
      existingRows.push(entry);
    }
  }

  const updates = [...newRows, ...existingRows].slice(0, MAX_LATEST_UPDATES);

  await saveLatestUpdates(updates);

  revalidatePath("/");
  redirect("/admin?latestUpdatesSaved=1#latest-updates");
}

function parseHomeProgrammeCardsFromForm(formData, prefix) {
  const rowCount = Number(formData.get(`${prefix}-row-count`) || 0);
  const cards = [];

  for (let cardIndex = 0; cardIndex < rowCount; cardIndex += 1) {
    const rowPrefix = `${prefix}-${cardIndex}`;
    const isDeleted = formData.get(`${rowPrefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const course = value(formData, `${rowPrefix}-course`);
    const img = value(formData, `${rowPrefix}-img`);

    if (!course || !img) {
      continue;
    }

    cards.push({
      id: value(formData, `${rowPrefix}-id`) || `${prefix}-${Date.now()}-${cardIndex}`,
      course,
      detail: value(formData, `${rowPrefix}-detail`),
      img,
      programId: value(formData, `${rowPrefix}-programId`),
    });
  }

  return cards.slice(0, MAX_HOME_PROGRAMME_CARDS);
}

async function updateHomeProgrammeCards(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  await saveHomeProgrammeCards({
    ugCards: parseHomeProgrammeCardsFromForm(formData, "home-ug-card"),
    pgCards: parseHomeProgrammeCardsFromForm(formData, "home-pg-card"),
  });

  revalidatePath("/");
  redirect("/admin?homeProgrammeCardsSaved=1#home-programme-cards");
}

async function updateAddOnCourses(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const rowCount = Number(formData.get("addon-group-row-count") || 0);
  const groups = [];

  for (let groupIndex = 0; groupIndex < rowCount; groupIndex += 1) {
    const prefix = `addon-group-${groupIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const programmeName = value(formData, `${prefix}-programmeName`);
    const courses = lines(formData, `${prefix}-courses`);

    if (!programmeName || !courses.length) {
      continue;
    }

    groups.push({
      id: value(formData, `${prefix}-id`) || `group-${Date.now()}-${groupIndex}`,
      programmeName,
      courses,
    });
  }

  await saveAddOnCoursesPage({
    hero: {
      eyebrow: value(formData, "addon-hero-eyebrow"),
      title: value(formData, "addon-hero-title"),
      description: value(formData, "addon-hero-description"),
    },
    groups: groups.slice(0, MAX_ADD_ON_GROUPS),
  });

  redirect("/admin?addOnCoursesSaved=1#add-on-courses");
}

async function updateFacilities(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const rowCount = Number(formData.get("facility-item-row-count") || 0);
  const items = [];

  for (let itemIndex = 0; itemIndex < rowCount; itemIndex += 1) {
    const prefix = `facility-item-${itemIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const title = value(formData, `${prefix}-title`);

    if (!title) {
      continue;
    }

    items.push({
      id: value(formData, `${prefix}-id`) || `facility-${Date.now()}-${itemIndex}`,
      title,
      description: value(formData, `${prefix}-description`),
    });
  }

  await saveFacilitiesPage({
    hero: {
      eyebrow: value(formData, "facility-hero-eyebrow"),
      title: value(formData, "facility-hero-title"),
      description: value(formData, "facility-hero-description"),
    },
    items: items.slice(0, MAX_FACILITIES),
  });

  redirect("/admin?facilitiesSaved=1#facilities");
}

async function updateAboutMessages(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const rowCount = Number(formData.get("about-message-row-count") || 0);
  const messages = [];

  for (let messageIndex = 0; messageIndex < rowCount; messageIndex += 1) {
    const prefix = `about-message-${messageIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const title = value(formData, `${prefix}-title`);
    const name = value(formData, `${prefix}-name`);

    if (!title || !name) {
      continue;
    }

    messages.push({
      id: value(formData, `${prefix}-id`) || `message-${Date.now()}-${messageIndex}`,
      title,
      name,
      role: value(formData, `${prefix}-role`),
      image: value(formData, `${prefix}-image`),
      quote: value(formData, `${prefix}-quote`),
      author: value(formData, `${prefix}-author`),
      paragraphs: lines(formData, `${prefix}-paragraphs`),
    });
  }

  await saveAboutMessages(messages.slice(0, MAX_ABOUT_MESSAGES));

  revalidatePath("/about");
  redirect("/admin?aboutMessagesSaved=1#about-messages");
}

async function updateDepartments(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const currentDepartments = await getDepartments();
  const departments = currentDepartments.map((department, departmentIndex) => {
    const existingCount = Number(formData.get(`department-${departmentIndex}-faculty-count`) || 0);
    const faculty = [];

    for (let facultyIndex = 0; facultyIndex < existingCount + 3; facultyIndex += 1) {
      const prefix = `department-${departmentIndex}-faculty-${facultyIndex}`;
      const name = value(formData, `${prefix}-name`);
      const isDeleted = formData.get(`${prefix}-delete`) === "on";

      if (!name || isDeleted) {
        continue;
      }

      faculty.push({
        name,
        role: value(formData, `${prefix}-role`),
        area: value(formData, `${prefix}-area`),
        initials: value(formData, `${prefix}-initials`),
        qualification: value(formData, `${prefix}-qualification`),
        experience: value(formData, `${prefix}-experience`),
        photo: value(formData, `${prefix}-photo`),
      });
    }

    return {
      ...department,
      name: value(formData, `department-${departmentIndex}-name`) || department.name,
      shortName: value(formData, `department-${departmentIndex}-shortName`) || department.shortName,
      accent: value(formData, `department-${departmentIndex}-accent`) || department.accent,
      soft: value(formData, `department-${departmentIndex}-soft`) || department.soft,
      description: value(formData, `department-${departmentIndex}-description`) || department.description,
      programmes: lines(formData, `department-${departmentIndex}-programmes`),
      focusAreas: lines(formData, `department-${departmentIndex}-focusAreas`),
      faculty,
    };
  });

  await saveDepartments(departments);

  revalidatePath("/departments");
  redirect("/admin?departmentsSaved=1#departments");
}

async function updateCollegeCampusImage(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const current = await getSiteSettings();

  const submittedImage = value(formData, "collegeCampusImage");
  const finalImage = submittedImage || (current.images && current.images.collegeCampusImage) || "";

  await saveSiteSettings({
    ...current,
    images: {
      ...current.images,
      collegeCampusImage: finalImage,
      collegeCampusAlt: value(formData, "collegeCampusAlt"),
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/about");
  redirect("/admin?campusImageSaved=1#college-campus-image");
}

async function updateContactSettings(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const current = await getSiteSettings();
  const whatsappNumber = value(formData, "whatsappNumber");

  await saveSiteSettings({
    ...current,
    contact: {
      ...current.contact,
      email: value(formData, "email"),
      enquiryEmail: value(formData, "enquiryEmail"),
      primaryPhone: value(formData, "primaryPhone"),
      secondaryPhone: value(formData, "secondaryPhone"),
      admissionPhone: value(formData, "admissionPhone"),
      whatsappNumber,
      address: value(formData, "address"),
      mapUrl: value(formData, "mapUrl"),
      mapEmbedUrl: value(formData, "mapEmbedUrl"),
    },
    social: {
      ...current.social,
      facebook: value(formData, "facebook"),
      instagram: value(formData, "instagram"),
      youtube: value(formData, "youtube"),
      whatsapp: buildWhatsappUrl(whatsappNumber) || current.social.whatsapp,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/admission");
  redirect("/admin?contactSettingsSaved=1#contact-settings");
}

async function updateSiteSettings(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const routeContent = SITE_ROUTES.map((route, index) => ({
    ...route,
    headline: value(formData, `route-${index}-headline`) || route.label,
    status: value(formData, `route-${index}-status`) || "Published",
    note: value(formData, `route-${index}-note`),
  }));

  await saveSiteSettings({
    identity: {
      collegeName: value(formData, "collegeName"),
      shortName: value(formData, "shortName"),
      tagline: value(formData, "tagline"),
      affiliation: value(formData, "affiliation"),
      announcement: value(formData, "announcement"),
      footerText: value(formData, "footerText"),
    },
    contact: {
      email: value(formData, "email"),
      enquiryEmail: value(formData, "enquiryEmail"),
      primaryPhone: value(formData, "primaryPhone"),
      secondaryPhone: value(formData, "secondaryPhone"),
      admissionPhone: value(formData, "admissionPhone"),
      whatsappNumber: value(formData, "whatsappNumber"),
      address: value(formData, "address"),
      mapUrl: value(formData, "mapUrl"),
      mapEmbedUrl: value(formData, "mapEmbedUrl"),
    },
    social: {
      facebook: value(formData, "facebook"),
      instagram: value(formData, "instagram"),
      youtube: value(formData, "youtube"),
      whatsapp: value(formData, "whatsapp"),
    },
    images: {
      navLogo: value(formData, "navLogo"),
      footerLogo: value(formData, "footerLogo"),
      collegeCampusImage: value(formData, "collegeCampusImage"),
      collegeCampusAlt: value(formData, "collegeCampusAlt"),
      academicsLab: value(formData, "academicsLab"),
      admissionCampus: value(formData, "admissionCampus"),
    },
    routeContent,
  });

  revalidatePath("/", "layout");
  redirect("/admin?saved=1");
}

function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/admin/login" });
      }}
    >
      <button
        type="submit"
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-4 text-sm font-semibold text-[#a33c3c] transition hover:bg-[#ffefef]"
      >
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
        Sign out
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  icon,
  type = "text",
  multiline = false,
  options = null,
  min, 
  step,
  maxLength,
  placeholder,
  className="",
}) {
  const inputClass =
    "mt-2 w-full rounded-lg border border-[#d9e6f1] bg-white px-3 py-2.5 text-sm font-medium text-[#18213b] outline-none transition focus:border-[#179BD7] focus:ring-4 focus:ring-[#179BD7]/10";

  return (
    <label className={`block ${className}`}>
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#63708a]">
        {icon ? <FontAwesomeIcon icon={icon} className="text-[#179BD7]" /> : null}
        {label}
      </span>

      {options ? (
        <select name={name} defaultValue={defaultValue} className={inputClass}>
          <option value="">Select Role</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          rows={4}
          className={`${inputClass} resize-y leading-6`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          className={inputClass}
          min={min}
          step={step}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      )}
    </label>
  );
}

function Panel({ id, title, description, icon, children }) {
  return (
    <section id={id} className="scroll-mt-6 rounded-xl border border-[#e1ebf4] bg-white p-4 sm:p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#179BD7]/10 text-[#179BD7]">
          <FontAwesomeIcon icon={icon} />
        </span>
        <div>
          <h2 className="text-lg font-bold text-[#18213b]">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-[#63708a]">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default async function AdminPage({ searchParams }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const settings = await getSiteSettings();
  const departments = await getDepartments();
  const carouselSlides = await getCarouselSlides();
  const latestUpdates = await getLatestUpdates();
  const homeProgrammeCards = await getHomeProgrammeCards();
  const campusSections = await getCampusSections();
  const ugProgrammeData = await getUgProgrammes();
  const pgProgrammeData = await getPgProgrammes();
  const aboutMessages = await getAboutMessages();
  const addOnCoursesPage = await getAddOnCoursesPage();
  const facilitiesPage = await getFacilitiesPage();
  const placedStudents = await getPlacedStudents();
  const resolvedSearchParams = await searchParams;
  const saved = resolvedSearchParams?.saved === "1";
  const departmentsSaved = resolvedSearchParams?.departmentsSaved === "1";
  const carouselSaved = resolvedSearchParams?.carouselSaved === "1";
  const latestUpdatesSaved = resolvedSearchParams?.latestUpdatesSaved === "1";
  const homeProgrammeCardsSaved = resolvedSearchParams?.homeProgrammeCardsSaved === "1";
  const campusSaved = resolvedSearchParams?.campusSaved === "1";
  const ugProgrammesSaved = resolvedSearchParams?.ugProgrammesSaved === "1";
  const pgProgrammesSaved = resolvedSearchParams?.pgProgrammesSaved === "1";
  const placedStudentsSaved = resolvedSearchParams?.placedStudentsSaved === "1";
  const campusImageSaved = resolvedSearchParams?.campusImageSaved === "1";
  const contactSettingsSaved = resolvedSearchParams?.contactSettingsSaved === "1";
  const aboutMessagesSaved = resolvedSearchParams?.aboutMessagesSaved === "1";
  const addOnCoursesSaved = resolvedSearchParams?.addOnCoursesSaved === "1";
  const facilitiesSaved = resolvedSearchParams?.facilitiesSaved === "1";
  const canAddCarouselSlide = carouselSlides.length < MAX_CAROUSEL_SLIDES;
  const carouselRowCount = canAddCarouselSlide
    ? carouselSlides.length + 1
    : carouselSlides.length;
  const canAddLatestUpdate = latestUpdates.length < MAX_LATEST_UPDATES;
  const latestUpdatesRowCount = canAddLatestUpdate
    ? latestUpdates.length + 1
    : latestUpdates.length;
  const canAddHomeUgCard = homeProgrammeCards.ugCards.length < MAX_HOME_PROGRAMME_CARDS;
  const canAddHomePgCard = homeProgrammeCards.pgCards.length < MAX_HOME_PROGRAMME_CARDS;
  const canAddAddOnGroup = addOnCoursesPage.groups.length < MAX_ADD_ON_GROUPS;
  const addOnGroupRowCount = canAddAddOnGroup
    ? addOnCoursesPage.groups.length + 1
    : addOnCoursesPage.groups.length;
  const canAddFacilityItem = facilitiesPage.items.length < MAX_FACILITIES;
  const facilityItemRowCount = canAddFacilityItem
    ? facilitiesPage.items.length + 1
    : facilitiesPage.items.length;
  const canAddCampusSection = campusSections.length < MAX_CAMPUS_SECTIONS;
  const campusRowCount = canAddCampusSection
    ? campusSections.length + 1
    : campusSections.length;
  const ugProgrammeRowCount = ugProgrammeData.programmes.length + 1;
  const pgProgrammeRowCount = pgProgrammeData.programmes.length + 1;
  const canAddAboutMessage = aboutMessages.length < MAX_ABOUT_MESSAGES;
  const aboutMessageRowCount = canAddAboutMessage
    ? aboutMessages.length + 1
    : aboutMessages.length;
  const placedStudentRowCount = placedStudents.length + 1;
  const managedImages = Object.keys(settings.images).length;
  const facultyCount = departments.reduce((total, department) => total + department.faculty.length, 0);

  return (
    <AdminCmsProvider defaultSection="carousel">
      <main className="min-h-screen bg-[#eef4f8] text-[#18213b]">
        <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
          <AdminSidebar>
            <div className="hidden  lg:flex items-center gap-3 border-b border-white/10 pb-5">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#1ab69d] text-white">
                <FontAwesomeIcon icon={faChartLine} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fe8db]">Admin</p>
                <h1 className="text-lg font-bold">Dashboard</h1>
              </div>
            </div>

            <nav className=" md:mt-6 space-y-2 ">
              <p className="px-3 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Content</p>
              
              <AdminCmsNavLink id="carousel" label="Home Carousel" icon={faImage} />
              <AdminCmsNavLink id="college-campus-image" label="College Image" icon={faImage} />
              <AdminCmsNavLink id="latest-updates" label="Latest Updates" icon={faBullhorn} />
               <AdminCmsNavLink id="campus-sections" label="Campus Overview" icon={faLandmark} />
              <AdminCmsNavLink id="home-programme-cards" label=" Programme Cards" icon={faGraduationCap} />
              
              <AdminCmsNavLink id="contact-settings" label="Contact & Social" icon={faPhone} />
              
              
              <AdminCmsNavLink id="departments" label="Departments & Faculties" icon={faBuildingColumns} />
             
              <AdminCmsNavLink id="ug-programmes" label="UG Programmes" icon={faGraduationCap} />
              <AdminCmsNavLink id="pg-programmes" label="PG Programmes" icon={faGraduationCap} />
             
              
               <AdminCmsNavLink id="placed-students" label="Placed Students" icon={faBriefcase} />
              <AdminCmsNavLink id="add-on-courses" label="Add-On Courses" icon={faGraduationCap} />
              <AdminCmsNavLink id="facilities" label="Facilities" icon={faBuilding} />
              <AdminCmsNavLink id="about-messages" label="About Messages" icon={faQuoteLeft} />
              
              <p className="mt-4 px-3 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Website Routes</p>
              {SITE_ROUTES.map((route) => (
                <Link
                  key={route.path}
                  href={route.path}
                  target="_blank"
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white"
                >
                 
                  <span className="text-xs text-[#8fe8db]">{route.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.06] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8fe8db]">Signed in</p>
              <p className="mt-2 break-all text-sm font-semibold text-white/82">{session.user.email}</p>
            </div>
          </AdminSidebar>
          <div className="fixed w-full top-0 z-50 flex items-center justify-between gap-3  bg-[#10172b]  py-4 px-5 lg:hidden">

            <div className="flex  items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#1ab69d] text-white">
                <FontAwesomeIcon icon={faChartLine} />
              </span>
              <div className="flex flex-col justify-center items-start">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fe8db]">Admin</p>
                <h1 className="text-lg font-bold text-white">Dashboard</h1>
              </div>

            </div>
            <MobileNavToggle />
          </div>

          <div className="mt-24 lg:mt-0 min-h-screen min-w-0 p-4 pb-28 sm:pb-24">
            {/* Mobile header: show Admin title and hamburger */}



            <header className=" md:flex md:flex-col md:gap-4 border-b border-[#dce7f0] pb-6 md:sm:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#1ab69d]">KMM College Content Management System</p>
                <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Website control center</h1>
                <p className="mt-2 text-sm leading-6 text-[#63708a]">
                  Manage route content, contact details, social links, image paths, and public messages from one backend-backed dashboard.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#d9e6f1] bg-white px-4 text-sm font-semibold text-[#18213b] transition hover:border-[#179BD7]/40 hover:text-[#179BD7]"
                >
                  <FontAwesomeIcon icon={faHouse} />
                  View site
                </Link>
                <SignOutButton />
              </div>
            </header>

            {saved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Settings saved successfully.
              </div>
            ) : null}
            {departmentsSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Department faculty saved successfully.
              </div>
            ) : null}
            {carouselSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Home carousel saved successfully.
              </div>
            ) : null}
            {latestUpdatesSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Latest updates saved successfully.
              </div>
            ) : null}
            {homeProgrammeCardsSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Home programme cards saved successfully.
              </div>
            ) : null}
            {campusSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Campus overview sections saved successfully.
              </div>
            ) : null}
            {ugProgrammesSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                UG programmes saved successfully.
              </div>
            ) : null}
            {pgProgrammesSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                PG programmes saved successfully.
              </div>
            ) : null}
            {placedStudentsSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Placed students saved successfully.
              </div>
            ) : null}
            {campusImageSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                College campus image saved successfully.
              </div>
            ) : null}
            {contactSettingsSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Contact details and social links saved successfully.
              </div>
            ) : null}
            {aboutMessagesSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                About page messages saved successfully.
              </div>
            ) : null}
            {addOnCoursesSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Add-on courses page saved successfully.
              </div>
            ) : null}
            {facilitiesSaved ? (
              <div className="mt-5 rounded-lg border border-[#bdebdc] bg-[#effdf8] px-4 py-3 text-sm font-bold text-[#12826f]">
                Facilities page saved successfully.
              </div>
            ) : null}

            <AdminCmsSection id="carousel">
              <form action={updateCarousel}>
                <Panel
                  id="carousel"
                  title="Home Carousel"
                  description={`Manage up to ${MAX_CAROUSEL_SLIDES} homepage hero slides. Upload or replace images, edit text, and tick delete to remove a slide.`}
                  icon={faImage}
                >
                  <input type="hidden" name="carousel-row-count" value={carouselRowCount} />

                  <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-[#dce7f0] bg-[#fbfdff] px-4 py-3">
                    <p className="text-sm font-semibold text-[#40506f]">
                      {carouselSlides.length} of {MAX_CAROUSEL_SLIDES} slides in use
                    </p>
                    {canAddCarouselSlide ? (
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#12826f]">
                        Add slide row available
                      </span>
                    ) : (
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#a33c3c]">
                        Maximum reached
                      </span>
                    )}
                  </div>

                  <div className="space-y-5">
                    {[...carouselSlides, ...(canAddCarouselSlide ? [{}] : [])].map((slide, slideIndex) => {
                      const isNewRow = slideIndex >= carouselSlides.length;
                      const prefix = `carousel-${slideIndex}`;

                      return (
                        <article key={slide.id || `new-${slideIndex}`} className="rounded-xl border border-[#e1ebf4] bg-[#fbfdff] p-4">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                                {isNewRow ? "New slide" : `Slide ${slideIndex + 1}`}
                              </p>
                              <h3 className="mt-1 text-lg font-bold text-[#18213b]">
                                {isNewRow ? "Add a carousel slide" : slide.title}
                              </h3>
                            </div>
                            {!isNewRow ? (
                              <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-xs font-bold text-[#a33c3c]">
                                <input type="checkbox" name={`${prefix}-delete`} className="h-4 w-4 accent-[#a33c3c]" />
                                <FontAwesomeIcon icon={faTrash} />
                                Delete
                              </label>
                            ) : null}
                          </div>

                          {!isNewRow ? <input type="hidden" name={`${prefix}-id`} value={slide.id} /> : null}

                          <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Title" name={`${prefix}-title`} defaultValue={slide.title || ""} icon={faPenToSquare} />
                            <Field label="Eyebrow" name={`${prefix}-eyebrow`} defaultValue={slide.eyebrow || ""} icon={faPenToSquare} />
                            <div className="md:col-span-2">
                              <Field label="Description" name={`${prefix}-description`} defaultValue={slide.description || ""} icon={faPenToSquare} multiline />
                            </div>
                            <ImageUploadField
                              label="Image"
                              name={`${prefix}-image`}
                              defaultValue={slide.image || ""}
                              previewAlt={slide.alt || slide.title || "Carousel image preview"}
                              variant="carousel"
                            />
                            <Field label="Image Description" name={`${prefix}-alt`} defaultValue={slide.alt || ""} icon={faPenToSquare} />
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  <AdminStickySave label="Save home carousel" />
                </Panel>

              </form>
            </AdminCmsSection>

            <AdminCmsSection id="latest-updates">
              <form action={updateLatestUpdates}>
                <Panel
                  id="latest-updates"
                  title="Latest Updates"
                  description={`Manage up to ${MAX_LATEST_UPDATES} homepage announcements. Edit the title and date, tick delete to remove an update, or fill the blank row to add a new one.`}
                  icon={faBullhorn}
                >
                  <input type="hidden" name="latest-updates-row-count" value={latestUpdatesRowCount} />

                  <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-[#dce7f0] bg-[#fbfdff] px-4 py-3">
                    <p className="text-sm font-semibold text-[#40506f]">
                      {latestUpdates.length} of {MAX_LATEST_UPDATES} updates in use
                    </p>
                    {canAddLatestUpdate ? (
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#12826f]">
                        Add update row available
                      </span>
                    ) : (
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#a33c3c]">
                        Maximum reached
                      </span>
                    )}
                  </div>

                  <div className="space-y-5">
                    {[...latestUpdates, ...(canAddLatestUpdate ? [{}] : [])].map((update, updateIndex) => {
                      const isNewRow = updateIndex >= latestUpdates.length;
                      const prefix = `latest-updates-${updateIndex}`;

                      return (
                        <article key={update.id || `new-${updateIndex}`} className="rounded-xl border border-[#e1ebf4] bg-[#fbfdff] p-4">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                                {isNewRow ? "New update" : `Update ${updateIndex + 1}`}
                              </p>
                              <h3 className="mt-1 text-lg font-bold text-[#18213b]">
                                {isNewRow ? "Add a latest update" : update.title}
                              </h3>
                            </div>
                            {!isNewRow ? (
                              <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-xs font-bold text-[#a33c3c]">
                                <input type="checkbox" name={`${prefix}-delete`} className="h-4 w-4 accent-[#a33c3c]" />
                                <FontAwesomeIcon icon={faTrash} />
                                Delete
                              </label>
                            ) : null}
                          </div>

                          {!isNewRow ? <input type="hidden" name={`${prefix}-id`} value={update.id} /> : null}

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="md:col-span-2">
                              <Field
                                label="Title"
                                name={`${prefix}-title`}
                                defaultValue={update.title || ""}
                                icon={faPenToSquare}
                              />
                            </div>
                            <Field
                              label="Date"
                              name={`${prefix}-date`}
                              defaultValue={update.date || ""}
                              icon={faCalendarDays}
                              type="date"
                            />
                          </div>
                        </article>
                      );
                    })}
                  </div>
                  <AdminStickySave label="Save latest updates" />
                </Panel>
              </form>
            </AdminCmsSection>

            <AdminCmsSection id="home-programme-cards">
              <form action={updateHomeProgrammeCards}>
                <HomeProgrammeCardsPanel
                  ugCards={homeProgrammeCards.ugCards}
                  pgCards={homeProgrammeCards.pgCards}
                  maxCards={MAX_HOME_PROGRAMME_CARDS}
                  canAddUg={canAddHomeUgCard}
                  canAddPg={canAddHomePgCard}
                />
              </form>
            </AdminCmsSection>

            <AdminCmsSection id="contact-settings">
              <form action={updateContactSettings}>
                <Panel
                  id="contact-settings"
                  title="Contact & Social Links"
                  description="Phone numbers, email, address, and social media links. Primary and secondary numbers appear in the header and footer. Admission desk number is used only on the /admission page. WhatsApp is separate."
                  icon={faPhone}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field
                      label="Primary Phone"
                      name="primaryPhone"
                      defaultValue={settings.contact.primaryPhone}
                      icon={faPhone}
                    />
                    <Field
                      label="Secondary Phone"
                      name="secondaryPhone"
                      defaultValue={settings.contact.secondaryPhone}
                      icon={faPhone}
                    />
                    <Field
                      label="Admission Desk Phone"
                      name="admissionPhone"
                      defaultValue={settings.contact.admissionPhone}
                      icon={faPhone}
                    />
                    <Field
                      label="WhatsApp Number"
                      name="whatsappNumber"
                      defaultValue={settings.contact.whatsappNumber}
                      icon={faPhone}
                    />
                    <Field
                      label="Email"
                      name="email"
                      defaultValue={settings.contact.email}
                      icon={faEnvelope}
                      type="email"
                    />
                    <Field
                      label="Enquiry Email"
                      name="enquiryEmail"
                      defaultValue={settings.contact.enquiryEmail}
                      icon={faEnvelope}
                      type="email"
                    />
                    <div className="md:col-span-2">
                      <Field
                        label="Address"
                        name="address"
                        defaultValue={settings.contact.address}
                        icon={faLocationDot}
                        multiline
                      />
                    </div>
                    {/* <Field
                      label="Google Maps Link"
                      name="mapUrl"
                      defaultValue={settings.contact.mapUrl}
                      icon={faLink}
                    />
                    <Field
                      label="Google Maps Embed URL"
                      name="mapEmbedUrl"
                      defaultValue={settings.contact.mapEmbedUrl}
                      icon={faLink}
                    /> */}
                  </div>

                  <div className="mt-8 border-t border-[#e1ebf4] pt-6">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">Social media</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field
                        label="Facebook URL"
                        name="facebook"
                        defaultValue={settings.social.facebook}
                        icon={faShareNodes}
                      />
                      <Field
                        label="Instagram URL"
                        name="instagram"
                        defaultValue={settings.social.instagram}
                        icon={faShareNodes}
                      />
                      <div className="md:col-span-2">
                        <Field
                          label="YouTube URL"
                          name="youtube"
                          defaultValue={settings.social.youtube}
                          icon={faShareNodes}
                        />
                      </div>
                    </div>
                  </div>

                  <AdminStickySave label="Save contact & social" />
                </Panel>
              </form>
            </AdminCmsSection>

            <AdminCmsSection id="about-messages">
              <form action={updateAboutMessages}>
                <AboutMessagesPanel
                  messages={aboutMessages}
                  messageRowCount={aboutMessageRowCount}
                  canAddMessage={canAddAboutMessage}
                  maxMessages={MAX_ABOUT_MESSAGES}
                />
              </form>
            </AdminCmsSection>

            <AdminCmsSection id="add-on-courses">
              <form action={updateAddOnCourses}>
                <AddOnCoursesPanel
                  page={addOnCoursesPage}
                  groupRowCount={addOnGroupRowCount}
                  canAddGroup={canAddAddOnGroup}
                  maxGroups={MAX_ADD_ON_GROUPS}
                />
              </form>
            </AdminCmsSection>

            <AdminCmsSection id="facilities">
              <form action={updateFacilities}>
                <FacilitiesPanel
                  page={facilitiesPage}
                  itemRowCount={facilityItemRowCount}
                  canAddItem={canAddFacilityItem}
                  maxItems={MAX_FACILITIES}
                />
              </form>
            </AdminCmsSection>

            <AdminCmsSection id="college-campus-image">
              <form action={updateCollegeCampusImage}>
                <Panel
                  id="college-campus-image"
                  title="College Campus Image"
                  description="Single image used on the Home welcome section, About page campus photo, Admission page and 404 page. Updating here changes all four pages."
                  icon={faImage}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <ImageUploadField
                      label="Image"
                      name="collegeCampusImage"
                      defaultValue={settings.images.collegeCampusImage}
                      previewAlt="College campus image preview"
                      variant="campus"
                    />
                    <Field
                      label="Image Description"
                      name="collegeCampusAlt"
                      defaultValue={settings.images.collegeCampusAlt}
                      icon={faPenToSquare}
                    />
                  </div>
                  <AdminStickySave label="Save campus image" />
                </Panel>

              </form>
            </AdminCmsSection>

            <AdminCmsSection id="placed-students">
              <form action={updatePlacedStudents}>
                <PlacedStudentsPanel
                  students={placedStudents}
                  studentRowCount={placedStudentRowCount}
                />

              </form>
            </AdminCmsSection>

            <AdminCmsSection id="ug-programmes">
              <form action={updateUgProgrammes}>
                <UgProgrammesPanel
                  programmes={ugProgrammeData.programmes}
                  documentsRequired={ugProgrammeData.documentsRequired}
                  programmeRowCount={ugProgrammeRowCount}
                />

              </form>
            </AdminCmsSection>

            <AdminCmsSection id="pg-programmes">
              <form action={updatePgProgrammes}>
                <PgProgrammesPanel
                  programmes={pgProgrammeData.programmes}
                  documentsRequired={pgProgrammeData.documentsRequired}
                  programmeRowCount={pgProgrammeRowCount}
                />
              </form>
            </AdminCmsSection>

            <AdminCmsSection id="campus-sections">
              <form action={updateCampusSections}>
                <Panel
                  id="campus-sections"
                  title="Campus Overview Sections"
                  description={`Manage up to ${MAX_CAMPUS_SECTIONS} homepage facility cards shown under Campus overview. Edit title, label, description, image path, and image description. Tick delete to remove a section, or fill the blank row to add a new one.`}
                  icon={faLandmark}
                >
                  <input type="hidden" name="campus-row-count" value={campusRowCount} />

                  <div className="mb-4 flex items-center justify-between gap-3 rounded-lg border border-[#dce7f0] bg-[#fbfdff] px-4 py-3">
                    <p className="text-sm font-semibold text-[#40506f]">
                      {campusSections.length} of {MAX_CAMPUS_SECTIONS} sections in use
                    </p>
                    {canAddCampusSection ? (
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#12826f]">
                        Add section row available
                      </span>
                    ) : (
                      <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#a33c3c]">
                        Maximum reached
                      </span>
                    )}
                  </div>

                  <div className="space-y-5">
                    {[...campusSections, ...(canAddCampusSection ? [{}] : [])].map((section, sectionIndex) => {
                      const isNewRow = sectionIndex >= campusSections.length;
                      const prefix = `campus-${sectionIndex}`;

                      return (
                        <article key={section.id || `new-${sectionIndex}`} className="rounded-xl border border-[#e1ebf4] bg-[#fbfdff] p-4">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1ab69d]">
                                {isNewRow ? "New section" : `Section ${sectionIndex + 1}`}
                              </p>
                              <h3 className="mt-1 text-lg font-bold text-[#18213b]">
                                {isNewRow ? "Add a campus overview card" : section.title}
                              </h3>
                            </div>
                            {!isNewRow ? (
                              <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-xs font-bold text-[#a33c3c]">
                                <input type="checkbox" name={`${prefix}-delete`} className="h-4 w-4 accent-[#a33c3c]" />
                                <FontAwesomeIcon icon={faTrash} />
                                Delete
                              </label>
                            ) : null}
                          </div>

                          {!isNewRow ? <input type="hidden" name={`${prefix}-id`} value={section.id} /> : null}

                          <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Title" name={`${prefix}-title`} defaultValue={section.title || ""} icon={faPenToSquare} />
                            <Field label="Label" name={`${prefix}-label`} defaultValue={section.label || ""} icon={faPenToSquare} />
                            <div className="md:col-span-2">
                              <Field label="Description" name={`${prefix}-description`} defaultValue={section.description || ""} icon={faPenToSquare} multiline />
                            </div>
                            <ImageUploadField
                              label="Image"
                              name={`${prefix}-img`}
                              defaultValue={section.img || ""}
                              previewAlt={section.title || "Campus section image preview"}
                              variant="campus"
                            />
                            <Field label="Image Description" name={`${prefix}-alt`} defaultValue={section.alt || ""} icon={faPenToSquare} />
                          </div>
                        </article>
                      );
                    })}
                  </div>


                  <AdminStickySave label="Save campus overview" />
                </Panel>

              </form>
            </AdminCmsSection>

            <AdminCmsSection id="departments">
              <form action={updateDepartments}>
                <Panel
                  id="departments"
                  title="Departments & Faculties"
                  description="Edit department details and manage faculty cards from Database. Tick delete to remove a faculty member, or use the blank rows to add new faculty."
                  icon={faBuildingColumns}
                >
                  <div className="mb-4 flex flex-wrap gap-3">
                    {departments.map((d) => (
                      <a key={d.id} href={`#${d.id}`} className=" border border-[#dce7f0] rounded-full bg-white/60 px-3 py-1 text-sm font-semibold text-[#179BD7] shadow-sm">
                        {d.name}
                      </a>
                    ))}
                  </div>
                  <div className="space-y-6">
                    {departments.map((department, departmentIndex) => (
                      <section className="scroll-mt-24 lg:scroll-mt-4" id={department.id} key={department.id}>
                        <article className=" rounded-xl border border-[#dce7f0] bg-[#fbfdff] p-4">
                          <DepartmentStickyHeader
                            id={department.id}
                            name={department.name}
                            facultyCount={department.faculty.length}
                          />
                          <div className="grid gap-4 md:grid-cols-2">
                            <Field label="Department Name" name={`department-${departmentIndex}-name`} defaultValue={department.name} icon={faBuildingColumns} />
                            <Field label="Short Name" name={`department-${departmentIndex}-shortName`} defaultValue={department.shortName} icon={faPenToSquare} />
                            <div className="md:col-span-2">
                              <Field label="Description" name={`department-${departmentIndex}-description`} defaultValue={department.description} icon={faPenToSquare} multiline />
                            </div>
                            <Field label="Programmes - one per line" name={`department-${departmentIndex}-programmes`} defaultValue={department.programmes.join("\n")} icon={faPenToSquare} multiline />
                            <Field label="Focus Areas - one per line" name={`department-${departmentIndex}-focusAreas`} defaultValue={department.focusAreas.join("\n")} icon={faPenToSquare} multiline />
                          </div>

                          <input type="hidden" name={`department-${departmentIndex}-faculty-count`} value={department.faculty.length} />

                          <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-2 border-t border-[#dce7f0] pt-5">
                              <FontAwesomeIcon icon={faUserPlus} className="text-[#179BD7]" />
                              <h4 className="text-sm font-bold uppercase tracking-[0.16em] text-[#40506f]">
                                Faculty Cards
                              </h4>
                            </div>

                            {[...department.faculty, {}, {}, {}].map((faculty, facultyIndex) => {
                              const isNewRow = facultyIndex >= department.faculty.length;
                              const prefix = `department-${departmentIndex}-faculty-${facultyIndex}`;

                              return (
                                <div key={`${department.id}-${facultyIndex}`} className="rounded-xl border border-[#e1ebf4] bg-white p-4">
                                  <div className="mb-4 flex items-center justify-between gap-3">
                                    <p className="text-sm font-bold text-[#18213b]">
                                      {isNewRow ? "Add faculty" : faculty.name}
                                    </p>
                                    {!isNewRow ? (
                                      <label className="inline-flex items-center gap-2 rounded-lg border border-[#ffd7d7] bg-[#fff6f6] px-3 py-2 text-xs font-bold text-[#a33c3c]">
                                        <input type="checkbox" name={`${prefix}-delete`} className="h-4 w-4 accent-[#a33c3c]" />
                                        <FontAwesomeIcon icon={faTrash} />
                                        Delete
                                      </label>
                                    ) : null}
                                  </div>

                                  <div className="grid gap-4 md:grid-cols-6">
                                    <Field
                                      label="Full Name"
                                      name={`${prefix}-name`}
                                      defaultValue={faculty.name || ""}
                                      icon={faPenToSquare}
                                      placeholder="eg: Dr. Jane Doe"
                                    />

                                    <Field
                                      label="Initials"
                                      name={`${prefix}-initials`}
                                      defaultValue={faculty.initials || ""}
                                      icon={faPenToSquare}
                                      placeholder="eg: JD"
                                      
                                      maxLength={3}
                                    />

                                    <Field
                                      label="Role"
                                      name={`${prefix}-role`}
                                      defaultValue={faculty.role || ""}
                                      icon={faPenToSquare}
                                      options={[
                                        "Head of Department",
                                        "Professor",
                                        "Associate Professor",
                                        "Assistant Professor",
                                        "Guest Lecturer",
                                      ]}
                                    />

                                   

                                    <Field
                                      label="Qualification"
                                      name={`${prefix}-qualification`}
                                      defaultValue={faculty.qualification || ""}
                                      icon={faPenToSquare}
                                      placeholder="eg: MCA"
                                      className="md:col-span-2"
                                    />

                                    <Field
                                      label="Experience"
                                      name={`${prefix}-experience`}
                                      defaultValue={faculty.experience || ""}
                                      icon={faPenToSquare}
                                      type="number"
                                      step="any"
                                      min={0}
                                    />

                                    

                                    <ImageUploadField
                                      label="Photo"
                                      name={`${prefix}-photo`}
                                      defaultValue={faculty.photo || ""}
                                      previewAlt={faculty.name || "Faculty photo preview"}
                                      variant="faculty"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </article>
                      </section>

                    ))}
                  </div>
                  <AdminStickySave label="Save department faculty" />
                </Panel>

              </form>
            </AdminCmsSection>
          </div>
        </div>
      </main>
    </AdminCmsProvider>
  );
}
