import { absoluteUrl } from "@shared/lib/utils"
import { NodeCarTeaserType } from "../model/types"
import Image from "next/image"
import { locale } from "@shared/config/i18n/messages/ru"
import { CalendarArrowDownIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"

export const NodeCarTeaser = async ({ node }: { node: NodeCarTeaserType }) => {
  const t = locale.carTeaser
  const rawImageUrl =
    node.field_images?.[0]?.field_media_image?.uri?.url ??
    node.field_car_info?.field_images?.[0]?.field_media_image?.uri?.url
  const imageSrc = rawImageUrl ? absoluteUrl(rawImageUrl) : ""

  return (
    <Card className="group pt-0 overflow-hidden gap-4">
      <div className="relative aspect-square overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={node.title || t.noTitle}
            fill
            style={{ objectFit: "cover" }}
            className="transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 200px, 200px"
            quality={70}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-muted-foreground">{t.noPhoto}</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          <div className="text-lg">{node.title || t.noTitle}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="block">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarArrowDownIcon className="w-4 h-4" />
            {new Date(node.created)
              .toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .split(".")
              .join("-")}
          </div>
        </div>
        <div className="font-bold text-xl">
          {node.variations?.[0]?.price?.number &&
          node.variations[0]?.price?.currency_code
            ? `${Number(node.variations[0].price.number).toLocaleString("ru-RU")} ${node.variations[0].price.currency_code}`
            : t.noPrice}
        </div>
      </CardContent>
    </Card>
  )
}
