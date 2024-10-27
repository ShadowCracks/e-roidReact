import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/style.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabase'; // Make sure this path is correct

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const email = (event.target as HTMLFormElement).email.value;
    const password = (event.target as HTMLFormElement).password.value;

    // Clear any previous error message
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // If login fails, set the error message
      setErrorMessage('Login failed. Please check your email and password.');
    } else {
      // If login is successful, redirect to the home page
      navigate('/');
    }
  };

  return (
    <main className="auth-container d-flex">
      <div className="left d-flex align-items-end justify-content-center pb-5">
        <a href="#" className="mb-5">
          <img src="/images/icon-home-yellowbg.svg" alt="Home" />
        </a>
      </div>
      <div className="right mx-auto d-flex flex-column align-items-start justify-content-center">
        <div className="d-flex flex-column">
          <h2 className="fw-bold">Sign In to your Account</h2>
          <p className="fw-semibold fs-7">Welcome back! Please enter your details</p>
        </div>
        
        {/* Display error message if there is one */}
        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

        <form onSubmit={handleLogin} className="w-100 px-12 d-flex flex-column gap-3 mt-3">
          <label className="input-item w-100" htmlFor="email">
            <img src="/images/icon-mail.svg" alt="Email Icon" />
            <input
              className="mx-2"
              type="email"
              placeholder="Email"
              id="email"
              required
            />
          </label>
          <label className="input-item input-password w-100 d-flex" htmlFor="password">
            <img src="/images/icon-lock.svg" alt="Lock Icon" />
            <input
              className="mx-2 w-100"
              type="password"
              placeholder="Password"
              id="password"
              required
            />
            <span role="button" tabIndex={0} className="eye">
              <img src="/images/icon-eye-off.svg" alt="Toggle Visibility" />
            </span>
          </label>
          <button type="submit" className="bg-black text-white mt-4">
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
