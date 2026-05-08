import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight,
  Target,
  ArrowRight,
  TrendingUp,
  Settings,
  Clock,
  CalendarDays
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import r1 from '../img/a1.png';
import r2 from '../img/r2.png';
import r3 from '../img/r3.png';
import r4 from '../img/r4.png';

// Dashboard mock data
const initialColumns = [
  { id: 'present', title: 'Present Today', count: 142 },
  { id: 'remote', title: 'Remote Work', count: 45 },
  { id: 'leave', title: 'On Leave', count: 12 },
  { id: 'late', title: 'Late / Missing', count: 3 },
];

const mockEmployees = [
  { id: 1, name: 'Alex Johnson', role: 'Senior Developer', status: 'present', time: '09:00 AM', source: 'Office HQ' },
  { id: 2, name: 'Sarah Williams', role: 'Product Manager', status: 'remote', time: '08:45 AM', source: 'Home Network' },
  { id: 3, name: 'Michael Chen', role: 'UX Designer', status: 'leave', time: 'Sick Leave', source: 'System Auto' },
  { id: 4, name: 'Emma Davis', role: 'Marketing Lead', status: 'late', time: 'Expected 10:30', source: 'Mobile App' },
];

const features = [
  {
    image: r1,
    title: "Effortless Time Tracking",
    description: "Employees can clock in and out with a single click or through mobile devices. Automated tracking ensures extreme accuracy.",
    color: "from-indigo-900/30 to-purple-900/30",
    glow: "bg-indigo-500/10"
  },
  {
    image: r2,
    title: "Smart Leave Management",
    description: "Request, approve, and track time off effortlessly. Built-in policies automatically calculate accruals and balances in real-time.",
    color: "from-blue-900/30 to-cyan-900/30",
    glow: "bg-blue-500/10"
  },
  {
    image: r3,
    title: "One-Click Payroll",
    description: "Convert approved timesheets into payroll instantly. Automated calculations, deductions, and reporting make payday a breeze.",
    color: "from-emerald-900/30 to-teal-900/30",
    glow: "bg-emerald-500/10"
  },
  {
    image: r4,
    title: "Advanced Analytics",
    description: "Spot attendance trends, monitor overtime costs, and generate compliance reports with our powerful built-in dashboard.",
    color: "from-fuchsia-900/30 to-pink-900/30",
    glow: "bg-fuchsia-500/10"
  }
];

