// @/app/api/events/route.ts
import Event from "@/database/event.model";
import connectDB from "@/lib/mongodb";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    console.log(formData, "FORM DATA 1");

    let eventData: Record<string, string | string[]>;

    try {
      // Handle array fields properly using getAll()
      const arrayFields = ["agenda", "tags"];
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

    console.log(formData, "FORM DATA 2");

    // Storing the image in cloudinary
    const file = formData.get("image") as File;

    console.log(file, "FILE");

    if (!file) {
      return NextResponse.json(
        { message: "Image file is required" },
        { status: 400 },
      );
    }

    const tags = JSON.parse(formData.get("tags") as string);
    const agenda = JSON.parse(formData.get("agenda") as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // UploadResult will contain the url for the image
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "DevEvent",
          },
          (error, results) => {
            if (error) {
              return reject(error);
            } else {
              resolve(results);
            }
          },
        )
        .end(buffer);
    });

    // Setting the image url from cloudinary
    eventData.image = (uploadResult as { secure_url: string }).secure_url;

    // Storing the event data in the database
    const createdEvent = await Event.create({
      ...eventData,
      tags: tags,
      agenda: agenda,
    });

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

export async function GET() {
  try {
    await connectDB();

    // Most recently created events are shown first
    const events = await Event.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        message: "Events fetched successfully",
        events,
      },
      {
        status: 200,
      },
    );
  } catch (e) {
    return NextResponse.json({ message: "Event fetching failed", error: e });
  }
}
