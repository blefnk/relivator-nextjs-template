import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

import { auth } from "~/lib/auth";

import { MOCK_UPLOADS_STORE } from "../uploadthing/core"; 

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
    const mediaItemIndex = MOCK_UPLOADS_STORE.findIndex(u => u.id === body.id);
    const mediaItem = MOCK_UPLOADS_STORE[mediaItemIndex];

    if (!mediaItem) {
      return new NextResponse("Media not found", { status: 404 });
    }

    if (mediaItem.userId !== session.user.id) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Delete from UploadThing
    try {
       const utapi = new UTApi();
       await utapi.deleteFiles(mediaItem.key);
    } catch (e) {
       console.log("Mock UTApi deletion or skipped:", e);
    }

    // Delete from in-memory database
    MOCK_UPLOADS_STORE.splice(mediaItemIndex, 1);

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
export async function GET(_request: Request) {
  try {
    const session = await auth.api.getSession(null as any);
    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch all media types for the user from in-memory array
    const userMedia = MOCK_UPLOADS_STORE.filter(u => u.userId === userId).map(u => ({
        createdAt: u.createdAt,
        id: u.id,
        key: u.key,
        type: u.type,
        url: u.url,
    })).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    return NextResponse.json(userMedia);
  } catch (error) {
    console.error("Error fetching user media:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
