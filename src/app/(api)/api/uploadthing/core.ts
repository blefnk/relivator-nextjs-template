import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

import { authOptions } from "~/server/auth";
import { findUserById } from "~/data/routers/handlers/users";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 3 } })
    // Set permissions and file types for this FileRoute
    .middleware(async (/* req */) => {
      // This code runs on your server before upload
      const session = await getServerSession(authOptions());

      // If you throw, the user will not be able to upload
      if (!session?.userId) throw new Error("Unauthorized");
      // if (!session) throw new Error("Unauthorized");
      // if (!session?.userId) redirect("/sign-in");

      const user = await findUserById(session.userId);

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session?.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
