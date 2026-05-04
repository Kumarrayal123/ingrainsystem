import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Building2, Users, Briefcase, ChevronRight, MapPin, X, CheckCircle } from 'lucide-react';
import Footer from '../components/Footer';

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
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState({ title: '', message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Map form data to API expected fields
      const apiData = {
        fullName: formData.name,
        workEmail: formData.email,
        mobileNumber: formData.mobile,
        companySize: formData.companySize,
        industryType: formData.industry
      };

      const response = await fetch('https://api.ingrainsystems.com/api/demos/bookdemo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
        setPopupMessage({
          title: 'Demo Booked Successfully! 🎉',
          message: 'Our solution experts will reach out to you within 24 hours to schedule your session.',
          type: 'success'
        });
        setShowPopup(true);
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          mobile: '',
          companySize: '',
          industry: ''
        });
      } else {
        throw new Error(result.message || 'Failed to book demo');
      }
    } catch (error) {
      setPopupMessage({
        title: 'Booking Failed ❌',
        message: error.message || 'Something went wrong. Please try again.',
        type: 'error'
      });
      setShowPopup(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
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
              Book a personalized demo and see how Ingrain Systems can transform your people operations and business workflows.
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
      
      {/* Address & Map Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Google Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative lg:order-1 order-2"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 blur-3xl rounded-[3rem] opacity-50"></div>
            <div className="relative h-[450px] w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d139249.35329709985!2d78.349514!3d17.4424535!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb918c66980837%3A0x1e562b96981c4a17!2sIngrain%20-%20For%20Better%20Brands!5e1!3m2!1sen!2sin!4v1777459452093!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </motion.div>

          {/* Right: Address Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 lg:order-2 order-1"
          >
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent uppercase">
                Visit Our Office
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                We're located in the heart of Hyderabad's tech hub. Drop by for a coffee and a chat about your business goals.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 hover:border-white/20 transition-all duration-500 group">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-all shrink-0">
                  <MapPin className="w-7 h-7 text-blue-400" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Ingrain Systems</h3>
                  <div className="space-y-2 text-gray-400 text-lg font-light leading-relaxed">
                    <p>Falt No: 301, 3rd Floor, Sri Sai Balaji Avenue,</p>
                    <p>H. No: 1-98/9/25/p, VIP Hills, near Bank of Baroda,</p>
                    <p>Arunodaya Colony, Madhapur,</p>
                    <p>Hyderabad, Telangana 500081</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Smart Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)' }}
            onClick={closePopup}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`bg-gradient-to-br from-gray-900 to-black border rounded-2xl p-6 shadow-2xl ${
                popupMessage.type === 'success' 
                  ? 'border-emerald-500/30 shadow-emerald-500/20' 
                  : 'border-red-500/30 shadow-red-500/20'
              }`}>
                {/* Decorative glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${
                  popupMessage.type === 'success' 
                    ? 'from-emerald-600 to-blue-600' 
                    : 'from-red-600 to-orange-600'
                } rounded-2xl blur-xl opacity-30`}></div>
                
                {/* Content */}
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={closePopup}
                    className="absolute top-0 right-0 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      popupMessage.type === 'success' 
                        ? 'bg-emerald-500/20 border border-emerald-500/30' 
                        : 'bg-red-500/20 border border-red-500/30'
                    }`}>
                      {popupMessage.type === 'success' ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.1 }}
                        >
                          <CheckCircle className="w-10 h-10 text-emerald-400" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.1 }}
                        >
                          <X className="w-10 h-10 text-red-400" strokeWidth={2} />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="text-center space-y-3">
                    <h3 className="text-2xl font-bold">{popupMessage.title}</h3>
                    <p className="text-gray-300">{popupMessage.message}</p>
                  </div>

                  {/* Action button */}
                  <div className="mt-6">
                    <button
                      onClick={closePopup}
                      className={`w-full py-3 rounded-xl font-bold transition-all transform active:scale-[0.98] ${
                        popupMessage.type === 'success'
                          ? 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600'
                          : 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600'
                      }`}
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Contact;