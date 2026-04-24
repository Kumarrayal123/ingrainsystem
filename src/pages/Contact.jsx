import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building2, Users, Briefcase, ChevronRight } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    companySize: '',
    industry: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans relative pt-20 overflow-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-fuchsia-600/5 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
              Experience the <br/>future of management.
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Book a personalized demo and see how Ingrain System can transform your people operations and business workflows.
            </p>
          </div>

          <div className="space-y-6 pt-8">
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                <Mail className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Email us</p>
                <p className="text-lg font-medium">info@ingrainsystem.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Call us</p>
                <p className="text-lg font-medium">+91-9010481048</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
          {submitted ? (
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <ChevronRight className="w-10 h-10 text-emerald-400 rotate-[-45deg] translate-x-1" strokeWidth={3} />
                </motion.div>
              </div>
              <h3 className="text-3xl font-bold">Demo Request Sent!</h3>
              <p className="text-gray-400">Our solution experts will reach out to you within 24 hours to schedule your session.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-blue-400 hover:underline font-medium"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full"></div>
               
               <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <h2 className="text-2xl font-bold mb-8">Book a Demo</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Work Email</label>
                       <input 
                        required
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Mobile Number</label>
                       <input 
                        required
                        type="tel" 
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Company Size</label>
                       <select 
                        required
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer text-gray-300"
                       >
                         <option value="" disabled className="bg-black">Select Size</option>
                         <option value="1-10" className="bg-black">1-10 employees</option>
                         <option value="11-50" className="bg-black">11-50 employees</option>
                         <option value="51-200" className="bg-black">51-200 employees</option>
                         <option value="201-500" className="bg-black">201-500 employees</option>
                         <option value="500-1k" className="bg-black">500-1k+ employees</option>
                       </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Industry / Business Type</label>
                    <input 
                      required
                      type="text" 
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      placeholder="e.g. Healthcare, Tech, Retail"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-[#0071e3] text-white py-4 rounded-2xl font-bold tracking-wide hover:bg-blue-600 transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 overflow-hidden group"
                  >
                    {isSubmitting ? 'Processing...' : 'Book My Demo'}
                    {!isSubmitting && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                  </button>
                  
                  <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest">
                    By submitting, you agree to our privacy policy.
                  </p>
               </form>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;