import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/server/reliverse/uploadthing-react";
import { useDropzone } from "@uploadthing/react";
import { useTranslations } from "next-intl";
import { generateClientDropzoneAccept } from "uploadthing/client";

// Note: `useUploadThing` is IMPORTED FROM THE CODEBASE using the `generateReactHelpers` function
export function MultiUploader() {
  const t = useTranslations();

  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { routeConfig, startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadBegin: () => {
      alert("upload has begun!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
  });

  const fileTypes = routeConfig?.["image/png"]
    ? Object.keys(routeConfig["image/png"])
    : [];

  const { getInputProps, getRootProps } = useDropzone({
    accept:
      fileTypes.length > 0
        ? generateClientDropzoneAccept(fileTypes)
        : undefined,
    onDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        cursor-pointer border-2 border-dashed border-gray-300 p-6 text-center
        text-gray-600
      `}
    >
      <input {...getInputProps()} />
      <div>
        {files.length > 0 && (
          <Button
            className={`
              mt-4 rounded bg-blue-500 px-4 py-2 text-white

              hover:bg-blue-700
            `}
            onClick={() => startUpload(files)}
            type="button"
          >
            Upload {files.length} files
          </Button>
        )}
      </div>
      <p>{t("MultiUploader.dropFilesHere")}</p>
    </div>
  );
}
