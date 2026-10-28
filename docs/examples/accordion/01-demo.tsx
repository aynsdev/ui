import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const items = [
  {
    value: "why",
    question: "Why this?",
    answer: "Most teams already have the data. What's missing is one place where it's current, owned and easy to act on.",
  },
  {
    value: "cost",
    question: "What does it cost?",
    answer: "Free for up to three projects. Paid plans start at ₱499 per seat each month, billed yearly.",
  },
  {
    value: "next",
    question: "What happens next?",
    answer: "We import your workspace, invite your team and schedule a 20-minute walkthrough in your first week.",
  },
]

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible defaultValue="why" className="w-full max-w-xl">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
