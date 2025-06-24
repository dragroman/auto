import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/accordion"
import { faqData } from "./faqData"

export default function FAQPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Часто задаваемые вопросы</h1>
      {faqData.map((section) => (
        <div key={section.category} className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 border-b-2 pb-2">
            {section.category}
          </h2>
          <Accordion type="multiple" className="space-y-3">
            {section.questions.map((item) => (
              <AccordionItem
                key={`${item.question}`}
                value={`${item.question}`}
                className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="items-center px-6 py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 ">
                  <p className="leading-relaxed">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  )
}
