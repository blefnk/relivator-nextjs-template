import type { OurFileRouter } from "~/server/helpers/uploadthing-core";

import { generateReactHelpers } from "@uploadthing/react";

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<OurFileRouter>();
