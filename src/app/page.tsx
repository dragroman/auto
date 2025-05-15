import { Button } from "@shared/ui/button"
import type { Metadata } from "next"
import type { DrupalNode } from "next-drupal"
import Link from "next/link"

export const metadata: Metadata = {
  description: "A Next.js site powered by a Drupal backend.",
}

export default async function Home() {
  return (
    <>
      <h1 className="mb-10 text-6xl font-black">Car-NEXT</h1>
      <Button asChild>
        <Link href="https://chinq.ru" target="_blank" rel="external">
          Whorray
        </Link>
      </Button>
    </>
  )
}
