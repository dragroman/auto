import { DcdParser } from "@features/dcd-parser"
import { ParserStats } from "@features/dcd-parser"
import { PageTitle } from "@shared/ui/page-title"
import { authOptions } from "@features/auth/session"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Парсер автомобилей DCD",
  description: "Автоматическое создание карточек автомобилей из dcdapp.com",
}

export default async function ParserPage() {
  // Проверяем авторизацию
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin?callbackUrl=/parser")
  }

  return (
    <>
      <PageTitle title="Парсер автомобилей" />
      <div className="uk-container">
        <DcdParser />
        <ParserStats />
      </div>
    </>
  )
}
