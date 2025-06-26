import { WebformCallback } from "@features/webform-callback"
import { PageTitle } from "@shared/ui/page-title"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "Обратный звонок",
  description: "",
  robots: {
    index: false,
    follow: false,
  },
}
export default async function CallBackPage() {
  return (
    <>
      <PageTitle title="Обратный звонок" />
      <WebformCallback />
    </>
  )
}
