"use client"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useState, useCallback } from "react"
import { DrupalMedia } from "next-drupal"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { absoluteUrl } from "@shared/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@shared/ui/collapsible"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { ChevronDown } from "lucide-react"

export function NodeCarGallery({ images = [] }: { images?: DrupalMedia[] }) {
  const t = useTranslations("nodeCarFull")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [collapsibleOpen, setCollapsibleOpen] = useState(false)

  const slides = images.map((image) => ({
    src: absoluteUrl(image.field_media_image.uri.url),
    alt: image.name || "",
  }))

  const handleImageClick = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const handleLightboxClose = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  if (!images.length) {
    return null
  }

  const hasMoreThanThreeImages = images.length > 3
  const remainingImagesCount = Math.max(0, images.length - 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("gallery.title")}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Главное изображение */}
        <GalleryItem
          image={images[0]}
          index={0}
          onImageClick={handleImageClick}
          className="w-full aspect-video"
          priority
        />

        {/* Дополнительные изображения в сетке */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 gap-4">
            {images.slice(1, 3).map((image, index) => (
              <GalleryItem
                key={`gallery-${index + 1}`}
                image={image}
                index={index + 1}
                onImageClick={handleImageClick}
                className="aspect-video"
              />
            ))}
          </div>
        )}

        {/* Коллапсируемая секция для остальных изображений */}
        {hasMoreThanThreeImages && (
          <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
            <CollapsibleContent className="mb-4 overflow-hidden transition-all">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.slice(3).map((image, index) => (
                  <GalleryItem
                    key={`gallery-more-${index + 3}`}
                    image={image}
                    index={index + 3}
                    onImageClick={handleImageClick}
                    className="aspect-video"
                  />
                ))}
              </div>
            </CollapsibleContent>
            <CollapsibleTrigger className="w-full group">
              <div className="flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <span className="text-sm font-medium">
                  {collapsibleOpen
                    ? t("gallery.hideButton", { count: remainingImagesCount })
                    : t("gallery.showMoreButton", {
                        count: remainingImagesCount,
                      })}
                </span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    collapsibleOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </CollapsibleTrigger>
          </Collapsible>
        )}
      </CardContent>

      {/* Лайтбокс */}
      <Lightbox
        open={lightboxOpen}
        close={handleLightboxClose}
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
                loading="lazy"
                draggable={false}
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
    </Card>
  )
}

// Отдельный компонент для элемента галереи
const GalleryItem = ({
  image,
  index,
  onImageClick,
  className = "",
  priority = false,
}: {
  image: DrupalMedia
  index: number
  onImageClick: (index: number) => void
  className?: string
  priority?: boolean
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-sm cursor-pointer group ${className}`}
      onClick={() => onImageClick(index)}
    >
      <Image
        src={absoluteUrl(image.field_media_image.uri.url)}
        alt={image.name || `Gallery image ${index + 1}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Оверлей при наведении */}
    </div>
  )
}
