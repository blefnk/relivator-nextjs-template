import type { OurFileRouter } from "~/server/helpers/uploadthing-core";
import type { StoredFile } from "~/types/store";
import type { UploadFilesOptions } from "uploadthing/types";

import { useState } from "react";

import consola from "consola";

import { getErrorMessage } from "~/server/helpers/error-message";
import { uploadFiles } from "~/server/helpers/uploadthing-react";

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
              // @ts-expect-error TODO: Fix ts
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
    isUploading,
    progresses,
    uploadedFiles,
    uploadFiles: uploadThings,
  };
}
