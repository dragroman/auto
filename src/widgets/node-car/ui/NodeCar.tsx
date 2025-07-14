import { useTranslations } from "next-intl"
import { type TNodeCarFull } from "@entities/node-car/model/types"
import {
  NodeCarCarousel,
  NodeCarDescription,
  NodeCarPrice,
  NodeTechnicalDescription,
  NodeCarFaq,
  NodeCarGallery,
} from "@entities/node-car"
import { BackButton } from "@shared/ui/back-button"
import { NodeCarActions } from "./NodeCarActions"

export const NodeCar = ({ node }: { node: TNodeCarFull }) => {
  const t = useTranslations("nodeCarFull")

  let price = ""
  node.variations?.[0]?.price?.number &&
  node.variations[0]?.price?.currency_code ? (
    (price = `${Number(node.variations[0].price.number).toLocaleString("ru-RU")} ${node.variations[0].price.currency_code}`)
  ) : (
    <span className="text-gray-400 font-normal text-sm">
      price = {t("noPrice")}
    </span>
  )

  return (
    <div className="relative w-full">
      <div className="absolute h-20 bg-linear-to-b from-black/70 to-transparent top-0 left-0 right-0 z-10">
        <BackButton className="absolute top-2 left-2 z-10" />
      </div>
      <NodeCarCarousel images={node.field_images} />
      <div className="-mt-4 relative">
        <NodeCarPrice
          price={price}
          field_price_actual={node.variations?.[0]?.field_price_actual}
          calcId={
            node.field_calculation.resourceIdObjMeta.drupal_internal__target_id
          }
        />
      </div>
      <div className="px-2 space-y-2">
        <div className=" relative">
          <NodeCarDescription
            title={node.title}
            isInStock={node.field_in_stock}
            isNew={node.field_new}
            isSold={node.field_sold}
            mileage={node.field_mileage}
          />
        </div>
        <NodeTechnicalDescription
          mileage={node.field_mileage}
          carInfo={node.field_car_info}
        />
        <NodeCarGallery images={node.field_images} />
        <NodeCarFaq />
      </div>
      {/* Spacer для контента, чтобы он не перекрывался меню */}
      <div className="h-20" />
      <div className="fixed bottom-0 left-0 right-0">
        <NodeCarActions
          calcId={
            node.field_calculation.resourceIdObjMeta.drupal_internal__target_id
          }
          nodeId={node.id}
        />
      </div>
    </div>
  )
}
