import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import '../styles/log.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [verificationId, setVerificationId] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  // Handle login with email
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('User logged in successfully!');
    } catch (error) {
      console.error('Error during email login', error);
      alert('Error during login');
    }
  };

  // Handle sign up with email
  const handleEmailSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Account created successfully!');
    } catch (error) {
      console.error('Error during email sign up', error);
      alert('Error during sign up');
    }
  };

  // Phone login handling
  const handlePhoneLogin = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then(confirmationResult => {
        setVerificationId(confirmationResult.verificationId);
        alert('OTP sent!');
      })
      .catch(error => {
        console.error('Error during phone login', error);
        alert('Error during login');
      });
  };

  // OTP verification handling
  const handleOtpVerification = () => {
    const credential = auth.PhoneAuthProvider.credential(verificationId, otp);
    auth.signInWithCredential(credential)
      .then(() => {
        alert('Phone number verified and user logged in!');
      })
      .catch(error => {
        console.error('Error verifying OTP', error);
        alert('Error verifying OTP');
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>

        {/* Login toggle */}
        <div className="login-toggle">
          <div>
            <input
              type="radio"
              value="email"
              checked={isEmailLogin}
              onChange={() => setIsEmailLogin(true)}
            />
            <label>Log in with Email</label>
          </div>
          <div>
            <input
              type="radio"
              value="phone"
              checked={!isEmailLogin}
              onChange={() => setIsEmailLogin(false)}
            />
            <label>Log in with Phone</label>
          </div>
        </div>
        

        {/* Email Login Form */}
        {isEmailLogin ? (
          <div className="login-form">
            {isSignup && (
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            {isSignup && (
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                />
              </div>
            )}
            <div className="button-container">
              {isSignup ? (
                <button onClick={handleEmailSignup}>Sign Up</button>
              ) : (
                <button onClick={handleEmailLogin}>Log In</button>
              )}
            </div>

            {/* Switch between Login and Sign Up */}
            <div className="toggle-action">
              {isSignup ? (
                <p>
                  Already have an account? <button onClick={() => setIsSignup(false)} className="link-button">Log in here</button>
                </p>
              ) : (
                <p>
                  Don't have an account? <button onClick={() => setIsSignup(true)} className="link-button">Sign up here</button>
                </p>
              )}
            </div>
          </div>
        ) : (
          // Phone Login Form
          <div className="login-form">
            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                style={{ width: '350px' }}
              />
            </div>
            <div className="button-container">
              <button onClick={handlePhoneLogin}>Send OTP</button>
            </div>

            <div id="recaptcha-container"></div>

            {/* OTP Verification */}
            {verificationId && (
              <div className="otp-verification">
                <div className="input-group">
                  <label>OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                </div>
                <div className="button-container">
                  <button onClick={handleOtpVerification}>Verify OTP</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;