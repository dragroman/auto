import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { DraftAlert } from "@shared/misc/DraftAlert"

import "@shared/styles/globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"
import { Providers } from "@features/auth/session"
import { GoogleTagManager } from "@next/third-parties/google"

import { Inter } from "next/font/google"

const rootFont = Inter({ subsets: ["cyrillic"] })

export const metadata: Metadata = {
  title: {
    default: "1xauto",
    template: "%s | 1xAuto",
  },
  description: "Выкупи и поиск автомобиля в Китае",
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  const locale = await getLocale()
  return (
    <html lang={locale}>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body
        className={`${rootFont.className} antialiased scroll-smooth h-full`}
      >
        <Providers>
          <NextIntlClientProvider>
            <DraftAlert />
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
