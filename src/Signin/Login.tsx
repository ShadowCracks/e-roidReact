import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/style.css';
import React from 'react';

const Login: React.FC = () => {
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
          <p className="fw-semibold fs-7">Welcome back! please enter your details</p>
        </div>
        <form action="#" className="w-100 px-12 d-flex flex-column gap-3 mt-3">
          <label className="input-item w-100" htmlFor="email">
            <img src="/images/icon-mail.svg" alt="Email Icon" />
            <input className="mx-2" type="email" placeholder="Email" id="email" />
          </label>
          <label className="input-item input-password w-100 d-flex" htmlFor="password">
            <img src="/images/icon-lock.svg" alt="Lock Icon" />
            <input
              className="mx-2 w-100"
              type="password"
              placeholder="Password"
              id="password"
            />
            <span role="button" tabIndex={0} className="eye">
              <img src="/images/icon-eye-off.svg" alt="Toggle Visibility" />
            </span>
          </label>
          <div className="d-flex justify-content-between align-items-center">
            <label htmlFor="remember" className="d-flex align-items-center">
              <input type="checkbox" id="remember" />
              <span>Remember me</span>
            </label>
            <a href="forgot-password.html" className="form-link">Forgot Password</a>
          </div>
          <button type="submit" className="bg-black text-white mt-4">
            Sign in
          </button>
        </form>
        <div className="d-flex w-100 align-items-center justify-content-between mt-4">
          <div className="line"></div>
          <span style={{ width: '100px !important' }} className="fs-7">
            Or sign in with
          </span>
          <div className="line"></div>
        </div>
        <div className="mt-4 w-100 d-flex gap-3">
          <a href="#" className="btn-outline w-50">
            <img src="/images/icon-google.svg" alt="Google Icon" />
            <span className="fw-semibold">Google</span>
          </a>
          <a href="#" className="btn-outline w-50">
            <img src="/images/icon-fb.svg" alt="Facebook Icon" />
            <span className="fw-semibold">Facebook</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Login;
