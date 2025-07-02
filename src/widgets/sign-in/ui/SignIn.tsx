import { SignInForm } from "@features/auth/sign-in"
import { PageTitle } from "@shared/ui/page-title"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export const SignIn = async () => {
  const t = await getTranslations("dashboard")
  return (
    <>
      <SignInForm />
      <div className="mt-4 text-center">
        <Link
          href="/signup"
          className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        >
          {t("signIn.createAccount")}
        </Link>
      </div>
    </>
  )
}
