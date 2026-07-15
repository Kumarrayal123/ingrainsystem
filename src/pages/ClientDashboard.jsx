// pages/ClientDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  FiUser, FiMail, FiPhone, FiBriefcase, FiCalendar, 
  FiTrendingUp, FiTrendingDown, FiPackage, FiRefreshCw,
  FiHome, FiMenu, FiZap, FiCheckCircle, FiGrid, FiEye,
  FiX, FiDollarSign, FiTag, FiInfo, FiArrowRight, FiPlus,
  FiSave, FiBox
} from 'react-icons/fi';
import ClientSidebar from '../components/ClientSidebar';

const API_URL = 'http://localhost:5005/api';

function ClientDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addSuccess, setAddSuccess] = useState('');
  const [addError, setAddError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    price: '',
    category: '',
    status: 'active',
    features: [],
    addedBy: 'Client'
  });

  const clientId = localStorage.getItem('clientId') || '';
  const clientName = localStorage.getItem('clientName') || 'Client';

  useEffect(() => {
    if (!clientId) {
      setError('Client ID not found. Please login again.');
      setLoading(false);
      return;
    }
    fetchDashboardData();
    fetchProducts();
  }, [clientId]);

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

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  // ─── FORM HANDLERS ───
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
      const payload = {
        name: formData.name,
        code: formData.code.toUpperCase(),
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
          code: '',
          description: '',
          price: '',
          category: '',
          status: 'active',
          features: [],
          addedBy: 'Client'
        });
        fetchProducts();
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

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return (
          <>
            {/* ─── STATS CARDS ─── */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statIconWrapper}>
                  <span style={styles.iconEmoji}>🪙</span>
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

            {/* ─── ACCESSIBLE PRODUCTS SECTION ─── */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>Accessible Products</h3>
                <button 
                  onClick={() => setActiveSection('products')} 
                  style={styles.viewProductsButtonTop}
                >
                  <FiEye size={16} /> View Products
                </button>
              </div>
              <div style={styles.productGrid}>
                {packages?.accessibleProducts && packages.accessibleProducts.length > 0 ? (
                  packages.accessibleProducts.map((product, index) => (
                    <div key={index} style={styles.productCard}>
                      <div style={styles.productIcon}>
                        {product.name === 'recruitment' ? '👔' : '📦'}
                      </div>
                      <div style={styles.productInfo}>
                        <div style={styles.productName}>{product.name}</div>
                        <div style={styles.productStatus}>
                          <FiCheckCircle size={14} color="#4caf50" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>
                  ))
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
                <div style={styles.profileRow}>
                  <span style={styles.profileLabel}>Referral Code</span>
                  <span style={{ ...styles.profileValue, fontWeight: 700, letterSpacing: '1px' }}>
                    {profile?.referralCode || 'N/A'}
                  </span>
                </div>
              </div>
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
                  {products.map((product) => (
                    <div 
                      key={product._id} 
                      style={styles.productItem}
                      onClick={() => openProductModal(product)}
                    >
                      <div style={styles.productItemIcon}>
                        <FiPackage size={24} color="#888" />
                      </div>
                      <div style={styles.productItemInfo}>
                        <div style={styles.productItemName}>{product.name}</div>
                        <div style={styles.productItemCode}>{product.code}</div>
                      </div>
                      <FiArrowRight size={16} style={styles.productItemArrow} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ─── YOUR ACCESSIBLE PRODUCTS ─── */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>
                  <FiCheckCircle size={18} color="#4caf50" style={{ marginRight: '8px' }} />
                  Your Accessible Products
                </h3>
              </div>
              {packages?.accessibleProducts && packages.accessibleProducts.length > 0 ? (
                <div style={styles.accessibleProductsGrid}>
                  {packages.accessibleProducts.map((product, index) => (
                    <div key={index} style={styles.accessibleProductCard}>
                      <div style={styles.accessibleProductIcon}>
                        {product.name === 'recruitment' ? '👔' : '📦'}
                      </div>
                      <div style={styles.accessibleProductInfo}>
                        <div style={styles.accessibleProductName}>{product.name}</div>
                        <div style={styles.accessibleProductStatus}>
                          <FiCheckCircle size={12} color="#4caf50" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <label style={styles.formLabel}>Product Code *</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleFormChange}
                    placeholder="Enter product code"
                    style={styles.formInput}
                    required
                  />
                </div>
              </div>

              <div style={styles.formRow}>
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

              <div style={styles.formRow}>
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
            <h3 style={styles.sectionTitle}>My Plans</h3>
            {packages?.selected && packages.selected.length > 0 ? (
              packages.selected.map((pkg, index) => (
                <div key={index} style={styles.packageCard}>
                  <div style={styles.packageHeader}>
                    <span style={styles.packageName}>{pkg.name || 'Plan'}</span>
                    <span style={styles.packageBadge}>{pkg.duration || 'Free'}</span>
                  </div>
                  <div style={styles.packageDetails}>
                    <div style={styles.packageRow}>
                      <span style={styles.packageLabel}>Price</span>
                      <span style={styles.packageValue}>₹{pkg.price || 0}</span>
                    </div>
                    <div style={styles.packageRow}>
                      <span style={styles.packageLabel}>Purchased</span>
                      <span style={styles.packageValue}>{formatDate(pkg.purchaseDate)}</span>
                    </div>
                    <div style={styles.packageRow}>
                      <span style={styles.packageLabel}>Expires</span>
                      <span style={styles.packageValue}>{formatDate(pkg.expiryDate)}</span>
                    </div>
                    <div style={styles.packageRow}>
                      <span style={styles.packageLabel}>Status</span>
                      <span style={{ 
                        ...styles.packageStatus,
                        color: new Date(pkg.expiryDate) > new Date() ? '#4caf50' : '#ef5350'
                      }}>
                        {new Date(pkg.expiryDate) > new Date() ? 'Active' : 'Expired'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
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
                <div style={styles.profileRow}>
                  <span style={styles.profileLabel}>Referral Code</span>
                  <span style={{ ...styles.profileValue, fontWeight: 700, letterSpacing: '1px' }}>
                    {profile?.referralCode || 'N/A'}
                  </span>
                </div>
                <div style={styles.profileRow}>
                  <span style={styles.profileLabel}>Client ID</span>
                  <span style={{ ...styles.profileValue, fontWeight: 500 }}>
                    {profile?.clientId || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* ─── YOUR PRODUCTS CARD ─── */}
            <div style={styles.sectionCard}>
              <div style={styles.sectionHeader}>
                <h3 style={styles.sectionTitle}>
                  <FiBox size={18} style={{ marginRight: '8px' }} />
                  Your Products
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
                  {products.slice(0, 4).map((product) => (
                    <div 
                      key={product._id} 
                      style={styles.profileProductItem}
                      onClick={() => openProductModal(product)}
                    >
                      <div style={styles.profileProductIcon}>
                        <FiPackage size={20} color="#888" />
                      </div>
                      <div style={styles.profileProductInfo}>
                        <div style={styles.profileProductName}>{product.name}</div>
                        <div style={styles.profileProductPrice}>₹{product.price}</div>
                      </div>
                      <FiArrowRight size={14} style={styles.profileProductArrow} />
                    </div>
                  ))}
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

  return (
    <div style={styles.container}>
      {/* ─── SIDEBAR ─── */}
      <ClientSidebar 
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        profile={profile}
        handleLogout={handleLogout}
      />

      {/* ─── MAIN CONTENT ─── */}
      <div style={styles.mainContent}>
        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <button onClick={() => setSidebarOpen(true)} style={styles.menuButton}>
              <FiMenu size={24} color="#fff" />
            </button>
            <div>
              <h1 style={styles.headerTitle}>
                {activeSection === 'dashboard' && 'Dashboard'}
                {activeSection === 'products' && 'All Products'}
                {activeSection === 'add-product' && 'Add Product'}
                {activeSection === 'plans' && 'Plans'}
                {activeSection === 'profile' && 'Profile'}
              </h1>
              <p style={styles.headerSubtitle}>Welcome back, {profile?.name || 'Client'}!</p>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.headerBadge}>
              <span style={styles.badgeDot}></span>
              {profile?.status || 'Active'}
            </div>
          </div>
        </header>

        {/* ─── CONTENT ─── */}
        {renderContent()}
      </div>

      {/* ─── PRODUCT MODAL ─── */}
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
  mainContent: {
    flex: 1,
    padding: '24px 32px',
    marginLeft: '260px',
    width: 'calc(100% - 260px)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '24px',
    borderBottom: '1px solid #222222',
    marginBottom: '24px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  menuButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'none'
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
    gap: '16px'
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
    marginBottom: '16px'
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
  productIcon: {
    fontSize: '40px',
    marginBottom: '12px'
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
  // ─── PRODUCTS CONTAINER ───
  productsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  productCount: {
    fontSize: '13px',
    color: '#666666'
  },
  // ─── ACCESSIBLE PRODUCTS ───
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
    fontSize: '32px',
    width: '48px',
    textAlign: 'center'
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
  // ─── PROFILE PRODUCTS ───
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
  // ─── ADD PRODUCT STYLES ───
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
  // ─── MODAL STYLES ───
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
    zIndex: 9999,
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
`;
document.head.appendChild(styleSheet);

export default ClientDashboard;