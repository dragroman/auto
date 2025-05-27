import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { DraftAlert } from "@shared/misc/DraftAlert"

import "@shared/styles/globals.css"
import { NextIntlClientProvider } from "next-intl"
import { getLocale } from "next-intl/server"
import { Providers } from "@features/auth/session"
import { Toaster } from "@shared/ui/sonner"

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
        <Providers>
          <NextIntlClientProvider>
            <DraftAlert />
            {children}
            <Toaster position="top-center" />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  )
}
