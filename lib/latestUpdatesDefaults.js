export const MAX_LATEST_UPDATES = 20;

const today = new Date().toISOString().slice(0, 10);

export const defaultLatestUpdates = [
  {
    id: "update-1",
    title: "ADMISSIONS STARTED",
    date: today,
  },
  {
    id: "update-2",
    title: "UG & PG 2025-2026 ADMISSION STARTED",
    date: today,
  },
  {
    id: "update-3",
    title: "New courses available for 2025",
    date: today,
  },
  {
    id: "update-4",
    title: "Scholarship applications are open",
    date: today,
  },
  {
    id: "update-5",
    title: "Campus interview registrations started",
    date: today,
  },
];

export function formatUpdateDate(dateValue) {
  const parsed = new Date(`${String(dateValue || "").slice(0, 10)}T12:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
