"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import type * as React from "react";
import type { MediaUpload } from "~/db/schema/uploads/types";
import type { User } from "~/db/schema/users/types";
import type { GalleryMediaItem } from "~/ui/components/blocks/interactive-bento-gallery";
import { Button } from "~/ui/primitives/button";
import { Checkbox } from "~/ui/primitives/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/ui/primitives/dropdown-menu";
import { DataTableColumnHeader } from "./data-table-column-header";

// The shape of the data expected by the table
// Includes user details and their uploads
export type UserWithUploads = User & {
  uploads: MediaUpload[];
};

// Props for the columns, including the click handler for the gallery
interface GetColumnsProps {
  onImageClickAction: (item: GalleryMediaItem) => void;
}

export const getColumns = ({
  onImageClickAction,
}: GetColumnsProps): ColumnDef<UserWithUploads>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={() => table.toggleAllPageRowsSelected()}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={() => row.toggleSelected()}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User ID" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
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
          {uploads.map((upload) => {
            // Prepare the item for the gallery viewer
            const galleryItem: GalleryMediaItem = {
              id: upload.id,
              type: "image",
              title: `Upload ${upload.key.substring(0, 8)}...`,
              desc: `Uploaded by ${user.name} on ${upload.createdAt.toLocaleDateString()}`,
              url: upload.url,
              span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2", // Default span value
            };
            return (
              <Button
                key={upload.id}
                variant="outline"
                size="sm"
                className="h-auto p-1"
                onClick={() => onImageClickAction(galleryItem)}
              >
                <img
                  src={upload.url} // Show a small thumbnail
                  alt={upload.key}
                  className="h-8 w-8 rounded-sm object-cover"
                  loading="lazy"
                />
              </Button>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View user</DropdownMenuItem>
            <DropdownMenuItem>View uploads</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableHiding: false,
  },
];
