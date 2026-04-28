import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, selectedPlan }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    mobileNumber: '',
    companySize: '',
    industryType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setIsSubmitting(false);
      return;
    }

    const RAZORPAY_KEY = 'rzp_test_BxtRNvflG06PTV';

    const options = {
      key: RAZORPAY_KEY,
      amount: (selectedPlan.priceValue || 0) * 100, // Amount is in paise
      currency: "INR",
      name: "Ingrain Systems",
      description: `Booking for ${selectedPlan.name}`,
      handler: async function (response) {
        // Payment successful
        const transactionId = response.razorpay_payment_id;
        await bookPlan(transactionId);
      },
      prefill: {
        name: formData.fullName,
        email: formData.workEmail,
        contact: formData.mobileNumber
      },
      theme: {
        color: "#0071e3"
      },
      modal: {
        ondismiss: function() {
          setIsSubmitting(false);
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const bookPlan = async (transactionId) => {
    try {
      const response = await fetch('http://localhost:5005/api/clients/bookplan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          planId: selectedPlan.id,
          transactionId: transactionId
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Booking failed. Please contact support.');
      }
    } catch (error) {
      console.error('Error booking plan:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#1c1c1e] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            {isSuccess ? (
              <div className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Booking Confirmed!</h3>
                <p className="text-gray-400 text-lg">
                  Thank you for choosing Ingrain Systems. Our team will reach out to you shortly to set up your workspace.
                </p>
                <button 
                  onClick={onClose}
                  className="bg-[#0071e3] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-5 h-full">
                {/* Sidebar Info */}
                <div className="hidden md:flex md:col-span-2 bg-[#2c2c2e] p-10 flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 rounded-full px-3 py-1 mb-6 border border-blue-500/20">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Secure Checkout</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Selected Plan</h3>
                    <p className="text-blue-400 font-bold text-lg mb-4">{selectedPlan.name}</p>
                    <div className="space-y-4">
                      {selectedPlan.features?.slice(0, 4).map((f, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-gray-500 mt-0.5" />
                          <span className="text-xs text-gray-400 leading-snug">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-8 border-t border-white/5">
                    <p className="text-sm text-gray-500 mb-1">Total Due</p>
                    <p className="text-3xl font-bold text-white">
                      {selectedPlan.price === 'FREE' ? '₹0' : selectedPlan.price}
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="md:col-span-3 p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-white mb-8">Complete Your Booking</h2>
                  
                  <form onSubmit={handlePayment} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Work Email</label>
                      <input 
                        required
                        type="email" 
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Mobile Number</label>
                        <input 
                          required
                          type="tel" 
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Company Size</label>
                        <select 
                          required
                          name="companySize"
                          value={formData.companySize}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white text-sm appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-[#1c1c1e]">Select Size</option>
                          <option value="1-10" className="bg-[#1c1c1e]">1-10</option>
                          <option value="11-50" className="bg-[#1c1c1e]">11-50</option>
                          <option value="51-200" className="bg-[#1c1c1e]">51-200</option>
                          <option value="201-500" className="bg-[#1c1c1e]">201-500</option>
                          <option value="500+" className="bg-[#1c1c1e]">500+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Industry</label>
                      <input 
                        required
                        type="text" 
                        name="industryType"
                        value={formData.industryType}
                        onChange={handleChange}
                        placeholder="e.g. Technology, Healthcare"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors text-white text-sm"
                      />
                    </div>

                    <button 
                      disabled={isSubmitting}
                      className="w-full bg-[#0071e3] text-white py-4 rounded-xl font-bold tracking-wide hover:bg-blue-600 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 mt-4 group"
                    >
                      {isSubmitting ? 'Initializing Payment...' : `Pay ${selectedPlan.price === 'FREE' ? '₹0' : selectedPlan.price}`}
                      {!isSubmitting && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
