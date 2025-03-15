
import React from 'react';
import PackageTable from '@/components/PackageTable';
import FAQAccordion from '@/components/FAQAccordion';
import PageTransition from '@/components/PageTransition';

const Index: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16 animate-slide-up">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
            NPM Registry Explorer
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Top NPM Packages
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the most popular packages in the JavaScript ecosystem. Get detailed information about downloads, dependencies, and more.
          </p>
        </div>

        <div className="mb-16">
          <PackageTable />
        </div>

        <FAQAccordion />
      </div>
    </PageTransition>
  );
};

export default Index;
