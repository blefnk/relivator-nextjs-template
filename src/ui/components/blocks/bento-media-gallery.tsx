"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import React, {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

import { Button } from "~/ui/primitives/button";

export interface GalleryMediaItem {
  desc: string;
  id: number | string;
  span: string;
  title: string;
  type: "image" | "video";
  url: string;
}

interface GalleryMediaProps {
  className?: string;
  isThumbnail?: boolean;
  item: GalleryMediaItem;
  onClick?: React.MouseEventHandler;
  onClose?: () => void;
  onDelete?: (id: number | string) => void;
}

const GalleryMedia: React.FC<GalleryMediaProps> = React.memo(
  ({ className, isThumbnail = false, item, onClick, onClose, onDelete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoInViewport, setIsVideoInViewport] = useState(false);
    const [videoIsBuffering, setVideoIsBuffering] = useState(true);
    const [imgError, setImgError] = useState(false);

    // Intersection Observer for video
    useEffect(() => {
      if (item.type !== "video") return;
      const video = videoRef.current;
      if (!video) return;

      const observer = new window.IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setIsVideoInViewport(entry.isIntersecting);
          }
        },
        { root: null, rootMargin: "50px", threshold: 0.1 },
      );
      observer.observe(video);

      return () => {
        observer.unobserve(video);
      };
    }, [item.type]);

    // Video playback logic
    useEffect(() => {
      if (item.type !== "video") return;
      let mounted = true;
      const video = videoRef.current;
      if (!video) return;

      const handlePlay = async () => {
        if (!isVideoInViewport || !mounted) return;
        try {
          if (video.readyState >= 3) {
            setVideoIsBuffering(false);
            await video.play();
          } else {
            setVideoIsBuffering(true);
            await new Promise((resolve) => {
              video.oncanplay = resolve;
            });
            if (mounted) {
              setVideoIsBuffering(false);
              await video.play();
            }
          }
        } catch {
          setVideoIsBuffering(false);
          toast.error("Failed to buffer video");
        }
      };

      if (isVideoInViewport) {
        handlePlay();
      } else {
        video.pause();
      }

      return () => {
        mounted = false;
        video.pause();
        video.removeAttribute("src");
        video.load();
      };
    }, [isVideoInViewport, item.type]);

    // Handlers
    const handleDelete = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        onDelete?.(item.id);
        onClose?.();
      },
      [onDelete, onClose, item.id],
    );

    const handleImgError = useCallback(() => {
      setImgError(true);
    }, []);

    // Render
    if (item.type === "video") {
      return (
        <div
          className={`
            ${className}
            group relative flex items-center justify-center overflow-hidden
            bg-black/10
          `}
        >
          {!isThumbnail && (onDelete || onClose) && (
            <div className="absolute top-2 right-2 z-30 flex flex-row gap-2">
              {onDelete && (
                <Button
                  aria-label="Delete video"
                  className={`
                    bg-red-500/80 transition-colors
                    hover:bg-red-500
                  `}
                  onClick={handleDelete}
                  size="icon"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </Button>
              )}
              {onClose && (
                <Button
                  aria-label="Close preview"
                  className={`
                    bg-white/80 text-gray-800 shadow-sm backdrop-blur-sm
                    hover:bg-white
                  `}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  size="icon"
                  variant="ghost"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          <video
            aria-label={item.title}
            className="h-full max-h-full w-full max-w-full object-contain"
            controls={!isThumbnail}
            loop
            muted={isThumbnail}
            onClick={onClick}
            playsInline
            preload="auto"
            ref={videoRef}
            style={{
              opacity: videoIsBuffering ? 0.8 : 1,
              transform: "translateZ(0)",
              transition: "opacity 0.2s",
              willChange: "transform",
            }}
            tabIndex={0}
          >
            <source src={item.url} type="video/mp4" />
            <track kind="captions" label="English" srcLang="en" />
            Your browser does not support the video tag.
          </video>
          {videoIsBuffering && (
            <div
              className={`
                absolute inset-0 flex items-center justify-center bg-black/10
              `}
            >
              <div
                className={`
                  h-6 w-6 animate-spin rounded-full border-2 border-white/30
                  border-t-white
                `}
              />
            </div>
          )}
        </div>
      );
    }

    // Image fallback
    return (
      <div
        className={`
          ${className}
          group relative flex items-center justify-center overflow-hidden
          bg-black/10
        `}
      >
        {!isThumbnail && (onDelete || onClose) && (
          <div className="absolute top-2 right-2 z-30 flex flex-row gap-2">
            {onDelete && (
              <Button
                aria-label="Delete image"
                className={`
                  bg-red-500/80 transition-colors
                  hover:bg-red-500
                `}
                onClick={handleDelete}
                size="icon"
                variant="destructive"
              >
                <Trash2 className="h-4 w-4 text-white" />
              </Button>
            )}
            {onClose && (
              <Button
                aria-label="Close preview"
                className={`
                  bg-white/80 text-gray-800 shadow-sm backdrop-blur-sm
                  hover:bg-white
                `}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                size="icon"
                variant="ghost"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
        {imgError ? (
          <div
            className={`
              flex h-full w-full items-center justify-center bg-gray-200
              text-gray-500
            `}
          >
            <span>Image not available</span>
          </div>
        ) : (
          <img
            alt={item.title}
            aria-label={item.title}
            className="max-h-full max-w-full cursor-pointer object-contain"
            decoding="async"
            loading="lazy"
            onClick={onClick}
            onError={handleImgError}
            src={item.url}
          />
        )}
      </div>
    );
  },
);

interface GalleryMediaModalProps {
  isOpen: boolean;
  mediaItems: GalleryMediaItem[];
  onClose: () => void;
  onDelete?: (id: number | string) => void;
  selectedItem: GalleryMediaItem;
  setSelectedItem: (item: GalleryMediaItem | null) => void;
}

const GalleryMediaModal: React.FC<GalleryMediaModalProps> = ({
  isOpen,
  mediaItems,
  onClose,
  onDelete,
  selectedItem,
  setSelectedItem,
}) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);

  const navigateToMediaItem = useCallback(
    (direction: "next" | "prev") => {
      const currentIndex = mediaItems.findIndex(
        (item) => item.id === selectedItem.id,
      );
      let newIndex: number;
      if (direction === "next") {
        newIndex =
          currentIndex === mediaItems.length - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex =
          currentIndex === 0 ? mediaItems.length - 1 : currentIndex - 1;
      }
      setSelectedItem(mediaItems[newIndex]);
    },
    [mediaItems, selectedItem, setSelectedItem],
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        navigateToMediaItem("prev");
      } else if (event.key === "ArrowRight") {
        navigateToMediaItem("next");
      } else if (
        (event.key === "f" || event.key === "F") &&
        selectedItem.type === "video"
      ) {
        const videoElement = modalContainerRef.current?.querySelector("video");
        if (
          videoElement &&
          typeof videoElement.requestFullscreen === "function"
        ) {
          videoElement.requestFullscreen().catch(() => {
            toast.error("Failed to enter fullscreen mode");
          });
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, navigateToMediaItem, selectedItem]);

  if (!isOpen) return null;

  return (
    <>
      <motion.div
        animate={{ scale: 1 }}
        aria-modal="true"
        className={`
          fixed inset-0 z-10 min-h-screen w-full overflow-hidden rounded-none
          backdrop-blur-lg
          sm:h-[90vh] sm:rounded-lg
          md:h-[600px] md:rounded-xl
        `}
        exit={{ scale: 0.98 }}
        initial={{ scale: 0.98 }}
        ref={modalContainerRef}
        role="dialog"
        transition={{ damping: 30, stiffness: 400, type: "spring" }}
      >
        <div className="flex h-full flex-col">
          <div
            className={`
              flex flex-1 items-center justify-center bg-gray-900/50 p-2
              sm:p-3
              md:p-4
            `}
          >
            <motion.button
              aria-label="Previous media"
              className={`
                absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full
                bg-white/80 p-2 text-gray-800 shadow-sm backdrop-blur-sm
                hover:bg-white/90
              `}
              onClick={() => navigateToMediaItem("prev")}
              tabIndex={0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </motion.button>
            <motion.button
              aria-label="Next media"
              className={`
                absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full
                bg-white/80 p-2 text-gray-800 shadow-sm backdrop-blur-sm
                hover:bg-white/90
              `}
              onClick={() => navigateToMediaItem("next")}
              tabIndex={0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} strokeWidth={2} />
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.div
                animate={{
                  scale: 1,
                  transition: {
                    damping: 30,
                    mass: 0.5,
                    stiffness: 500,
                    type: "spring",
                  },
                  y: 0,
                }}
                className={`
                  relative aspect-[16/9] h-auto max-h-[70vh] w-full max-w-[95%]
                  overflow-hidden rounded-lg shadow-md
                  sm:max-w-[85%]
                  md:max-w-3xl
                `}
                exit={{
                  scale: 0.97,
                  transition: { duration: 0.15 },
                  y: 20,
                }}
                initial={{ scale: 0.97, y: 20 }}
                key={selectedItem.id}
                onClick={onClose}
                tabIndex={-1}
              >
                <GalleryMedia
                  className="h-full w-full object-contain"
                  isThumbnail={false}
                  item={selectedItem}
                  onClick={(e) => e.stopPropagation()}
                  onClose={onClose}
                  onDelete={onDelete}
                />
                <div
                  className={`
                    absolute right-0 bottom-0 left-0 bg-gradient-to-t
                    from-black/50 to-transparent p-2
                    sm:p-3
                    md:p-4
                  `}
                >
                  <h3
                    className={`
                      text-base font-semibold text-white
                      sm:text-lg
                      md:text-xl
                    `}
                  >
                    {selectedItem.title}
                  </h3>
                  <p
                    className={`
                      mt-1 text-xs text-white/80
                      sm:text-sm
                    `}
                  >
                    {selectedItem.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <motion.button
          aria-label="Close gallery view"
          className={`
            absolute top-2 right-2 z-20 rounded-full bg-white/80 p-2
            text-gray-800 shadow-sm backdrop-blur-sm
            hover:bg-white/90
            sm:top-2.5 sm:right-2.5
            md:top-3 md:right-3
          `}
          onClick={onClose}
          tabIndex={0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} strokeWidth={2} />
        </motion.button>
      </motion.div>
      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
        <div
          className={`
            relative rounded-xl border border-blue-400/30 bg-sky-400/20 px-3
            py-2 shadow-lg backdrop-blur-xl
          `}
        >
          <div className="flex items-center -space-x-2">
            {mediaItems.map((item, index) => (
              <motion.div
                animate={{
                  scale: selectedItem.id === item.id ? 1.2 : 1,
                  y: selectedItem.id === item.id ? -8 : 0,
                }}
                aria-label={`Select ${item.title}`}
                className={`
                  group relative h-8 w-8 flex-shrink-0 cursor-pointer
                  overflow-hidden rounded-lg
                  hover:z-20
                  sm:h-9 sm:w-9
                  md:h-10 md:w-10
                  ${
                    selectedItem.id === item.id
                      ? "shadow-lg ring-2 ring-white/70"
                      : "hover:ring-2 hover:ring-white/30"
                  }
                `}
                initial={false}
                key={item.id}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedItem(item);
                  }
                }}
                style={{
                  zIndex:
                    selectedItem.id === item.id
                      ? 30
                      : mediaItems.length - index,
                }}
                tabIndex={0}
                whileHover={{
                  scale: 1.3,
                  transition: { damping: 25, stiffness: 400, type: "spring" },
                  y: -10,
                }}
              >
                <GalleryMedia
                  className="h-full w-full"
                  isThumbnail={true}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                  onClose={onClose}
                  onDelete={onDelete}
                />
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-b from-transparent
                    via-white/5 to-white/20
                  `}
                />
                {selectedItem.id === item.id && (
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="absolute -inset-2 bg-white/20 blur-xl"
                    initial={{ opacity: 0 }}
                    layoutId="activeGlow"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

interface BentoMediaGalleryProps {
  description: string;
  mediaItems: GalleryMediaItem[];
  onDelete?: (id: number | string) => void;
  title: string;
}

export const BentoMediaGallery: React.FC<BentoMediaGalleryProps> = ({
  description,
  mediaItems,
  onDelete,
  title,
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryMediaItem | null>(
    null,
  );

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className={`
            bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text
            text-2xl font-bold text-transparent
            sm:text-3xl
            md:text-4xl
            dark:from-white dark:via-gray-200 dark:to-white
          `}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className={`
            mt-2 text-sm text-gray-600
            sm:text-base
            dark:text-gray-400
          `}
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {description}
        </motion.p>
      </div>
      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryMediaModal
            isOpen={true}
            mediaItems={mediaItems}
            onClose={() => setSelectedItem(null)}
            onDelete={onDelete}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <motion.div
            animate="visible"
            className={`
              grid auto-rows-[60px] grid-cols-1 gap-3
              sm:grid-cols-3
              md:grid-cols-4
            `}
            exit="hidden"
            initial="hidden"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {mediaItems.map((item, index) => (
              <motion.div
                aria-label={`Open ${item.title}`}
                className={`
                  relative cursor-pointer overflow-hidden rounded-xl
                  ${item.span}
                `}
                key={item.id}
                layoutId={`media-${item.id}`}
                onClick={() => setSelectedItem(item)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedItem(item);
                  }
                }}
                tabIndex={0}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 50 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      damping: 25,
                      delay: index * 0.05,
                      stiffness: 350,
                      type: "spring",
                    },
                    y: 0,
                  },
                }}
                whileHover={{ scale: 1.02 }}
              >
                <GalleryMedia
                  className="absolute inset-0 h-full w-full"
                  isThumbnail={true}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                  onClose={() => setSelectedItem(null)}
                  onDelete={onDelete}
                />
                <motion.div
                  className={`
                    absolute inset-0 flex flex-col justify-end p-2
                    sm:p-3
                    md:p-4
                  `}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ opacity: 1 }}
                >
                  <div
                    className={`
                      absolute inset-0 flex flex-col justify-end p-2
                      sm:p-3
                      md:p-4
                    `}
                  >
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-t from-black/80
                        via-black/40 to-transparent
                      `}
                    />
                    <h3
                      className={`
                        relative line-clamp-1 text-xs font-medium text-white
                        sm:text-sm
                        md:text-base
                      `}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`
                        relative mt-0.5 line-clamp-2 text-[10px] text-white/70
                        sm:text-xs
                        md:text-sm
                      `}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
