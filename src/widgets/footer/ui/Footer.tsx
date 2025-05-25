import { getMenu } from "@entities/menu"
import { Instagram, Telegram, Whatsapp } from "@shared/icons"
import { getTranslations } from "next-intl/server"
import Link from "next/link"

export async function Footer() {
  const t = await getTranslations("footer")
  const nav = await getMenu()
  return (
    <footer className="block">
      {/* Container */}
      <div className="py-16 md:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
        {/* Component */}
        <div className="flex-col flex items-center">
          <div className="text-center font-semibold">
            {nav.map(
              (item) =>
                item.footer === undefined && (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-block px-6 py-2 font-normal text-black transition hover:text-blue-600"
                  >
                    {item.title}
                  </Link>
                )
            )}
          </div>
          <div className="mb-8 mt-8 border-b border-gray-300 w-48"></div>
          <div className="mb-12 grid-cols-4 grid-flow-col grid max-w-52 gap-8 mx-auto">
            <a
              href="#"
              className="mx-auto flex-col flex max-w-6 items-center justify-center text-black"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="mx-auto flex-col flex max-w-6 items-center justify-center text-black"
            >
              <Telegram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="mx-auto flex-col flex max-w-6 items-center justify-center text-black"
            >
              <Whatsapp className="w-5 h-5" />
            </a>
          </div>
          <p className="text-sm sm:text-base">
            2023-{new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}
