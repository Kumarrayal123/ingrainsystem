import React from 'react';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans pt-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Terms & Conditions</h1>
          
          <div className="space-y-8 text-gray-300 font-light leading-relaxed">
            <p>Welcome to Ingrain Systems. By accessing or using our website and services, you agree to the following Terms & Conditions.</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Services</h2>
              <p>We provide digital products/services through our website. Users must provide accurate information during registration or payment.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Payments</h2>
              <p className="mb-2">All payments are securely processed through Razorpay.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Prices are subject to change without prior notice.</li>
                <li>Payments once completed are non-refundable unless stated otherwise.</li>
                <li>Failed transactions may take several business days for bank reversal.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. User Responsibilities</h2>
              <p className="mb-2">Users agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the website for illegal activities</li>
                <li>Attempt unauthorized access to our systems</li>
                <li>Misuse or copy website content without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Intellectual Property</h2>
              <p>All website content, logos, designs, and materials are owned by Ingrain Systems and protected under applicable laws.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
              <p className="mb-2">We are not liable for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Temporary website downtime</li>
                <li>Payment gateway interruptions</li>
                <li>Loss caused by third-party services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Account Suspension</h2>
              <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Governing Law</h2>
              <p>These Terms shall be governed by the laws of India.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Information</h2>
              <p>For any concerns regarding these Terms, contact:</p>
              <p className="mt-2 text-white">Email: <a href="mailto:info@ingrainsystem.com" className="text-blue-400 hover:underline">info@ingrainsystem.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;