import { SignInForm } from "@features/auth"
import { Button } from "@shared/ui/button"
import { PageTitle } from "@shared/ui/page-title"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const SignIn = ({ title }: { title: string }) => {
  return (
    <>
      <div className="text-center">
        <PageTitle title={title} />
      </div>
      <SignInForm />
      <hr className="separator my-6" />
      <div className="text-center">
        Нет аккаунта? <Link href="/signup">Зарегистрироваться</Link>
      </div>
    </>
  )
}
