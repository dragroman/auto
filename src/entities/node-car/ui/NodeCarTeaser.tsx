import { absoluteUrl, formatNumber, getYearFromDate } from "@shared/lib/utils"
import { NodeCarTeaserType } from "../model/types"
import Image from "next/image"

import { CalendarArrowDownIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"

export const NodeCarTeaser = async ({ node }: { node: NodeCarTeaserType }) => {
  const t = await getTranslations("carTeaser")
  const rawImageUrl =
    node.field_images?.[0]?.field_media_image?.uri?.url ??
    node.field_car_info?.field_images?.[0]?.field_media_image?.uri?.url
  const imageSrc = rawImageUrl ? absoluteUrl(rawImageUrl) : ""

  return (
    <div className="group bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-md overflow-hidden">
      <div className="flex">
        {/* Изображение слева */}
        <div className="relative w-40 h-32 flex-shrink-0 overflow-hidden">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={node.title || t("noTitle")}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 group-hover:scale-105"
              sizes="160px"
              quality={75}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-xs">{t("noPhoto")}</span>
            </div>
          )}
        </div>

        {/* Контент справа */}
        <div className="flex flex-col justify-between p-3 flex-1 min-w-0">
          {/* Заголовок */}
          <div className="text-sm font-medium text-gray-900 leading-tight mb-1 line-clamp-2 truncate">
            {node.title || t("noTitle")}
          </div>
          {/* Пробег */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <span>
              {node.field_mileage === 0
                ? "Новый"
                : formatNumber(node.field_mileage) + " км"}{" "}
              / {getYearFromDate(node.field_production_date)}
            </span>
          </div>

          {/* Дата */}
          {/* <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
            <CalendarArrowDownIcon className="w-3 h-3 flex-shrink-0" />
            <span>
              {new Date(node.created)
                .toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .split(".")
                .join("-")}
            </span>
          </div> */}

          {/* Цена */}
          <div className="font-bold text-lg text-red-600">
            {node.variations?.[0]?.price?.number &&
            node.variations[0]?.price?.currency_code ? (
              `${Number(node.variations[0].price.number).toLocaleString("ru-RU")} ${node.variations[0].price.currency_code}`
            ) : (
              <span className="text-gray-400 font-normal text-sm">
                {t("noPrice")}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
