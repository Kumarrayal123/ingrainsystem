// pages/ClientDashboard.jsx - Complete Fixed Code (No Emojis, React Icons Only)

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar, 
  FiTrendingUp, FiTrendingDown, FiPackage, FiRefreshCw,
  FiHome, FiMenu, FiZap, FiCheckCircle, FiGrid, FiEye,
  FiX, FiDollarSign, FiTag, FiInfo, FiArrowRight, FiPlus,
  FiSave, FiBox, FiGrid as FiGridIcon, FiMonitor, FiSmartphone,
  FiShoppingCart, FiBook, FiMusic, FiCamera, FiHeart, FiStar,
  FiCoffee, FiGift, FiTool, FiGlobe, FiCloud, FiLock,
  FiBell, FiSettings, FiUsers, FiDollarSign as FiDollarIcon,
  FiClock, FiTarget, FiHome as FiHomeIcon, FiAward, FiBookOpen,
  FiDatabase, FiServer, FiLayers, FiClipboard, FiFileText,
  FiPieChart, FiBarChart2, FiActivity, FiGitBranch, FiCode,
  FiChevronLeft, FiChevronRight, FiRefreshCcw, FiCopy, FiShare2
} from 'react-icons/fi';
import ClientSidebar from '../components/ClientSidebar';

const API_URL = 'https://api.ingrainsystems.com/api';
const BASE_URL = 'https://api.ingrainsystems.com/api';

// ─── PRODUCT NAME TO ICON MAPPING ───
const getProductIcon = (productName) => {
  const name = productName.toLowerCase().trim();
  
  if (name.includes('hr') || name.includes('human resource')) return FiUsers;
  if (name.includes('recruitment')) return FiBriefcase;
  if (name.includes('accounting') || name.includes('finance')) return FiDollarIcon;
  if (name.includes('crm') || name.includes('customer')) return FiUsers;
  if (name.includes('training') || name.includes('camp')) return FiTarget;
  if (name.includes('coworking') || name.includes('space') || name.includes('office')) return FiHomeIcon;
  if (name.includes('attendance') || name.includes('time')) return FiClock;
  if (name.includes('software') || name.includes('development')) return FiCode;
  if (name.includes('database') || name.includes('data')) return FiDatabase;
  if (name.includes('server') || name.includes('cloud')) return FiServer;
  if (name.includes('management') || name.includes('admin')) return FiSettings;
  if (name.includes('report') || name.includes('analytics')) return FiBarChart2;
  if (name.includes('project') || name.includes('task')) return FiClipboard;
  if (name.includes('document') || name.includes('file')) return FiFileText;
  if (name.includes('marketing') || name.includes('sales')) return FiTrendingUp;
  if (name.includes('learning') || name.includes('course')) return FiBookOpen;
  if (name.includes('security') || name.includes('safety')) return FiLock;
  if (name.includes('network') || name.includes('connect')) return FiGlobe;
  
  const defaultIcons = [FiPackage, FiBox, FiLayers, FiGrid, FiActivity];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return defaultIcons[hash % defaultIcons.length];
};

