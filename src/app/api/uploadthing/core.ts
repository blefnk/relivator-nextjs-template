import { createUploadthing, type FileRouter } from "uploadthing/next";

import { env } from "~/env.mjs";
import { getServerAuthSession } from "~/utils/auth/users";

const f = createUploadthing();

type ValidFileTypes = "audio" | "blob" | "image" | "video";
type FileRouterInput =
  | Record<
      ValidFileTypes,
      {
        maxFileSize: "4MB";
        maxFileCount: number;
      }
    >
  | ValidFileTypes[];

// Control the file sizes for all file types
const DEFAULT_IMAGE_UPLOAD_PARAMS: FileRouterInput = {
  audio: { maxFileSize: "4MB", maxFileCount: 1 },
  blob: { maxFileSize: "4MB", maxFileCount: 1 },
  image: { maxFileSize: "4MB", maxFileCount: 3 },
  video: { maxFileSize: "4MB", maxFileCount: 1 },
};

// FileRouter for the app, can contain multiple FileRoutes
export const ourFileRouter = {
  // We can define here as many FileRoutes as we like, each with a unique routeSlug
  // productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 3 } }) // simplified
  // todo: currently `accept` param has priority from src/islands/file-dialog.ts file
  imageUploader: f({
    "image/png": DEFAULT_IMAGE_UPLOAD_PARAMS.image,
    "image/jpeg": DEFAULT_IMAGE_UPLOAD_PARAMS.image,
  })
    // Set permissions and file types for this FileRoute
    // TODO: FIX MYSQL-PLANETSCALE-CLERK
    /* .middleware(async () => {
      const user = await getServerAuthSession();
      // If throw, the user will not be able to upload
      if (!user?.id) throw new Error("Unauthorized");
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    }) */
    .onUploadError(async ({ error }) => {
      console.error("❌ Error uploading image:", error.message);
      throw new Error(error.message);
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON THE SERVER after upload
      if (env.NODE_ENV === "development") {
        // console.log(" ✓ Image uploaded by userId:", metadata.userId);
        console.log("[UT] Image uploaded! URL is", file.url);
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
