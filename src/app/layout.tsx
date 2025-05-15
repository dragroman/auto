import type { Metadata } from "next"
import type { ReactNode } from "react"
import { DraftAlert } from "@shared/misc/DraftAlert"

import { Header } from "@widgets/header"
import { Footer } from "@widgets/footer"

import "@shared/styles/globals.css"

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

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <DraftAlert />
        <div className="max-w-(--breakpoint-md) px-6 mx-auto">
          <Header />
          <main className="container py-10 mx-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
