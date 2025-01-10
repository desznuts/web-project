import React, { useState } from 'react';
import styles from './Registration.module.css';
import { register } from './authServiceR';
import zxcvbn from 'zxcvbn';

function RegistrationModal({ closeModal, openLoginModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const result = zxcvbn(newPassword);
    setPasswordStrength(result.score);
  }


  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Please use a stronger password.')
      setLoading(false);
      return;
    }

    
    
    const userData = { email, password, password_confirmation: confirmPassword };

    try {
      // Set CSRF Token first before sending registration request
      await fetch('http://localhost:8000/sanctum/csrf-cookie', { 
        method: 'GET', 
        credentials: 'include' 
      });

      // Register user
      const response = await register(userData);

      console.log('Registration successful:', response);
      setSuccess('Registration successful! You can now log in.');
      setError(null);
      setLoading(false);

      // Close modal and open login modal after success
      setTimeout(() => {
        closeModal();
        openLoginModal();
      }, 1000);
    } catch (err) {
      console.error('Registration error:', err);
      // Capture error messages from the backend if available
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
      setSuccess(null);
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={closeModal}>&times;</span>
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
          <label>Email</label>
          <input
              type="email"
              placeholder="Enter your email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          <label>Password</label>
          <input
              type="password"
              placeholder="Enter your password"
              name='password'
              value={password}
              onChange={handlePasswordChange}
              required
            />
          <div className={styles.passwordStrength}>
            <span>Password Strength: </span>
            <progress value={passwordStrength} max="4"></progress>
            <ul>
              <li>Minimum length of 8 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>
          </div>

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
          <button className={styles.signupbtn} type="submit" disabled={loading}>
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        <div className={styles.loginText}>
          <span>Already have an account? </span>
          <button onClick={openLoginModal} className={styles.loginBtn}>Login</button>
        </div>
        
      </div>
    </div>
  );
}

export default RegistrationModal;
