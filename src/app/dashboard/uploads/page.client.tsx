"use client";

import { AlertCircle, Link as LinkIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { MediaUpload } from "~/db/schema/uploads/types";
import { UploadButton } from "~/lib/uploadthing";
import BentoMediaGallery, {
  type GalleryMediaItem,
} from "~/ui/components/blocks/interactive-bento-gallery";
import { Alert, AlertDescription, AlertTitle } from "~/ui/primitives/alert";
import { Button } from "~/ui/primitives/button";
import { Input } from "~/ui/primitives/input";
import { Skeleton } from "~/ui/primitives/skeleton";

export default function UploadsPageClient() {
  const [mediaGalleryItems, setMediaGalleryItems] = useState<
    GalleryMediaItem[]
  >([]);
  const [isMediaLoading, setIsMediaLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        id: upload.id,
        type: upload.type,
        title: `${upload.type === "image" ? "Image" : "Video"} ${upload.key.substring(0, 8)}...`,
        desc: `Uploaded on ${new Date(upload.createdAt).toLocaleDateString()}`,
        url: upload.url,
        span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
      }));
      setMediaGalleryItems(formattedItems);
    } catch (err) {
      console.error(err);
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: mediaUrlInput }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message: string };
        throw new Error(errorData.message || "Failed to upload URL");
      }

      setMediaUrlInput("");
      void loadMediaGallery();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error ? err.message : "Failed to upload from URL",
      );
    } finally {
      setIsUploadingFromUrl(false);
    }
  };

  const deleteMediaItem = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this media?")) {
      return;
    }

    try {
      const response = await fetch("/api/media", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as { message: string };
        throw new Error(errorData.message || "Failed to delete media");
      }

      setMediaGalleryItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
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
              alert(`Image Upload ERROR! ${uploadError.message}`);
            }}
          />
          <UploadButton
            endpoint="videoUploader"
            onClientUploadComplete={(res) => {
              console.log("Video(s) uploaded: ", res);
              void loadMediaGallery();
            }}
            onUploadError={(uploadError: Error) => {
              alert(`Video Upload ERROR! ${uploadError.message}`);
            }}
          />
        </div>
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="url"
              placeholder="Enter media URL (image or video)..."
              value={mediaUrlInput}
              onChange={(e) => setMediaUrlInput(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button
            onClick={uploadMediaFromUrl}
            disabled={!mediaUrlInput || isUploadingFromUrl}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={`skeleton-${i}`}
                className="aspect-square w-full rounded-md"
              />
            ))}
          </div>
        ) : mediaGalleryItems.length > 0 ? (
          <BentoMediaGallery
            mediaItems={mediaGalleryItems}
            title="Your Uploaded Media"
            description="Explore your uploaded images and videos below."
            onDelete={deleteMediaItem}
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
