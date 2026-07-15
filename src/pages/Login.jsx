import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FiMail, FiLock, FiLogIn, FiUser, FiZap, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

const BASE_URL = 'https://api.ingrainsystems.com/api';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const loginButtonRef = useRef(null);
  const autoLoginAttempted = useRef(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [otpData, setOtpData] = useState({
    otp: '',
    clientId: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState('⏳ Fetching...');
  const [employeeData, setEmployeeData] = useState(null);

  // ─── URL PARAMS AUTO-LOGIN ───
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const employeeId = urlParams.get('employeeId');
    const clientEmail = urlParams.get('email');
    const clientPassword = urlParams.get('password');
    const autoLogin = urlParams.get('autoLogin');
    const clientLogin = urlParams.get('clientLogin');
    const skipOtpParam = urlParams.get('skipOtp');

    // ─── EMPLOYEE AUTO-LOGIN ───
    if (employeeId) {
      setShowPopup(true);
      setPopupStatus('⏳ Fetching employee data from API...');
      
      axios.get(`${BASE_URL}/employees/get-employee?employeeId=${employeeId}`)
        .then(response => {
          if (response.data.success) {
            const employee = response.data.data;
            setEmployeeData(employee);
            setFormData({
              email: employee.email || '',
              password: employee.password || ''
            });
            setPopupStatus('✅ Employee found! Auto-login in progress...');
            setTimeout(() => {
              setPopupStatus('🚀 Logging in...');
              if (loginButtonRef.current) {
                loginButtonRef.current.click();
              }
            }, 2500);
          } else {
            setPopupStatus('❌ Failed to fetch employee data');
            setTimeout(() => setShowPopup(false), 3000);
          }
        })
        .catch(error => {
          setPopupStatus('❌ API Error: ' + (error.response?.data?.message || error.message));
          setTimeout(() => setShowPopup(false), 3000);
        });
    }

    // ─── CLIENT AUTO-LOGIN ───
    if (autoLogin === 'true' && clientLogin === 'true' && clientEmail && clientPassword) {
      console.log('✅ Client auto-login params found!');
      handleClientAutoLogin(clientEmail, clientPassword, skipOtpParam);
    }
  }, [location]);

  // ─── CLIENT AUTO-LOGIN ───
  const handleClientAutoLogin = async (email, password, skipOtpParam) => {
    if (autoLoginAttempted.current) return;
    autoLoginAttempted.current = true;
    
    setLoading(true);
    setFormData({ email, password });

    try {
      const res = await axios.post(`${BASE_URL}/clients/clientlogin`, { email, password });
      
      if (res.data.success) {
        const clientId = res.data.clientId || "";
        const clientEmail = res.data.email || email;
        
        setOtpData({
          otp: "",
          clientId: clientId,
          email: clientEmail
        });
        
        if (skipOtpParam === 'true') {
          await handleClientAutoVerify(clientId, clientEmail);
        } else {
          setShowOtpScreen(true);
          setLoading(false);
        }
      } else {
        setError(res.data.message || "Login failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
      setLoading(false);
    }
  };

  // ─── CLIENT AUTO-VERIFY ───
  const handleClientAutoVerify = async (clientId, email) => {
    try {
      const payload = {
        clientId: clientId,
        email: email,
        autoLogin: true
      };
      
      const res = await axios.post(`${BASE_URL}/clients/auto-login`, payload);
      
      if (res.data.success && res.data.token && res.data.client) {
        localStorage.setItem("clientToken", res.data.token);
        localStorage.setItem("clientId", res.data.client._id);
        localStorage.setItem("clientCustomId", res.data.client.clientId);
        localStorage.setItem("clientName", res.data.client.name);
        localStorage.setItem("clientEmail", res.data.client.email);
        localStorage.setItem("clientMobile", res.data.client.mobile);
        localStorage.setItem("companyName", res.data.client.companyName);
        localStorage.setItem("employeesCount", res.data.client.employeesCount);
        localStorage.setItem("accessibleProducts", JSON.stringify(res.data.client.accessibleProducts));
        localStorage.setItem("userRole", "client");
        localStorage.setItem("clientData", JSON.stringify(res.data.client));

        setUserName(res.data.client.name);
        setUserRole('Client');
        setShowWelcome(true);
        setLoading(false);
        
        setTimeout(() => {
          navigate("/my-dashboard", { replace: true });
        }, 2500);
      } else {
        await handleClientFallbackOtp(clientId, email);
      }
    } catch (err) {
      await handleClientFallbackOtp(clientId, email);
    }
  };

  // ─── CLIENT FALLBACK OTP ───
  const handleClientFallbackOtp = async (clientId, email) => {
    try {
      const payload = {
        clientId: clientId,
        otp: "000000"
      };
      
      const res = await axios.post(`${BASE_URL}/clients/verify-client-otp`, payload);
      
      if (res.data.success && res.data.token && res.data.client) {
        localStorage.setItem("clientToken", res.data.token);
        localStorage.setItem("clientId", res.data.client._id);
        localStorage.setItem("clientCustomId", res.data.client.clientId);
        localStorage.setItem("clientName", res.data.client.name);
        localStorage.setItem("clientEmail", res.data.client.email);
        localStorage.setItem("clientMobile", res.data.client.mobile);
        localStorage.setItem("companyName", res.data.client.companyName);
        localStorage.setItem("employeesCount", res.data.client.employeesCount);
        localStorage.setItem("accessibleProducts", JSON.stringify(res.data.client.accessibleProducts));
        localStorage.setItem("userRole", "client");
        localStorage.setItem("clientData", JSON.stringify(res.data.client));

        setUserName(res.data.client.name);
        setUserRole('Client');
        setShowWelcome(true);
        setLoading(false);
        
        setTimeout(() => {
          navigate("/my-dashboard", { replace: true });
        }, 2500);
      } else {
        setShowOtpScreen(true);
        setLoading(false);
      }
    } catch (err) {
      setShowOtpScreen(true);
      setLoading(false);
    }
  };

  // ─── CLIENT OTP VERIFY ───
  const handleClientOtpVerify = async (e) => {
    e.preventDefault();
    setOtpLoading(true);

    try {
      const payload = {
        otp: otpData.otp
      };
      
      if (otpData.clientId) {
        payload.clientId = otpData.clientId;
      } else {
        payload.email = otpData.email;
      }
      
      const res = await axios.post(`${BASE_URL}/clients/verify-client-otp`, payload);
      
      if (res.data.success && res.data.token && res.data.client) {
        localStorage.setItem("clientToken", res.data.token);
        localStorage.setItem("clientId", res.data.client._id);
        localStorage.setItem("clientCustomId", res.data.client.clientId);
        localStorage.setItem("clientName", res.data.client.name);
        localStorage.setItem("clientEmail", res.data.client.email);
        localStorage.setItem("clientMobile", res.data.client.mobile);
        localStorage.setItem("companyName", res.data.client.companyName);
        localStorage.setItem("employeesCount", res.data.client.employeesCount);
        localStorage.setItem("accessibleProducts", JSON.stringify(res.data.client.accessibleProducts));
        localStorage.setItem("userRole", "client");
        localStorage.setItem("clientData", JSON.stringify(res.data.client));

        setUserName(res.data.client.name);
        setUserRole('Client');
        setShowOtpScreen(false);
        setShowWelcome(true);
        
        setTimeout(() => {
          navigate("/my-dashboard", { replace: true });
        }, 2500);
      } else {
        setError(res.data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  // ─── CLIENT RESEND OTP ───
  const handleClientResendOtp = async () => {
    setLoading(true);
    
    try {
      const res = await axios.post(`${BASE_URL}/clients/clientlogin`, {
        email: formData.email,
        password: formData.password
      });
      
      if (res.data.success) {
        setError('');
        setOtpData({ ...otpData, otp: "" });
      } else {
        setError(res.data.message || "Failed to resend OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── SPEAK WELCOME ───
  const speakWelcome = (name, role) => {
    if ('speechSynthesis' in window) {
      const message = `Welcome ${name}! You are logged in as ${role}. Have a great day!`;
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setOtpData({ ...otpData, otp: value });
    }
  };

  const handleBackToLogin = () => {
    setShowOtpScreen(false);
    setOtpData({ otp: "", clientId: "", email: "" });
    setError('');
  };

  // ─── EMPLOYEE/CLIENT LOGIN ───
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Try Employee Login
      const employeeResponse = await axios.post(
        `${BASE_URL}/employees/login`,
        { email: formData.email, password: formData.password }
      );

      const responseData = employeeResponse.data;
      const employee = responseData.employee || {};
      const name = employee.name || responseData.name || 'Employee';
      const role = employee.role || 'Employee';
      const employeeId = employee.employeeId || employee.id || '';
      const email = employee.email || formData.email;
      
      const userData = {
        _id: employee.id || employee._id || '',
        id: employee.id || employee._id || '',
        name: name,
        fullName: name,
        employeeName: name,
        firstName: name.split(' ')[0] || name,
        email: email,
        employeeId: employeeId,
        role: role,
        department: employee.department || '',
        joinDate: employee.joinDate || '',
        permissions: employee.permissions || [],
        profileImage: employee.profileImage || employee.profile_image || employee.image || '',
        employee: employee
      };
      
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("employeeData", JSON.stringify(userData));
      localStorage.setItem("employeeId", employeeId);
      localStorage.setItem("employeeEmail", email);
      localStorage.setItem("employeeName", name);
      localStorage.setItem("employeeMongoId", employee._id || '');
      
      if (responseData.token) localStorage.setItem("token", responseData.token);
      localStorage.setItem("userRole", "employee");

      setUserName(name);
      setUserRole(role);
      setShowWelcome(true);
      setShowPopup(false);
      speakWelcome(name, role);
      
      setTimeout(() => {
        navigate("/employee-dashboard", { replace: true });
      }, 2500);

    } catch (err) {
      // Try Client Login
      try {
        const clientRes = await axios.post(`${BASE_URL}/clients/clientlogin`, { 
          email: formData.email, 
          password: formData.password 
        });
        
        if (clientRes.data.success) {
          const clientId = clientRes.data.clientId || "";
          const clientEmail = clientRes.data.email || formData.email;
          
          setOtpData({
            otp: "",
            clientId: clientId,
            email: clientEmail
          });
          
          setShowOtpScreen(true);
          setLoading(false);
          return;
        }
      } catch (clientErr) {
        setError(clientErr.response?.data?.message || "Invalid email or password");
        setLoading(false);
      }
    } finally {
      if (!showWelcome && !showOtpScreen) setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000000',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Popup - Employee Data Fetching */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: '#111111',
            padding: '20px 25px 18px',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '380px',
            width: '90%',
            border: '1px solid #222222',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
            animation: 'welcomeSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <div style={{
              width: '44px',
              height: '44px',
              margin: '0 auto 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              {popupStatus.includes('⏳') && '⏳'}
              {popupStatus.includes('✅') && '✅'}
              {popupStatus.includes('🚀') && '🚀'}
              {popupStatus.includes('❌') && '❌'}
            </div>
            <h3 style={{ 
              fontSize: '15px', 
              fontWeight: 600, 
              color: '#ffffff', 
              marginBottom: '3px'
            }}>
              {popupStatus.includes('⏳') && '🔍 Fetching Employee Data'}
              {popupStatus.includes('✅') && '✅ Employee Found!'}
              {popupStatus.includes('🚀') && '🚀 Logging in...'}
              {popupStatus.includes('❌') && '❌ Error'}
            </h3>
            <p style={{ 
              color: '#888888', 
              fontSize: '11px', 
              marginBottom: '10px' 
            }}>
              {popupStatus}
            </p>
            {employeeData && (
              <div style={{
                background: '#000000',
                padding: '8px 12px',
                borderRadius: '8px',
                marginBottom: '10px',
                border: '1px solid #222222',
                textAlign: 'left'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '10px', 
                  padding: '2px 0', 
                  color: '#666666' 
                }}>
                  <span>🆔 ID:</span>
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>
                    {employeeData.employeeId}
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '10px', 
                  padding: '2px 0', 
                  color: '#666666' 
                }}>
                  <span>👤 Name:</span>
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>
                    {employeeData.name}
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '10px', 
                  padding: '2px 0', 
                  color: '#666666' 
                }}>
                  <span>📧 Email:</span>
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>
                    {employeeData.email}
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '10px', 
                  padding: '2px 0', 
                  color: '#666666' 
                }}>
                  <span>💼 Role:</span>
                  <span style={{ color: '#ffffff', fontWeight: 500 }}>
                    {employeeData.role || 'N/A'}
                  </span>
                </div>
              </div>
            )}
            <div style={{ width: '100%' }}>
              <div style={{ 
                width: '100%', 
                height: '2px', 
                background: '#222222', 
                borderRadius: '4px', 
                overflow: 'hidden' 
              }}>
                <div style={{
                  height: '100%',
                  width: '0%',
                  background: '#ffffff',
                  borderRadius: '4px',
                  animation: popupStatus.includes('❌') 
                    ? 'progressFillError 0.5s ease-in-out forwards' 
                    : 'progressFill 2.5s ease-in-out forwards'
                }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Popup */}
      {showWelcome && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.3s ease-out'
        }}>
          <div style={{
            background: '#111111',
            padding: '28px 30px 24px',
            borderRadius: '20px',
            textAlign: 'center',
            maxWidth: '380px',
            width: '90%',
            border: '1px solid #222222',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
            animation: 'welcomeSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              margin: '0 auto 10px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              animation: 'successPulse 2s ease-in-out infinite',
              fontSize: '30px'
            }}>
              ✅
            </div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '4px'
            }}>
              Welcome, {userName}! 🎉
            </h2>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              color: '#aaaaaa',
              fontSize: '10px',
              fontWeight: 500,
              marginBottom: '8px'
            }}>
              <FiUser size={10} />
              <span>{userRole}</span>
            </div>
            <p style={{ 
              color: '#888888', 
              fontSize: '12px', 
              lineHeight: 1.5, 
              marginBottom: '12px' 
            }}>
              You have been successfully logged in to{' '}
              <strong style={{ color: '#ffffff' }}>IRYAX LOGIN</strong>
            </p>
            <div style={{ width: '100%' }}>
              <div style={{ 
                width: '100%', 
                height: '2px', 
                background: '#222222', 
                borderRadius: '4px', 
                overflow: 'hidden' 
              }}>
                <div style={{
                  height: '100%',
                  width: '0%',
                  background: '#ffffff',
                  borderRadius: '4px',
                  animation: 'progressFill 2.5s ease-in-out forwards'
                }}></div>
              </div>
              <p style={{ 
                color: '#555555', 
                fontSize: '10px', 
                marginTop: '6px',
                animation: 'textPulse 1.5s ease-in-out infinite'
              }}>
                Redirecting to dashboard...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Login Card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '360px',
        padding: '30px 28px 26px',
        background: '#111111',
        borderRadius: '20px',
        border: '1px solid #222222',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
        animation: 'slideIn 0.5s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            margin: '0 auto 10px',
            background: '#ffffff',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(255, 255, 255, 0.1)'
          }}>
            <FiZap size={24} color="#000000" />
          </div>
          <h1 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '0.5px',
            marginBottom: '4px'
          }}>
            IRYAX LOGIN
          </h1>
          <p style={{ 
            fontSize: '12px', 
            color: '#666666'
          }}>
            {showOtpScreen ? 'Enter OTP to verify' : 'Welcome back! Please login'}
          </p>
        </div>

        {showOtpScreen ? (
          // ─── OTP SCREEN ───
          <form onSubmit={handleClientOtpVerify} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '14px' 
          }}>
            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                fontSize: '12px',
                color: '#ffffff'
              }}>
                <FiAlertCircle size={14} />
                {error}
              </div>
            )}

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                name="otp"
                value={otpData.otp}
                onChange={handleOtpChange}
                required
                maxLength="6"
                placeholder="Enter OTP"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: '#000000',
                  border: '1px solid #222222',
                  borderRadius: '10px',
                  fontSize: '18px',
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                  height: '50px',
                  textAlign: 'center',
                  letterSpacing: '0.5em'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ffffff';
                  e.target.style.background = '#0a0a0a';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#222222';
                  e.target.style.background = '#000000';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ 
              fontSize: '11px', 
              color: '#666666', 
              textAlign: 'center',
              marginTop: '-4px'
            }}>
              OTP sent to {otpData.email || formData.email}
            </div>

            <button
              type="submit"
              disabled={otpLoading || !otpData.otp || otpData.otp.length !== 6}
              style={{
                width: '100%',
                padding: '10px',
                background: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#000000',
                cursor: otpLoading || !otpData.otp || otpData.otp.length !== 6 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '42px',
                opacity: otpLoading || !otpData.otp || otpData.otp.length !== 6 ? 0.6 : 1
              }}
            >
              {otpLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(0,0,0,0.2)',
                    borderTopColor: '#000000',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}></span>
                  Verifying...
                </span>
              ) : (
                <>
                  <FiLogIn size={16} color="#000000" />
                  Verify OTP
                </>
              )}
            </button>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              fontSize: '11px',
              color: '#555555'
            }}>
              <button
                type="button"
                onClick={handleBackToLogin}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#888888',
                  cursor: 'pointer',
                  fontSize: '11px',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#888888'}
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={handleClientResendOtp}
                disabled={loading}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#888888',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: '11px',
                  transition: 'color 0.3s',
                  opacity: loading ? 0.5 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.target.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.target.style.color = '#888888';
                }}
              >
                {loading ? 'Sending...' : 'Resend OTP'}
              </button>
            </div>
          </form>
        ) : (
          // ─── LOGIN FORM ───
          <form onSubmit={handleSubmit} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '14px' 
          }}>
            {error && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                fontSize: '12px',
                color: '#ffffff'
              }}>
                <FiAlertCircle size={14} />
                {error}
              </div>
            )}

            {/* Email Input */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#555555',
                pointerEvents: 'none',
                zIndex: 2
              }}>
                <FiMail size={16} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 38px',
                  background: '#000000',
                  border: '1px solid #222222',
                  borderRadius: '10px',
                  fontSize: '13px',
                  color: '#ffffff',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                  height: '42px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#ffffff';
                  e.target.style.background = '#0a0a0a';
                  e.target.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.05)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#222222';
                  e.target.style.background = '#000000';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password Input */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '42px',
              background: '#000000',
              border: '1px solid #222222',
              borderRadius: '10px',
              boxSizing: 'border-box',
              transition: 'all 0.3s ease'
            }}
              onFocusCapture={(e) => {
                e.currentTarget.style.borderColor = '#ffffff';
                e.currentTarget.style.background = '#0a0a0a';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 255, 255, 0.05)';
              }}
              onBlurCapture={(e) => {
                e.currentTarget.style.borderColor = '#222222';
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: '12px',
                color: '#555555',
                pointerEvents: 'none',
                flexShrink: 0
              }}>
                <FiLock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  padding: '0 8px 0 10px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '13px',
                  color: '#ffffff',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  color: '#555555',
                  cursor: 'pointer',
                  padding: '6px',
                  marginRight: '6px',
                  borderRadius: '4px',
                  flexShrink: 0,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#888888';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#555555';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>

            {/* Form Options */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '11px',
              color: '#666666',
              marginTop: '2px'
            }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                cursor: 'pointer' 
              }}>
                <input 
                  type="checkbox" 
                  style={{ 
                    width: '14px', 
                    height: '14px', 
                    accentColor: '#ffffff',
                    borderRadius: '3px', 
                    cursor: 'pointer' 
                  }} 
                />
                <span>Remember</span>
              </label>
              <a 
                href="#" 
                style={{ 
                  color: '#666666', 
                  textDecoration: 'none', 
                  transition: 'color 0.3s' 
                }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#666666'}
              >
                Forgot?
              </a>
            </div>

            {/* Login Button */}
            <button
              ref={loginButtonRef}
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                background: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#000000',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '42px',
                opacity: loading ? 0.6 : 1,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 255, 255, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(0,0,0,0.2)',
                    borderTopColor: '#000000',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}></span>
                  Logging in...
                </span>
              ) : (
                <>
                  <FiLogIn size={16} color="#000000" />
                  Sign In
                </>
              )}
            </button>

            {/* Footer */}
            <div style={{ 
              textAlign: 'center', 
              fontSize: '11px', 
              color: '#555555', 
              marginTop: '4px'
            }}>
              Don't have an account?{' '}
              <span style={{ 
                color: '#ffffff', 
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.color = '#aaaaaa'}
              onMouseLeave={(e) => e.target.style.color = '#ffffff'}
              >
                Contact Admin
              </span>
            </div>
          </form>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes progressFill {
          0% { width: 0%; }
          30% { width: 35%; }
          60% { width: 70%; }
          100% { width: 100%; }
        }
        
        @keyframes progressFillError {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes successPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.05); transform: scale(1); }
          50% { box-shadow: 0 0 30px 8px rgba(255, 255, 255, 0.03); transform: scale(1.02); }
        }
        
        @keyframes textPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes welcomeSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(15px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default Login;