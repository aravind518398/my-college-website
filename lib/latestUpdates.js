import { revalidatePath } from "next/cache";

import {
  defaultLatestUpdates,
  MAX_LATEST_UPDATES,
} from "@/lib/latestUpdatesDefaults";
import { connectDB } from "@/lib/mongodb";
import LatestUpdates from "@/models/LatestUpdates";

export { defaultLatestUpdates, MAX_LATEST_UPDATES };

function normalizeUpdate(update, index) {
  const title = String(update.title || "").trim();
  const date = String(update.date || "").slice(0, 10);

  return {
    id: String(update.id || `update-${index + 1}`).trim(),
    title,
    date: date || new Date().toISOString().slice(0, 10),
  };
}

export function normalizeLatestUpdates(updates = []) {
  return updates
    .map((update, index) => normalizeUpdate(update, index))
    .filter((update) => update.title)
    .slice(0, MAX_LATEST_UPDATES);
}

export async function getLatestUpdates() {
  await connectDB();

  let record = await LatestUpdates.findOne({ key: "home" }).lean();

  if (!record) {
    record = await LatestUpdates.create({
      key: "home",
      updates: defaultLatestUpdates,
    });
    record = record.toObject();
  }

  const updates = normalizeLatestUpdates(record.updates);

  if (!updates.length) {
    return defaultLatestUpdates;
  }

  return updates;
}

export async function saveLatestUpdates(updates) {
  await connectDB();

  const normalizedUpdates = normalizeLatestUpdates(updates);

  await LatestUpdates.findOneAndUpdate(
    { key: "home" },
    { $set: { key: "home", updates: normalizedUpdates } },
    { new: true, upsert: true }
  );

  revalidatePath("/");

  return normalizedUpdates;
}
