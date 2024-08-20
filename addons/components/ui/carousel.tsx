"use client";

import type { ComponentProps, HTMLAttributes, KeyboardEvent } from "react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import type { UseEmblaCarouselType } from "embla-carousel-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import useEmblaCarousel from "embla-carousel-react";

type CarouselApi = UseEmblaCarouselType["1"];

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;

type CarouselOptions = UseCarouselParameters["0"];

type CarouselPlugins = UseCarouselParameters["1"];

type CarouselProps = {
  opts?: CarouselOptions;
  orientation?: "horizontal" | "vertical";
  plugins?: CarouselPlugins;
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  api: ReturnType<typeof useEmblaCarousel>[1];
  canScrollNext: boolean;
  canScrollPrev: boolean;
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = forwardRef<
  HTMLDivElement,
  CarouselProps & HTMLAttributes<HTMLDivElement>
>(
  (
    {
      children,
      className,
      opts,
      orientation = "horizontal",
      plugins,
      setApi,
      ...props
    },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );

    const [canScrollPrevious, setCanScrollPrevious] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }

      setCanScrollPrevious(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrevious = useCallback(() => {
      api && api.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
      api && api.scrollNext();
    }, [api]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrevious();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrevious, scrollNext],
    );

    useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api && api.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      // @ts-expect-error TODO: fix
      <CarouselContext
        value={{
          api: api,
          canScrollNext,
          canScrollPrev: canScrollPrevious,
          carouselRef: carouselRef,
          opts,
          orientation:
            orientation ||
            (opts && opts.axis === "y" ? "vertical" : "horizontal"),
          scrollNext,
          scrollPrev: scrollPrevious,
        }}
      >
        <div
          aria-roledescription="carousel"
          className={cn("relative", className)}
          onKeyDownCapture={handleKeyDown}
          ref={ref}
          role="region"
          {...props}
        >
          {children}
        </div>
      </CarouselContext>
    );
  },
);

Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div className="overflow-hidden" ref={carouselRef}>
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});

CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        ref={ref}
        role="group"
        {...props}
      />
    );
  },
);

CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof Button>
>(({ className, size = "icon", variant = "outline", ...props }, ref) => {
  const { canScrollPrev, orientation, scrollPrev } = useCarousel();

  return (
    <Button
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      ref={ref}
      size={size}
      variant={variant}
      {...props}
    >
      <ArrowLeftIcon className="size-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});

CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = forwardRef<
  HTMLButtonElement,
  ComponentProps<typeof Button>
>(({ className, size = "icon", variant = "outline", ...props }, ref) => {
  const { canScrollNext, orientation, scrollNext } = useCarousel();

  return (
    <Button
      className={cn(
        "absolute size-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      ref={ref}
      size={size}
      variant={variant}
      {...props}
    >
      <ArrowRightIcon className="size-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});

CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
};
