import { PageTitle } from "@shared/ui/page-title"
import { SignIn } from "@widgets/sign-in"
import { getTranslations } from "next-intl/server"

export default async function SignInPage() {
  const t = await getTranslations("dashboard")
  return (
    <>
      <PageTitle title={t("signIn.title")} />
      <SignIn />
    </>
  )
}
