import React from 'react';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const CookiePolicy = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans pt-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Cookie Policy</h1>
          
          <div className="space-y-8 text-gray-300 font-light leading-relaxed">
            <p>This Cookie Policy explains how Iryax Global uses cookies and similar technologies on our website.</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
              <p>Cookies are small text files stored on your device to improve website functionality and user experience.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Types of Cookies We Use</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Essential Cookies</h3>
                  <p>Required for website functionality, login sessions, and payment processing.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Analytics Cookies</h3>
                  <p>Help us understand user behavior and improve website performance.</p>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-2">Preference Cookies</h3>
                  <p>Remember user preferences such as language and settings.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Third-Party Cookies</h2>
              <p>Some cookies may be placed by third-party services including payment providers like Razorpay and analytics tools.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Managing Cookies</h2>
              <p>Users can control or disable cookies through browser settings. Disabling cookies may affect certain website features.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Updates to This Policy</h2>
              <p>We may update this Cookie Policy periodically. Changes will be posted on this page.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
              <p>For questions regarding our Cookie Policy, contact:</p>
              <p className="mt-2 text-white">Email: <a href="mailto:info@ingrainsystem.com" className="text-blue-400 hover:underline">info@ingrainsystem.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default CookiePolicy;