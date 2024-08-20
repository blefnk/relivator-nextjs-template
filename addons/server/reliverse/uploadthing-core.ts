import type { FileRouter } from "uploadthing/next";

import consola from "consola";
import { createUploadthing } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const auth = (request: Request) => ({
  id: "fakeId",
});

// Fake auth function
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
    },
  }) // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req);

      // If you throw, the user will not be able to upload
      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        userId: user.id,
      };
    })
    .onUploadComplete(({ file, metadata }) => {
      // This code RUNS ON YOUR SERVER after upload
      consola.success("Upload complete for userId:", metadata.userId);
      consola.info("file url", file.url);

      // !!! Whatever is returned here is sent to the client-side `onClientUploadComplete` callback

      return {
        uploadedBy: metadata.userId,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter; // _____________________

// =======================================================================
//
// import type { FileRouter } from "uploadthing/next";

// import { createUploadthing } from "uploadthing/next";

//

// const noop = () => {};
// const f = createUploadthing();

// type ValidFileTypes = "audio" | "blob" | "image" | "video";

// type FileRouterInput =
//   | Record<
//       ValidFileTypes,
//       {
//         maxFileCount: number;
//         maxFileSize: "4MB";
//       }
//     >
//   | ValidFileTypes[];

// // Control the file sizes for all file types
// const DEFAULT_IMAGE_UPLOAD_PARAMS: FileRouterInput = {
//   // eslint-disable-next-line unicorn/no-unused-properties
//   audio: {
//     maxFileCount: 1,
//     maxFileSize: "4MB",
//   },
//   // eslint-disable-next-line unicorn/no-unused-properties
//   blob: {
//     maxFileCount: 1,
//     maxFileSize: "4MB",
//   },
//   image: {
//     maxFileCount: 3,
//     maxFileSize: "4MB",
//   },
//   // eslint-disable-next-line unicorn/no-unused-properties
//   video: {
//     maxFileCount: 1,
//     maxFileSize: "4MB",
//   },
// };

// // FileRouter for the app, can contain multiple FileRoutes
// // Set permissions and file types for this FileRoute
// export const ourFileRouter = {
//   // We can define here as many FileRoutes as we like, each with a unique routeSlug
//   // productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 3 } }) // simplified
//   imageUploader: f({
//     "image/jpeg": DEFAULT_IMAGE_UPLOAD_PARAMS.image,
//     "image/png": DEFAULT_IMAGE_UPLOAD_PARAMS.image,
//   })
//     .onUploadError(({ error }) => {
//       throw new Error(error.message);
//     })
//     .onUploadComplete(noop),
// } satisfies FileRouter;

// export type OurFileRouter = typeof ourFileRouter;
