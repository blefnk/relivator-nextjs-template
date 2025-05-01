import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

import { db } from "~/db";
import { uploadsTable } from "~/db/schema/uploads/tables";
import { auth } from "~/lib/auth";

export async function DELETE(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = (await request.json()) as { id: string };
    if (!body.id) {
      return new NextResponse("Missing media ID", { status: 400 });
    }

    // Get the media item to check ownership and get the key
    const mediaItem = await db.query.uploadsTable.findFirst({
      where: eq(uploadsTable.id, body.id),
    });

    if (!mediaItem) {
      return new NextResponse("Media not found", { status: 404 });
    }

    if (mediaItem.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete from UploadThing
    const utapi = new UTApi();
    await utapi.deleteFiles(mediaItem.key);

    // Delete from database
    await db.delete(uploadsTable).where(eq(uploadsTable.id, body.id));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting media:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Server Error",
      { status: 500 },
    );
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch all media types for the user
    const userMedia = await db
      .select({
        createdAt: uploadsTable.createdAt,
        id: uploadsTable.id,
        key: uploadsTable.key,
        type: uploadsTable.type,
        url: uploadsTable.url,
      })
      .from(uploadsTable)
      .where(eq(uploadsTable.userId, userId))
      .orderBy(uploadsTable.createdAt);

    return NextResponse.json(userMedia);
  } catch (error) {
    console.error("Error fetching user media:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
