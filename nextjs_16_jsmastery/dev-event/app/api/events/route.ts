// @/app/api/events/route.ts
import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let eventData: Record<string, string | string[]>;

    try {
      // Handle array fields properly using getAll()
      const arrayFields = ['agenda', 'tags'];
      eventData = {};
      
      const processedKeys = new Set<string>();
      
      for (const [key] of formData.entries()) {
        if (!processedKeys.has(key)) {
          processedKeys.add(key);
          
          if (arrayFields.includes(key)) {
            eventData[key] = formData.getAll(key) as string[];
          } else {
            eventData[key] = formData.get(key) as string;
          }
        }
      }
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON data format" },
        { status: 400 },
      );
    }

    const createdEvent = await Event.create(eventData);

    return NextResponse.json(
      {
        message: "Event Created Successfully",
        event: createdEvent,
      },
      { status: 201 },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : "Unknown Error",
      },
      { status: 500 },
    );
  }
}
