import { getTranslations } from "next-intl/server"

export async function faqData() {
  const t = await getTranslations("faq")
  return [
    {
      category: t("chooseAuto.title"),
      questions: [
        {
          question: t("chooseAuto.questions.checkTheCondition.question"),
          answer: t("chooseAuto.questions.checkTheCondition.answer"),
        },
        {
          question: t("chooseAuto.questions.guarantee.question"),
          answer: t("chooseAuto.questions.guarantee.answer"),
        },
        {
          question: t("chooseAuto.questions.whoCheck.question"),
          answer: t("chooseAuto.questions.whoCheck.answer"),
        },
        {
          question: t("chooseAuto.questions.inspection.question"),
          answer: t("chooseAuto.questions.inspection.answer"),
        },
        {
          question: t("chooseAuto.questions.technicalInspection.question"),
          answer: t("chooseAuto.questions.technicalInspection.answer"),
        },
      ],
    },
    {
      category: t("aboutPayment.title"),
      questions: [
        {
          question: t("aboutPayment.questions.price.question"),
          answer: t("aboutPayment.questions.price.answer"),
        },
        {
          question: t("aboutPayment.questions.payment.question"),
          answer: t("aboutPayment.questions.payment.answer"),
        },
        {
          question: t("aboutPayment.questions.howToPay.question"),
          answer: t("aboutPayment.questions.howToPay.answer"),
        },
        {
          question: t("aboutPayment.questions.creditBuy.question"),
          answer: t("aboutPayment.questions.creditBuy.answer"),
        },
        {
          question: t("aboutPayment.questions.paymentMade.question"),
          answer: t("aboutPayment.questions.paymentMade.answer"),
        },
      ],
    },
    {
      category: t("delivery.title"),
      questions: [
        {
          question: t("delivery.questions.deliveryTime.question"),
          answer: t("delivery.questions.deliveryTime.answer"),
        },
        {
          question: t("delivery.questions.deliveryType.question"),
          answer: t("delivery.questions.deliveryType.answer"),
        },
        {
          question: t("delivery.questions.trackDelivaryProcess.question"),
          answer: t("delivery.questions.trackDelivaryProcess.answer"),
        },
        {
          question: t("delivery.questions.whoDelivery.question"),
          answer: t("delivery.questions.whoDelivery.answer"),
        },
      ],
    },
    {
      category: t("documentCustomsClearance.title"),
      questions: [
        {
          question: t(
            "documentCustomsClearance.questions.documentCar.question"
          ),
          answer: t("documentCustomsClearance.questions.documentCar.answer"),
        },
        {
          question: t(
            "documentCustomsClearance.questions.whoClearance.question"
          ),
          answer: t("documentCustomsClearance.questions.whoClearance.answer"),
        },
        {
          question: t(
            "documentCustomsClearance.questions.documentRegistration.question"
          ),
          answer: t(
            "documentCustomsClearance.questions.documentRegistration.answer"
          ),
        },
        {
          question: t("documentCustomsClearance.questions.keyCar.question"),
          answer: t("documentCustomsClearance.questions.keyCar.answer"),
        },
        {
          question: t(
            "documentCustomsClearance.questions.myselfClearance.question"
          ),
          answer: t(
            "documentCustomsClearance.questions.myselfClearance.answer"
          ),
        },
      ],
    },
    {
      category: t("legalAspects.title"),
      questions: [
        {
          question: t("legalAspects.questions.buyingProblem.question"),
          answer: t("legalAspects.questions.buyingProblem.answer"),
        },
      ],
    },
    {
      category: t("certificationAdaptation.title"),
      questions: [
        {
          question: t(
            "certificationAdaptation.questions.localStandarts.question"
          ),
          answer: t("certificationAdaptation.questions.localStandarts.answer"),
        },
        {
          question: t("certificationAdaptation.questions.whoGlonass.question"),
          answer: t("certificationAdaptation.questions.whoGlonass.answer"),
        },
      ],
    },
    {
      category: t("support.title"),
      questions: [
        {
          question: t("support.questions.guarantees.question"),
          answer: t("support.questions.guarantees.answer"),
        },
        {
          question: t("support.questions.supportServices.question"),
          answer: t("support.questions.supportServices.answer"),
        },
        {
          question: t("support.questions.order.question"),
          answer: t("support.questions.order.answer"),
        },
      ],
    },
  ]
}
