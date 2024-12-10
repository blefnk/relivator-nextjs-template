import type { UploadFilesOptions } from "uploadthing/types";

import * as React from "react";
import { toast } from "sonner";

import type { StoredFile } from "~/types";

import { type OurFileRouter } from "~/app/api/uploadthing/core";
import { getErrorMessage } from "~/server/handle-error";
import { uploadFiles } from "~/server/uploadthing";

type UseUploadFileProps = {
  defaultUploadedFiles?: StoredFile[];
} & Pick<
  UploadFilesOptions<any>,
  "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
>;

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  { defaultUploadedFiles = [], ...props }: UseUploadFileProps = {},
) {
  const [uploadedFiles, setUploadedFiles] =
    React.useState<StoredFile[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>(
    {},
  );
  const [isUploading, setIsUploading] = React.useState(false);

  async function uploadThings(files: File[]) {
    setIsUploading(true);
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => {
            return {
              ...prev,
              [file.name]: progress,
            };
          });
        },
      });

      const formattedRes: StoredFile[] = res.map((file) => {
        return {
          id: file.key,
          name: file.name,
          url: file.url,
        };
      });

      setUploadedFiles((prev) =>
        prev ? [...prev, ...formattedRes] : formattedRes,
      );
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles: uploadThings,
    isUploading,
  };
}
