"use client";

import type { ColumnDef, ColumnMeta } from "@tanstack/react-table";
import { Hash, Mail, User as UserIcon } from "lucide-react";
import type React from "react";
import { useCallback, useMemo, useState } from "react";
import type { MediaUpload } from "~/db/schema/uploads/types";
import type { User } from "~/db/schema/users/types";
import { defineMeta, filterFn } from "~/lib/filters";
import BentoMediaGallery, {
  type GalleryMediaItem,
} from "~/ui/components/blocks/interactive-bento-gallery";
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
          id: upload.id,
          type: upload.type as "image" | "video",
          title: `${upload.type === "image" ? "Image" : "Video"} ${upload.key.substring(0, 8)}...`,
          desc: `Uploaded by ${user.name || "Unknown"} on ${new Date(upload.createdAt).toLocaleDateString()}`,
          url: upload.url,
          span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2", // Default span value
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
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="User ID" />
        ),
        filterFn: filterFn("text"),
        meta: defineMeta((row: UserWithUploads) => row.id, {
          displayName: "User ID",
          type: "text",
          icon: Hash,
        }) as ColumnMeta<UserWithUploads, unknown>,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        filterFn: filterFn("text"),
        meta: defineMeta((row: UserWithUploads) => row.name, {
          displayName: "Name",
          type: "text",
          icon: UserIcon,
        }) as ColumnMeta<UserWithUploads, unknown>,
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Email" />
        ),
        filterFn: filterFn("text"),
        meta: defineMeta((row: UserWithUploads) => row.email, {
          displayName: "Email",
          type: "text",
          icon: Mail,
        }) as ColumnMeta<UserWithUploads, unknown>,
      },
      {
        id: "uploads",
        header: "Uploads",
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
                  id: upload.id,
                  type: upload.type as "image" | "video",
                  title: `${upload.type === "image" ? "Image" : "Video"} ${upload.key.substring(0, 8)}...`,
                  desc: `Uploaded by ${user.name || "Unknown"} on ${new Date(upload.createdAt).toLocaleDateString()}`,
                  url: upload.url,
                  span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2", // Default span value
                };
                return (
                  <Button
                    key={upload.id}
                    variant="outline"
                    size="sm"
                    className="h-auto p-1"
                    onClick={() => handleMediaClick(galleryItem)}
                  >
                    {upload.type === "image" ? (
                      <img
                        src={upload.url}
                        alt={upload.key}
                        className="h-8 w-8 rounded-sm object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className={`
                          flex h-8 w-8 items-center justify-center rounded-sm
                          bg-muted
                        `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 text-muted-foreground"
                          aria-labelledby={`video-icon-title-${upload.id}`}
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
          mediaItems={allGalleryItems}
          title={galleryTitle}
          description={galleryDescription}
        />
      )}
    </div>
  );
};

export default AdminPageClient;
