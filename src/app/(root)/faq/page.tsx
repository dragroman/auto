import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/accordion"
import { faqData } from "./faqData"
import { PageTitle } from "@shared/ui/page-title"

export default function FAQPage() {
  return (
    <>
      <PageTitle title="Часто задаваемые вопросы" />
      {faqData.map((section) => (
        <div key={section.category} className="mb-8">
          <h2 className="text-xl font-semibold mb-6 border-b-2 pb-2">
            {section.category}
          </h2>
          <Accordion type="multiple" className="space-y-3">
            {section.questions.map((item) => (
              <AccordionItem
                key={`${item.question}`}
                value={`${item.question}`}
                className="border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="items-center px-6 py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 prose prose-sm max-w-full">
                  <div dangerouslySetInnerHTML={{ __html: item.answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </>
  )
}
