import { useCallback, useEffect, useRef, useState } from "react";
import type { Dispatch, HTMLAttributes, SetStateAction } from "react";
import type { ReactCropperElement } from "react-cropper";
import Cropper from "react-cropper";
import type { Accept, FileRejection, FileWithPath } from "react-dropzone";
import { useDropzone } from "react-dropzone";
import type {
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
} from "react-hook-form";

import Image from "next/image";

import type { FileWithPreview } from "@/types/reliverse/store";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/utils/reliverse/cn";
import { formatBytes } from "@/utils/reliverse/number";
import {
  CropIcon,
  Cross2Icon,
  ResetIcon,
  TrashIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import consola from "consola";
import { useTranslations } from "next-intl";

import "cropperjs/dist/cropper.css";

type FileDialogProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  accept?: Accept;
  disabled?: boolean;
  files: FileWithPreview[] | null;
  isUploading?: boolean;
  maxFiles?: number;
  maxSize?: number;
  name: TName;
  setFiles: Dispatch<SetStateAction<FileWithPreview[] | null>>;
  setValue: UseFormSetValue<TFieldValues>;
} & HTMLAttributes<HTMLDivElement>;

export function FileDialog<TFieldValues extends FieldValues>({
  name,
  accept = {
    "image/jpeg": [],
    "image/png": [],
  },
  className,
  disabled = false,
  files,
  isUploading = false,
  maxFiles = 1,
  maxSize = 1024 ** 2 * 2,
  setFiles,
  setValue,
  ...props
}: FileDialogProps<TFieldValues, Path<TFieldValues>>) {
  const t = useTranslations();

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: FileRejection[]) => {
      for (const file of acceptedFiles) {
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });

        setFiles((previous) => [...(previous || []), fileWithPreview]);
      }

      if (rejectedFiles.length > 0) {
        for (const { errors } of rejectedFiles) {
          if (errors[0] && errors[0].code === "file-too-large") {
            consola.error(
              `File is too large. Max size is ${formatBytes(maxSize)}`,
            );
          }

          errors[0]?.message && consola.error(errors[0].message);
        }
      }
    },
    [maxSize, setFiles],
  );

  // Register files to react-hook-form
  useEffect(() => {
    setValue(name, files as PathValue<TFieldValues, Path<TFieldValues>>);
  }, [files]);

  const { getInputProps, getRootProps, isDragActive } = useDropzone({
    accept,

    //        ^?
    disabled,

    // ^? <== "Twoslash Query" VSCode Extension
    maxFiles,
    maxSize,
    multiple: maxFiles > 1,

    //    ^?
    onDrop,
  });

  // Revoke preview url when component unmounts
  useEffect(
    () => () => {
      if (!files) {
        return;
      }

      for (const file of files) {
        URL.revokeObjectURL(file.preview);
      }
    },
    [],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} variant="outline">
          Upload Images
          <span className="sr-only">{t("file-dialog.uploadImages")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-screen-xs">
        <DialogTitle className="text-lg font-medium text-muted-foreground">
          Upload Images
        </DialogTitle>
        <p
          className={`
            absolute left-5 top-4 text-base font-medium text-muted-foreground
          `}
        >
          Upload the images
        </p>
        <div
          {...getRootProps()}
          className={cn(
            `
              group relative mt-8 grid h-48 w-full cursor-pointer
              place-items-center rounded-lg border-2 border-dashed
              border-muted-foreground/25 px-5 py-2.5 text-center transition

              hover:bg-muted/25
            `,
            `
              ring-offset-background

              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-ring focus-visible:ring-offset-2
            `,
            isDragActive && "border-muted-foreground/50",
            disabled && "pointer-events-none opacity-60",
            className,
          )}
          {...props}
        >
          <input {...getInputProps()} />
          {isUploading ? (
            <div
              className={`
                group grid w-full place-items-center gap-1

                sm:px-10
              `}
            >
              <UploadIcon
                aria-hidden="true"
                className="size-9 animate-pulse text-muted-foreground"
              />
            </div>
          ) : isDragActive ? (
            <div
              className={`
                grid place-items-center gap-2 text-muted-foreground

                sm:px-5
              `}
            >
              <UploadIcon
                aria-hidden="true"
                className={cn("size-8", isDragActive && "animate-bounce")}
              />
              <p className="text-base font-medium">
                {t("file-dialog.dropTheFileHere")}
              </p>
            </div>
          ) : (
            <div
              className={`
                grid place-items-center gap-1

                sm:px-5
              `}
            >
              <UploadIcon
                aria-hidden="true"
                className="size-8 text-muted-foreground"
              />
              <p className="mt-2 text-base font-medium text-muted-foreground">
                Drag and drop file here, or click to select file
              </p>
              <p className="text-sm text-slate-500">
                Please upload file with size less than {formatBytes(maxSize)}
              </p>
            </div>
          )}
        </div>
        <p className="text-center text-sm font-medium text-muted-foreground">
          You can upload up to {maxFiles}
          {maxFiles === 1 ? "file" : "files"}
        </p>
        {files && files.length > 0 ? (
          <div className="grid gap-5">
            {files &&
              files.map((file, index) => (
                <FileCard
                  file={file}
                  files={files}
                  i={index}
                  key={index}
                  setFiles={setFiles}
                />
              ))}
          </div>
        ) : null}
        {files && files.length > 0 ? (
          <Button
            className="mt-2.5 w-full"
            onClick={() => {
              setFiles(null);
            }}
            size="sm"
            type="button"
            variant="outline"
          >
            <TrashIcon aria-hidden="true" className="mr-2 size-4" />
            Remove All
            <span className="sr-only">{t("file-dialog.removeAll")}</span>
          </Button>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

type FileCardProps = {
  file: FileWithPreview;
  files: FileWithPreview[] | null;
  i: number;
  setFiles: Dispatch<SetStateAction<FileWithPreview[] | null>>;
};

function FileCard({ file, files, i, setFiles }: FileCardProps) {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [cropData, setCropData] = useState<null | string>(null);
  const cropperRef = useRef<ReactCropperElement>(null);

  const onCrop = useCallback(() => {
    if (!files || !cropperRef.current) {
      return;
    }

    const croppedCanvas =
      cropperRef.current && cropperRef.current.cropper.getCroppedCanvas();

    setCropData(croppedCanvas.toDataURL());

    croppedCanvas.toBlob((blob) => {
      if (!blob) {
        return;
      }

      const croppedImage = new File([blob], file.name, {
        lastModified: Date.now(),
        type: file.type,
      });

      const croppedFileWithPathAndPreview = Object.assign(croppedImage, {
        path: file.name,
        preview: URL.createObjectURL(croppedImage),
      }) satisfies FileWithPreview;

      const newFiles = files.map((file, index) =>
        index === i ? croppedFileWithPathAndPreview : file,
      );

      setFiles(newFiles);
    });
  }, [file.name, file.type, files, i, setFiles]);

  useEffect(() => {
    function handleKeydown(event_: KeyboardEvent) {
      if (event_.key === "Enter") {
        onCrop();
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [onCrop]);

  return (
    <div className="relative flex items-center justify-between gap-2.5">
      <div className="flex items-center gap-2">
        <Image
          alt={file.name}
          className="size-10 shrink-0 rounded-lg"
          height={40}
          loading="lazy"
          src={cropData || file.preview}
          width={40}
        />
        <div className="flex flex-col">
          <p className="line-clamp-1 text-sm font-medium text-muted-foreground">
            {file.name}
          </p>
          <p className="text-xs text-slate-500">
            {(file.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {file.type.startsWith("image") && (
          <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger asChild>
              <Button
                className="size-7"
                size="icon"
                type="button"
                variant="outline"
              >
                <CropIcon aria-hidden="true" className="size-4 text-white" />
                <span className="sr-only">{t("file-dialog.cropImage")}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <p
                className={`
                  absolute left-5 top-4 text-base font-medium
                  text-muted-foreground
                `}
              >
                Crop image
              </p>
              <div className="mt-8 grid place-items-center space-y-5">
                <Cropper
                  autoCropArea={1}
                  background={false}
                  checkOrientation={false} // @see https://github.com/fengyuanchen/cropperjs/issues/671
                  className="size-[450px] object-cover"
                  guides
                  initialAspectRatio={1 / 1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  preview=".img-preview"
                  ref={cropperRef}
                  responsive
                  src={file.preview}
                  viewMode={1}
                  zoomTo={0.5}
                />
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    aria-label="Crop image"
                    className="h-8"
                    onClick={() => {
                      onCrop();
                      setIsOpen(false);
                    }}
                    size="sm"
                    type="button"
                  >
                    <CropIcon aria-hidden="true" className="mr-2 size-3.5" />
                    Crop image
                  </Button>
                  <Button
                    aria-label="Reset crop"
                    className="h-8"
                    onClick={() => {
                      cropperRef.current && cropperRef.current.cropper.reset();
                      setCropData(null);
                    }}
                    size="sm"
                    type="button"
                    variant="outline"
                  >
                    <ResetIcon aria-hidden="true" className="mr-2 size-3.5" />
                    Reset crop
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <Button
          className="size-7"
          onClick={() => {
            if (!files) {
              return;
            }

            setFiles(files.filter((_, index) => index !== i));
          }}
          size="icon"
          type="button"
          variant="outline"
        >
          <Cross2Icon aria-hidden="true" className="size-4 text-white" />
          <span className="sr-only">{t("file-dialog.removeFile")}</span>
        </Button>
      </div>
    </div>
  );
}
