import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { User } from "@entities/user"
import { drupal } from "@shared/lib/drupal"
import { buttonVariants } from "@shared/ui/button"
import { HomeHero } from "@widgets/home-hero"
import { ViewsCalculation } from "@widgets/views-calculation"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  description: "A Next.js site powered by a Drupal backend.",
}

export default async function Home() {
  return (
    <>
      <Link className={buttonVariants({ variant: "outline" })} href="/calc">
        calculator
      </Link>
      <User />
    </>
  )
}
