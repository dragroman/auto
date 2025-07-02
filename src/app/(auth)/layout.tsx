import { Button } from "@shared/ui/button"
import { Footer } from "@widgets/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"
import { getTranslations } from "next-intl/server"
export default async function AuthLayout({
  children,
}: {
  children: ReactNode
}) {
  const t = await getTranslations("dashboard")
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 relative">
      <div className="max-w-md w-full">
        <div className="absolute top-0 left-0 p-4">
          <Button asChild variant="link" className="">
            <Link href="/">
              <ArrowLeft /> {t("back")}
            </Link>
          </Button>
        </div>
        {children}
      </div>
    </div>
  )
}
