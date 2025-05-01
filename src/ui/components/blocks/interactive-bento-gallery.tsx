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
        className={`${className} relative overflow-hidden bg-black/10 flex items-center justify-center group`}
      >
        {!isThumbnail && onDelete && (
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 z-30 bg-red-500/80 hover:bg-red-500 transition-colors"
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
          className="w-full h-full object-contain max-w-full max-h-full"
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
          <div className="absolute inset-0 flex items-center justify-center bg-black/10">
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  }
  return (
    <div
      className={`${className} relative overflow-hidden bg-black/10 flex items-center justify-center group`}
    >
      {!isThumbnail && onDelete && (
        <Button
          variant="destructive"
          size="icon"
          className="absolute top-2 right-2 z-30 bg-red-500/80 hover:bg-red-500 transition-colors"
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
        className="object-contain cursor-pointer max-w-full max-h-full"
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
        className="fixed inset-0 w-full min-h-screen sm:h-[90vh] md:h-[600px] backdrop-blur-lg rounded-none sm:rounded-lg md:rounded-xl overflow-hidden z-10"
      >
        <div className="h-full flex flex-col">
          <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center bg-gray-900/50">
            <motion.button
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white/90 text-gray-800 backdrop-blur-sm z-20 shadow-sm"
              onClick={() => navigateToMediaItem("prev")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} strokeWidth={2} />
            </motion.button>
            <motion.button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white/90 text-gray-800 backdrop-blur-sm z-20 shadow-sm"
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
                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-3xl h-auto max-h-[70vh] rounded-lg overflow-hidden shadow-md"
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
                  className="w-full h-full object-contain"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onDelete={onDelete}
                  isThumbnail={false}
                />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/50 to-transparent">
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">
                    {selectedItem.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mt-1">
                    {selectedItem.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <motion.button
          className="absolute top-2 sm:top-2.5 md:top-3 right-2 sm:right-2.5 md:right-3 p-2 rounded-full bg-white/80 hover:bg-white/90 text-gray-800 backdrop-blur-sm z-20 shadow-sm"
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close gallery view"
        >
          <X size={20} strokeWidth={2} />
        </motion.button>
      </motion.div>
      <div className="fixed z-50 left-1/2 bottom-4 -translate-x-1/2">
        <div className="relative rounded-xl bg-sky-400/20 backdrop-blur-xl border border-blue-400/30 shadow-lg px-3 py-2">
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
                  relative group
                  w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0 
                  rounded-lg overflow-hidden 
                  cursor-pointer hover:z-20
                  ${
                    selectedItem.id === item.id
                      ? "ring-2 ring-white/70 shadow-lg"
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
                  className="w-full h-full"
                  onClick={() => setSelectedItem(item)}
                  onDelete={onDelete}
                  isThumbnail={true}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
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
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[60px]"
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
                className={`relative overflow-hidden rounded-xl cursor-pointer ${item.span}`}
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
                  className="absolute inset-0 w-full h-full"
                  onClick={() => setSelectedItem(item)}
                  onDelete={onDelete}
                  isThumbnail={true}
                />
                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
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
