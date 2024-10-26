import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/style.css';

const SignUp: React.FC = () => {
  return (
    <main className="auth-container create-account d-flex">
      <div className="left d-flex align-items-end justify-content-center pb-5">
        <a href="#" className="mb-5">
          <img src="/images/icon-home-yellowbg.svg" alt="Home Icon" />
        </a>
      </div>
      <div className="position-relative right mx-auto d-flex flex-column align-items-start justify-content-center">
        <div className="bg-pink p-3 rounded">
          <h5 className="fw-bold text-black">IMPORTANT</h5>
          <p className="text-black fs-7 mb-0">
            You may create an account here if you're at least 25 years old. By creating an account, you agree to our
            <a href="#" className="fw-bold">terms of service.</a>
          </p>
        </div>

        <form className="d-flex flex-column gap-2 w-100 mt-3">
          {/* Username Input */}
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="name">Username *</label>
            <input className="mx-2 w-100 input-item fw-bold fs-9" type="text" placeholder="Name here" id="name" />
          </div>

          {/* Email Input */}
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="email">E-Mail Address *</label>
            <input className="mx-2 w-100 input-item fw-bold fs-9" type="email" placeholder="Email" id="email" />
          </div>

          {/* Password Input */}
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="password">Password *</label>
            <input className="mx-2 w-100 input-item fw-bold fs-9" type="password" placeholder="Password" id="password" />
          </div>

          {/* Confirm Password Input */}
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="confirm-password">Confirm Password *</label>
            <input className="mx-2 w-100 input-item fw-bold fs-9" type="password" placeholder="Confirm Password" id="confirm-password" />
          </div>

          {/* Join a public group */}
          <div className="bg-blue p-3 rounded px-3 mt-3 mb-2">
            <h5 className="fw-bold text-black text-center mb-3">Join a public group</h5>
            <div className="d-flex flex-wrap gap-2 align-items-start justify-content-between">
              {['Aussies and kiwis lounge', 'Our Pets', 'Combat Sport', 'Advanced Cycles'].map((group, index) => (
                <div className="p-0" key={index}>
                  <label className="d-flex align-items-center justify-content-center">
                    <input type="checkbox" className="checkbox-sm" value={group.toLowerCase().replace(/ /g, '')} />
                    <span className="fs-9 fw-semibold">{group}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* About Yourself */}
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="about">About Yourself *</label>
            <input className="mx-2 w-100 input-item fw-bold fs-9" type="text" placeholder="About yourself" id="about" />
          </div>

          {/* Weight and Height */}
          <div className="d-flex gap-4 w-100">
            <div className="d-flex flex-column w-100">
              <label className="fw-bold fs-7" htmlFor="weight">Weight *</label>
              <input className="mx-2 w-100 input-item fw-bold fs-9" type="number" placeholder="Weight" id="weight" />
            </div>
            <div className="d-flex flex-column w-100">
              <label className="fw-bold fs-7" htmlFor="height">Height *</label>
              <input className="mx-2 w-100 input-item fw-bold fs-9" type="number" placeholder="Height" id="height" />
            </div>
          </div>

          {/* Date of Birth and Body Fat */}
          <div className="d-flex gap-4 w-100">
            <div className="d-flex flex-column w-100">
              <label className="fw-bold fs-7" htmlFor="dob">Your Birth Date *</label>
              <input className="mx-2 w-100 input-item fw-bold fs-9" type="date" placeholder="DOB" id="dob" />
            </div>
            <div className="d-flex flex-column w-100">
              <label className="fw-bold fs-7" htmlFor="fat">Body Fat *</label>
              <select name="fat" id="fat" className="mx-2 w-100 input-item fw-bold fs-9">
                <option disabled selected>-- Select a value --</option>
                <option value="val1">val1</option>
                <option value="val2">val2</option>
                <option value="val3">val3</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-black text-white mx-auto mt-3 w-80">Create New Account</button>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
