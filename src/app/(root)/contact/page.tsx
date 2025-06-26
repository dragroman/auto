import { PageTitle } from "@shared/ui/page-title"
import { Mail, MapPinIcon, PhoneCall } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { ElementType, ReactElement } from "react"

const Item = ({
  icon: Icon,
  label,
  content,
}: {
  icon: ElementType
  label: string
  content: string
}) => (
  <div className="flex flex-col rounded-2xl shadow w-full px-10 py-8 bg-white items-center">
    <div className="flex h-20 w-20 items-center border-4 rounded-full bg-white border-[var(--background)] justify-center -mt-[80px] mb-4">
      <Icon className="w-10 h-10" />
    </div>
    <div>{label}</div>
    <div className="font-bold text-lg">{content}</div>
  </div>
)

export default async function ContactPage() {
  const t = await getTranslations("contact")
  return (
    <div className="">
      <PageTitle title="Контакты" />
      <p>Общество с ограниченной ответственностью «Чайна Авто»</p>
      <p>Основной государственный регистрационный номер 1232500027506</p>
      <div className="flex flex-col mt-20 gap-20 text-center">
        <Item
          icon={MapPinIcon}
          label={t("addressRussia.label")}
          content={t("addressRussia.value")}
        />
        <Item icon={Mail} label={t("email.label")} content={t("email.value")} />
        <Item
          icon={PhoneCall}
          label={t("phone.label")}
          content={t("phone.value")}
        />
      </div>
    </div>
  )
}
