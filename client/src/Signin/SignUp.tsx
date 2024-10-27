import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/style.css';
import supabase from '../../utils/supabase'; // Import your configured Supabase client

const SignUp: React.FC = () => {
  // Define form data state with fields for user input
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    about: '',
    weight: '',
    height: '',
    dob: '',
    fat: '',
    communities: [] as string[], // Array for storing selected community names
  });
  
  // State to handle error messages
  const [error, setError] = useState<string | null>(null);
  
  // State to handle success messages
  const [success, setSuccess] = useState<string | null>(null);

  // Handler to update state when input fields change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target; // Get id and value from the target input
    setFormData({ ...formData, [id]: value }); // Update the corresponding formData field
  };

  // Handler to update communities array when checkboxes are checked or unchecked
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedCommunities = checked
      ? [...formData.communities, value] // Add the community if checked
      : formData.communities.filter((community) => community !== value); // Remove it if unchecked
    setFormData({ ...formData, communities: updatedCommunities }); // Update communities in formData
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
  
    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match."); // Show error if passwords differ
      return;
    }
  
    // Attempt to sign up the user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
  
    if (error) {
      setError(error.message); // Display error if signup fails
    } else if (data.user) {
      // If signup is successful, insert additional user data into the 'profiles' table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id, // Associate profile data with the user's unique ID
            username: formData.username,
            dob: formData.dob,
            height: formData.height,
            weight: formData.weight,
            fat: formData.fat,
            about: formData.about,
            communities: formData.communities.join(', '), // Store communities as a comma-separated string
          },
        ]);
  
      if (profileError) {
        setError(profileError.message); // Display error if profile data insertion fails
      } else {
        setSuccess("Account created successfully! Please check your email to verify your account."); // Display success message
        // Reset form fields
        setFormData({
          username: '', email: '', password: '', confirmPassword: '',
          about: '', weight: '', height: '', dob: '', fat: '', communities: []
        });
      }
    }
  };
  

  return (
    <main className="auth-container create-account d-flex">
      {/* Left side with Icon */}
      <div className="left d-flex align-items-end justify-content-center pb-5">
        <a href="#" className="mb-5">
          <img src="/images/icon-home-yellowbg.svg" alt="Home Icon" />
        </a>
      </div>
      {/* Right side form */}
      <div className="position-relative right mx-auto d-flex flex-column align-items-start justify-content-center">
        {/* IMPORTANT Section */}
        <div className="bg-pink p-3 rounded">
          <h5 className="fw-bold text-black">IMPORTANT</h5>
          <p className="text-black fs-7 mb-0">
            You may create an account here if you're at least 25 years old. By creating an account, you agree to our
            <a href="#" className="fw-bold">terms of service.</a>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 w-100 mt-3">
          {/* Username, Email, Password, Confirm Password */}
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="username">Username *</label>
            <input
              className="mx-2 w-100 input-item fw-bold fs-9"
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Name here"
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="email">E-Mail Address *</label>
            <input
              className="mx-2 w-100 input-item fw-bold fs-9"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="password">Password *</label>
            <input
              className="mx-2 w-100 input-item fw-bold fs-9"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="confirmPassword">Confirm Password *</label>
            <input
              className="mx-2 w-100 input-item fw-bold fs-9"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              required
            />
          </div>

          {/* Join a public group */}
          <div className="bg-blue p-3 rounded px-3 mt-3 mb-2">
            <h5 className="fw-bold text-black text-center mb-3">Join a public group</h5>
            <div className="d-flex flex-wrap gap-2 align-items-start justify-content-between">
              {['Aussies and kiwis lounge', 'Our Pets', 'Combat Sport', 'Advanced Cycles'].map((group, index) => (
                <div className="p-0" key={index}>
                  <label className="d-flex align-items-center justify-content-center">
                    <input
                      type="checkbox"
                      className="checkbox-sm"
                      value={group.toLowerCase().replace(/ /g, '')}
                      checked={formData.communities.includes(group.toLowerCase().replace(/ /g, ''))}
                      onChange={handleCheckboxChange}
                    />
                    <span className="fs-9 fw-semibold">{group}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* About Yourself */}
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-7" htmlFor="about">About Yourself *</label>
            <input
              className="mx-2 w-100 input-item fw-bold fs-9"
              type="text"
              id="about"
              value={formData.about}
              onChange={handleInputChange}
              placeholder="About yourself"
              required
            />
          </div>

          {/* Weight and Height */}
          <div className="d-flex gap-4 w-100">
            <div className="d-flex flex-column w-100">
              <label className="fw-bold fs-7" htmlFor="weight">Weight *</label>
              <input
                className="mx-2 w-100 input-item fw-bold fs-9"
                type="number"
                id="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Weight"
                required
              />
            </div>
            <div className="d-flex flex-column w-100">
              <label className="fw-bold fs-7" htmlFor="height">Height *</label>
              <input
                className="mx-2 w-100 input-item fw-bold fs-9"
                type="number"
                id="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Height"
                required
              />
            </div>
          </div>

          {/* Date of Birth and Body Fat */}
          <div className="d-flex gap-4 w-100">
            <div className="d-flex flex-column w-100">
              <label className="fw-bold fs-7" htmlFor="dob">Your Birth Date *</label>
              <input
                className="mx-2 w-100 input-item fw-bold fs-9"
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="d-flex flex-column w-100">
              <label className="fw-bold fs-7" htmlFor="fat">Body Fat *</label>
              <select
                name="fat"
                id="fat"
                className="mx-2 w-100 input-item fw-bold fs-9"
                value={formData.fat}
                onChange={handleInputChange}
                required
              >
                <option disabled value="">-- Select a value --</option>
                <option value="val1">val1</option>
                <option value="val2">val2</option>
                <option value="val3">val3</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-black text-white mx-auto mt-3 fw-bold fs-7 rounded-2 border-0 px-5 py-2">
            Create Account
          </button>

          {/* Error and Success Messages */}
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
        </form>
      </div>
    </main>
  );
};

export default SignUp;
