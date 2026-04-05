"use server";

import Event from "@/database/event.model";
import connectDB from "../mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB();

    const event = await Event.findOne({ slug });

    // Checking if the event from the slug has the same tags as other events
    return await Event.find({
      _id: { $ne: event._id, tags: { $in: event.tags } },
    });
  } catch {
    return [];
  }
};
