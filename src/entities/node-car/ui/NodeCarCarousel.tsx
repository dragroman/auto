"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@shared/ui/carousel"
import Image from "next/image"
import { DrupalMedia } from "next-drupal"
import { absoluteUrl } from "@shared/lib/utils"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { useState, useEffect } from "react"

export function NodeCarCarousel({ images }: { images?: DrupalMedia[] }) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  const [open, setOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const slides = [
    ...(images ?? []).map((image) => ({
      src: absoluteUrl(image.field_media_image.uri.url),
      alt: image.name,
    })),
  ]

  return (
    <>
      <div className="relative w-full">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images &&
              images.map((image, index) => (
                <CarouselItem key={index}>
                  <div
                    className="overflow-hidden flex items-center justify-center max-h-84"
                    onClick={() => {
                      setLightboxIndex(index)
                      setOpen(true)
                    }}
                  >
                    <Image
                      src={absoluteUrl(image.field_media_image.uri.url)}
                      alt={image.name}
                      width={800}
                      height={400}
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute bottom-8 right-4  text-white py-2 px-3 text-lg bg-white/10 backdrop-blur-md rounded">
          {current}/{count}
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={lightboxIndex}
          render={{
            slide: ({ slide, rect }) => {
              const width =
                slide.width && slide.height
                  ? Math.round(
                      Math.min(
                        rect.width,
                        (rect.height / slide.height) * slide.width
                      )
                    )
                  : rect.width

              const height =
                slide.width && slide.height
                  ? Math.round(
                      Math.min(
                        rect.height,
                        (rect.width / slide.width) * slide.height
                      )
                    )
                  : rect.height

              return (
                <Image
                  src={slide.src}
                  alt={slide.alt || ""}
                  width={width}
                  height={height}
                  loading="eager"
                  draggable={false}
                  blurDataURL={(slide as any).blurDataURL}
                  style={{
                    minWidth: 0,
                    minHeight: 0,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />
              )
            },
          }}
        />
      </div>
    </>
  )
}
