import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { DraftAlert } from "@shared/misc/DraftAlert"

import { Header } from "@widgets/header"
import { Footer } from "@widgets/footer"

import "@shared/styles/globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"

export const metadata: Metadata = {
  title: {
    default: "Next.js for Drupal",
    template: "%s | Next.js for Drupal",
  },
  description: "A Next.js site powered by a Drupal backend.",
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
      <body>
        <DraftAlert />
        <div className="max-w-(--breakpoint-md) px-4 mx-auto">
          <Header />
          <main className="container mx-auto">
            <NextIntlClientProvider>{children}</NextIntlClientProvider>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
