'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export default function FAQ() {
  const faqs = [
    {
      question: "What types of businesses do you provide IT support for?",
      answer: "We provide IT support and cyber engineering solutions for small to medium enterprises across various industries including healthcare, finance, legal, manufacturing, and professional services. Our solutions are scalable and can be tailored to meet the specific needs of your business regardless of size or sector."
    },
    {
      question: "Do you offer 24/7 support?",
      answer: "Yes, our Professional and Enterprise plans include 24/7 IT support. This ensures that your critical systems are monitored and supported around the clock, minimizing downtime and addressing issues as they arise, regardless of the time of day."
    },
    {
      question: "How quickly do you respond to support requests?",
      answer: "Our response times vary based on the severity of the issue and your service plan. Critical issues are typically addressed within 15-30 minutes. For standard support requests, we aim to respond within 1-2 hours during business hours. Enterprise clients receive priority response times for all support requests."
    },
    {
      question: "What security measures do you implement?",
      answer: "We implement a comprehensive range of security measures including firewall configuration, endpoint protection, intrusion detection systems, email security, multi-factor authentication, regular security assessments, and employee security awareness training. Our approach to security is multi-layered to provide defense in depth."
    },
    {
      question: "Can you help with cloud migration?",
      answer: "Absolutely. We specialize in helping businesses migrate to cloud platforms such as Microsoft Azure, AWS, and Google Cloud. Our team will assess your current infrastructure, develop a migration strategy, and execute the transition with minimal disruption to your operations. We also provide ongoing management and optimization of your cloud environment."
    },
    {
      question: "Do you provide on-site support or is everything remote?",
      answer: "We offer both remote and on-site support options. Most issues can be resolved quickly through our secure remote support tools. However, for situations that require physical presence, our Enterprise plan includes scheduled on-site support hours. Additional on-site support can be arranged for clients on other plans at standard hourly rates."
    },
    {
      question: "How do you handle data backup and disaster recovery?",
      answer: "We implement robust backup solutions that include regular automated backups, secure off-site storage, and periodic testing to ensure recoverability. Our disaster recovery planning includes detailed recovery procedures, alternative processing arrangements, and regular drills to verify that systems can be restored within defined recovery time objectives."
    },
    {
      question: "What is your approach to IT consulting?",
      answer: "Our IT consulting approach begins with understanding your business objectives and challenges. We then assess your current technology environment and develop strategic recommendations aligned with your goals. We focus on practical solutions that deliver measurable business value, whether that's improving efficiency, reducing costs, enhancing security, or enabling growth."
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>
          Find answers to common questions about our services and support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  )
}
