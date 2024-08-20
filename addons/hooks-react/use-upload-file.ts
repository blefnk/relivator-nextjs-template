import { useState } from "react";

import type { OurFileRouter } from "@/server/reliverse/uploadthing-core";
import type { StoredFile } from "@/types/reliverse/store";
import type { UploadFilesOptions } from "uploadthing/types";

import { getErrorMessage } from "@/server/reliverse/error-message";
import { uploadFiles } from "@/server/reliverse/uploadthing-react";
import consola from "consola";

type UseUploadFileProps = {
  defaultUploadedFiles?: StoredFile[];
} & Pick<
  UploadFilesOptions<OurFileRouter, keyof OurFileRouter>,
  "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
>;

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  { defaultUploadedFiles = [], ...props }: UseUploadFileProps = {},
) {
  const [uploadedFiles, setUploadedFiles] =
    useState<StoredFile[]>(defaultUploadedFiles);

  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);

  async function uploadThings(files: File[]) {
    setIsUploading(true);
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((previous) => {
            return {
              ...previous,
              [file]: progress,
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

      setUploadedFiles((previous) =>
        previous ? [...previous, ...formattedRes] : formattedRes,
      );
    } catch (error) {
      consola.error(getErrorMessage(error));
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
