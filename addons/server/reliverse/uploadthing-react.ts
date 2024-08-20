import type { OurFileRouter } from "@/server/reliverse/uploadthing-core";

import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<OurFileRouter>();

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();
