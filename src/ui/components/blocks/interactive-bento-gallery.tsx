"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "~/ui/primitives/button";

interface GalleryMediaItem {
  id: number | string;
  type: string;
  title: string;
  desc: string;
  url: string;
  span: string;
}

const GalleryMedia = ({
  item,
  className,
  onClick,
  onDelete,
  isThumbnail = false,
}: {
  item: GalleryMediaItem;
  className?: string;
  onClick?: React.MouseEventHandler;
  onDelete?: (id: string | number) => void;
  isThumbnail?: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoInViewport, setIsVideoInViewport] = useState(false);
  const [videoIsBuffering, setVideoIsBuffering] = useState(true);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        setIsVideoInViewport(entry.isIntersecting);
      }
    }, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    const handleVideoPlay = async () => {
      if (!videoRef.current || !isVideoInViewport || !mounted) return;
      try {
        if (videoRef.current.readyState >= 3) {
          setVideoIsBuffering(false);
          await videoRef.current.play();
        } else {
          setVideoIsBuffering(true);
          await new Promise((resolve) => {
            if (videoRef.current) {
              videoRef.current.oncanplay = resolve;
            }
          });
          if (mounted) {
            setVideoIsBuffering(false);
            await videoRef.current.play();
          }
        }
      } catch (error) {
        console.warn("Video playback failed:", error);
      }
    };
    if (isVideoInViewport) {
      handleVideoPlay();
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
    return () => {
      mounted = false;
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.removeAttribute("src");
        videoRef.current.load();
      }
    };
  }, [isVideoInViewport]);
  const handleMediaClick: React.MouseEventHandler = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  if (item.type === "video") {
    return (
      <div
        className={`
          ${className}
          group relative flex items-center justify-center overflow-hidden
          bg-black/10
        `}
      >
        {!isThumbnail && onDelete && (
          <Button
            variant="destructive"
            size="icon"
            className={`
              absolute top-2 right-2 z-30 bg-red-500/80 transition-colors
              hover:bg-red-500
            `}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item.id);
            }}
          >
            <Trash2 className="h-4 w-4 text-white" />
          </Button>
        )}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
        <video
          ref={videoRef}
          className="h-full max-h-full w-full max-w-full object-contain"
          onClick={handleMediaClick}
          playsInline
          muted={isThumbnail}
          loop
          preload="auto"
          controls={!isThumbnail}
          style={{
            opacity: videoIsBuffering ? 0.8 : 1,
            transition: "opacity 0.2s",
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <source src={item.url} type="video/mp4" />
          <track kind="captions" srcLang="en" label="English" />
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
  return (
    <div
      className={`
        ${className}
        group relative flex items-center justify-center overflow-hidden
        bg-black/10
      `}
    >
      {!isThumbnail && onDelete && (
        <Button
          variant="destructive"
          size="icon"
          className={`
            absolute top-2 right-2 z-30 bg-red-500/80 transition-colors
            hover:bg-red-500
          `}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
        >
          <Trash2 className="h-4 w-4 text-white" />
        </Button>
      )}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <img
        src={item.url}
        alt={item.title}
        className="max-h-full max-w-full cursor-pointer object-contain"
        onClick={handleMediaClick}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
};
interface GalleryMediaModalProps {
  selectedItem: GalleryMediaItem;
  isOpen: boolean;
  onClose: () => void;
  setSelectedItem: (item: GalleryMediaItem | null) => void;
  mediaItems: GalleryMediaItem[];
  onDelete?: (id: string | number) => void;
}
const GalleryMediaModal = ({
  selectedItem,
  isOpen,
  onClose,
  setSelectedItem,
  mediaItems,
  onDelete,
}: GalleryMediaModalProps) => {
  const navigateToMediaItem = useCallback(
    (direction: "next" | "prev") => {
      const currentIndex = mediaItems.findIndex(
        (item: GalleryMediaItem) => item.id === selectedItem.id,
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
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        navigateToMediaItem("prev");
      } else if (event.key === "ArrowRight") {
        navigateToMediaItem("next");
      } else if (event.key === "f" || event.key === "F") {
        if (selectedItem.type === "video") {
          const videoElement =
            modalContainerRef.current?.querySelector("video");
          if (
            videoElement &&
            typeof videoElement.requestFullscreen === "function"
          ) {
            videoElement.requestFullscreen().catch((err) => {
              if (err instanceof Error) {
                console.error(
                  `Error attempting to enable full-screen mode: ${err.message} (${err.name})`,
                );
              } else {
                console.error(
                  "An unknown error occurred while attempting to enable full-screen mode.",
                );
              }
            });
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, navigateToMediaItem, selectedItem]);
  if (!isOpen) return null;
  return (
    <>
      <motion.div
        ref={modalContainerRef}
        initial={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.98 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        className={`
          fixed inset-0 z-10 min-h-screen w-full overflow-hidden rounded-none
          backdrop-blur-lg
          sm:h-[90vh] sm:rounded-lg
          md:h-[600px] md:rounded-xl
        `}
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
              className={`
                absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full
                bg-white/80 p-2 text-gray-800 shadow-sm backdrop-blur-sm
                hover:bg-white/90
              `}
              onClick={() => navigateToMediaItem("prev")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </motion.button>
            <motion.button
              className={`
                absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full
                bg-white/80 p-2 text-gray-800 shadow-sm backdrop-blur-sm
                hover:bg-white/90
              `}
              onClick={() => navigateToMediaItem("next")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next image"
            >
              <ChevronRight size={24} strokeWidth={2} />
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                className={`
                  relative aspect-[16/9] h-auto max-h-[70vh] w-full max-w-[95%]
                  overflow-hidden rounded-lg shadow-md
                  sm:max-w-[85%]
                  md:max-w-3xl
                `}
                initial={{ y: 20, scale: 0.97 }}
                animate={{
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    mass: 0.5,
                  },
                }}
                exit={{
                  y: 20,
                  scale: 0.97,
                  transition: { duration: 0.15 },
                }}
                onClick={onClose}
              >
                <GalleryMedia
                  item={selectedItem}
                  className="h-full w-full object-contain"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onDelete={onDelete}
                  isThumbnail={false}
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
          className={`
            absolute top-2 right-2 z-20 rounded-full bg-white/80 p-2
            text-gray-800 shadow-sm backdrop-blur-sm
            hover:bg-white/90
            sm:top-2.5 sm:right-2.5
            md:top-3 md:right-3
          `}
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close gallery view"
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
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  zIndex:
                    selectedItem.id === item.id
                      ? 30
                      : mediaItems.length - index,
                }}
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
                animate={{
                  scale: selectedItem.id === item.id ? 1.2 : 1,
                  y: selectedItem.id === item.id ? -8 : 0,
                }}
                whileHover={{
                  scale: 1.3,
                  y: -10,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <GalleryMedia
                  item={item}
                  className="h-full w-full"
                  onClick={() => setSelectedItem(item)}
                  onDelete={onDelete}
                  isThumbnail={true}
                />
                <div
                  className={`
                    absolute inset-0 bg-gradient-to-b from-transparent
                    via-white/5 to-white/20
                  `}
                />
                {selectedItem.id === item.id && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute -inset-2 bg-white/20 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
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
  mediaItems: GalleryMediaItem[];
  title: string;
  description: string;
  onDelete?: (id: string | number) => void;
}
const BentoMediaGallery: React.FC<BentoMediaGalleryProps> = ({
  mediaItems,
  title,
  description,
  onDelete,
}) => {
  const [selectedItem, setSelectedItem] = useState<GalleryMediaItem | null>(
    null,
  );
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <motion.h1
          className={`
            bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text
            text-2xl font-bold text-transparent
            sm:text-3xl
            md:text-4xl
            dark:from-white dark:via-gray-200 dark:to-white
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className={`
            mt-2 text-sm text-gray-600
            sm:text-base
            dark:text-gray-400
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {description}
        </motion.p>
      </div>
      <AnimatePresence mode="wait">
        {selectedItem ? (
          <GalleryMediaModal
            selectedItem={selectedItem}
            isOpen={true}
            onClose={() => setSelectedItem(null)}
            setSelectedItem={setSelectedItem}
            mediaItems={mediaItems}
            onDelete={onDelete}
          />
        ) : (
          <motion.div
            className={`
              grid auto-rows-[60px] grid-cols-1 gap-3
              sm:grid-cols-3
              md:grid-cols-4
            `}
            initial="hidden"
            animate="visible"
            exit="hidden"
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
                key={item.id}
                layoutId={`media-${item.id}`}
                className={`
                  relative cursor-pointer overflow-hidden rounded-xl
                  ${item.span}
                `}
                onClick={() => setSelectedItem(item)}
                variants={{
                  hidden: { y: 50, scale: 0.9, opacity: 0 },
                  visible: {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 350,
                      damping: 25,
                      delay: index * 0.05,
                    },
                  },
                }}
                whileHover={{ scale: 1.02 }}
              >
                <GalleryMedia
                  item={item}
                  className="absolute inset-0 h-full w-full"
                  onClick={() => setSelectedItem(item)}
                  onDelete={onDelete}
                  isThumbnail={true}
                />
                <motion.div
                  className={`
                    absolute inset-0 flex flex-col justify-end p-2
                    sm:p-3
                    md:p-4
                  `}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
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
export type { GalleryMediaItem };
export default BentoMediaGallery;
