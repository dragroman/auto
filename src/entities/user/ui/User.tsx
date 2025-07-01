import { DefaultSession } from "next-auth"
import { useTranslations } from "next-intl"
export const User = ({ user }: { user: DefaultSession["user"] }) => {
  const t = useTranslations("dashboard")
  return (
    <div>
      <div>
        {t("user.email")}: <span className="font-bold">{user?.email}</span>
      </div>
    </div>
  )
}
