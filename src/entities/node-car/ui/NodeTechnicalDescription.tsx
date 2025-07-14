import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"

import { useTranslations } from "next-intl"
import { TNodeCarFull } from "../model/types"
import { formatNumber } from "@shared/lib/utils"

type TTechnicalDescriptionProps = {
  carInfo: TNodeCarFull["field_car_info"]
  mileage: number
}

export const NodeTechnicalDescription = ({
  carInfo,
  mileage,
}: TTechnicalDescriptionProps) => {
  const t = useTranslations("nodeCarFull")
  const engineType = (type: string) => {
    const map: Record<string, string> = {
      gas: t("technicalDescription.carType.gas"),
      hybrid: t("technicalDescription.carType.hybrid"),
      electric: t("technicalDescription.carType.electric"),
      diesel: t("technicalDescription.carType.diesel"),
    }
    return map[type?.toLowerCase?.()] || type
  }
  const transmissionType = (type: string) => {
    const map: Record<string, string> = {
      dht: t("technicalDescription.transmissionType.dht"),
      triple_clutch: t("technicalDescription.transmissionType.triple_clutch"),
      single_speed: t("technicalDescription.transmissionType.single_speed"),
      mt: t("technicalDescription.transmissionType.mt"),
      e_cvt: t("technicalDescription.transmissionType.e_cvt"),
      cvt: t("technicalDescription.transmissionType.cvt"),
      dct: t("technicalDescription.transmissionType.dct"),
      amt: t("technicalDescription.transmissionType.amt"),
      at: t("technicalDescription.transmissionType.at"),
    }
    return map[type?.toLowerCase?.()] || type
  }
  const TechnicalDescription: { title: string; value: string | number }[] = [
    {
      title: t("technicalDescription.field_car_type"),
      value: engineType(carInfo.field_car_type ?? ""),
    },
    {
      title: t("technicalDescription.field_brand"),
      value: carInfo.field_brand.name,
    },
    {
      title: t("technicalDescription.field_model"),
      value: carInfo.field_model,
    },
    {
      title: t("technicalDescription.field_year"),
      value: carInfo.field_year,
    },
    {
      title: t("technicalDescription.field_mileage"),
      value:
        mileage === 0
          ? t("technicalDescription.noMileage")
          : formatNumber(mileage) + " км",
    },
    {
      title: t("technicalDescription.field_capacity"),
      value: carInfo.field_capacity,
    },
    {
      title: t("technicalDescription.field_battery_capacity"),
      value: `${carInfo.field_battery_capacity} kWh`,
    },
    {
      title: t("technicalDescription.field_drive_mode"),
      value: carInfo.field_drive_mode,
    },
    {
      title: t("technicalDescription.field_transmission"),
      value: transmissionType(carInfo.field_transmission ?? ""),
    },
    // {
    //   title: t("technicalDescription.field_configuration_en"),
    //   value: carInfo.field_configuration_en,
    // },
    {
      title: t("technicalDescription.field_horsepower"),
      value: `${carInfo.field_horsepower} л.с.`,
    },
  ]
  const filtered = TechnicalDescription.filter(
    (item) =>
      item.value !== null && item.value !== undefined && item.value !== ""
  )
  return (
    <Card>
      <CardHeader>
        <CardTitle>Характеристики</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <DescriptionCard key={item.title} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const DescriptionCard = ({
  item,
}: {
  item: { title: string; value: string | number }
}) => (
  <div key={item.title} className="flex flex-col">
    <div className="text-sm text-gray-600">{item.title}</div>
    <div className="font-semibold">{item.value}</div>
  </div>
)
