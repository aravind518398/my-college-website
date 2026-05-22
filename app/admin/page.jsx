import Link from "next/link";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBriefcase,
  faBullhorn,
  faBuildingColumns,
  faChartLine,
  faLandmark,
  faEnvelope,
  faFloppyDisk,
  faGlobe,
  faGraduationCap,
  faHouse,
  faImage,
  faLink,
  faLocationDot,
  faPenToSquare,
  faPhone,
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
import PlacedStudentsPanel from "@/components/admin/PlacedStudentsPanel";
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
import { getDepartments, saveDepartments } from "@/lib/departments";
import { getPlacedStudents, savePlacedStudents } from "@/lib/placements";
import { getUgProgrammes, saveUgProgrammes } from "@/lib/ugProgrammes";
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

  const rowCount = Number(formData.get("placed-row-count") || 0);
  const students = [];

  for (let studentIndex = 0; studentIndex < rowCount; studentIndex += 1) {
    const prefix = `placed-${studentIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const title = value(formData, `${prefix}-title`);
    const image = value(formData, `${prefix}-image`);

    if (!title || !image) {
      continue;
    }

    students.push({
      id: value(formData, `${prefix}-id`) || `placed-${Date.now()}-${studentIndex}`,
      title,
      image,
      alt: value(formData, `${prefix}-alt`),
    });
  }

  await savePlacedStudents(students);

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
      program: value(formData, `${prefix}-program`),
      specialisation: value(formData, `${prefix}-specialisation`),
      department: value(formData, `${prefix}-department`),
      focus: value(formData, `${prefix}-focus`),
      seats: Number(value(formData, `${prefix}-seats`) || 0),
      duration: value(formData, `${prefix}-duration`),
      semesters: Number(value(formData, `${prefix}-semesters`) || 0),
      accent: existingProgramme?.accent,
      softAccent: existingProgramme?.softAccent,
      borderAccent: existingProgramme?.borderAccent,
      eligibility: lines(formData, `${prefix}-eligibility`),
      highlights: lines(formData, `${prefix}-highlights`),
      syllabus,
    });
  }

  await saveUgProgrammes({
    programmes,
    documentsRequired: lines(formData, "ug-documents-required"),
  });

  revalidatePath("/academics");
  redirect("/admin?ugProgrammesSaved=1#ug-programmes");
}

async function updateCampusSections(formData) {
  "use server";

  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  const rowCount = Number(formData.get("campus-row-count") || 0);
  const sections = [];

  for (let sectionIndex = 0; sectionIndex < rowCount; sectionIndex += 1) {
    const prefix = `campus-${sectionIndex}`;
    const isDeleted = formData.get(`${prefix}-delete`) === "on";

    if (isDeleted) {
      continue;
    }

    const title = value(formData, `${prefix}-title`);
    const img = value(formData, `${prefix}-img`);

    if (!title || !img) {
      continue;
    }

    sections.push({
      id: value(formData, `${prefix}-id`) || `campus-${Date.now()}-${sectionIndex}`,
      title,
      label: value(formData, `${prefix}-label`),
      img,
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

    if (!title || !image) {
      continue;
    }

    slides.push({
      id: value(formData, `${prefix}-id`) || `slide-${Date.now()}-${slideIndex}`,
      title,
      eyebrow: value(formData, `${prefix}-eyebrow`),
      description: value(formData, `${prefix}-description`),
      image,
      alt: value(formData, `${prefix}-alt`),
    });
  }

  await saveCarouselSlides(slides.slice(0, MAX_CAROUSEL_SLIDES));

  revalidatePath("/");
  redirect("/admin?carouselSaved=1#carousel");
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

  await saveSiteSettings({
    ...current,
    images: {
      ...current.images,
      collegeCampusImage: value(formData, "collegeCampusImage"),
      collegeCampusAlt: value(formData, "collegeCampusAlt"),
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/about");
  redirect("/admin?campusImageSaved=1#college-campus-image");
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

function Field({ label, name, defaultValue, icon, type = "text", multiline = false }) {
  const inputClass =
    "mt-2 w-full rounded-lg border border-[#d9e6f1] bg-white px-3 py-2.5 text-sm font-medium text-[#18213b] outline-none transition focus:border-[#179BD7] focus:ring-4 focus:ring-[#179BD7]/10";

  return (
    <label className="block">
      <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#63708a]">
        {icon ? <FontAwesomeIcon icon={icon} className="text-[#179BD7]" /> : null}
        {label}
      </span>
      {multiline ? (
        <textarea name={name} defaultValue={defaultValue} rows={4} className={`${inputClass} resize-y leading-6`} />
      ) : (
        <input type={type} name={name} defaultValue={defaultValue} className={inputClass} />
      )}
    </label>
  );
}

function Panel({ id, title, description, icon, children }) {
  return (
    <section id={id} className="scroll-mt-6 rounded-xl border border-[#e1ebf4] bg-white p-5 shadow-sm">
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
  const campusSections = await getCampusSections();
  const ugProgrammeData = await getUgProgrammes();
  const placedStudents = await getPlacedStudents();
  const resolvedSearchParams = await searchParams;
  const saved = resolvedSearchParams?.saved === "1";
  const departmentsSaved = resolvedSearchParams?.departmentsSaved === "1";
  const carouselSaved = resolvedSearchParams?.carouselSaved === "1";
  const campusSaved = resolvedSearchParams?.campusSaved === "1";
  const ugProgrammesSaved = resolvedSearchParams?.ugProgrammesSaved === "1";
  const placedStudentsSaved = resolvedSearchParams?.placedStudentsSaved === "1";
  const campusImageSaved = resolvedSearchParams?.campusImageSaved === "1";
  const canAddCarouselSlide = carouselSlides.length < MAX_CAROUSEL_SLIDES;
  const carouselRowCount = canAddCarouselSlide
    ? carouselSlides.length + 1
    : carouselSlides.length;
  const canAddCampusSection = campusSections.length < MAX_CAMPUS_SECTIONS;
  const campusRowCount = canAddCampusSection
    ? campusSections.length + 1
    : campusSections.length;
  const ugProgrammeRowCount = ugProgrammeData.programmes.length + 1;
  const placedStudentRowCount = placedStudents.length + 1;
  const managedImages = Object.keys(settings.images).length;
  const facultyCount = departments.reduce((total, department) => total + department.faculty.length, 0);

  return (
    <AdminCmsProvider defaultSection="carousel">
      <main className="min-h-screen bg-[#eef4f8] text-[#18213b]">
        <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
          <aside className="sticky top-0 h-screen overflow-y-auto border-r border-[#dce7f0] bg-[#10172b] px-5 py-6 text-white">
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#1ab69d] text-white">
                <FontAwesomeIcon icon={faChartLine} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8fe8db]">Admin</p>
                <h1 className="text-lg font-bold">Dashboard</h1>
              </div>
            </div>

            <nav className="mt-6 space-y-2">
              <p className="px-3 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Content</p>
              <AdminCmsNavLink id="carousel" label="Home Carousel" icon={faImage} />
              <AdminCmsNavLink id="college-campus-image" label="Campus Image" icon={faImage} />
              <AdminCmsNavLink id="campus-sections" label="Campus Overview" icon={faLandmark} />
              <AdminCmsNavLink id="ug-programmes" label="UG Programmes" icon={faGraduationCap} />
              <AdminCmsNavLink id="placed-students" label="Placed Students" icon={faBriefcase} />
              <AdminCmsNavLink id="departments" label="Departments" icon={faBuildingColumns} />
              <p className="mt-4 px-3 text-xs font-bold uppercase tracking-[0.18em] text-white/45">Website Routes</p>
            {SITE_ROUTES.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                target="_blank"
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-white/78 transition hover:bg-white/10 hover:text-white"
              >
                <span>{route.label}</span>
                <span className="text-xs text-[#8fe8db]">{route.path}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.06] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8fe8db]">Signed in</p>
            <p className="mt-2 break-all text-sm font-semibold text-white/82">{session.user.email}</p>
          </div>
        </aside>

        <div className="min-h-screen min-w-0 px-4 py-6 sm:px-6 lg:px-8">
          <header className="flex flex-col gap-4 border-b border-[#dce7f0] pb-6 sm:flex-row sm:items-center sm:justify-between">
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

          <AdminCmsSection id="carousel">
            <form action={updateCarousel}>
              <Panel
                id="carousel"
                title="Home Carousel"
                description={`Manage up to ${MAX_CAROUSEL_SLIDES} homepage hero slides. Edit title, eyebrow, description, image path, and alt text. Tick delete to remove a slide, or fill the blank row to add a new one.`}
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
                          <Field label="Image Path" name={`${prefix}-image`} defaultValue={slide.image || ""} icon={faImage} />
                          <Field label="Alt Text" name={`${prefix}-alt`} defaultValue={slide.alt || ""} icon={faPenToSquare} />
                        </div>
                      </article>
                    );
                  })}
                </div>
              </Panel>
              <AdminStickySave label="Save home carousel" />
            </form>
          </AdminCmsSection>

          <AdminCmsSection id="college-campus-image">
            <form action={updateCollegeCampusImage}>
              <Panel
                id="college-campus-image"
                title="College Campus Image"
                description="Single image used on the Home welcome section and the About page campus photo. Updating here changes both pages."
                icon={faImage}
              >
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Image Path"
                    name="collegeCampusImage"
                    defaultValue={settings.images.collegeCampusImage}
                    icon={faImage}
                  />
                  <Field
                    label="Alt Text"
                    name="collegeCampusAlt"
                    defaultValue={settings.images.collegeCampusAlt}
                    icon={faPenToSquare}
                  />
                </div>
              </Panel>
              <AdminStickySave label="Save campus image" />
            </form>
          </AdminCmsSection>

          <AdminCmsSection id="placed-students">
            <form action={updatePlacedStudents}>
              <PlacedStudentsPanel
                students={placedStudents}
                studentRowCount={placedStudentRowCount}
              />
              <AdminStickySave label="Save placed students" />
            </form>
          </AdminCmsSection>

          <AdminCmsSection id="ug-programmes">
            <form action={updateUgProgrammes}>
              <UgProgrammesPanel
                programmes={ugProgrammeData.programmes}
                documentsRequired={ugProgrammeData.documentsRequired}
                programmeRowCount={ugProgrammeRowCount}
              />
              <AdminStickySave label="Save UG programmes" />
            </form>
          </AdminCmsSection>

          <AdminCmsSection id="campus-sections">
            <form action={updateCampusSections}>
            <Panel
              id="campus-sections"
              title="Campus Overview Sections"
              description={`Manage up to ${MAX_CAMPUS_SECTIONS} homepage facility cards shown under Campus overview. Edit title, label, description, image path, and alt text. Tick delete to remove a section, or fill the blank row to add a new one.`}
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
                        <Field label="Image Path" name={`${prefix}-img`} defaultValue={section.img || ""} icon={faImage} />
                        <Field label="Alt Text" name={`${prefix}-alt`} defaultValue={section.alt || ""} icon={faPenToSquare} />
                      </div>
                    </article>
                  );
                })}
              </div>



              </Panel>
              <AdminStickySave label="Save campus overview" />
            </form>
          </AdminCmsSection>

          <AdminCmsSection id="departments">
            <form action={updateDepartments}>
            <Panel
              id="departments"
              title="Departments & Faculty"
              description="Edit department details and manage faculty cards from MongoDB. Tick delete to remove a faculty member, or use the blank rows to add new faculty."
              icon={faBuildingColumns}
            >
              <div className="space-y-6">
                {departments.map((department, departmentIndex) => (
                  <article key={department.id} className="rounded-xl border border-[#dce7f0] bg-[#fbfdff] p-4">
                    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1ab69d]">
                          Department
                        </p>
                        <h3 className="mt-1 text-xl font-bold text-[#18213b]">
                          {department.name}
                        </h3>
                        <Link href={`/departments#${department.id}`} target="_blank" className="mt-1 inline-block text-xs font-bold text-[#179BD7]">
                          View public section
                        </Link>
                      </div>
                      <span className="w-fit rounded-full bg-[#179BD7]/10 px-4 py-2 text-xs font-bold text-[#1469b8]">
                        {department.faculty.length} faculty cards
                      </span>
                    </div>

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

                            <div className="grid gap-4 md:grid-cols-5">
                              <Field label="Name" name={`${prefix}-name`} defaultValue={faculty.name || ""} icon={faPenToSquare} />
                              <Field label="Role" name={`${prefix}-role`} defaultValue={faculty.role || ""} icon={faPenToSquare} />
                              <Field label="Area" name={`${prefix}-area`} defaultValue={faculty.area || ""} icon={faPenToSquare} />
                              <Field label="Initials" name={`${prefix}-initials`} defaultValue={faculty.initials || ""} icon={faPenToSquare} />
                              <Field label="Photo Path" name={`${prefix}-photo`} defaultValue={faculty.photo || ""} icon={faImage} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </article>
                ))}
              </div>

            </Panel>
              <AdminStickySave label="Save department faculty" />
            </form>
          </AdminCmsSection>
        </div>
      </div>
    </main>
    </AdminCmsProvider>
  );
}
