import { useTranslations } from "next-intl"

export const createTranslationMapper = (
  t: ReturnType<typeof useTranslations>
) => ({
  engineType: (type: string) => {
    const map: Record<string, string> = {
      gas: t("form.engine.gas.title"),
      hybrid: t("form.engine.hybrid.title"),
      electric: t("form.engine.electric.title"),
    }
    return map[type.toLowerCase()] || type
  },
  isNew: (type: string) => {
    const map: Record<string, string> = {
      true: t("form.vehicle.condition.new.title"),
      false: t("form.vehicle.condition.used.title"),
    }
    return map[type] || type
  },
})
