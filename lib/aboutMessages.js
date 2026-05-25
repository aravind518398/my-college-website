import { revalidatePath } from "next/cache";

import {
  defaultAboutMessages,
  MAX_ABOUT_MESSAGES,
} from "@/lib/aboutMessagesDefaults";
import { connectDB } from "@/lib/mongodb";
import AboutMessages from "@/models/AboutMessages";

export { defaultAboutMessages, MAX_ABOUT_MESSAGES };

function cleanParagraphs(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }

  return String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeMessage(message, index) {
  const title = String(message.title || "").trim();
  const name = String(message.name || "").trim();

  return {
    id: String(message.id || `message-${index + 1}`).trim(),
    title,
    name,
    role: String(message.role || "").trim(),
    image: String(message.image || "").trim(),
    quote: String(message.quote || "").trim(),
    author: String(message.author || "").trim(),
    paragraphs: cleanParagraphs(message.paragraphs),
  };
}

export function normalizeAboutMessages(messages = []) {
  return messages
    .map((message, index) => normalizeMessage(message, index))
    .filter((message) => message.title && message.name)
    .slice(0, MAX_ABOUT_MESSAGES);
}

export async function getAboutMessages() {
  await connectDB();

  let record = await AboutMessages.findOne({ key: "about" }).lean();

  if (!record) {
    record = await AboutMessages.create({
      key: "about",
      messages: defaultAboutMessages,
    });
    record = record.toObject();
  }

  const messages = normalizeAboutMessages(record.messages);

  if (!messages.length) {
    return defaultAboutMessages;
  }

  return messages;
}

export async function saveAboutMessages(messages) {
  await connectDB();

  const normalizedMessages = normalizeAboutMessages(messages);

  await AboutMessages.findOneAndUpdate(
    { key: "about" },
    { $set: { key: "about", messages: normalizedMessages } },
    { new: true, upsert: true }
  );

  revalidatePath("/about");

  return normalizedMessages;
}
