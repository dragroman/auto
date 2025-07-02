import { PageTitle } from "@shared/ui/page-title"
import { ForgotPassword } from "@widgets/forgot-password"
import { getTranslations } from "next-intl/server"

export default async function ForgotPasswordPage() {
  const t = await getTranslations("dashboard")
  return (
    <>
      <PageTitle title={t("forgotPassword.title")} />
      <ForgotPassword />
    </>
  )
}
