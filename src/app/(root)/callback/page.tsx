import { WebformCallback } from "@features/webform-callback"
import { PageTitle } from "@shared/ui/page-title"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "CallBackPage",
  description: "Обратный звонок",
}
export default async function CallBackPage() {
  return (
    <>
      <PageTitle title="Обратный звонок" />
      <WebformCallback />
    </>
  )
}
