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

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return <div>Please sign in to view your dashboard.</div>
  }
  const currentUser = session.user.id
  const api = new DrupalJsonApiParams()
    .addFilter("status", "1")
    .addFilter("uid.id", currentUser)
  const nodes = await drupal.getResourceCollection<TNodeCalculationTeaser[]>(
    "node--calculation",
    {
      params: api.getQueryObject(),
      withAuth: true,
      next: { revalidate: 3600, tags: ["calculations"] },
    }
  )
  return (
    <div className="space-y-4">
      <PageTitle title="Личный кабинет" />
      <User user={session.user} />
      <ViewsCalculation nodes={nodes} />
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
