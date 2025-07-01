import Link from "next/link"
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import { getServerSession } from "next-auth/next"
import { PageTitle } from "@shared/ui/page-title"
import { Button } from "@shared/ui/button"
import { drupal } from "@shared/lib/drupal"
import { authOptions } from "@features/auth/session"
import { SignOut } from "@features/auth/sign-out"
import { User } from "@entities/user"
import { TNodeCalculationTeaser } from "@entities/node-calculation"
import { ViewsCalculation } from "@widgets/views-calculation"
import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export const metadata: Metadata = {
  title: "Личный кабинет",
  description: "Личный кабинет пользователя",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return <div>Please sign in to view your dashboard.</div>
  }
  const currentUser = session.user.id
  const api = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFilter("uid.id", currentUser)
    .addSort("-created")
  const nodes = await drupal.getResourceCollection<TNodeCalculationTeaser[]>(
    "node--calculation",
    {
      params: api.getQueryObject(),
      next: { revalidate: 3600, tags: ["calculations"] },
    }
  )
  const t = await getTranslations("dashboard")
  return (
    <div className="space-y-4">
      <PageTitle title={t("title")} />
      <User user={session.user} />
      <ViewsCalculation nodes={nodes} currentUserID={currentUser} />
      <hr className="my-10" />
      <div className="text-center">
        {session ? (
          <SignOut />
        ) : (
          <Button asChild>
            <Link href="/signin">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
