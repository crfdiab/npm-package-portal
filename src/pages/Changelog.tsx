
import React from 'react';
import PageTransition from '@/components/PageTransition';

const changelogEntries = [
  {
    version: "1.2.0",
    date: "2023-06-15",
    changes: [
      "Added support for GitHub repository integration",
      "Improved package version comparison",
      "Enhanced search functionality with advanced filters",
      "Fixed pagination issues on mobile devices"
    ]
  },
  {
    version: "1.1.0",
    date: "2023-04-10",
    changes: [
      "Added package dependency visualization",
      "Implemented responsive design improvements",
      "Added export functionality for package details",
      "Fixed sorting issues in the package table"
    ]
  },
  {
    version: "1.0.0",
    date: "2023-02-01",
    changes: [
      "Initial release of NPM Package Portal",
      "Basic package search and exploration",
      "Package detail view with version information",
      "Weekly download statistics for all packages"
    ]
  }
];

const Changelog: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="animate-slide-down">
          <h1 className="text-3xl font-bold mb-8 text-center">Changelog</h1>
          
          <div className="space-y-12">
            {changelogEntries.map((entry, index) => (
              <div key={index} className="border-l-2 border-primary pl-6 relative">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2"></div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold flex items-baseline gap-3">
                    <span>Version {entry.version}</span>
                    <span className="text-sm font-normal text-muted-foreground">{entry.date}</span>
                  </h2>
                </div>
                <ul className="space-y-2 text-muted-foreground list-disc pl-6">
                  {entry.changes.map((change, i) => (
                    <li key={i}>{change}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Changelog;
