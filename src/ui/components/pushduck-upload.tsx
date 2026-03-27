"use client";

import { useRef } from "react";
import { createUploadClient } from "pushduck/client";

import type { AppUploadRouter } from "~/app/api/upload/route";

const upload = createUploadClient<AppUploadRouter>({
  endpoint: "/api/upload",
});

export function ImageUploader() {
  const { uploadFiles, files, isUploading, reset } = upload.imageUploader();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onClick={() => ref.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && ref.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary"
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          disabled={isUploading}
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) uploadFiles(files);
          }}
        />
        <p className="text-sm text-muted-foreground">
          {isUploading ? "Uploading…" : "Click to upload images (max 4 MB each)"}
        </p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center gap-3 rounded-md border border-border p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                {file.status === "uploading" && (
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${file.progress}%` }}
                    />
                  </div>
                )}
                {file.status === "success" && file.url && (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 block truncate text-xs text-primary hover:underline"
                  >
                    {file.url}
                  </a>
                )}
                {file.status === "error" && (
                  <p className="mt-0.5 text-xs text-destructive">
                    {file.error ?? "Upload failed"}
                  </p>
                )}
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {file.status === "uploading" ? `${file.progress}%` : file.status}
              </span>
            </li>
          ))}
          <button
            type="button"
            onClick={reset}
            className="text-xs text-muted-foreground underline hover:text-foreground"
          >
            Clear
          </button>
        </ul>
      )}
    </div>
  );
}

export function VideoUploader() {
  const { uploadFiles, files, isUploading, reset } = upload.videoUploader();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div
        role="button"
        tabIndex={0}
        onClick={() => ref.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && ref.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 text-center transition-colors hover:border-primary"
      >
        <input
          ref={ref}
          type="file"
          accept="video/*"
          multiple
          className="hidden"
          disabled={isUploading}
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) uploadFiles(files);
          }}
        />
        <p className="text-sm text-muted-foreground">
          {isUploading ? "Uploading…" : "Click to upload videos (max 64 MB each)"}
        </p>
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file) => (
            <li key={file.id} className="flex items-center gap-3 rounded-md border border-border p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                {file.status === "uploading" && (
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${file.progress}%` }} />
                  </div>
                )}
                {file.status === "success" && file.url && (
                  <a href={file.url} target="_blank" rel="noreferrer" className="mt-0.5 block truncate text-xs text-primary hover:underline">{file.url}</a>
                )}
                {file.status === "error" && (
                  <p className="mt-0.5 text-xs text-destructive">{file.error ?? "Upload failed"}</p>
                )}
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {file.status === "uploading" ? `${file.progress}%` : file.status}
              </span>
            </li>
          ))}
          <button type="button" onClick={reset} className="text-xs text-muted-foreground underline hover:text-foreground">Clear</button>
        </ul>
      )}
    </div>
  );
}
