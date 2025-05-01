"use client";

import { AlertCircle, Link as LinkIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import type { MediaUpload } from "~/db/schema/uploads/types";
import type { GalleryMediaItem } from "~/ui/components/blocks/bento-media-gallery";

import { UploadButton } from "~/lib/uploadthing";
import { BentoMediaGallery } from "~/ui/components/blocks/bento-media-gallery";
import { Alert, AlertDescription, AlertTitle } from "~/ui/primitives/alert";
import { Button } from "~/ui/primitives/button";
import { Input } from "~/ui/primitives/input";
import { Skeleton } from "~/ui/primitives/skeleton";

export default function UploadsPageClient() {
  const [mediaGalleryItems, setMediaGalleryItems] = useState<
    GalleryMediaItem[]
  >([]);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [mediaUrlInput, setMediaUrlInput] = useState("");
  const [isUploadingFromUrl, setIsUploadingFromUrl] = useState(false);

  const loadMediaGallery = useCallback(async () => {
    setIsMediaLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/media");
      if (!response.ok) {
        throw new Error(`Failed to fetch media: ${response.statusText}`);
      }
      const data = (await response.json()) as (MediaUpload & {
        type: "image" | "video";
      })[];
      const formattedItems = data.map((upload) => ({
        desc: `Uploaded on ${new Date(upload.createdAt).toLocaleDateString()}`,
        id: upload.id,
        span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
        title: `${upload.type === "image" ? "Image" : "Video"} ${upload.key.substring(0, 8)}...`,
        type: upload.type,
        url: upload.url,
      }));
      setMediaGalleryItems(formattedItems);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load media");
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setIsMediaLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadMediaGallery();
  }, [loadMediaGallery]);

  const uploadMediaFromUrl = async () => {
    if (!mediaUrlInput) return;

    setIsUploadingFromUrl(true);
    setError(null);

    try {
      const response = await fetch("/api/media/url-upload", {
        body: JSON.stringify({ url: mediaUrlInput }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message: string };
        throw new Error(errorData.message || "Failed to upload URL");
      }

      setMediaUrlInput("");
      void loadMediaGallery();
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload from URL");
      setError(
        err instanceof Error ? err.message : "Failed to upload from URL",
      );
    } finally {
      setIsUploadingFromUrl(false);
    }
  };

  const deleteMediaItem = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this media?")) {
      return;
    }

    try {
      const response = await fetch("/api/media", {
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message: string };
        throw new Error(errorData.message || "Failed to delete media");
      }

      setMediaGalleryItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete media");
      setError(err instanceof Error ? err.message : "Failed to delete media");
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex gap-4">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              console.log("Image(s) uploaded: ", res);
              void loadMediaGallery();
            }}
            onUploadError={(uploadError: Error) => {
              toast.error(`Image Upload ERROR! ${uploadError.message}`);
            }}
          />
          <UploadButton
            endpoint="videoUploader"
            onClientUploadComplete={(res) => {
              console.log("Video(s) uploaded: ", res);
              void loadMediaGallery();
            }}
            onUploadError={(uploadError: Error) => {
              toast.error(`Video Upload ERROR! ${uploadError.message}`);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <LinkIcon
              className={`
                absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform
                text-muted-foreground
              `}
            />
            <Input
              className="pl-8"
              onChange={(e) => setMediaUrlInput(e.target.value)}
              placeholder="Enter media URL (image or video)..."
              type="url"
              value={mediaUrlInput}
            />
          </div>
          <Button
            disabled={!mediaUrlInput || isUploadingFromUrl}
            onClick={uploadMediaFromUrl}
          >
            {isUploadingFromUrl ? "Uploading..." : "Upload URL"}
          </Button>
        </div>
      </div>
      <div>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isMediaLoading ? (
          <div
            className={`
              grid grid-cols-1 gap-4
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
            `}
          >
            {[...Array(4)].map((_, i) => (
              <Skeleton
                className="aspect-square w-full rounded-md"
                key={`skeleton-${i}`}
              />
            ))}
          </div>
        ) : mediaGalleryItems.length > 0 ? (
          <BentoMediaGallery
            description="Explore your uploaded images and videos below."
            mediaItems={mediaGalleryItems}
            onDelete={deleteMediaItem}
            title="Your Uploaded Media"
          />
        ) : (
          !error && (
            <p className="text-muted-foreground">No media uploaded yet.</p>
          )
        )}
      </div>
    </div>
  );
}
