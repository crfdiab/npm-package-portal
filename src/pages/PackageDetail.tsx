
import React from 'react';
import PackageDetail from '@/components/PackageDetail';
import PageTransition from '@/components/PageTransition';

const PackageDetailPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 py-24">
        <PackageDetail />
      </div>
    </PageTransition>
  );
};

export default PackageDetailPage;
