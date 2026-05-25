export const DEFAULT_COLLEGE_CAMPUS_IMAGE = "/images/kmm_college_kumbalam.webp";
export const DEFAULT_COLLEGE_CAMPUS_ALT = "KMM College campus";

export function pickCollegeCampusImage(images = {}) {
  const src =
    String(images.collegeCampusImage || "").trim() ||
    String(images.aboutCampus || "").trim() ||
    String(images.homeHero || "").trim() ||
    DEFAULT_COLLEGE_CAMPUS_IMAGE;

  const alt =
    String(images.collegeCampusAlt || "").trim() || DEFAULT_COLLEGE_CAMPUS_ALT;

  return { src, alt };
}