const getProductColor = (productName) => {
  const name = productName.toLowerCase().trim();
  
  if (name.includes('hr') || name.includes('human resource')) return '#FF6B6B';
  if (name.includes('recruitment')) return '#4ECDC4';
  if (name.includes('accounting') || name.includes('finance')) return '#45B7D1';
  if (name.includes('crm') || name.includes('customer')) return '#96CEB4';
  if (name.includes('training') || name.includes('camp')) return '#FFEAA7';
  if (name.includes('coworking') || name.includes('space')) return '#DDA0DD';
  if (name.includes('attendance') || name.includes('time')) return '#FF8A5C';
  if (name.includes('software')) return '#A29BFE';
  if (name.includes('management')) return '#FD79A8';
  if (name.includes('database')) return '#00CEC9';
  if (name.includes('server')) return '#FDCB6E';
  if (name.includes('report')) return '#6C5CE7';
  if (name.includes('project')) return '#00B894';
  if (name.includes('document')) return '#E17055';
  if (name.includes('marketing')) return '#74B9FF';
  if (name.includes('support')) return '#55EFC4';
  if (name.includes('learning')) return '#FAB1A0';
  if (name.includes('security')) return '#81ECEC';
  if (name.includes('network')) return '#F8A5C2';
  
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#FF8A5C', '#A29BFE'];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

function ClientDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState('');
  const [addError, setAddError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [countdowns, setCountdowns] = useState({});
  const [copySuccess, setCopySuccess] = useState('');
  
  const [showProductsPopup, setShowProductsPopup] = useState(false);
  const popupRef = useRef(null);

  // ─── RENEW PLAN STATES ───
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [allPlans, setAllPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [renewLoading, setRenewLoading] = useState(false);
  const [renewSuccess, setRenewSuccess] = useState('');
  const [renewError, setRenewError] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [currentPlanId, setCurrentPlanId] = useState(null);
  
  // ─── SUCCESS POPUP STATES ───
  const [showRenewSuccessPopup, setShowRenewSuccessPopup] = useState(false);
  const [renewedPlanName, setRenewedPlanName] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    status: 'active',
    features: [],
    addedBy: 'Client'
  });

  const clientId = localStorage.getItem('clientId') || '';
  const clientName = localStorage.getItem('clientName') || 'Client';

  // ─── COUNTDOWN TIMER ───
  useEffect(() => {
    if (dashboardData?.packages?.selected) {
      const interval = setInterval(() => {
        const newCountdowns = {};
        dashboardData.packages.selected.forEach((pkg, index) => {
          if (pkg.expiryDate) {
            const expiry = new Date(pkg.expiryDate);
            const now = new Date();
            const diff = expiry - now;
            
            if (diff > 0) {
              const days = Math.floor(diff / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((diff % (1000 * 60)) / 1000);
              newCountdowns[index] = { days, hours, minutes, seconds, expired: false };
            } else {
              newCountdowns[index] = { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
            }
          }
        });
        setCountdowns(newCountdowns);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [dashboardData]);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!clientId) {
      setError('Client ID not found. Please login again.');
      setLoading(false);
      return;
    }
    fetchDashboardData();
    fetchProducts();
  }, [clientId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowProductsPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/clients/dashboard/${clientId}`);
      console.log('Dashboard Response:', response.data);
      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      console.error('Dashboard Error:', err);
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/clients/products`);
      console.log('Products Response:', response.data);
      if (response.data.success) {
        setProducts(response.data.products || []);
      }
    } catch (err) {
      console.error('Products Error:', err);
    } finally {
      setProductsLoading(false);
    }
  };

  // ─── FETCH ALL PLANS ───
  const fetchAllPlans = async () => {
    setPlansLoading(true);
    setRenewError('');
    try {
      const response = await axios.get(`${BASE_URL}/clients/allplans`);
      console.log('All Plans Response:', response.data);
      if (response.data.success) {
        setAllPlans(response.data.plans || []);
      } else {
        setRenewError('Failed to load plans');
      }
    } catch (err) {
      console.error('Fetch Plans Error:', err);
      setRenewError('Failed to load plans. Please try again.');
    } finally {
      setPlansLoading(false);
    }
  };

  // ─── OPEN RENEW MODAL ───
  const openRenewModal = (planId) => {
    setCurrentPlanId(planId);
    setShowRenewModal(true);
    setSelectedPlan(null);
    setShowPaymentModal(false);
    setRenewError('');
    setRenewSuccess('');
    fetchAllPlans();
  };

  // ─── CLOSE RENEW MODAL ───
  const closeRenewModal = () => {
    setShowRenewModal(false);
    setSelectedPlan(null);
    setRenewError('');
    setRenewSuccess('');
    setShowPaymentModal(false);
    setCurrentPlanId(null);
  };

  // ─── HANDLE PLAN SELECTION ───
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setRenewError('');
    setRenewSuccess('');
    setShowPaymentModal(true);
  };

  // ─── PROCESS RENEWAL ───
  const processRenewal = async () => {
    if (!selectedPlan) return;
    
    setPaymentLoading(true);
    setRenewError('');
    setRenewSuccess('');
    
    try {
      const payload = {
        planId: selectedPlan._id,
        planName: selectedPlan.name,
        planPrice: selectedPlan.price,
        priceType: selectedPlan.priceType
      };
      
      const response = await axios.post(
        `${API_URL}/clients/renew-plan/${clientId}`,
        payload
      );
      
      console.log('Renew Response:', response.data);
      
      if (response.data.success) {
        setRenewedPlanName(selectedPlan.name);
        setShowRenewSuccessPopup(true);
        setShowPaymentModal(false);
        setShowRenewModal(false);
        await fetchDashboardData();
        
        setTimeout(() => {
          setShowRenewSuccessPopup(false);
        }, 6000);
      } else {
        setRenewError(response.data.message || 'Failed to renew plan');
      }
    } catch (err) {
      console.error('Renew Error:', err);
      setRenewError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  // ─── COPY TO CLIPBOARD ───
  const copyToClipboard = (text, type) => {
    if (!text) {
      setCopySuccess('Nothing to copy!');
      setTimeout(() => setCopySuccess(''), 3000);
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(`${type} copied!`);
      setTimeout(() => setCopySuccess(''), 3000);
    }).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopySuccess(`${type} copied!`);
      setTimeout(() => setCopySuccess(''), 3000);
    });
  };

  // ─── SHARE REFERRAL ───
  const shareReferral = (referralCode) => {
    if (!referralCode) {
      setCopySuccess('No referral code to share!');
      setTimeout(() => setCopySuccess(''), 3000);
      return;
    }
    if (navigator.share) {
      navigator.share({
        title: 'Join me on IRYAX!',
        text: `Use my referral code ${referralCode} to get started on IRYAX! 🚀`,
        url: `${window.location.origin}/login?ref=${referralCode}`
      }).catch(() => {});
    } else {
      copyToClipboard(`Use my referral code ${referralCode} to get started on IRYAX! 🚀`, 'Referral link');
    }
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
    setShowProductsPopup(false);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const toggleProductsPopup = () => {
    setShowProductsPopup(!showProductsPopup);
    if (!showProductsPopup) {
      fetchProducts();
    }
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    setAddSuccess('');

    try {
      const generateCode = (name) => {
        const prefix = name.substring(0, 3).toUpperCase();
        const timestamp = Date.now().toString().slice(-6);
        return `${prefix}${timestamp}`;
      };

      const payload = {
        name: formData.name,
        code: generateCode(formData.name),
        description: formData.description,
        price: parseFloat(formData.price) || 0,
        category: formData.category,
        status: formData.status,
        features: formData.features ? formData.features.split(',').map(f => f.trim()) : [],
        addedBy: clientName || 'Client'
      };

      const response = await axios.post(`${API_URL}/clients/createproduct`, payload);
      console.log('Add Product Response:', response.data);

      if (response.data.success) {
        setAddSuccess('✅ Product added successfully!');
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          status: 'active',
          features: [],
          addedBy: 'Client'
        });
        await fetchProducts();
        setActiveSection('products');
        setTimeout(() => setAddSuccess(''), 5000);
      } else {
        setAddError(response.data.message || 'Failed to add product');
      }
    } catch (err) {
      console.error('Add Product Error:', err);
      setAddError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setAddLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>⚠️</div>
        <h2 style={styles.errorTitle}>Something went wrong</h2>
        <p style={styles.errorText}>{error}</p>
        <button onClick={fetchDashboardData} style={styles.retryButton}>
          <FiRefreshCw size={16} /> Try Again
        </button>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorIcon}>📭</div>
        <h2 style={styles.errorTitle}>No Data Found</h2>
        <p style={styles.errorText}>No dashboard data available.</p>
        <button onClick={fetchDashboardData} style={styles.retryButton}>
          <FiRefreshCw size={16} /> Refresh
        </button>
      </div>
    );
  }

  const { profile, wallet, packages, stats } = dashboardData;

  // ─── GET REFERRAL CODE SAFELY ───
  const getReferralCode = () => {
    if (profile?.referralCode) return profile.referralCode;
    if (profile?.referral_code) return profile.referral_code;
    if (profile?.referral) return profile.referral;
    return 'N/A';
  };

  // ─── GET CLIENT ID SAFELY ───
  const getClientId = () => {
    if (profile?.clientId) return profile.clientId;
    if (profile?.client_id) return profile.client_id;
    if (profile?.id) return profile.id;
    if (profile?._id) return profile._id;
    return clientId || 'N/A';
  };

  // ─── GET PRODUCT ICON COMPONENT ───
  const getProductIconComponent = (productName) => {
    const Icon = getProductIcon(productName);
    return Icon;
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <>
            {/* ─── STATS CARDS ─── */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIconWrapper}>
                  <FiAward size={24} color="#000" />
                </div>
                <div style={styles.statContent}>
                  <p style={styles.statLabel}>Available Coins</p>
                  <h2 style={styles.statValue}>{wallet?.coins || 0}</h2>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIconWrapper}>
                  <FiTrendingUp size={24} color="#000" />
                </div>
                <div style={styles.statContent}>
                  <p style={styles.statLabel}>Coins Earned</p>
                  <h2 style={styles.statValue}>{stats?.totalCoinsEarned || 0}</h2>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIconWrapper}>
                  <FiTrendingDown size={24} color="#000" />
                </div>
                <div style={styles.statContent}>
                  <p style={styles.statLabel}>Coins Spent</p>
                  <h2 style={styles.statValue}>{stats?.totalCoinsSpent || 0}</h2>
                </div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statIconWrapper}>
                  <FiBriefcase size={24} color="#000" />
                </div>
                <div style={styles.statContent}>
                  <p style={styles.statLabel}>Jobs Posted</p>
                  <h2 style={styles.statValue}>{stats?.totalJobsPosted || 0}</h2>
                </div>
              </div>
            </div>

            {/* ─── ACTIVE PLAN ─── */}
            {stats?.activePlan && (
              <div style={styles.planCard}>
                <div style={styles.planHeader}>
                  <FiZap size={20} color="#000" />
                  <span style={styles.planTitle}>Active Plan</span>
                </div>
                <div style={styles.planContent}>
                  <div style={styles.planName}>{stats.activePlan.name}</div>
                  <div style={styles.planDetails}>
                    <span style={styles.planBadge}>{stats.activePlan.duration}</span>
                    <span style={styles.planPrice}>₹{stats.activePlan.price}</span>
                  </div>
                  <div style={styles.planDates}>
                    <span>Purchased: {formatDate(stats.activePlan.purchaseDate)}</span>
                    <span>Expires: {formatDate(stats.activePlan.expiryDate)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ─── YOUR PRODUCTS (ACCESSIBLE PRODUCTS) - NO EMOJIS ─── */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>
                  <FiBox size={18} style={{ marginRight: '8px' }} />
                  Your Products
                  {packages?.accessibleProducts && (
                    <span style={styles.countBadge}>{packages.accessibleProducts.length}</span>
                  )}
                </h3>
                <button 
                  onClick={() => setActiveSection('products')} 
                  style={styles.viewProductsButtonTop}
                >
                  <FiEye size={16} /> View All
                </button>
              </div>
              <div style={styles.productGrid}>
                {packages?.accessibleProducts && packages.accessibleProducts.length > 0 ? (
                  packages.accessibleProducts.map((product, index) => {
                    const IconComponent = getProductIconComponent(product.name);
                    const color = getProductColor(product.name);
                    return (
                      <div key={index} style={styles.productCard}>
                        <div style={{ ...styles.productIconWrapper, background: `${color}20`, color: color }}>
                          <IconComponent size={28} />
                        </div>
                        <div style={styles.productInfo}>
                          <div style={styles.productName}>{product.name}</div>
                          <div style={styles.productStatus}>
                            <FiCheckCircle size={14} color="#4caf50" />
                            <span>Active</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p style={styles.emptyText}>No products accessible.</p>
                )}
              </div>
            </div>

            {/* ─── PROFILE ─── */}
            <div style={styles.sectionCard}>
              <h3 style={styles.sectionTitle}>Profile</h3>
              <div style={styles.profileInfo}>
                <div style={styles.profileRow}>
                  <FiUser size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Name</span>
                  <span style={styles.profileValue}>{profile?.name || 'N/A'}</span>
                </div>
                <div style={styles.profileRow}>
                  <FiMail size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Email</span>
                  <span style={styles.profileValue}>{profile?.email || 'N/A'}</span>
                </div>
                <div style={styles.profileRow}>
                  <FiPhone size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Mobile</span>
                  <span style={styles.profileValue}>{profile?.mobile || 'N/A'}</span>
                </div>
                <div style={styles.profileRow}>
                  <FiBriefcase size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Company</span>
                  <span style={styles.profileValue}>{profile?.companyName || 'N/A'}</span>
                </div>
                <div style={styles.profileRow}>
                  <FiCalendar size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Member Since</span>
                  <span style={styles.profileValue}>{formatDate(profile?.createdAt)}</span>
                </div>
              </div>
              
              {/* ─── SEPARATE SECTION FOR REFERRAL & CLIENT ID ─── */}
              <div style={styles.codeSection}>
                <h4 style={styles.codeSectionTitle}>Referral & Client Details</h4>
                <div style={styles.codeGrid}>
                  <div style={styles.codeCard}>
                    <span style={styles.codeLabel}>Referral Code</span>
                    <div style={styles.codeValueWrapper}>
                      <span style={{ ...styles.codeValue, color: '#FFD700' }}>
                        {getReferralCode()}
                      </span>
                      <div style={styles.codeActions}>
                        <button 
                          onClick={() => copyToClipboard(getReferralCode(), 'Referral Code')}
                          style={styles.codeButton}
                          title="Copy Referral Code"
                        >
                          <FiCopy size={16} color="#888" />
                        </button>
                        <button 
                          onClick={() => shareReferral(getReferralCode())}
                          style={styles.codeButton}
                          title="Share Referral Code"
                        >
                          <FiShare2 size={16} color="#888" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div style={styles.codeCard}>
                    <span style={styles.codeLabel}>Client ID</span>
                    <div style={styles.codeValueWrapper}>
                      <span style={{ ...styles.codeValue, color: '#4FC3F7' }}>
                        {getClientId()}
                      </span>
                      <div style={styles.codeActions}>
                        <button 
                          onClick={() => copyToClipboard(getClientId(), 'Client ID')}
                          style={styles.codeButton}
                          title="Copy Client ID"
                        >
                          <FiCopy size={16} color="#888" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* ─── COPY SUCCESS TOAST ─── */}
              {copySuccess && (
                <div style={styles.copyToast}>
                  <FiCheckCircle size={16} color="#4caf50" />
                  <span>{copySuccess}</span>
                </div>
              )}
            </div>
          </>
        );

      case 'products':
        return (
          <div style={styles.productsContainer}>
            {/* ─── ALL PRODUCTS ─── */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>
                  <FiPackage size={18} style={{ marginRight: '8px' }} />
                  All Products
                </h3>
                <div style={styles.sectionHeaderRight}>
                  <span style={styles.productCount}>{products.length} products</span>
                  <button 
                    onClick={() => setActiveSection('dashboard')} 
                    style={styles.viewProductsButton}
                  >
                    <FiGrid size={16} /> Back to Dashboard
                  </button>
                </div>
              </div>
              {productsLoading ? (
                <p style={styles.loadingText}>Loading products...</p>
              ) : products.length === 0 ? (
                <p style={styles.emptyText}>No products available.</p>
              ) : (
                <div style={styles.productsGrid}>
                  {products.map((product) => {
                    const IconComponent = getProductIcon(product.name);
                    return (
                      <div 
                        key={product._id} 
                        style={styles.productItem}
                        onClick={() => openProductModal(product)}
                      >
                        <div style={styles.productItemIcon}>
                          <IconComponent size={24} color="#888" />
                        </div>
                        <div style={styles.productItemInfo}>
                          <div style={styles.productItemName}>{product.name}</div>
                          <div style={styles.productItemCode}>Code: {product.code}</div>
                        </div>
                        <FiArrowRight size={16} style={styles.productItemArrow} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ─── YOUR ACCESSIBLE PRODUCTS - NO EMOJIS ─── */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>
                  <FiCheckCircle size={18} color="#4caf50" style={{ marginRight: '8px' }} />
                  Your Accessible Products
                  {packages?.accessibleProducts && (
                    <span style={styles.countBadge}>{packages.accessibleProducts.length}</span>
                  )}
                </h3>
              </div>
              {packages?.accessibleProducts && packages.accessibleProducts.length > 0 ? (
                <div style={styles.accessibleProductsGrid}>
                  {packages.accessibleProducts.map((product, index) => {
                    const IconComponent = getProductIconComponent(product.name);
                    const color = getProductColor(product.name);
                    return (
                      <div key={index} style={styles.accessibleProductCard}>
                        <div style={{ ...styles.accessibleProductIcon, background: `${color}20`, color: color }}>
                          <IconComponent size={22} />
                        </div>
                        <div style={styles.accessibleProductInfo}>
                          <div style={styles.accessibleProductName}>{product.name}</div>
                          <div style={styles.accessibleProductStatus}>
                            <FiCheckCircle size={12} color="#4caf50" />
                            <span>Active</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={styles.emptyText}>No accessible products available.</p>
              )}
            </div>
          </div>
        );

      case 'add-product':
        return (
          <div style={styles.sectionCard}>
            <div style={styles.addProductHeader}>
              <div style={styles.addProductTitleSection}>
                <h3 style={styles.sectionTitle}>Add New Product</h3>
                <p style={styles.addProductSubtitle}>Add your product with us and become our partner</p>
              </div>
            </div>

            {addSuccess && (
              <div style={styles.successMessage}>
                <FiCheckCircle size={18} color="#4caf50" />
                <span>{addSuccess}</span>
              </div>
            )}

            {addError && (
              <div style={styles.errorMessage}>
                <FiX size={18} color="#ef5350" />
                <span>{addError}</span>
              </div>
            )}

            <form onSubmit={handleAddProduct} style={styles.addProductForm}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter product name"
                    style={styles.formInput}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="Enter price"
                    style={styles.formInput}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                    placeholder="Enter category (e.g., software, service)"
                    style={styles.formInput}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    style={styles.formSelect}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Enter product description"
                  style={styles.formTextarea}
                  rows="3"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>Features (comma separated)</label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleFormChange}
                  placeholder="e.g., feature1, feature2, feature3"
                  style={styles.formInput}
                />
              </div>

              <button 
                type="submit" 
                disabled={addLoading} 
                style={styles.submitButton}
              >
                {addLoading ? (
                  <>
                    <span style={styles.spinnerSmall}></span>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <FiSave size={18} />
                    Add Product
                  </>
                )}
              </button>
            </form>
          </div>
        );

      case 'plans':
        return (
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <FiDollarSign size={18} style={{ marginRight: '8px' }} />
                My Plans
                {packages?.selected && (
                  <span style={styles.countBadge}>{packages.selected.length}</span>
                )}
              </h3>
              <button 
                onClick={() => setActiveSection('dashboard')} 
                style={styles.viewProductsButton}
              >
                <FiGrid size={16} /> Back to Dashboard
              </button>
            </div>
            
            {addSuccess && (
              <div style={styles.successMessage}>
                <FiCheckCircle size={18} color="#4caf50" />
                <span>{addSuccess}</span>
              </div>
            )}

            {addError && (
              <div style={styles.errorMessage}>
                <FiX size={18} color="#ef5350" />
                <span>{addError}</span>
              </div>
            )}

            {packages?.selected && packages.selected.length > 0 ? (
              packages.selected.map((pkg, index) => {
                const countdown = countdowns[index] || { days: 0, hours: 0, minutes: 0, seconds: 0, expired: false };
                const isExpired = countdown.expired || new Date(pkg.expiryDate) < new Date();
                
                return (
                  <div key={index} style={styles.packageCard}>
                    <div style={styles.packageHeader}>
                      <span style={styles.packageName}>{pkg.name || 'Plan'}</span>
                      <span style={{
                        ...styles.packageBadge,
                        background: isExpired ? '#ef5350' : '#4caf50',
                        color: '#ffffff'
                      }}>
                        {isExpired ? 'Expired' : 'Active'}
                      </span>
                    </div>
                    <div style={styles.packageDetails}>
                      <div style={styles.packageRow}>
                        <span style={styles.packageLabel}>Price</span>
                        <span style={styles.packageValue}>₹{pkg.price || 0}</span>
                      </div>
                      <div style={styles.packageRow}>
                        <span style={styles.packageLabel}>Duration</span>
                        <span style={styles.packageValue}>{pkg.duration || 'N/A'}</span>
                      </div>
                      <div style={styles.packageRow}>
                        <span style={styles.packageLabel}>Purchased</span>
                        <span style={styles.packageValue}>{formatDate(pkg.purchaseDate)}</span>
                      </div>
                      <div style={styles.packageRow}>
                        <span style={styles.packageLabel}>Expires</span>
                        <span style={styles.packageValue}>{formatDate(pkg.expiryDate)}</span>
                      </div>
                      
                      {/* ─── COUNTDOWN TIMER ─── */}
                      <div style={styles.countdownContainer}>
                        <div style={styles.countdownTitle}>
                          <FiClock size={14} color="#888" />
                          <span>{isExpired ? 'Plan Expired' : 'Time Remaining'}</span>
                        </div>
                        {!isExpired ? (
                          <div style={styles.countdownGrid}>
                            <div style={styles.countdownItem}>
                              <span style={styles.countdownNumber}>{String(countdown.days).padStart(2, '0')}</span>
                              <span style={styles.countdownLabel}>Days</span>
                            </div>
                            <div style={styles.countdownItem}>
                              <span style={styles.countdownNumber}>{String(countdown.hours).padStart(2, '0')}</span>
                              <span style={styles.countdownLabel}>Hours</span>
                            </div>
                            <div style={styles.countdownItem}>
                              <span style={styles.countdownNumber}>{String(countdown.minutes).padStart(2, '0')}</span>
                              <span style={styles.countdownLabel}>Mins</span>
                            </div>
                            <div style={styles.countdownItem}>
                              <span style={styles.countdownNumber}>{String(countdown.seconds).padStart(2, '0')}</span>
                              <span style={styles.countdownLabel}>Secs</span>
                            </div>
                          </div>
                        ) : (
                          <div style={styles.expiredMessage}>
                            <span>⏰ This plan has expired. Please renew to continue.</span>
                          </div>
                        )}
                      </div>

                      {/* ─── RENEW BUTTON - WHITE & SMALL ─── */}
                      <button 
                        onClick={() => openRenewModal(pkg._id || index)}
                        disabled={addLoading}
                        style={{
                          ...styles.renewButton,
                          opacity: addLoading ? 0.6 : 1
                        }}
                      >
                        <FiRefreshCcw size={14} />
                        {addLoading ? 'Processing...' : 'Renew'}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={styles.emptyText}>No plans purchased yet.</p>
            )}
          </div>
        );

      case 'profile':
        return (
          <div style={styles.profileContainer}>
            {/* ─── PROFILE CARD ─── */}
            <div style={styles.sectionCard}>
              <h3 style={styles.sectionTitle}>Profile</h3>
              <div style={styles.profileInfo}>
                <div style={styles.profileRow}>
                  <FiUser size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Name</span>
                  <span style={styles.profileValue}>{profile?.name || 'N/A'}</span>
                </div>
                <div style={styles.profileRow}>
                  <FiMail size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Email</span>
                  <span style={styles.profileValue}>{profile?.email || 'N/A'}</span>
                </div>
                <div style={styles.profileRow}>
                  <FiPhone size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Mobile</span>
                  <span style={styles.profileValue}>{profile?.mobile || 'N/A'}</span>
                </div>
                <div style={styles.profileRow}>
                  <FiBriefcase size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Company</span>
                  <span style={styles.profileValue}>{profile?.companyName || 'N/A'}</span>
                </div>
                <div style={styles.profileRow}>
                  <FiCalendar size={14} style={styles.profileIcon} />
                  <span style={styles.profileLabel}>Member Since</span>
                  <span style={styles.profileValue}>{formatDate(profile?.createdAt)}</span>
                </div>
              </div>
              
              {/* ─── SEPARATE SECTION FOR REFERRAL & CLIENT ID ─── */}
              <div style={styles.codeSection}>
                <h4 style={styles.codeSectionTitle}>Referral & Client Details</h4>
                <div style={styles.codeGrid}>
                  <div style={styles.codeCard}>
                    <span style={styles.codeLabel}>Referral Code</span>
                    <div style={styles.codeValueWrapper}>
                      <span style={{ ...styles.codeValue, color: '#FFD700' }}>
                        {getReferralCode()}
                      </span>
                      <div style={styles.codeActions}>
                        <button 
                          onClick={() => copyToClipboard(getReferralCode(), 'Referral Code')}
                          style={styles.codeButton}
                          title="Copy Referral Code"
                        >
                          <FiCopy size={16} color="#888" />
                        </button>
                        <button 
                          onClick={() => shareReferral(getReferralCode())}
                          style={styles.codeButton}
                          title="Share Referral Code"
                        >
                          <FiShare2 size={16} color="#888" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div style={styles.codeCard}>
                    <span style={styles.codeLabel}>Client ID</span>
                    <div style={styles.codeValueWrapper}>
                      <span style={{ ...styles.codeValue, color: '#4FC3F7' }}>
                        {getClientId()}
                      </span>
                      <div style={styles.codeActions}>
                        <button 
                          onClick={() => copyToClipboard(getClientId(), 'Client ID')}
                          style={styles.codeButton}
                          title="Copy Client ID"
                        >
                          <FiCopy size={16} color="#888" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* ─── COPY SUCCESS TOAST ─── */}
              {copySuccess && (
                <div style={styles.copyToast}>
                  <FiCheckCircle size={16} color="#4caf50" />
                  <span>{copySuccess}</span>
                </div>
              )}
            </div>

            {/* ─── YOUR PRODUCTS CARD ─── */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>
                  <FiBox size={18} style={{ marginRight: '8px' }} />
                  Your Products
                  <span style={styles.countBadge}>{products.length}</span>
                </h3>
                <button 
                  onClick={() => setActiveSection('products')} 
                  style={styles.viewProductsButton}
                >
                  <FiEye size={16} /> View All
                </button>
              </div>
              {productsLoading ? (
                <p style={styles.loadingText}>Loading products...</p>
              ) : products.length === 0 ? (
                <div style={styles.emptyProductState}>
                  <FiPackage size={48} color="#444" />
                  <p style={styles.emptyText}>No products added yet.</p>
                  <button 
                    onClick={() => setActiveSection('add-product')} 
                    style={styles.addProductSmallButton}
                  >
                    <FiPlus size={16} /> Add Your First Product
                  </button>
                </div>
              ) : (
                <div style={styles.profileProductsGrid}>
                  {products.slice(0, 4).map((product) => {
                    const IconComponent = getProductIcon(product.name);
                    return (
                      <div 
                        key={product._id} 
                        style={styles.profileProductItem}
                        onClick={() => openProductModal(product)}
                      >
                        <div style={styles.profileProductIcon}>
                          <IconComponent size={20} color="#888" />
                        </div>
                        <div style={styles.profileProductInfo}>
                          <div style={styles.profileProductName}>{product.name}</div>
                          <div style={styles.profileProductPrice}>₹{product.price}</div>
                        </div>
                        <FiArrowRight size={14} style={styles.profileProductArrow} />
                      </div>
                    );
                  })}
                  {products.length > 4 && (
                    <div style={styles.viewMoreProducts}>
                      <button 
                        onClick={() => setActiveSection('products')} 
                        style={styles.viewMoreButton}
                      >
                        View {products.length - 4} more products →
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const sidebarWidth = isMobile ? 0 : (sidebarCollapsed ? 80 : 260);

  return (
    <div style={styles.container}>
      <ClientSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        profile={profile}
        handleLogout={handleLogout}
        sidebarCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <div style={{
        ...styles.mainWrapper,
        marginLeft: isMobile ? 0 : sidebarWidth,
        width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`
      }}>
        {/* ─── FIXED HEADER ─── */}
        <header style={{
          ...styles.header,
          position: 'fixed',
          top: 0,
          right: 0,
          left: isMobile ? 0 : sidebarWidth,
          width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
          zIndex: 100,
          background: '#000000',
          borderBottom: '1px solid #222222',
          padding: '16px 32px'
        }}>
          <div style={styles.headerLeft}>
            <button 
              onClick={() => setSidebarOpen(true)} 
              style={{ ...styles.menuButton, display: isMobile ? 'block' : 'none' }}
            >
              <FiMenu size={24} color="#fff" />
            </button>
            {!isMobile && (
              <button onClick={toggleSidebar} style={styles.collapseButton}>
                {sidebarCollapsed ? <FiChevronRight size={20} color="#888" /> : <FiChevronLeft size={20} color="#888" />}
              </button>
            )}
            <div>
              <h1 style={styles.headerTitle}>
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'products' && 'All Products'}
                {activeSection === 'add-product' && 'Add Product'}
                {activeSection === 'plans' && 'My Plans'}
                {activeSection === 'profile' && 'Profile'}
              </h1>
              <p style={styles.headerSubtitle}>Welcome back, {profile?.name || 'Client'}!</p>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.headerIconWrapper} ref={popupRef}>
              <button 
                onClick={toggleProductsPopup} 
                style={styles.headerIconButton}
                title="Products"
              >
                <FiGridIcon size={22} color="#fff" />
                {products.length > 0 && (
                  <span style={styles.headerIconBadge}>{products.length}</span>
                )}
                <span style={styles.headerIconLabel}>Products</span>
              </button>
              
              {showProductsPopup && (
                <div style={styles.popupDropdown}>
                  <div style={styles.popupHeader}>
                    <h3 style={styles.popupTitle}>
                      <FiPackage size={18} style={{ marginRight: '8px' }} />
                      Your Products
                    </h3>
                    <button onClick={toggleProductsPopup} style={styles.popupClose}>
                      <FiX size={18} />
                    </button>
                  </div>
                  
                  <div style={styles.popupBody}>
                    {productsLoading ? (
                      <div style={styles.popupLoading}>
                        <div style={styles.spinnerSmall}></div>
                        <span>Loading...</span>
                      </div>
                    ) : products.length === 0 ? (
                      <div style={styles.popupEmpty}>
                        <FiPackage size={36} color="#444" />
                        <p>No products yet</p>
                      </div>
                    ) : (
                      <div style={styles.popupProductGrid}>
                        {products.slice(0, 8).map((product) => {
                          const IconComponent = getProductIcon(product.name);
                          const color = getProductColor(product.name);
                          return (
                            <div 
                              key={product._id} 
                              style={styles.popupProductGridItem}
                              onClick={() => openProductModal(product)}
                            >
                              <div style={{ ...styles.popupProductGridIcon, background: `${color}20`, color: color }}>
                                <IconComponent size={28} />
                              </div>
                              <div style={styles.popupProductGridName}>{product.name}</div>
                            </div>
                          );
                        })}
                        {products.length > 8 && (
                          <div style={styles.popupViewMoreGrid}>
                            <span style={styles.popupViewMoreText}>
                              +{products.length - 8} more
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div style={styles.headerBadge}>
              <span style={styles.badgeDot}></span>
              {profile?.status || 'Active'}
            </div>
          </div>
        </header>

        {/* ─── CONTENT WITH PADDING FOR FIXED HEADER ─── */}
        <div style={styles.contentWrapper}>
          {renderContent()}
        </div>
      </div>

      {/* ─── RENEW SUCCESS POPUP ─── */}
      {showRenewSuccessPopup && (
        <div style={styles.modalOverlay} onClick={() => setShowRenewSuccessPopup(false)}>
          <div style={{ ...styles.modalContent, maxWidth: '480px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <div style={styles.successPopupIcon}>🎉</div>
            <h2 style={styles.successPopupTitle}>Congratulations!</h2>
            <p style={styles.successPopupSubtitle}>Your plan has been renewed successfully</p>
            
            <div style={styles.successPopupPlan}>
              <span style={styles.successPopupPlanLabel}>Plan</span>
              <span style={styles.successPopupPlanName}>{renewedPlanName}</span>
            </div>
            
            <p style={styles.successPopupMessage}>
              Thank you for being with us! 🚀<br />
              Your subscription is now active and you can continue using all features.
            </p>
            
            <button 
              onClick={() => setShowRenewSuccessPopup(false)}
              style={styles.successPopupButton}
            >
              <FiCheckCircle size={18} />
              Awesome!
            </button>
          </div>
        </div>
      )}

      {/* ─── RENEW MODAL ─── */}
      {showRenewModal && (
        <div style={styles.modalOverlay} onClick={closeRenewModal}>
          <div style={{ ...styles.modalContent, maxWidth: '620px', maxHeight: '90vh', overflow: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeRenewModal} style={styles.modalClose}>
              <FiX size={24} />
            </button>
            
            <div style={styles.renewModalHeader}>
              <h2 style={styles.renewModalTitle}>🔄 Renew Plan</h2>
              <p style={styles.renewModalSubtitle}>Select a plan to renew your subscription</p>
            </div>
            
            {renewSuccess && (
              <div style={styles.successMessage}>
                <FiCheckCircle size={18} color="#4caf50" />
                <span>{renewSuccess}</span>
              </div>
            )}
            
            {renewError && (
              <div style={styles.errorMessage}>
                <FiX size={18} color="#ef5350" />
                <span>{renewError}</span>
              </div>
            )}
            
            {plansLoading ? (
              <div style={styles.popupLoading}>
                <div style={styles.spinnerSmall}></div>
                <span>Loading plans...</span>
              </div>
            ) : allPlans.length === 0 ? (
              <div style={styles.popupEmpty}>
                <FiPackage size={36} color="#444" />
                <p>No plans available</p>
              </div>
            ) : (
              <div style={styles.plansGrid}>
                {allPlans.map((plan) => (
                  <div 
                    key={plan._id} 
                    style={{
                      ...styles.planCard,
                      border: selectedPlan?._id === plan._id ? '2px solid #4caf50' : '1px solid #222'
                    }}
                    onClick={() => {
                      setSelectedPlan(plan);
                      setShowPaymentModal(true);
                    }}
                  >
                    <div style={styles.planCardHeader}>
                      <span style={styles.planCardName}>{plan.name}</span>
                      {plan.popular && (
                        <span style={styles.planCardPopular}>Popular</span>
                      )}
                    </div>
                    <div style={styles.planCardPrice}>
                      ₹{plan.price}
                      <span style={styles.planCardDuration}>/{plan.priceType || 'month'}</span>
                    </div>
                    <p style={styles.planCardDescription}>{plan.description}</p>
                    <div style={styles.planCardFeatures}>
                      {plan.features && plan.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} style={styles.planCardFeature}>
                          <FiCheckCircle size={12} color="#4caf50" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {plan.features && plan.features.length > 3 && (
                        <span style={styles.planCardMore}>+{plan.features.length - 3} more</span>
                      )}
                    </div>
                    <button 
                      style={styles.planSelectButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(plan);
                        setShowPaymentModal(true);
                      }}
                    >
                      {selectedPlan?._id === plan._id ? 'Selected ✓' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── PAYMENT MODAL ─── */}
      {showPaymentModal && selectedPlan && (
        <div style={styles.modalOverlay} onClick={() => setShowPaymentModal(false)}>
          <div style={{ ...styles.modalContent, maxWidth: '420px' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowPaymentModal(false)} style={styles.modalClose}>
              <FiX size={24} />
            </button>
            
            <div style={styles.paymentModalContent}>
              <div style={styles.paymentModalIcon}>💰</div>
              <h3 style={styles.paymentModalTitle}>Confirm Renewal</h3>
              
              <div style={styles.paymentModalPlan}>
                <span style={styles.paymentModalPlanName}>{selectedPlan.name}</span>
                <span style={styles.paymentModalPlanPrice}>₹{selectedPlan.price}</span>
              </div>
              
              <p style={styles.paymentModalDesc}>
                You are about to renew your plan. Click confirm to proceed.
              </p>
              
              {renewError && (
                <div style={styles.errorMessage}>
                  <FiX size={18} color="#ef5350" />
                  <span>{renewError}</span>
                </div>
              )}
              
              <div style={styles.paymentModalButtons}>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  style={styles.paymentCancelButton}
                >
                  Cancel
                </button>
                <button 
                  onClick={processRenewal}
                  disabled={paymentLoading}
                  style={{
                    ...styles.paymentConfirmButton,
                    opacity: paymentLoading ? 0.6 : 1
                  }}
                >
                  {paymentLoading ? (
                    <>
                      <span style={styles.spinnerSmall}></span>
                      Processing...
                    </>
                  ) : (
                    'Confirm & Renew'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showProductModal && selectedProduct && (
        <div style={styles.modalOverlay} onClick={closeProductModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={closeProductModal} style={styles.modalClose}>
              <FiX size={24} />
            </button>
            <div style={styles.modalIcon}>
              <FiPackage size={48} color="#fff" />
            </div>
            <h2 style={styles.modalTitle}>{selectedProduct.name}</h2>
            <div style={styles.modalStatus}>
              <FiCheckCircle size={16} color="#4caf50" />
              <span style={{ color: '#4caf50' }}>{selectedProduct.status || 'Active'}</span>
            </div>
            <div style={styles.modalDetails}>
              <div style={styles.modalRow}>
                <FiTag size={16} style={styles.modalRowIcon} />
                <span style={styles.modalRowLabel}>Code</span>
                <span style={styles.modalRowValue}>{selectedProduct.code || 'N/A'}</span>
              </div>
              <div style={styles.modalRow}>
                <FiDollarSign size={16} style={styles.modalRowIcon} />
                <span style={styles.modalRowLabel}>Price</span>
                <span style={styles.modalRowValue}>₹{selectedProduct.price || 0}</span>
              </div>
              <div style={styles.modalRow}>
                <FiInfo size={16} style={styles.modalRowIcon} />
                <span style={styles.modalRowLabel}>Category</span>
                <span style={styles.modalRowValue}>{selectedProduct.category || 'N/A'}</span>
              </div>
              {selectedProduct.description && (
                <div style={styles.modalDescription}>
                  <p style={styles.modalDescText}>{selectedProduct.description}</p>
                </div>
              )}
            </div>
            <button onClick={closeProductModal} style={styles.modalCloseButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STYLES ───
const styles = {
  container: {
    minHeight: '100vh',
    background: '#000000',
    display: 'flex',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#ffffff'
  },
  iconEmoji: {
    fontSize: '24px'
  },
  mainWrapper: {
    flex: 1,
    minHeight: '100vh',
    transition: 'all 0.3s ease',
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    background: '#000000',
    borderBottom: '1px solid #222222',
    transition: 'all 0.3s ease',
    height: '72px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  menuButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'none'
  },
  collapseButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: 700,
    margin: 0,
    color: '#ffffff'
  },
  headerSubtitle: {
    fontSize: '14px',
    color: '#888888',
    margin: '4px 0 0'
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    position: 'relative'
  },
  contentWrapper: {
    padding: '24px 32px',
    marginTop: '72px',
    minHeight: 'calc(100vh - 72px)'
  },
  countBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontSize: '11px',
    fontWeight: 700,
    padding: '1px 10px',
    borderRadius: '20px',
    marginLeft: '10px',
    minWidth: '20px',
    height: '20px'
  },
  headerIconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  headerIconButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '8px',
    transition: 'all 0.2s',
    position: 'relative',
    color: '#ffffff'
  },
  headerIconLabel: {
    fontSize: '10px',
    color: '#888888',
    fontWeight: 400,
    letterSpacing: '0.3px'
  },
  headerIconBadge: {
    position: 'absolute',
    top: '-4px',
    right: '2px',
    background: '#ef5350',
    color: '#ffffff',
    fontSize: '9px',
    fontWeight: 700,
    minWidth: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 4px'
  },
  headerBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: 500,
    color: '#4caf50',
    padding: '6px 12px',
    background: 'rgba(76, 175, 80, 0.15)',
    borderRadius: '20px'
  },
  badgeDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#4caf50'
  },
  popupDropdown: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: '0',
    width: '380px',
    maxHeight: '420px',
    background: '#1a1a1a',
    borderRadius: '12px',
    border: '1px solid #333',
    boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    animation: 'slideDown 0.2s ease'
  },
  popupHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 18px',
    borderBottom: '1px solid #222',
    flexShrink: 0
  },
  popupTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff',
    margin: 0,
    display: 'flex',
    alignItems: 'center'
  },
  popupClose: {
    background: 'transparent',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    padding: '4px'
  },
  popupBody: {
    flex: 1,
    overflowY: 'auto',
    padding: '12px 14px',
    maxHeight: '300px'
  },
  popupLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '30px 0',
    color: '#888',
    fontSize: '13px'
  },
  popupEmpty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 0',
    gap: '10px',
    color: '#666'
  },
  popupProductGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px'
  },
  popupProductGridItem: {
    background: '#000000',
    borderRadius: '10px',
    padding: '14px 10px',
    border: '1px solid #222',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center'
  },
  popupProductGridIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '8px'
  },
  popupProductGridName: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#ffffff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%'
  },
  popupViewMoreGrid: {
    gridColumn: '1 / -1',
    padding: '8px 0',
    textAlign: 'center'
  },
  popupViewMoreText: {
    fontSize: '12px',
    color: '#666'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    marginBottom: '24px'
  },
  statCard: {
    padding: '20px 24px',
    background: '#111111',
    borderRadius: '12px',
    border: '1px solid #222222',
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  statIconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statContent: {
    flex: 1
  },
  statLabel: {
    fontSize: '12px',
    color: '#888888',
    margin: 0,
    fontWeight: 500
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 700,
    margin: '4px 0 0',
    color: '#ffffff'
  },
  planCard: {
    background: '#111111',
    borderRadius: '12px',
    border: '1px solid #222222',
    padding: '24px',
    marginBottom: '24px'
  },
  planHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px'
  },
  planTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff'
  },
  planContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  planName: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#ffffff'
  },
  planDetails: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  },
  planBadge: {
    padding: '2px 12px',
    background: '#ffffff',
    color: '#000000',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase'
  },
  planPrice: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#888888'
  },
  planDates: {
    display: 'flex',
    gap: '24px',
    fontSize: '12px',
    color: '#888888',
    marginTop: '4px'
  },
  sectionCard: {
    background: '#111111',
    borderRadius: '12px',
    border: '1px solid #222222',
    padding: '24px',
    marginBottom: '24px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  sectionHeaderRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    margin: 0,
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center'
  },
  viewProductsButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  viewProductsButtonTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginLeft: 'auto'
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px'
  },
  productCard: {
    background: '#000000',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #222222',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },
  productIconWrapper: {
    width: '56px',
    height: '56px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    fontSize: '28px'
  },
  productInfo: {
    width: '100%'
  },
  productName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff',
    textTransform: 'capitalize',
    marginBottom: '6px'
  },
  productStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '13px',
    color: '#4caf50'
  },
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  productCount: {
    fontSize: '13px',
    color: '#666666'
  },
  accessibleProductsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px'
  },
  accessibleProductCard: {
    background: '#000000',
    borderRadius: '10px',
    padding: '16px 20px',
    border: '1px solid #222222',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    transition: 'all 0.2s'
  },
  accessibleProductIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  accessibleProductInfo: {
    flex: 1
  },
  accessibleProductName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff'
  },
  accessibleProductStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#4caf50'
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '12px'
  },
  productItem: {
    background: '#000000',
    borderRadius: '10px',
    padding: '16px 20px',
    border: '1px solid #222222',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  productItemIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    background: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  productItemInfo: {
    flex: 1
  },
  productItemName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff'
  },
  productItemCode: {
    fontSize: '11px',
    color: '#666666'
  },
  productItemArrow: {
    color: '#444444'
  },
  profileContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  profileProductsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  profileProductItem: {
    background: '#000000',
    borderRadius: '8px',
    padding: '12px 16px',
    border: '1px solid #222222',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  profileProductIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    background: '#1a1a1a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileProductInfo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  profileProductName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#ffffff'
  },
  profileProductPrice: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#4caf50'
  },
  profileProductArrow: {
    color: '#444444'
  },
  emptyProductState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 0',
    gap: '12px'
  },
  addProductSmallButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  viewMoreProducts: {
    textAlign: 'center',
    paddingTop: '8px'
  },
  viewMoreButton: {
    background: 'transparent',
    border: 'none',
    color: '#888888',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  packageCard: {
    background: '#000000',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '12px',
    border: '1px solid #222222'
  },
  packageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  packageName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#ffffff'
  },
  packageBadge: {
    fontSize: '11px',
    fontWeight: 600,
    padding: '2px 12px',
    background: '#ffffff',
    color: '#000000',
    borderRadius: '20px',
    textTransform: 'uppercase'
  },
  packageDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  packageRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px'
  },
  packageLabel: {
    color: '#888888'
  },
  packageValue: {
    fontWeight: 500,
    color: '#ffffff'
  },
  packageStatus: {
    fontWeight: 600,
    fontSize: '12px'
  },
  // ─── COUNTDOWN STYLES ───
  countdownContainer: {
    marginTop: '12px',
    padding: '12px 16px',
    background: '#111111',
    borderRadius: '8px',
    border: '1px solid #222222'
  },
  countdownTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#888888',
    marginBottom: '10px'
  },
  countdownGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px'
  },
  countdownItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#000000',
    padding: '8px 4px',
    borderRadius: '6px'
  },
  countdownNumber: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#ffffff',
    fontVariantNumeric: 'tabular-nums'
  },
  countdownLabel: {
    fontSize: '9px',
    color: '#666666',
    textTransform: 'uppercase',
    marginTop: '2px'
  },
  expiredMessage: {
    textAlign: 'center',
    color: '#ef5350',
    fontSize: '13px',
    padding: '8px 0'
  },
  // ─── RENEW BUTTON - WHITE & SMALL ───
  renewButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginTop: '10px',
    padding: '6px 16px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s',
    width: 'auto',
    alignSelf: 'flex-start'
  },
  // ─── RENEW MODAL STYLES ───
  renewModalHeader: {
    marginBottom: '20px',
    textAlign: 'center'
  },
  renewModalTitle: {
    fontSize: '24px',
    fontWeight: 700,
    margin: '0 0 8px 0',
    color: '#ffffff'
  },
  renewModalSubtitle: {
    fontSize: '14px',
    color: '#888888',
    margin: 0
  },
  plansGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    maxHeight: '400px',
    overflowY: 'auto',
    padding: '4px'
  },
  planCard: {
    background: '#000000',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid #222',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  planCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  planCardName: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#ffffff'
  },
  planCardPopular: {
    fontSize: '10px',
    fontWeight: 600,
    padding: '2px 10px',
    background: '#4caf50',
    color: '#ffffff',
    borderRadius: '20px'
  },
  planCardPrice: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '8px'
  },
  planCardDuration: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#888888'
  },
  planCardDescription: {
    fontSize: '12px',
    color: '#888888',
    marginBottom: '10px',
    lineHeight: 1.4
  },
  planCardFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '10px'
  },
  planCardFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: '#cccccc'
  },
  planCardMore: {
    fontSize: '11px',
    color: '#666666',
    marginTop: '2px'
  },
  planSelectButton: {
    width: '100%',
    padding: '6px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  // ─── PAYMENT MODAL ───
  paymentModalContent: {
    padding: '4px 0'
  },
  paymentModalIcon: {
    fontSize: '48px',
    textAlign: 'center',
    marginBottom: '8px'
  },
  paymentModalTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '16px',
    textAlign: 'center'
  },
  paymentModalPlan: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #222',
    marginBottom: '12px'
  },
  paymentModalPlanName: {
    fontSize: '14px',
    color: '#ffffff'
  },
  paymentModalPlanPrice: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#4caf50'
  },
  paymentModalDesc: {
    fontSize: '13px',
    color: '#888888',
    marginBottom: '16px',
    textAlign: 'center'
  },
  paymentModalButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '12px'
  },
  paymentCancelButton: {
    flex: 1,
    padding: '10px',
    background: 'transparent',
    border: '1px solid #333',
    borderRadius: '8px',
    color: '#888888',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer'
  },
  paymentConfirmButton: {
    flex: 1,
    padding: '10px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  // ─── SUCCESS POPUP STYLES ───
  successPopupIcon: {
    fontSize: '64px',
    marginBottom: '12px',
    animation: 'bounce 0.8s ease'
  },
  successPopupTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '4px'
  },
  successPopupSubtitle: {
    fontSize: '16px',
    color: '#888888',
    marginBottom: '20px'
  },
  successPopupPlan: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: '#000000',
    borderRadius: '8px',
    border: '1px solid #222',
    marginBottom: '16px'
  },
  successPopupPlanLabel: {
    fontSize: '13px',
    color: '#888888'
  },
  successPopupPlanName: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#4caf50'
  },
  successPopupMessage: {
    fontSize: '14px',
    color: '#999999',
    lineHeight: 1.6,
    marginBottom: '20px'
  },
  successPopupButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 32px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    margin: '0 auto'
  },
  // ─── CODE SECTION STYLES (NEW - NO OVERLAP) ───
  codeSection: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #222222'
  },
  codeSectionTitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#888888',
    marginBottom: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  codeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  codeCard: {
    background: '#000000',
    borderRadius: '10px',
    padding: '16px 20px',
    border: '1px solid #222222',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  codeLabel: {
    fontSize: '11px',
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
    fontWeight: 500
  },
  codeValueWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px'
  },
  codeValue: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '0.5px'
  },
  codeActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  codeButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '6px',
    transition: 'all 0.2s'
  },
  // ─── PROFILE ROW STYLES ───
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  profileRow: {
    display: 'grid',
    gridTemplateColumns: '20px 100px 1fr',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 0',
    borderBottom: '1px solid #1a1a1a'
  },
  profileIcon: {
    color: '#888888'
  },
  profileLabel: {
    fontSize: '13px',
    color: '#888888'
  },
  profileValue: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#ffffff'
  },
  emptyText: {
    color: '#666666',
    fontSize: '14px',
    textAlign: 'center',
    padding: '16px 0'
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000000'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #222222',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  loadingText: {
    marginTop: '16px',
    fontSize: '14px',
    color: '#888888'
  },
  errorContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#000000',
    padding: '24px',
    textAlign: 'center'
  },
  errorIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  errorTitle: {
    fontSize: '20px',
    fontWeight: 700,
    marginBottom: '8px',
    color: '#ffffff'
  },
  errorText: {
    color: '#888888',
    marginBottom: '24px',
    maxWidth: '400px'
  },
  retryButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 24px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  addProductHeader: {
    marginBottom: '24px'
  },
  addProductTitleSection: {
    marginBottom: '8px'
  },
  addProductSubtitle: {
    fontSize: '14px',
    color: '#888888',
    margin: '4px 0 0'
  },
  addProductForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  formLabel: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#888888'
  },
  formInput: {
    padding: '10px 14px',
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.3s'
  },
  formTextarea: {
    padding: '10px 14px',
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.3s',
    resize: 'vertical',
    fontFamily: 'inherit'
  },
  formSelect: {
    padding: '10px 14px',
    background: '#000000',
    border: '1px solid #222222',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.3s',
    cursor: 'pointer'
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '8px'
  },
  successMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: 'rgba(76, 175, 80, 0.1)',
    border: '1px solid rgba(76, 175, 80, 0.2)',
    borderRadius: '8px',
    color: '#4caf50',
    fontSize: '14px',
    marginBottom: '16px'
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: 'rgba(239, 83, 80, 0.1)',
    border: '1px solid rgba(239, 83, 80, 0.2)',
    borderRadius: '8px',
    color: '#ef5350',
    fontSize: '14px',
    marginBottom: '16px'
  },
  spinnerSmall: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(0,0,0,0.2)',
    borderTopColor: '#000000',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    display: 'inline-block'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
    animation: 'fadeIn 0.3s ease'
  },
  modalContent: {
    background: '#1a1a1a',
    borderRadius: '16px',
    padding: '36px 32px 28px',
    maxWidth: '400px',
    width: '90%',
    border: '1px solid #333',
    position: 'relative',
    animation: 'slideUp 0.3s ease'
  },
  modalClose: {
    position: 'absolute',
    top: '12px',
    right: '16px',
    background: 'transparent',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    padding: '4px'
  },
  modalIcon: {
    textAlign: 'center',
    marginBottom: '8px'
  },
  modalTitle: {
    fontSize: '22px',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '6px',
    color: '#ffffff'
  },
  modalStatus: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '13px',
    marginBottom: '20px'
  },
  modalDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  modalRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid #222'
  },
  modalRowIcon: {
    color: '#666',
    width: '20px'
  },
  modalRowLabel: {
    fontSize: '13px',
    color: '#666',
    width: '70px'
  },
  modalRowValue: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#ffffff'
  },
  modalDescription: {
    marginTop: '12px',
    padding: '12px 0 4px',
    borderTop: '1px solid #222'
  },
  modalDescText: {
    fontSize: '13px',
    color: '#999',
    lineHeight: 1.6,
    margin: 0
  },
  modalCloseButton: {
    width: '100%',
    padding: '10px',
    marginTop: '16px',
    background: '#ffffff',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer'
  },
  copyToast: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '12px',
    padding: '8px 12px',
    background: 'rgba(76, 175, 80, 0.1)',
    border: '1px solid rgba(76, 175, 80, 0.2)',
    borderRadius: '6px',
    color: '#4caf50',
    fontSize: '13px',
    animation: 'fadeIn 0.3s ease'
  }
};

// ─── KEYFRAMES ───
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes bounce {
    0% { transform: scale(0); }
    50% { transform: scale(1.2); }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }

  @media (max-width: 768px) {
    .contentWrapper {
      padding: 16px !important;
      margin-top: 64px !important;
    }
    .header {
      padding: 12px 16px !important;
      height: 64px !important;
    }
    .menuButton {
      display: block !important;
    }
    .headerTitle {
      font-size: 18px !important;
    }
    .headerSubtitle {
      font-size: 12px !important;
    }
    .statsGrid {
      grid-template-columns: 1fr 1fr !important;
      gap: 10px !important;
    }
    .statCard {
      padding: 14px 16px !important;
    }
    .statValue {
      font-size: 18px !important;
    }
    .statLabel {
      font-size: 10px !important;
    }
    .popupDropdown {
      width: 320px !important;
      right: -40px !important;
    }
    .popupProductGrid {
      grid-template-columns: 1fr 1fr !important;
      gap: 8px !important;
    }
    .popupProductGridItem {
      padding: 10px 6px !important;
    }
    .popupProductGridIcon {
      width: 36px !important;
      height: 36px !important;
    }
    .popupProductGridIcon svg {
      width: 18px !important;
      height: 18px !important;
    }
    .popupProductGridName {
      font-size: 10px !important;
    }
    .productGrid {
      grid-template-columns: 1fr 1fr !important;
      gap: 10px !important;
    }
    .productCard {
      padding: 12px !important;
    }
    .productIconWrapper {
      width: 44px !important;
      height: 44px !important;
    }
    .productIconWrapper svg {
      width: 22px !important;
      height: 22px !important;
    }
    .productName {
      font-size: 12px !important;
    }
    .productsGrid {
      grid-template-columns: 1fr !important;
    }
    .accessibleProductsGrid {
      grid-template-columns: 1fr !important;
    }
    .formRow {
      grid-template-columns: 1fr !important;
    }
    .sectionHeader {
      flex-direction: column !important;
      align-items: flex-start !important;
    }
    .viewProductsButtonTop {
      margin-left: 0 !important;
    }
    .profileRow {
      grid-template-columns: 20px 80px 1fr !important;
    }
    .profileLabel {
      font-size: 11px !important;
    }
    .profileValue {
      font-size: 11px !important;
    }
    .headerRight {
      gap: 8px !important;
    }
    .headerBadge {
      font-size: 11px !important;
      padding: 4px 8px !important;
    }
    .headerIconButton {
      padding: 2px 4px !important;
    }
    .headerIconLabel {
      font-size: 8px !important;
    }
    .headerIconBadge {
      font-size: 7px !important;
      min-width: 12px !important;
      height: 12px !important;
      top: -2px !important;
      right: 0 !important;
    }
    .collapseButton {
      display: none !important;
    }
    .countBadge {
      font-size: 9px !important;
      padding: 0 8px !important;
      height: 16px !important;
      margin-left: 6px !important;
    }
    .countdownGrid {
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 4px !important;
    }
    .countdownNumber {
      font-size: 16px !important;
    }
    .countdownLabel {
      font-size: 7px !important;
    }
    .plansGrid {
      grid-template-columns: 1fr !important;
    }
    .codeGrid {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 480px) {
    .statsGrid {
      grid-template-columns: 1fr !important;
    }
    .contentWrapper {
      padding: 12px !important;
    }
    .popupDropdown {
      width: 280px !important;
      right: -60px !important;
    }
    .popupProductGrid {
      grid-template-columns: 1fr 1fr !important;
    }
    .productGrid {
      grid-template-columns: 1fr 1fr !important;
    }
    .sectionCard {
      padding: 14px !important;
    }
    .plansGrid {
      grid-template-columns: 1fr !important;
    }
    .codeGrid {
      grid-template-columns: 1fr !important;
    }
    .codeValue {
      font-size: 15px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default ClientDashboard;