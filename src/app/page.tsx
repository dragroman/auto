import type { Metadata } from "next"
import type { DrupalNode } from "next-drupal"

export const metadata: Metadata = {
  description: "A Next.js site powered by a Drupal backend.",
}

export default async function Home() {
  return (
    <>
      <h1 className="mb-10 text-6xl font-black">Car-NEXT</h1>
    </>
  )
}
