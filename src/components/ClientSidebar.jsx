import React from 'react';
import { FiHome, FiPackage, FiPlus, FiDollarSign, FiLogOut, FiUser, FiX } from 'react-icons/fi';

const ClientSidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeSection, 
  setActiveSection, 
  profile, 
  handleLogout 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size={18} /> },
    { id: 'products', label: 'Products', icon: <FiPackage size={18} /> },
    { id: 'add-product', label: 'Add Product', icon: <FiPlus size={18} /> },
    { id: 'plans', label: 'Plans', icon: <FiDollarSign size={18} /> },
    { id: 'profile', label: 'Profile', icon: <FiUser size={18} /> },
  ];

  return (
    <>
      {/* ─── SIDEBAR ─── */}
      <div style={{ ...styles.sidebar, ...(sidebarOpen ? styles.sidebarOpenDesktop : {}) }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.sidebarLogo}>
            <span style={styles.logoIcon}>⚡</span>
            <span style={styles.logoText}>IRYAX</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={styles.closeSidebar}>
            <FiX size={24} color="#fff" />
          </button>
        </div>
        
        <div style={styles.sidebarProfile}>
          <div style={styles.sidebarAvatar}>
            {profile?.name?.charAt(0)?.toUpperCase() || 'C'}
          </div>
          <div style={styles.sidebarName}>{profile?.name || 'Client'}</div>
          <div style={styles.sidebarCompany}>{profile?.companyName || ''}</div>
        </div>

        <nav style={styles.sidebarNav}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              style={{ 
                ...styles.navItem, 
                ...(activeSection === item.id ? styles.navActive : {}) 
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <button onClick={handleLogout} style={styles.logoutButton}>
            <FiLogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* ─── OVERLAY ─── */}
      {sidebarOpen && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)}></div>
      )}
    </>
  );
};

// ─── STYLES ───
const styles = {
  sidebar: {
    width: '260px',
    background: '#111111',
    borderRight: '1px solid #222222',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    zIndex: 1000,
    transform: 'translateX(0)',  // ← DESKTOP PE VISIBLE
    transition: 'transform 0.3s ease'
  },
  sidebarOpenDesktop: {
    transform: 'translateX(0)'
  },
  sidebarHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid #222222',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sidebarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  logoIcon: {
    fontSize: '24px'
  },
  logoText: {
    fontSize: '18px',
    fontWeight: 700,
    letterSpacing: '1px',
    color: '#ffffff'
  },
  closeSidebar: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    display: 'none'  // ← DESKTOP PE HIDE
  },
  sidebarProfile: {
    padding: '24px',
    textAlign: 'center',
    borderBottom: '1px solid #222222'
  },
  sidebarAvatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: '#ffffff',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 700,
    margin: '0 auto 12px'
  },
  sidebarName: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px',
    color: '#ffffff'
  },
  sidebarCompany: {
    fontSize: '13px',
    color: '#888888'
  },
  sidebarNav: {
    flex: 1,
    padding: '16px 12px',
    overflowY: 'auto'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    width: '100%',
    border: 'none',
    background: 'transparent',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#888888',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '4px'
  },
  navActive: {
    background: '#ffffff',
    color: '#000000'
  },
  sidebarFooter: {
    padding: '16px 12px',
    borderTop: '1px solid #222222'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    width: '100%',
    border: 'none',
    background: 'transparent',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#ef5350',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.7)',
    zIndex: 999
  }
};

export default ClientSidebar;