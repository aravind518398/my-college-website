import { revalidatePath } from "next/cache";

import {
  defaultHomePgCards,
  defaultHomeUgCards,
  MAX_HOME_PROGRAMME_CARDS,
} from "@/lib/homeProgrammeCardDefaults";
import { connectDB } from "@/lib/mongodb";
import HomeProgrammeCards from "@/models/HomeProgrammeCards";

export { defaultHomePgCards, defaultHomeUgCards, MAX_HOME_PROGRAMME_CARDS };

function normalizeCard(card, index) {
  const course = String(card.course || "").trim();
  const img = String(card.img || "").trim();

  return {
    id: String(card.id || `card-${index + 1}`).trim(),
    course,
    detail: String(card.detail || "").trim(),
    img,
    imgPublicId: String(card.imgPublicId || "").trim(),
    programId: String(card.programId || "").trim() || course.toLowerCase().replace(/\s+/g, "-"),
  };
}

export function normalizeHomeProgrammeCards(cards = []) {
  return cards
    .map((card, index) => normalizeCard(card, index))
    .filter((card) => card.course && card.img)
    .slice(0, MAX_HOME_PROGRAMME_CARDS);
}

export async function getHomeProgrammeCards() {
  await connectDB();

  let record = await HomeProgrammeCards.findOne({ key: "home" }).lean();

  if (!record) {
    record = await HomeProgrammeCards.create({
      key: "home",
      ugCards: defaultHomeUgCards,
      pgCards: defaultHomePgCards,
    });
    record = record.toObject();
  }

  const ugCards = normalizeHomeProgrammeCards(record.ugCards);
  const pgCards = normalizeHomeProgrammeCards(record.pgCards);

  return {
    ugCards: ugCards.length ? ugCards : defaultHomeUgCards,
    pgCards: pgCards.length ? pgCards : defaultHomePgCards,
  };
}

export async function saveHomeProgrammeCards({ ugCards, pgCards }) {
  await connectDB();

  const normalized = {
    ugCards: normalizeHomeProgrammeCards(ugCards),
    pgCards: normalizeHomeProgrammeCards(pgCards),
  };

  await HomeProgrammeCards.findOneAndUpdate(
    { key: "home" },
    { $set: { key: "home", ...normalized } },
    { new: true, upsert: true }
  );

  revalidatePath("/");

  return normalized;
}