const Attendance = () => {
  return (
    <div className="bg-black min-h-screen font-sans text-white pt-[52px] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-black overflow-hidden pointer-events-none">
         <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] mix-blend-screen animate-pulse duration-[12000ms]"></div>
         <div className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      <div className="relative z-10">
        <main className="pb-32">
          
          {/* HERO SECTION */}
          <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center relative py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300 font-medium">Time & Compensation</span>
              </div>
              
              <h1 className="text-[3rem] md:text-[5rem] lg:text-[6.5rem] font-bold tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400 mb-6 drop-shadow-2xl">
                Attendance & Payroll.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Reimagined.</span>
              </h1>

              <p className="text-lg md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Track hours, manage leaves, and automate payroll seamlessly. Eliminate manual data entry and ensure everyone gets paid accurately, on time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0 mt-8">
                <Link to="/contact" className="w-full sm:w-auto bg-[#0071e3] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#0077ED] transition-all shadow-lg hover:shadow-blue-500/30 hover:scale-105 flex items-center justify-center gap-2 group">
                  Book Demo
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/price" className="w-full sm:w-auto bg-[#1c1c1e] text-white border border-white/10 px-8 py-4 rounded-full text-lg font-medium hover:bg-[#2c2c2e] transition-all shadow-lg hover:scale-105 text-center">
                  Start for Free
                </Link>
              </div>
            </motion.div>
          </section>

          {/* DASHBOARD VISUALIZATION SECTION */}
          <section className="px-6 max-w-[1400px] mx-auto mb-20 relative z-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Monitor in Real-Time</h2>
              <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto">Keep an eye on who is working, who is late, and who is on leave with our intuitive daily dashboard.</p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="bg-[#111113]/80 backdrop-blur-2xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 border border-white/10 shadow-2xl shadow-blue-500/10 overflow-hidden"
            >
              <div className="flex overflow-x-auto gap-6 pb-6 snap-x no-scrollbar">
                {initialColumns.map((col, index) => (
                  <div key={col.id} className="min-w-[300px] md:min-w-[320px] flex-shrink-0 snap-start">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <h3 className="font-semibold text-lg text-white/90">{col.title}</h3>
                      <span className="bg-white/10 text-xs px-2.5 py-1 rounded-full text-gray-300 font-medium">{col.count}</span>
                    </div>
                    
                    <div className="space-y-4">
                      {mockEmployees.filter(c => c.status === col.id).map((emp, idx) => (
                        <motion.div 
                          key={emp.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.1) + (idx * 0.1) }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer hover:border-blue-500/30 hover:bg-white/10 transition-all shadow-lg"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-medium text-white">{emp.name}</h4>
                            <div className="flex gap-1 items-center bg-white/5 px-2 py-1 rounded-md">
                               <Clock className="w-3 h-3 text-gray-400" />
                               <span className="text-xs text-gray-300">{emp.time}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-4">{emp.role}</p>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {emp.source}</span>
                          </div>
                        </motion.div>
                      ))}
                      
                      {/* Empty slots for design */}
                      <div className="h-24 rounded-2xl border-2 border-dashed border-white/5 flex items-center justify-center opacity-50">
                        <span className="text-sm text-gray-500 font-medium">No alerts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ALTERNATING FEATURES SECTION */}
          <section className="px-6 max-w-[1200px] mx-auto mb-40 relative z-20">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter text-white mb-24 w-full text-center">
              All the features done right.
            </h2>
            
            <div className="flex flex-col gap-32">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col md:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* IMAGE SIDE */}
                  <div className="flex-1 w-full relative group">
                    <div className={`absolute -inset-4 ${feature.glow} rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-700`}></div>
                    <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#111113]/50 backdrop-blur-sm p-4">
                      <img 
                        src={feature.image} 
                        alt={feature.title} 
                        className="w-full h-auto object-cover rounded-xl drop-shadow-lg"
                      />
                    </div>
                  </div>

                  {/* TEXT SIDE */}
                  <div className="flex-1 w-full text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                      <span className="text-sm text-gray-300 font-medium">Feature {idx + 1}</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed font-light">
                      {feature.description}
                    </p>
                    <div className="mt-8">
                      <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-auto md:mx-0"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* INTEGRATION SHOWCASE */}
          <section className="px-6 max-w-[1200px] mx-auto mb-32 z-20 relative">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full bg-[#111113] rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 border border-white/10 relative overflow-hidden group"
            >
              <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-blue-500/20 transition-all duration-1000"></div>
              
              <div className="flex-1 relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300 font-medium">Accounting Integration</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                  Timesheets approved! <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Now what?</span>
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed mb-8">
                  Push your payroll data directly into your accounting ledger. Generate payslips, calculate taxes, and issue payments without opening another app.
                </p>
                <ul className="space-y-4 text-left inline-block">
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Seamless transition to Accounting</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> Automated tax deduction logic</li>
                  <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="w-5 h-5 text-blue-400" /> One-click payslip distribution</li>
                </ul>
              </div>
              
              <div className="flex-1 relative z-10 w-full">
                <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2rem] p-6 md:p-8 backdrop-blur-md shadow-2xl relative">
                   <div className="flex flex-col gap-4">
                      {/* Fake UI elements */}
                      <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400 flex items-center justify-center text-white font-bold">AJ</div>
                          <div>
                            <p className="text-white font-medium">Alex Johnson</p>
                            <p className="text-xs text-gray-400">October Payroll</p>
                          </div>
                        </div>
                        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20">Paid</span>
                      </div>
                      <div className="space-y-3 mt-2">
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <CalendarDays className="w-5 h-5 text-blue-400" />
                          <div className="flex-1">
                            <div className="h-2 w-3/4 bg-white/10 rounded-full mb-2"></div>
                            <div className="h-2 w-1/2 bg-white/10 rounded-full"></div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                          <Settings className="w-5 h-5 text-emerald-400" />
                          <div className="flex-1">
                            <div className="h-2 w-2/3 bg-white/10 rounded-full mb-2"></div>
                            <div className="h-2 w-1/3 bg-white/10 rounded-full"></div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* FINAL CTA SECTION */}
          <section className="px-6 max-w-[1200px] mx-auto z-20 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-blue-900/30 via-teal-900/30 to-emerald-900/30 backdrop-blur-2xl rounded-[3rem] p-12 md:p-24 text-center border border-white/10 relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-1000"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-8 leading-tight">
                  Ready to automate <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">your payroll?</span>
                </h2>
                
                <p className="text-xl text-gray-300 font-light mb-10 max-w-2xl">
                  Join millions of users who are already saving hours every week on attendance and payroll management.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 mt-2 justify-center items-center w-full">
                  <Link to="/contact" className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-white/20 hover:scale-105 flex items-center justify-center gap-2 group/btn">
                    Start Automating Now
                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link to="/price" className="w-full sm:w-auto bg-white/5 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full text-xl font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-lg hover:scale-105 flex items-center justify-center">
                    Meet an Advisor
                  </Link>
                </div>
              </div>
              
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
            </motion.div>
          </section>

        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Attendance;