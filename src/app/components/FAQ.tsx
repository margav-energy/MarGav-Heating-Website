import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

export function FAQ() {
  const faqs = [
    {
      question: "HOW LONG DOES A TYPICAL BOILER INSTALLATION TAKE?",
      answer:
        "Most boiler installations are completed within 1-2 days, depending on the complexity of your system and any additional work required. We provide a detailed timeline during your free consultation.",
    },
    {
      question: "DO YOU PROVIDE FREE CONSULTATIONS?",
      answer:
        "Yes! We offer completely free home surveys and no-obligation quotes. Our experts will assess your heating needs and provide transparent pricing with no hidden costs.",
    },
    {
      question: "ARE HEAT PUMPS SUITABLE FOR MY HOME?",
      answer:
        "Heat pumps work brilliantly for most homes, especially well-insulated properties. During our free survey, we assess your home's suitability and recommend the best heating solution for your needs.",
    },
    {
      question: "DO YOU OFFER WARRANTIES ON YOUR WORK?",
      answer:
        "Absolutely. All boilers come with 12 years parts & labour warranty and 7 years manufacturer's warranty for air source heat pumps.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              COMMON <span className="text-[#3333cc]">QUESTIONS</span> ABOUT<br />
              OUR HEATING SERVICES
            </h2>
          </div>

          <Accordion.Root type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <Accordion.Item
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-200"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group">
                    <span className="font-bold pr-4">{faq.question}</span>
                    <Plus className="w-5 h-5 flex-shrink-0 transition-transform group-data-[state=open]:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
}
