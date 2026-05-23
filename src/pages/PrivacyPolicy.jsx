import React from 'react';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans pt-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-300 font-light leading-relaxed">
            <p>Welcome to Ingrain Systems. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-2">We may collect the following information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Billing details</li>
                <li>Company information</li>
                <li>Payment information processed securely through Razorpay</li>
                <li>Browser and device information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-2">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and manage our services</li>
                <li>Process payments securely</li>
                <li>Improve website performance and user experience</li>
                <li>Send invoices, updates, and support information</li>
                <li>Prevent fraud and unauthorized activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Payment Information</h2>
              <p>All online payments are processed securely through Razorpay. We do not store your complete card details on our servers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Protection</h2>
              <p>We implement reasonable security measures to protect your personal information from unauthorized access, misuse, or disclosure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
              <p>We may use trusted third-party services for payment processing, analytics, hosting, and communication purposes.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies</h2>
              <p>Our website may use cookies to improve user experience and analyze website traffic. Please refer to our Cookie Policy for more details.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. User Rights</h2>
              <p className="mb-2">You may request to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your data where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Policy Updates</h2>
              <p>We may update this Privacy Policy from time to time. Changes will be posted on this page.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Contact Us</h2>
              <p>If you have any questions regarding this Privacy Policy, please contact us at:</p>
              <p className="mt-2 text-white">Email: <a href="mailto:info@ingrainsystem.com" className="text-blue-400 hover:underline">info@ingrainsystem.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;