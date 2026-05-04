// import React from 'react';

// import { motion } from 'framer-motion';
// import { Check, Zap, Building2, Rocket, Globe, ChevronRight } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import Footer from '../components/Footer';

// const PricingTier = ({ tier, index }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 30 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: false, amount: 0.2 }}
//     transition={{ delay: index * 0.1, duration: 0.6 }}
//     className={`relative group bg-[#0a0a0b]/80 backdrop-blur-xl border ${tier.featured ? 'border-blue-500/50' : 'border-white/10'} rounded-[2.5rem] p-6 md:p-10 flex flex-col shadow-2xl transition-all duration-500 hover:border-white/20 w-full max-w-[340px] md:max-w-none mx-auto`}
//   >
//     {tier.featured && (
//       <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl z-20">
//         Most Popular
//       </div>
//     )}
    
//     <div className="mb-6">
//       <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 shadow-lg`}>
//         <tier.icon className="w-6 h-6 text-white" />
//       </div>
//       <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
//       <p className="text-xs text-gray-400 font-light line-clamp-2">{tier.description}</p>
//     </div>

//     <div className="mb-6">
//       <div className="flex items-baseline gap-1">
//         <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">{tier.price}</span>
//         {tier.price !== 'Custom' && <span className="text-gray-500 text-lg">/mo</span>}
//       </div>
//     </div>

//     <ul className="space-y-3 mb-8">
//       {tier.features.map((feature, idx) => (
//         <li key={idx} className="flex items-start gap-3 group/item text-xs md:text-sm">
//           <div className="mt-1 w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
//             <Check className="w-3 h-3 text-blue-400" />
//           </div>
//           <span className="text-gray-300 font-light leading-snug">
//             {feature.includes('FREE') ? (
//               <>
//                 {feature.replace('FREE', '')}
//                 <span className="text-blue-400 font-bold ml-1">FREE</span>
//               </>
//             ) : feature}
//           </span>
//         </li>
//       ))}
//     </ul>

//     <Link 
//       to="/contact" 
//       className={`w-full py-4 rounded-full text-center font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 group/btn ${
//         tier.featured 
//         ? 'bg-[#0071e3] text-white hover:bg-[#0077ED] shadow-xl shadow-blue-500/20 hover:scale-[1.02]' 
//         : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
//       }`}
//     >
//       {tier.name === 'Starter' ? 'Start Free' : 'Book Demo'}
//       <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
//     </Link>
//   </motion.div>
// );

// const Price = () => {
//   const tiers = [
//     {
//       name: "Basic",
//       description: "Essential tools for small teams looking to connect their workflows.",
//       price: "FREE",
//       icon: Rocket,
//       color: "from-blue-500 to-cyan-500",
//       features: [
//         "Core HRM & Recruitment FREE",
//         "Job Post Management",
//         "Application Reports",
//         "Unified Dashboard Access",
//         "End To End Recruitment",
//         "Email Support"
//       ],
//       featured: false
//     },
//     {
//       name: "Premium",
//       description: "Advanced systems for growing businesses scaling their operations.",
//       price: "₹500",
//       icon: Zap,
//       color: "from-indigo-600 to-purple-600",
//       features: [
//         "Recruitment + Payroll Upto 50 Login",
//         "Attendance Management",
//         "Role‑based access for employees, managers, HR.",
//         "Manage employee records and onboarding.",
//         "Generate payslips and basic payroll reports.",
//         "Applicants & Employee Reports",
//         "Priority Email Support"
//       ],
//       featured: true
//     },
//     {
//       name: "Others",
//       description: "Custom architecture designed for multi-national corporations.",
//       price: "1000",
//       icon: Globe,
//       color: "from-slate-700 to-slate-900",
//       features: [
//         "Recruitment + Payroll Upto 100 Login",
//         "Attendance Management",
//         "Role‑based access for employees, managers, HR.",
//         "Manage employee records and onboarding.",
//         "Generate payslips and basic payroll reports.",
//         "Applicants & Employee Reports",
//         "Priority Email Support"
//       ],
//       featured: false
//     }
//   ];

//   return (
//     <main className="bg-black text-white h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth font-sans no-scrollbar selection:bg-blue-500/30">
      
//       {/* Background Elements */}
//       <div className="fixed inset-0 z-0">
//         <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
//         <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
//       </div>

//       {/* Hero Section */}
//       <section className="snap-start h-screen w-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="relative z-10"
//         >
//           <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8">
//             Simple Pricing. <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Universal System.</span>
//           </h1>
//           <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-12">
//             Choose the ecosystem that scales with your ambition. One login, one dashboard, complete control.
//           </p>
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="flex flex-col items-center gap-2 opacity-50"
//           >
//             <span className="text-[10px] uppercase tracking-widest">Scroll to explore plans</span>
//             <div className="w-px h-12 bg-white/20"></div>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Mobile Snap Sections (Individual Cards) / Desktop Single Section */}
//       {/* For desktop we show all 3, for mobile we can snap each one */}
//       <section className="hidden lg:flex snap-start h-screen w-full items-center justify-center px-6">
//         <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 w-full">
//           {tiers.map((tier, idx) => (
//             <PricingTier key={idx} tier={tier} index={idx} />
//           ))}
//         </div>
//       </section>

//       {/* Mobile Only: Individual Card Snaps */}
//       {tiers.map((tier, idx) => (
//         <section key={idx} className="lg:hidden snap-start h-screen w-full flex items-center justify-center px-6 py-10">
//           <PricingTier tier={tier} index={0} />
//         </section>
//       ))}

