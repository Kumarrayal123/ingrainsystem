import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Clock, 
  ChevronRight, 
  ChevronDown, 
  Users, 
  Sparkles, 
  Upload, 
  CheckCircle, 
  X, 
  ArrowUpRight,
  TrendingUp,
  Mail,
  Phone,
  Layers,
  Award,
  Link as LinkIcon
} from 'lucide-react';
import Footer from '../components/Footer';

// Configurable API Endpoint for job listings
const JOBS_API_URL = 'http://62.72.29.27:7000/api/jobs/all';

// Curated high-fidelity fallback positions
const DEFAULT_JOBS = [
  {
    _id: '69f47763935953ea0fa90a15',
    role: 'Digital Marketing Executive',
    department: 'Marketing',
    location: 'Madhapur,Hyderabad.',
    jobType: 'normal',
    experience: '1-2',
    salary: '25k',
    vacancies: 1,
    link: '/jobs/e0f0e319',
    skills: 'Basic knowledge of SEO, SEM, and social media marketing Familiarity with digital marketing tools and platforms Good communication and analytical skills Ability to manage tasks and meet deadlines',
    description: "Key Responsibilities\nAssist in planning and executing digital marketing campaigns (SEO, SEM, social media, email)\nManage campaigns using Google Ads and Facebook Ads Manager \nPerform keyword research and track website performance via Google Analytics\nCreate and schedule content for social media platforms\nMonitor campaign performance and prepare basic reports\nSupport email marketing campaigns using tools like Mailchimp\nCoordinate with internal teams for content and creatives\n🧠 Required Skills\nBasic knowledge of SEO, SEM, and social media marketing\nFamiliarity with digital marketing tools and platforms\nGood communication and analytical skills\nAbility to manage tasks and meet deadlines\n🎓 Qualifications & Experience\nBachelor’s degree in Marketing, Business, or related field\n0–2 years of experience \n⭐ Nice to Have\nKnowledge of tools like Canva\nBasic content writing or design skills\nInterest in digital marketing trends"
  },
  {
    _id: '6996a07fd6961f17c7921e13',
    role: 'Web Developer',
    department: 'Developer',
    location: 'Hyderabad',
    jobType: 'normal',
    experience: 'Fresher',
    salary: '5k',
    vacancies: 1,
    link: '/jobs/246ffd77',
    skills: 'html, css , Tailwindcss, javascript , react.js',
    responsibilities: 'We are looking for a dedicated React.js Developer who can convert design concepts into responsive, high-quality websites.',
    description: 'we are looking for web developer intern position we can build and design website using react.js.'
  },
  {
    _id: '698d9daf0751b2c8db850c19',
    role: 'React.js Developer',
    department: 'Developer',
    location: 'Hyderabad',
    jobType: 'normal',
    experience: '0-1',
    salary: '2 LPA',
    vacancies: 1,
    link: '/jobs/89b39578',
    skills: 'React.js, JavaScript, HTML, CSS',
    description: "We are looking for dedicated react.js developer who can design figma design into website."
  }
];

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [expandedJobId, setExpandedJobId] = useState(null);
  
  const [isDeptDropdownOpen, setIsDeptDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [deptSearchTerm, setDeptSearchTerm] = useState('');

  const deptDropdownRef = useRef(null);
  const typeDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (deptDropdownRef.current && !deptDropdownRef.current.contains(event.target)) {
        setIsDeptDropdownOpen(false);
      }
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target)) {
        setIsTypeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeJob, setActiveJob] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    coverNote: ''
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch jobs
  useEffect(() => {
    setLoading(true);
    fetch(JOBS_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('API offline');
        return res.json();
      })
      .then((data) => {
        const rawJobs = data?.jobPosts || data?.jobs || (Array.isArray(data) ? data : []);
        if (rawJobs.length > 0) {
          setJobs(rawJobs);
        } else {
          setJobs(DEFAULT_JOBS);
        }
      })
      .catch((err) => {
        console.warn('Jobs API call failed, falling back to curated defaults.', err);
        setJobs(DEFAULT_JOBS);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeName(file.name);
    }
  };

  const handleApplyClick = (job, e) => {
    e.stopPropagation();
    if (job.link) {
      const targetUrl = job.link.startsWith('http') 
        ? job.link 
        : `https://ingrainhire.ingrainsystems.com${job.link}`;
      window.open(targetUrl, '_blank');
    } else {
      setActiveJob(job);
      setIsModalOpen(true);
      setSubmitSuccess(false);
    }
  };

  const closeApplyModal = () => {
    setIsModalOpen(false);
    setActiveJob(null);
    setResumeName('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      experience: '',
      coverNote: ''
    });
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setSubmitSuccess(true);
    } catch (err) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getJobDepartment = (job) => {
    let dept = job.department && job.department.trim() !== '' ? job.department.trim() : '';
    if (dept) {
      const lower = dept.toLowerCase();
      if (lower === 'developer' || lower === 'develoepr' || lower === 'react.js') return 'Development';
      if (lower === 'digital marketing' || lower === 'marketing') return 'Digital Marketing';
      if (lower === 'sales') return 'Sales';
      if (lower === 'management') return 'Management';
      if (lower === 'nursing') return 'Nursing';
      if (lower === 'general medicine' || lower === 'medical' || lower === 'healthcare') return 'Medical & Healthcare';
      return dept.charAt(0).toUpperCase() + dept.slice(1);
    }
    const role = (job.role || job.title || '').toLowerCase();
    if (role.includes('developer') || role.includes('react') || role.includes('web')) return 'Development';
    if (role.includes('marketing') || role.includes('seo')) return 'Digital Marketing';
    if (role.includes('sales')) return 'Sales';
    if (role.includes('medical') || role.includes('healthcare')) return 'Medical & Healthcare';
    if (role.includes('nurse')) return 'Nursing';
    return 'Operations';
  };

  const getJobTypeLabel = (job) => {
    const type = job.jobType || 'normal';
    if (type.toLowerCase() === 'normal') return 'Full-Time';
    if (type.toLowerCase() === 'short') return 'Short-Term';
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const departments = ['All', ...new Set(jobs.map(job => getJobDepartment(job)))];
  const types = ['All', ...new Set(jobs.map(job => getJobTypeLabel(job)))];
  const filteredDepartments = departments.filter(dept => 
    dept.toLowerCase().includes(deptSearchTerm.toLowerCase())
  );

  const renderDescriptionText = (job) => {
    const desc = job.description || '';
    const resp = job.responsibilities || '';
    let combinedText = desc;
    if (resp && resp.trim() !== '' && resp.trim() !== desc.trim()) {
      combinedText = `Key Responsibilities\n${resp}\n\nAbout The Role\n${desc}`;
    }
    if (!combinedText) return null;
    
    return combinedText.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      const isHeader = trimmed.toLowerCase().includes('key responsibilities') || 
                       trimmed.toLowerCase().includes('required skills') || 
                       trimmed.toLowerCase().includes('qualifications') || 
                       trimmed.toLowerCase().includes('about the role') ||
                       trimmed.startsWith('🧠') || trimmed.startsWith('🎓') || trimmed.startsWith('⭐');
      if (isHeader) {
        return (
          <h5 key={idx} className="text-xs font-bold uppercase tracking-wider text-purple-400 mt-6 mb-3 flex items-center gap-2 border-b border-white/5 pb-1">
            {trimmed}
          </h5>
        );
      }
      const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*');
      const cleanLine = isBullet ? trimmed.substring(1).trim() : trimmed;
      return (
        <div key={idx} className="flex items-start gap-2.5 text-gray-400 text-sm mb-2.5 font-light pl-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500/40 mt-2 shrink-0"></span>
          <span className="leading-relaxed">{cleanLine}</span>
        </div>
      );
    });
  };

  const formatSalary = (salary) => {
    if (!salary) return 'Competitive';
    const clean = salary.trim().toLowerCase();
    if (clean.includes('₹') || clean.includes('rs')) return salary;
    if (clean.endsWith('k')) return `₹${salary.toUpperCase()} / month`;
    if (clean.endsWith('l') || clean.includes('lpa')) return `₹${salary.toUpperCase()}`;
    if (/^\d+$/.test(clean)) return `₹${parseInt(clean, 10).toLocaleString('en-IN')} / month`;
    return salary;
  };

  const filteredJobs = jobs.filter((job) => {
    const title = job.role || job.title || '';
    const dept = getJobDepartment(job);
    const description = job.description || '';
    const type = getJobTypeLabel(job);
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || dept === selectedDept;
    const matchesType = selectedType === 'All' || type === selectedType;
    return matchesSearch && matchesDept && matchesType;
  });

  return (
    <div className="bg-black min-h-screen text-white font-sans pt-20 relative overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-[130px] animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-purple-500/20"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-purple-300 font-bold tracking-wider uppercase">Build the Ecosystem</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-6"
          >
            Shape the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400">
              Enterprise Workflows.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Join a global team designing premium solutions that connect operations, healthcare outreach, and smart logistics systems under a unified architecture.
          </motion.p>
        </section>

        {/* Bento Grid Section - WITH EXTRA TOP MARGIN (mt-40) so grid shows at bottom */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-48 mb-24">
            {[
            { title: "Precision Crafted", desc: "We construct state-of-the-art architectures where UI design and frontend code merge into seamless workflows.", icon: TrendingUp, color: "from-purple-500/10 to-transparent border-purple-500/20" },
            { title: "Global Mandate", desc: "Designed in India, built to integrate enterprise frameworks around the world. Scale your impact infinitely.", icon: Users, color: "from-indigo-500/10 to-transparent border-indigo-500/20" },
            { title: "Smart Autonomy", desc: "No complex processes. High agency. Take charge of your scope and deploy fast, robust modules.", icon: Briefcase, color: "from-blue-500/10 to-transparent border-blue-500/20" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6, ease: "easeOut" }}
              className={`bg-[#0c0c0e]/80 border ${item.color} rounded-[2rem] p-8 flex flex-col justify-between hover:border-white/20 transition-all duration-500 relative group overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-[40px] group-hover:bg-white/10 transition-colors"></div>
              <div>
                <item.icon className="w-8 h-8 text-gray-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Active Openings Section */}
        <section id="openings" className="relative z-10 mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white mb-2 uppercase">Active Openings</h2>
              <p className="text-gray-500 text-sm font-light">
                {jobs.length > 0 ? (
                  <span>Showing <strong className="text-purple-400 font-semibold">{filteredJobs.length}</strong> active openings across <strong className="text-indigo-400 font-semibold">{new Set(filteredJobs.map(getJobDepartment)).size}</strong> departments.</span>
                ) : (
                  "Filter dynamically by department or keyword to discover your next team."
                )}
              </p>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 border-b border-white/5 pb-8 relative z-50">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs by title or keyword..."
                className="w-full bg-[#111113]/85 border border-white/10 rounded-2xl pl-11 pr-5 py-3.5 focus:outline-none focus:border-purple-500/50 transition-all text-sm placeholder:text-gray-600 shadow-inner"
              />
            </div>

            <div ref={deptDropdownRef} className="relative w-full">
              <button
                type="button"
                onClick={() => {
                  setIsDeptDropdownOpen(!isDeptDropdownOpen);
                  setIsTypeDropdownOpen(false);
                }}
                className="w-full bg-[#111113]/85 border border-white/10 rounded-2xl px-5 py-3.5 text-left text-sm flex items-center justify-between text-gray-300 hover:border-white/20 transition-all focus:outline-none"
              >
                <span className="flex items-center gap-2 truncate">
                  <span className="text-gray-500 text-xs uppercase font-bold tracking-wider mr-1">Dept:</span>
                  {selectedDept}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDeptDropdownOpen ? 'rotate-180 text-purple-400' : ''}`} />
              </button>

              <AnimatePresence>
                {isDeptDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 bg-[#111113] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 max-h-72 overflow-y-auto"
                  >
                    <div className="relative mb-2 sticky top-0 bg-[#111113] pt-1 pb-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                      <input
                        type="text"
                        value={deptSearchTerm}
                        onChange={(e) => setDeptSearchTerm(e.target.value)}
                        placeholder="Search departments..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50"
                        onClick={(e) => e.stopPropagation()}
                      />
                      {deptSearchTerm && (
                        <button
                          type="button"
                          onClick={() => setDeptSearchTerm('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-1">
                      {filteredDepartments.map((dept) => (
                        <button
                          key={dept}
                          type="button"
                          onClick={() => {
                            setSelectedDept(dept);
                            setIsDeptDropdownOpen(false);
                            setDeptSearchTerm('');
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                            selectedDept === dept
                              ? 'bg-purple-500/10 text-purple-400 font-bold'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{dept}</span>
                          {selectedDept === dept && <CheckCircle className="w-3.5 h-3.5 text-purple-400" />}
                        </button>
                      ))}
                      {filteredDepartments.length === 0 && (
                        <div className="text-center py-4 text-xs text-gray-600">No departments found</div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div ref={typeDropdownRef} className="relative w-full">
              <button
                type="button"
                onClick={() => {
                  setIsTypeDropdownOpen(!isTypeDropdownOpen);
                  setIsDeptDropdownOpen(false);
                }}
                className="w-full bg-[#111113]/85 border border-white/10 rounded-2xl px-5 py-3.5 text-left text-sm flex items-center justify-between text-gray-300 hover:border-white/20 transition-all focus:outline-none"
              >
                <span className="flex items-center gap-2 truncate">
                  <span className="text-gray-500 text-xs uppercase font-bold tracking-wider mr-1">Type:</span>
                  {selectedType}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isTypeDropdownOpen ? 'rotate-180 text-blue-400' : ''}`} />
              </button>

              <AnimatePresence>
                {isTypeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 right-0 mt-2 bg-[#111113] border border-white/10 rounded-2xl shadow-2xl p-3 z-50 max-h-60 overflow-y-auto"
                  >
                    <div className="space-y-1">
                      {types.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => {
                            setSelectedType(t);
                            setIsTypeDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                            selectedType === t
                              ? 'bg-blue-500/10 text-blue-400 font-bold'
                              : 'text-gray-400 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <span>{t}</span>
                          {selectedType === t && <CheckCircle className="w-3.5 h-3.5 text-blue-400" />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Jobs Listing */}
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-28 bg-white/5 border border-white/5 rounded-[1.5rem] animate-pulse"></div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="bg-[#111113]/30 border border-white/5 rounded-[2rem] p-16 text-center">
              <Briefcase className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No matching positions found</h3>
              <p className="text-gray-500 text-sm font-light max-w-sm mx-auto">
                We're always looking for outstanding talents. Try clearing your filters or send a general application at <span className="text-purple-400 font-medium">careers@ingrainsystem.com</span>
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(
                filteredJobs.reduce((acc, job) => {
                  const dept = getJobDepartment(job);
                  if (!acc[dept]) acc[dept] = [];
                  acc[dept].push(job);
                  return acc;
                }, {})
              ).map(([deptName, deptJobs]) => (
                <div key={deptName} className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-indigo-500 rounded-full"></div>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
                      {deptName}
                    </h3>
                    <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                      {deptJobs.length} {deptJobs.length === 1 ? 'Opening' : 'Openings'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {deptJobs.map((job) => {
                      const isExpanded = expandedJobId === job._id;
                      const title = job.role || job.title || 'Specialist Position';
                      const dept = getJobDepartment(job);
                      const type = getJobTypeLabel(job);
                      const expText = job.experience ? (job.experience.includes('Year') || job.experience.toLowerCase() === 'fresher' ? job.experience : `${job.experience} Years`) : '0-2 Years';
                      const jobId = job._id || job.id || '';
                      
                      return (
                        <motion.div
                          key={jobId}
                          layout
                          className={`bg-[#0c0c0e]/80 border ${isExpanded ? 'border-purple-500/40 shadow-2xl shadow-purple-500/5' : 'border-white/10'} rounded-[1.8rem] transition-all duration-500 hover:border-white/20 overflow-hidden cursor-pointer`}
                          onClick={() => setExpandedJobId(isExpanded ? null : jobId)}
                        >
                          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400 px-2 py-0.5 rounded">
                                  {dept}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded">
                                  {type}
                                </span>
                                {job.vacancies && job.vacancies !== "" && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
                                    {job.vacancies} {parseInt(job.vacancies, 10) === 1 ? 'Vacancy' : 'Vacancies'}
                                  </span>
                                )}
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-500 px-2.5 py-0.5 rounded font-mono">
                                  ID: {jobId}
                                </span>
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                                {title}
                                {job.link && <LinkIcon className="w-3.5 h-3.5 text-blue-400 opacity-60" />}
                              </h3>
                              <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-gray-400 font-light">
                                <span className="flex items-center gap-1.5">
                                  <MapPin className="w-3.5 h-3.5 text-gray-500" />
                                  {job.location || 'Hyderabad'}
                                </span>
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                                  Experience: {expText}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-4 border-t border-white/5 pt-4 md:border-none md:pt-0">
                              <button
                                onClick={(e) => handleApplyClick(job, e)}
                                className="bg-white hover:bg-gray-200 text-black px-6 py-2.5 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md shadow-white/5 flex items-center gap-1"
                              >
                                Apply Now {job.link && <ArrowUpRight className="w-3.5 h-3.5 text-black" />}
                              </button>
                              <div className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 transition-all">
                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-purple-400' : ''}`} />
                              </div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="border-t border-white/5 bg-black/40"
                              >
                                <div className="p-6 md:p-8 space-y-6 text-sm text-gray-300 font-light leading-relaxed">
                                  <div>{renderDescriptionText(job)}</div>

                                  {job.skills && (
                                    <div className="border-t border-white/5 pt-6">
                                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 flex items-center gap-2">
                                        <Layers className="w-3.5 h-3.5" /> Core Skills
                                      </h4>
                                      <div className="flex flex-wrap gap-2 pl-2">
                                        {job.skills.split(/,|\n/).map((sk, index) => {
                                          const cleanSk = sk.trim();
                                          if (!cleanSk) return null;
                                          return (
                                            <span key={index} className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-xs text-gray-300 font-normal">
                                              {cleanSk}
                                            </span>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/5 pt-6">
                                    <div>
                                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-2">
                                        <Award className="w-3.5 h-3.5" /> Offered Package
                                      </h4>
                                      <p className="text-white font-semibold text-base pl-1">{formatSalary(job.salary)}</p>
                                    </div>
                                    <div>
                                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5 flex items-center gap-2">
                                        <Users className="w-3.5 h-3.5" /> Vacancy Details
                                      </h4>
                                      <p className="text-gray-300 font-normal pl-1">{job.vacancies || 1} Open position(s)</p>
                                    </div>
                                  </div>

                                  <div className="flex justify-end pt-4 border-t border-white/5">
                                    <button
                                      onClick={(e) => handleApplyClick(job, e)}
                                      className="bg-[#0071e3] hover:bg-blue-600 text-white px-8 py-3 rounded-full text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md shadow-blue-500/10 flex items-center gap-2"
                                    >
                                      {job.link ? 'Navigate to Next Process' : 'Apply Online'} 
                                      {job.link ? <ArrowUpRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Banner */}
        <section className="mt-32 mb-20 bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-blue-900/10 border border-white/10 rounded-[2.5rem] p-8 md:p-16 text-center relative overflow-hidden group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/20 transition-all duration-1000"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">Don't see your ideal role?</h2>
            <p className="text-gray-400 font-light text-base md:text-lg">
              Send us your portfolio or curriculum vitae anyway. We are constantly expanding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a href="mailto:careers@ingrainsystem.com" className="w-full sm:w-auto bg-[#0071e3] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" /> Send Application
              </a>
              <a href="tel:+919010481048" className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white/10 transition-all hover:scale-105 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Contact Recruiter
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Application Modal */}
      <AnimatePresence>
        {isModalOpen && activeJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeApplyModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-lg bg-[#111113] border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-[50px] rounded-full pointer-events-none"></div>
              <button
                onClick={closeApplyModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              {submitSuccess ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Application Received!</h3>
                    <p className="text-gray-400 text-sm font-light max-w-sm mx-auto">
                      Thank you for applying, <span className="font-semibold text-white">{formData.name}</span>.
                    </p>
                  </div>
                  <button
                    onClick={closeApplyModal}
                    className="bg-white hover:bg-gray-200 text-black px-8 py-3 rounded-full text-xs font-bold transition-all hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-5">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-1 uppercase">Apply Online</h2>
                    <p className="text-gray-500 text-xs font-light">
                      Position: <span className="text-purple-400 font-semibold">{activeJob.role || activeJob.title}</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Full Name</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                        <input
                          required
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Phone</label>
                        <input
                          required
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Experience</label>
                        <input
                          required
                          type="text"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="e.g. 1.5 Years"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Resume</label>
                        <label className="w-full bg-white/5 border border-dashed border-white/10 rounded-xl px-4 py-3 flex items-center justify-center gap-2 text-gray-500 hover:text-white hover:border-purple-500 cursor-pointer text-center text-xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[120px]">{resumeName || 'Upload PDF'}</span>
                          <input required type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Cover Note</label>
                      <textarea
                        name="coverNote"
                        value={formData.coverNote}
                        onChange={handleInputChange}
                        placeholder="Tell us about your core strengths..."
                        rows={3}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-xs placeholder:text-gray-600 focus:outline-none focus:border-purple-500 resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase hover:from-purple-600 hover:to-indigo-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Careers;