import { createId } from "@paralleldrive/cuid2";
import { NextResponse } from "next/server";

import { db } from "~/db";
import { uploadsTable } from "~/db/schema/uploads/tables";
import { auth } from "~/lib/auth";

export async function POST(req: Request) {
  try {
    // Check authentication
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get URL from request body
    const body = (await req.json()) as { url?: string };
    const { url } = body;
    if (!url) {
      return NextResponse.json({ message: "URL is required" }, { status: 400 });
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    // Detect media type from URL
    const type = url.match(/\.(jpg|jpeg|png|gif|webp)$/i)
      ? "image"
      : url.match(/\.(mp4|webm|mov)$/i)
        ? "video"
        : null;

    if (!type) {
      return NextResponse.json(
        {
          message:
            "Unsupported media type. URL must end with a supported image or video extension.",
        },
        { status: 400 },
      );
    }

    // Create a unique key for the media
    const key = `url-${createId()}`;

    // Insert into database
    await db.insert(uploadsTable).values({
      createdAt: new Date(),
      id: createId(),
      key,
      type,
      url,
      userId: session.user.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error uploading from URL:", error);
    return NextResponse.json(
      { message: "Failed to process URL upload" },
      { status: 500 },
    );
  }
}
