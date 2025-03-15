
import React from 'react';
import PageTransition from '@/components/PageTransition';

const Terms: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="animate-slide-down">
          <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Welcome to NPM Package Portal. By accessing our website, you agree to comply with and be bound by the following terms and conditions of use.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-6">
              By accessing or using NPM Package Portal, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-6">
              Permission is granted to temporarily access the materials on NPM Package Portal for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6 list-disc pl-6">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground mb-6">
              The materials on NPM Package Portal are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Limitations</h2>
            <p className="text-muted-foreground mb-6">
              In no event shall NPM Package Portal or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Revisions</h2>
            <p className="text-muted-foreground mb-6">
              We may revise these terms of service for the website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us at <a href="mailto:legal@npmpackageportal.com" className="text-primary hover:underline">legal@npmpackageportal.com</a>.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Terms;
