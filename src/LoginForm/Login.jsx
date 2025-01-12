import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { fetchCSRFToken } from './authServiceL';
import api from '../api';

function LoginModal({ closeModal, openRegistrationModal, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        const response = await fetchCSRFToken();
        if (response.data.isAuthenticated) {
          window.location.href = '/';
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkAuthenticationStatus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
  
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoginLoading(false);
      return;
    }
  
    const credentials = { email, password };
  
    try {
      const response = await api.post('/login', credentials, { withCredentials: true });
      console.log('Login successful', response);
      setSuccess('Login successful.');
      setError(null);
      setLoginLoading(false);
      onLoginSuccess(); // Call the onLoginSuccess function to update the state and close the modal
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
        console.log('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.log('No response received');
      } else {
        console.log('Error message:', error.message);
      }
      setError(error.response?.data?.message || 'Login failed');
      setLoginLoading(false);
    }
  };
  
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={closeModal}>&times;</span>
        <h2>Welcome!</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type="email" 
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email" 
            required 
          />

          <label>Password</label>
          <input 
            type="password" 
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password" 
            required 
          />

          <div className={styles.forgotPasswordContainer}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <button type="button" className={styles.forgotPasswordBtn}>Forgot Password?</button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <button type="submit" className={styles.loginBtn} disabled={loginLoading}>
            {loginLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className={styles.signupText}>
          <span>New here? </span>
          <button className={styles.signupBtn} onClick={openRegistrationModal}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;