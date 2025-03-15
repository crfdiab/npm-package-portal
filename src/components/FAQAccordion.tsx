
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: "What is NPM Package Portal?",
    answer: "NPM Package Portal is a comprehensive tool that displays information about the most popular NPM packages in the JavaScript ecosystem. It provides important metrics like weekly downloads, dependencies, and version history to help developers make informed decisions about which packages to use in their projects."
  },
  {
    question: "How is the data fetched?",
    answer: "The data is fetched from the official NPM Registry API, which provides information about package downloads, metadata, and dependencies. For some packages, we also fetch additional information from GitHub to show issues and pull requests. All data is cached to optimize performance and reduce API calls."
  },
  {
    question: "Why are some details missing?",
    answer: "Some package details might be missing because they're not available in the NPM Registry. For example, if a package doesn't specify a repository URL, we can't fetch GitHub issues or pull requests. Additionally, some packages might not have complete metadata, depending on how they were published."
  },
  {
    question: "How often is the data updated?",
    answer: "The data is updated daily to ensure you're seeing the most recent information about package downloads and versions. However, some metrics may be cached for up to 24 hours to reduce the load on the NPM Registry API."
  },
  {
    question: "How are packages ranked?",
    answer: "Packages are ranked primarily by their weekly download count, which is a good indicator of popularity and community adoption. However, it's important to note that download counts alone don't necessarily reflect quality or security, so always evaluate packages thoroughly before using them in your projects."
  }
];

const FAQAccordion: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto my-12 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-center">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
            <AccordionTrigger className="text-left font-medium py-4 hover:text-primary transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground py-3">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
