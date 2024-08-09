"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselCards() {
  return (
    <Carousel
      className="w-full max-w-sm"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <CarouselItem
            className={`
              lg:basis-1/3

              md:basis-1/2
            `}
            key={index}
          >
            <div className="p-1">
              <Card>
                <CardContent
                  className={`
                      flex aspect-square items-center justify-center p-6
                    `}
                >
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export { Carousel } from "@/components/ui/carousel";
