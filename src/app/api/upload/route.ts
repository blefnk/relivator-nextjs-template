import { headers } from "next/headers";
import { createUploadConfig } from "pushduck/server";

import { auth } from "~/lib/auth";

const { s3 } = createUploadConfig()
  .provider("aws", {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
    region: process.env.AWS_S3_REGION!,
    bucket: process.env.AWS_S3_BUCKET_NAME!,
  })
  .paths({
    prefix: "uploads",
    generateKey: (file, metadata) => {
      const userId = (metadata as { userId?: string }).userId ?? "anonymous";
      return `${userId}/${Date.now()}/${file.name}`;
    },
  })
  .build();

const uploadRouter = s3.createRouter({
  imageUploader: s3
    .image()
    .maxFileSize("4MB")
    .middleware(async () => {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user?.id) throw new Error("Unauthorized");
      return { userId: session.user.id };
    }),
  videoUploader: s3
    .file()
    .maxFileSize("64MB")
    .middleware(async () => {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user?.id) throw new Error("Unauthorized");
      return { userId: session.user.id };
    }),
});

export type AppUploadRouter = typeof uploadRouter;
export const { GET, POST } = uploadRouter.handlers;