//       {/* FAQ & Footer Section */}
//       <section className="snap-start min-h-screen w-full flex flex-col pt-20">
//         <div className="flex-grow flex flex-col items-center justify-center px-6 max-w-4xl mx-auto text-center mb-20">
//            <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">Flexible for every business</h2>
//            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
//               <div className="space-y-4">
//                  <h4 className="text-xl font-bold text-white flex items-center gap-3">
//                     <Building2 className="w-6 h-6 text-blue-500" /> Pay only for what you need
//                  </h4>
//                  <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
//                     Scale your plan up or down as your team grows. Add modules individually or choose a comprehensive tier.
//                  </p>
//               </div>
//               <div className="space-y-4">
//                  <h4 className="text-xl font-bold text-white flex items-center gap-3">
//                     <Zap className="w-6 h-6 text-indigo-500" /> No hidden implementation fees
//                  </h4>
//                  <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
//                     Our pricing is transparent. Get your system up and running without unexpected setup costs.
//                  </p>
//               </div>
//            </div>
//         </div>
    
//       </section>

//     </main>
//   );
// };

// export default Price;




import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Building2, Rocket, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

const PricingTier = ({ tier, index, onBook }) => (
  <div
    className={`relative group bg-[#0a0a0b]/80 backdrop-blur-xl border ${tier.featured ? 'border-blue-500/50' : 'border-white/10'} rounded-[2.5rem] p-6 md:p-10 flex flex-col shadow-2xl transition-all duration-500 hover:border-white/20 w-full max-w-[340px] md:max-w-none mx-auto`}
  >
    {tier.featured && (
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl z-20">
        Most Popular
      </div>
    )}

    <div className="mb-6">
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center mb-4 shadow-lg`}>
        <tier.icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
      <p className="text-xs text-gray-400 font-light line-clamp-2">{tier.description}</p>
    </div>

    <div className="mb-6">
      <div className="flex items-baseline gap-1">
        <span className="text-4xl md:text-5xl font-bold text-white tracking-tight">{tier.price}</span>
        {tier.price !== 'FREE' && tier.price !== 'Custom' && (
          <span className="text-gray-500 text-lg">/mo</span>
        )}
      </div>
    </div>

    <ul className="space-y-3 mb-8">
      {tier.features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3 group/item text-xs md:text-sm">
          <div className="mt-1 w-4 h-4 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-blue-400" />
          </div>
          <span className="text-gray-300 font-light leading-snug">
            {feature.includes('FREE') ? (
              <>
                {feature.replace('FREE', '')}
                <span className="text-blue-400 font-bold ml-1">FREE</span>
              </>
            ) : feature}
          </span>
        </li>
      ))}
    </ul>

    <button
      onClick={() => onBook(tier)}
      className={`w-full py-4 rounded-full text-center font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 group/btn ${
        tier.featured
          ? 'bg-[#0071e3] text-white hover:bg-[#0077ED] shadow-xl shadow-blue-500/20 hover:scale-[1.02]'
          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20'
      }`}
    >
      {tier.name === 'Starter' ? 'Start Free' : 'Book Now'}
      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
    </button>
  </div>
);

const Price = () => {
  const [tiers, setTiers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleBook = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetch('https://api.ingrainsystems.com/api/clients/allplans')
      .then((res) => res.json())
      .then((data) => {
        const apiPlans = data?.plans || [];

        const formattedPlans = apiPlans.map((plan, index) => ({
          id: plan._id || plan.id,
          name: plan.name || "Plan",
          description: plan.description || "",
          price:
            plan.price === 0
              ? "FREE"
              : plan.price
              ? `₹${plan.price}`
              : "Custom",
          priceValue: plan.price || 0,
          icon: index === 0 ? Rocket : index === 1 ? Zap : Globe,
          color:
            index === 0
              ? "from-blue-500 to-cyan-500"
              : index === 1
              ? "from-indigo-600 to-purple-600"
              : "from-slate-700 to-slate-900",
          features:
            typeof plan.features === "string"
              ? plan.features.split(",")
              : plan.features || [],
          featured: index === 1,
        }));

        setTiers(formattedPlans);
      })
      .catch((err) => {
        console.error("API Error:", err);
      });
  }, []);

  return (
    <main className="bg-black text-white h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth font-sans no-scrollbar selection:bg-blue-500/30">

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[180px]"></div>
      </div>

      {/* Hero */}
      <section className="snap-start h-screen w-full flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-8">
            Simple Pricing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Universal System.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-12">
            Choose the ecosystem that scales with your ambition. One login, one dashboard, complete control.
          </p>
        </motion.div>
      </section>

      {/* Desktop */}
      <section className="hidden lg:flex snap-start h-screen w-full items-center justify-center px-6 py-4 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-8 w-full">
          {tiers.map((tier, idx) => (
            <PricingTier key={idx} tier={tier} index={idx} onBook={handleBook} />
          ))}
        </div>
      </section>

      {/* Mobile */}
      {tiers.map((tier, idx) => (
        <section key={idx} className="lg:hidden snap-start h-screen w-full flex items-center justify-center px-6 py-10 pt-20">
          <PricingTier tier={tier} index={0} onBook={handleBook} />
        </section>
      ))}

      {/* Bottom Section */}
      <section className="snap-start h-screen w-full flex flex-col pt-20">
        <div className="flex-grow flex flex-col items-center justify-center px-6 max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight">
            Flexible for every business
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-500" /> Pay only for what you need
              </h4>
              <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                Scale your plan up or down as your team grows.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white flex items-center gap-3">
                <Zap className="w-6 h-6 text-indigo-500" /> No hidden implementation fees
              </h4>
              <p className="text-gray-400 font-light leading-relaxed text-sm md:text-base">
                Transparent pricing with no surprises.
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </section>

      {selectedPlan && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          selectedPlan={selectedPlan} 
        />
      )}
    </main>
  );
};

export default Price;
