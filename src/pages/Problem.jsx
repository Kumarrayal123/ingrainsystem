import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Problem page – visual chain flow of issues
const Problem = () => {
  const items = [
    "Great Tools.",
    "Broken Systems.",
    "CRM in one place",
    "HR in another",
    "Marketing tools scattered",
    "Data everywhere",
    "Multiple logins. No connection.",
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans relative pt-[52px] overflow-x-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[180px]" />
      </div>

      {/* Hero */}
      <section className="snap-start w-full flex flex-col items-center justify-center px-6 text-center py-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
        >
          The Problem
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
          A fragmented workflow that needs a single, elegant connection.
        </p>
      </section>

      {/* Chain flow – responsive layout */}
      <section className="snap-start w-full py-12 relative z-10">
        {/* Horizontal on md+, vertical on small */}
        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 space-y-8 md:space-y-0 overflow-x-auto px-6">
          {items.map((txt, idx) => (
            <React.Fragment key={idx}>
              {/* Node */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="flex-shrink-0 w-56 h-56 flex items-center justify-center rounded-full bg-[#0a0a0b]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 text-center px-4 py-2"
              >
                <h2 className="text-base md:text-lg font-medium text-white leading-snug">
                  {txt}
                </h2>
              </motion.div>

              {/* Connector – only if not last */}
              {idx < items.length - 1 && (
                <div className="flex-shrink-0">
                  {/* Horizontal line for md+, vertical line for small */}
                  <div className="hidden md:block w-16 h-1 bg-gray-600 mx-2" />
                  <div className="block md:hidden h-8 w-1 bg-gray-600 my-2 mx-auto" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      {/* <section className="snap-start w-full flex flex-col items-center justify-center py-12 px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 backdrop-blur-xl rounded-3xl p-8 max-w-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            One‑to‑One Connections, Finally.
          </h3>
          <p className="text-gray-300 mb-6">
            Imagine a unified platform where tools talk to each other, data flows seamlessly, and you log in just once.
          </p>
          <Link
            to="/price"
            className="inline-block bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium py-3 px-8 rounded-full transition-colors"
          >
            See Our Solution
          </Link>
        </motion.div>
      </section> */}

      {/* <Footer /> */}
    </div>
  );
};

export default Problem;
