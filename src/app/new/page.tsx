import { drupal } from "@shared/lib/drupal"

export default async function NewCarsPage() {
  const nodes = await drupal.getResource(
    "node--car",
    "214855f6-a153-422a-b697-994ea04ecd59"
  )
  console.log(nodes)
  return <h1>New Page</h1>
}
