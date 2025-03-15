
import React from 'react';
import PageTransition from '@/components/PageTransition';

const About: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="animate-slide-down">
          <h1 className="text-3xl font-bold mb-8 text-center">About NPM Package Portal</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              NPM Package Portal is a comprehensive tool for exploring and analyzing the most popular packages in the JavaScript ecosystem. Our mission is to provide developers with the information they need to make informed decisions about the packages they use.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Our Vision</h2>
            <p className="text-muted-foreground mb-6">
              We believe that transparency and information are essential for a healthy open-source ecosystem. By providing detailed insights into package usage, dependencies, and trends, we aim to help developers choose the right tools for their projects.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Features</h2>
            <ul className="space-y-2 text-muted-foreground mb-6 list-disc pl-6">
              <li>Comprehensive package statistics including weekly downloads</li>
              <li>Detailed dependency information for each package version</li>
              <li>Historical data on package updates and releases</li>
              <li>Insights into package size and file count</li>
              <li>Connection to GitHub repositories for issues and pull requests</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Data Sources</h2>
            <p className="text-muted-foreground mb-6">
              Our data is sourced from the official NPM Registry API, which provides information about package downloads, metadata, and dependencies. For some packages, we also fetch additional information from GitHub to show issues and pull requests.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions, feedback, or suggestions, please feel free to contact us at <a href="mailto:info@npmpackageportal.com" className="text-primary hover:underline">info@npmpackageportal.com</a>.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
