"use client";

import type { ColumnDef, ColumnMeta } from "@tanstack/react-table";
import type React from "react";

import { Hash, Mail, User as UserIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import type { MediaUpload } from "~/db/schema/uploads/types";
import type { User } from "~/db/schema/users/types";
import type { GalleryMediaItem } from "~/ui/components/blocks/bento-media-gallery";

import { defineMeta, filterFn } from "~/lib/filters";
import { BentoMediaGallery } from "~/ui/components/blocks/bento-media-gallery";
import { Button } from "~/ui/primitives/button";

import { DataTable } from "./data-table";
import { DataTableColumnHeader } from "./data-table-column-header";

export type UserWithUploads = User & {
  uploads: MediaUpload[];
};

interface AdminPageClientProps {
  initialData: UserWithUploads[];
}

const AdminPageClient: React.FC<AdminPageClientProps> = ({ initialData }) => {
  const [selectedGalleryItem, setSelectedGalleryItem] =
    useState<GalleryMediaItem | null>(null);
  const [allGalleryItems, setAllGalleryItems] = useState<GalleryMediaItem[]>(
    [],
  );

  // Handler to open the gallery - wrapped in useCallback
  const handleMediaClick = useCallback(
    (item: GalleryMediaItem) => {
      const allUploads = initialData.flatMap((user) =>
        user.uploads.map((upload: MediaUpload) => ({
          desc: `Uploaded by ${user.name || "Unknown"} on ${new Date(upload.createdAt).toLocaleDateString()}`,
          id: upload.id,
          span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2", // Default span value
          title: `${upload.type === "image" ? "Image" : "Video"} ${upload.key.substring(0, 8)}...`,
          type: upload.type as "image" | "video",
          url: upload.url,
        })),
      );
      setAllGalleryItems(allUploads);
      setSelectedGalleryItem(item);
    },
    [initialData],
  );

  const columns = useMemo(
    (): ColumnDef<UserWithUploads>[] => [
      {
        accessorKey: "id",
        filterFn: filterFn("text"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User ID" />
        ),
        meta: defineMeta((row: UserWithUploads) => row.id, {
          displayName: "User ID",
          icon: Hash,
          type: "text",
        }) as ColumnMeta<UserWithUploads, unknown>,
      },
      {
        accessorKey: "name",
        filterFn: filterFn("text"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        meta: defineMeta((row: UserWithUploads) => row.name, {
          displayName: "Name",
          icon: UserIcon,
          type: "text",
        }) as ColumnMeta<UserWithUploads, unknown>,
      },
      {
        accessorKey: "email",
        filterFn: filterFn("text"),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        meta: defineMeta((row: UserWithUploads) => row.email, {
          displayName: "Email",
          icon: Mail,
          type: "text",
        }) as ColumnMeta<UserWithUploads, unknown>,
      },
      {
        cell: ({ row }) => {
          const user = row.original;
          const uploads = user.uploads;

          if (!uploads || uploads.length === 0) {
            return <span className="text-muted-foreground">No uploads</span>;
          }

          return (
            <div className="flex flex-wrap gap-2">
              {uploads.map((upload: MediaUpload) => {
                const galleryItem: GalleryMediaItem = {
                  desc: `Uploaded by ${user.name || "Unknown"} on ${new Date(upload.createdAt).toLocaleDateString()}`,
                  id: upload.id,
                  span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2", // Default span value
                  title: `${upload.type === "image" ? "Image" : "Video"} ${upload.key.substring(0, 8)}...`,
                  type: upload.type as "image" | "video",
                  url: upload.url,
                };
                return (
                  <Button
                    className="h-auto p-1"
                    key={upload.id}
                    onClick={() => handleMediaClick(galleryItem)}
                    size="sm"
                    variant="outline"
                  >
                    {upload.type === "image" ? (
                      <img
                        alt={upload.key}
                        className="h-8 w-8 rounded-sm object-cover"
                        loading="lazy"
                        src={upload.url}
                      />
                    ) : (
                      <div
                        className={`
                          flex h-8 w-8 items-center justify-center rounded-sm
                          bg-muted
                        `}
                      >
                        <svg
                          aria-labelledby={`video-icon-title-${upload.id}`}
                          className="h-4 w-4 text-muted-foreground"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title id={`video-icon-title-${upload.id}`}>
                            Video Upload
                          </title>
                          <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-15Zm-1.5 3a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-9Zm8.03 1.03a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h3.94a.75.75 0 0 0 0-1.5h-3.94l1.72-1.72a.75.75 0 0 0 0-1.06Z" />
                        </svg>
                      </div>
                    )}
                  </Button>
                );
              })}
            </div>
          );
        },
        header: "Uploads",
        id: "uploads",
      },
    ],
    [handleMediaClick],
  );

  // Render the gallery only when an item is selected
  const galleryTitle = selectedGalleryItem
    ? `${selectedGalleryItem.type === "image" ? "Image" : "Video"} Details`
    : "Media Gallery";
  const galleryDescription = selectedGalleryItem
    ? selectedGalleryItem.desc
    : "Browse all uploaded media.";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Users</h1>
      <DataTable columns={columns} data={initialData} />

      {selectedGalleryItem && (
        <BentoMediaGallery
          description={galleryDescription}
          mediaItems={allGalleryItems}
          title={galleryTitle}
        />
      )}
    </div>
  );
};

export default AdminPageClient;
