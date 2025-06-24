import { WebformCallback } from "@features/webform-callback"
import { Metadata } from "next"
export const metadata: Metadata = {
  title: "CallBackPage",
  description: "Обратный звонок",
}
export default async function CallBackPage() {
  return (
    <>
      <h1>Обратный звонок</h1>
      <WebformCallback />
    </>
  )
}
