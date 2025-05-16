import { HomeHero } from "@widgets/home-hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  description: "A Next.js site powered by a Drupal backend.",
}

export default async function Home() {
  return (
    <>
      <HomeHero />
    </>
  )
}
