export const MAX_LATEST_UPDATES = 20;

const today = new Date().toISOString().slice(0, 10);

export const defaultLatestUpdates = [
  {
    id: "update-1",
    title: "Scholarship applications open for the 2025-2026 academic year",
    date: today,
  },
  {
    id: "update-2",
    title: "Orientation program scheduled for 15th June 2025",
    date: today,
  },
  {
    id: "update-3",
    title: "New library resources available from 1st June 2025",
    date: today,
  },
  {
    id: "update-4",
    title: "Campus reopening for the new academic year on 1st June 2025",
    date: today,
  },
  {
    id: "update-5",
    title: "Admission starts from 1st June 2025",
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
