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
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <Button asChild variant="link" className="text-muted-foreground">
            <Link href="/">
              <ArrowLeft /> {t("back")}
            </Link>
          </Button>
          <div className="border bg-white p-10 rounded-2xl">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
