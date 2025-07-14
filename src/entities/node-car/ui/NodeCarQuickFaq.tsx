import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@shared/ui/drawer"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

const FaqDrawer = ({
  question,
  answer,
}: {
  question: string
  answer: string
}) => (
  <Drawer>
    <DrawerTrigger>
      <div className="w-full inline-flex items-center justify-between text-sm text-left py-1">
        {question}
        <ChevronRight className="shrink-0" />
      </div>
    </DrawerTrigger>
    <DrawerContent>
      <div className="mx-auto w-full max-w-md">
        <DrawerHeader>
          <DrawerTitle>{question}</DrawerTitle>
          <DrawerDescription>{answer}</DrawerDescription>
        </DrawerHeader>
      </div>
    </DrawerContent>
  </Drawer>
)

export const NodeCarQuickFaq = () => {
  const t = useTranslations("faq")
  return (
    <div className="flex flex-col w-full">
      {[
        {
          question: t("aboutPayment.questions.price.question"),
          answer: t("aboutPayment.questions.price.answer"),
        },
        {
          question: t(
            "documentCustomsClearance.questions.documentCar.question"
          ),
          answer: t("documentCustomsClearance.questions.documentCar.answer"),
        },
      ].map((faq, idx) => (
        <FaqDrawer key={idx} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  )
}
