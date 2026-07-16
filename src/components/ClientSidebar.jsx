// components/ClientSidebar.jsx
import React from 'react';
import { 
  FiHome, FiPackage, FiPlus, FiDollarSign, FiLogOut, 
  FiUser, FiX, FiChevronLeft, FiChevronRight 
} from 'react-icons/fi';

const ClientSidebar = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  activeSection, 
  setActiveSection, 
  profile, 
  handleLogout,
  sidebarCollapsed,
  toggleSidebar,
  isMobile
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size={18} /> },
    { id: 'products', label: 'Products', icon: <FiPackage size={18} /> },
    { id: 'add-product', label: 'Add Product', icon: <FiPlus size={18} /> },
    { id: 'plans', label: 'Plans', icon: <FiDollarSign size={18} /> },
    { id: 'profile', label: 'Profile', icon: <FiUser size={18} /> },
  ];

  // Mobile sidebar - full width, Desktop sidebar - collapsible
  const sidebarWidth = isMobile ? '280px' : (sidebarCollapsed ? '80px' : '260px');
  const isOpen = isMobile ? sidebarOpen : true;

  return (
    <>
      <div style={{ 
        ...styles.sidebar, 
        width: sidebarWidth,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.sidebarLogo}>
            <span style={styles.logoIcon}>⚡</span>
            {(!sidebarCollapsed || isMobile) && <span style={styles.logoText}>IRYAX</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {!isMobile && !sidebarCollapsed && (
              <button onClick={toggleSidebar} style={styles.collapseButton}>
                <FiChevronLeft size={18} color="#888" />
              </button>
            )}
            {!isMobile && sidebarCollapsed && (
              <button onClick={toggleSidebar} style={styles.collapseButton}>
                <FiChevronRight size={18} color="#888" />
              </button>
            )}
            {isMobile && (
              <button onClick={() => setSidebarOpen(false)} style={styles.closeButton}>
                <FiX size={22} color="#fff" />
              </button>
            )}
          </div>
        </div>
        
        {(!sidebarCollapsed || isMobile) && (
          <div style={styles.sidebarProfile}>
            <div style={styles.sidebarAvatar}>
              {profile?.name?.charAt(0)?.toUpperCase() || 'C'}
            </div>
            <div style={styles.sidebarName}>{profile?.name || 'Client'}</div>
            <div style={styles.sidebarCompany}>{profile?.companyName || ''}</div>
          </div>
        )}

        {(sidebarCollapsed && !isMobile) && (
          <div style={styles.sidebarAvatarSmall}>
            {profile?.name?.charAt(0)?.toUpperCase() || 'C'}
          </div>
        )}

        <nav style={styles.sidebarNav}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                if (isMobile) setSidebarOpen(false);
              }}
              style={{ 
                ...styles.navItem, 
                ...(activeSection === item.id ? styles.navActive : {}),
                ...((sidebarCollapsed && !isMobile) ? styles.navItemCollapsed : {})
              }}
              title={(sidebarCollapsed && !isMobile) ? item.label : ''}
            >
              {item.icon}
              {(!sidebarCollapsed || isMobile) && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div style={styles.sidebarFooter}>
          <button 
            onClick={handleLogout} 
            style={{ 
              ...styles.logoutButton,
              ...((sidebarCollapsed && !isMobile) ? styles.navItemCollapsed : {})
            }}
            title={(sidebarCollapsed && !isMobile) ? 'Logout' : ''}
          >
            <FiLogOut size={18} /> 
            {(!sidebarCollapsed || isMobile) && <span>Logout</span>}
          </button>
        </div>
      </div>

      {isMobile && sidebarOpen && (
        <div style={styles.overlay} onClick={() => setSidebarOpen(false)}></div>
      )}
    </>
  );
};

const styles = {
  sidebar: {
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
    transition: 'all 0.3s ease',
    overflow: 'hidden'
  },
  sidebarHeader: {
    padding: '20px 16px',
    borderBottom: '1px solid #222222',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '72px'
  },
  sidebarLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    whiteSpace: 'nowrap'
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
  collapseButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'all 0.2s',
    color: '#888'
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  sidebarProfile: {
    padding: '24px',
    textAlign: 'center',
    borderBottom: '1px solid #222222',
    transition: 'all 0.3s ease'
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
  sidebarAvatarSmall: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#ffffff',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 700,
    margin: '16px auto',
    transition: 'all 0.3s ease'
  },
  sidebarName: {
    fontSize: '16px',
    fontWeight: 600,
    marginBottom: '4px',
    color: '#ffffff',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  sidebarCompany: {
    fontSize: '13px',
    color: '#888888',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
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
    marginBottom: '4px',
    whiteSpace: 'nowrap'
  },
  navItemCollapsed: {
    justifyContent: 'center',
    padding: '12px',
    fontSize: '0'
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
    transition: 'all 0.2s',
    whiteSpace: 'nowrap'
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