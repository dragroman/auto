import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card"
import { ChevronRight, HelpCircle, AlertCircleIcon } from "lucide-react"
import { Badge } from "@shared/ui/badge"
import { Button } from "@shared/ui/button"
import Link from "next/link"

export function NodeCarFaq() {
  const t = useTranslations("faq")

  const faqSections = [
    {
      title: t("chooseAuto.title"),
      question: t("chooseAuto.questions.checkTheCondition.question"),
      answer: t("chooseAuto.questions.checkTheCondition.answer"),
    },
    {
      title: t("aboutPayment.title"),
      question: t("aboutPayment.questions.price.question"),
      answer: t("aboutPayment.questions.price.answer"),
    },
    {
      title: t("documentCustomsClearance.title"),
      question: t("documentCustomsClearance.questions.documentCar.question"),
      answer: t("documentCustomsClearance.questions.documentCar.answer"),
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HelpCircle />
            {t("question")}
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/faq" className="flex items-center gap2">
              {t("more")}
              <ChevronRight />
            </Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {faqSections.map((section) => (
          <div key={section.title}>
            <div>
              <div className="text-bold mb-2">{section.question}</div>
              <div className="text-sm text-muted-foreground">
                {section.answer}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
