export const defaultSiteSettings = {
  identity: {
    collegeName: "K.M.M. College",
    shortName: "KMM College",
    tagline: "Kumbalam",
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
    admissionPhone: "9446077212",
    whatsappNumber: "9037002130",
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
};

export function buildWhatsappUrl(phoneNumber, message = "Hi") {
  const digits = String(phoneNumber || "").replace(/\D/g, "");
  if (!digits) {
    return "";
  }

  const withCountry = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${withCountry}?text=${encodeURIComponent(message)}`;
}

export function getWhatsappHref(settings) {
  const fromNumber = buildWhatsappUrl(settings?.contact?.whatsappNumber);
  if (fromNumber) {
    return fromNumber;
  }

  return settings?.social?.whatsapp || buildWhatsappUrl(defaultSiteSettings.contact.whatsappNumber);
}
