import { PageTitle } from "@shared/ui/page-title"
import { SignUp } from "@widgets/sign-up"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Вход",
  description: "Вход в систему",
}

export default function SignUpPage() {
  return (
    <>
      <PageTitle title="Вход в систему" />
      <SignUp />
    </>
  )
}
