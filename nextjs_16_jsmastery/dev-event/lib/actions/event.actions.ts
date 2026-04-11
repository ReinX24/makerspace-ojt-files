// @/lib/actions/event.actions.ts
"use server";

import Event from "@/database/event.model";
import connectDB from "../mongodb";

export const getAllEvents = async () => {
  try {
    await connectDB();
    const events = await Event.find({}).sort({ createdAt: -1 }).lean();

    // Parse/Stringify to safely convert ObjectIds and Dates to strings
    return JSON.parse(JSON.stringify(events));
  } catch {
    return [];
  }
};

async function getEventBySlugInternal(slug: string) {
  try {
    await connectDB();
    const event = await Event.findOne({ slug }).lean();

    if (!event) return null;

    // Convert ObjectIds to strings safely
    return JSON.parse(JSON.stringify(event));
  } catch {
    return null;
  }
}

export const getEventBySlug = async (slug: string) => {
  "use cache";
  return await getEventBySlugInternal(slug);
};

async function getSimilarEventsBySlugInternal(slug: string) {
  try {
    await connectDB();

    // lean() is fine here too, but not strictly necessary for the lookup
    const event = await Event.findOne({ slug }).lean();

    if (!event) return [];

    const similarEvents = await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean();

    // Convert the array of ObjectIds safely
    return JSON.parse(JSON.stringify(similarEvents));
  } catch {
    return [];
  }
}

export const getSimilarEventsBySlug = async (slug: string) => {
  "use cache";
  return await getSimilarEventsBySlugInternal(slug);
};
