
import React from 'react';
import PageTransition from '@/components/PageTransition';

const Privacy: React.FC = () => {
  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 py-24">
        <div className="animate-slide-down">
          <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-6">
              Your privacy is important to us. This Privacy Policy outlines the types of information we collect and how we use it.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-6">
              We collect information to provide better services to our users. The information we collect includes:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6 list-disc pl-6">
              <li>Usage data, such as how you interact with our website</li>
              <li>Device information, such as hardware model, operating system version, and browser type</li>
              <li>IP address and cookie data for analytics and service improvement</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Information</h2>
            <p className="text-muted-foreground mb-6">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6 list-disc pl-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Develop new features and functionality</li>
              <li>Understand how users interact with our website</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Cookies</h2>
            <p className="text-muted-foreground mb-6">
              We use cookies to collect and store information. A cookie is a small text file that is stored on your device. You can configure your browser to refuse all cookies or to indicate when a cookie is being sent, but this may affect the functionality of our website.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Sharing</h2>
            <p className="text-muted-foreground mb-6">
              We do not share personal information with companies, organizations, or individuals outside of NPM Package Portal except in the following cases:
            </p>
            <ul className="space-y-2 text-muted-foreground mb-6 list-disc pl-6">
              <li>With your consent</li>
              <li>For legal reasons, such as to comply with applicable law or legal process</li>
              <li>With service providers who process data on our behalf, subject to appropriate security and confidentiality measures</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="text-muted-foreground mb-6">
              We work hard to protect our users from unauthorized access, alteration, disclosure, or destruction of information we hold. This includes regular review of our information collection, storage, and processing practices.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Changes to This Policy</h2>
            <p className="text-muted-foreground mb-6">
              We may revise this Privacy Policy from time to time. The most current version will always be posted on our website. If the changes are significant, we will provide a more prominent notice.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our Privacy Policy, please contact us at <a href="mailto:privacy@npmpackageportal.com" className="text-primary hover:underline">privacy@npmpackageportal.com</a>.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Privacy;
