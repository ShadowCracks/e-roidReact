import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, ChangeEvent, FormEvent } from 'react';

const ProfileSettings: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [uploadedPictureUrl, setUploadedPictureUrl] = useState<string | null>(null);
  const [weight, setWeight] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');
  const [dob, setDob] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [about, setAbout] = useState('');

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setProfilePicture(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedPictureUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Submit form logic here
    console.log({
      password,
      email,
      newPassword,
      confirmPassword,
      profilePicture,
      weight,
      height,
      dob,
      bodyFat,
      about,
    });
  };

  return (
    <div className="main-tab-contents bg-bg11 rounded">
      <h4>Settings</h4>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 w-100 mt-3">
        <div className="d-flex gap-4 w-100">
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="password">Password</label>
            <input
              className="w-100 input-item fw-bold fs-8"
              type="text"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="email">Email</label>
            <input
              className="w-100 input-item fw-bold fs-8"
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex gap-4 w-100">
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="new_password">New Password</label>
            <input
              className="w-100 input-item fw-bold fs-8"
              type="password"
              placeholder="New Password"
              id="new_password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="confirm_password">Confirm Password</label>
            <input
              className="w-100 input-item fw-bold fs-8"
              type="password"
              placeholder="Confirm Password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <h5 className="mt-3">Profile Picture</h5>
        <div className="d-flex flex-column w-100">
          <label className="fw-bold fs-8" htmlFor="profile-picture-input">Upload Picture</label>
          <input
            className="w-100 input-item fw-bold fs-8"
            type="file"
            id="profile-picture-input"
            onChange={handleFileUpload}
          />
          {uploadedPictureUrl && (
            <div className="profile-picture-uploaded">
              <img id="uploaded-picture" src={uploadedPictureUrl} alt="Uploaded Profile" />
            </div>
          )}
        </div>
        <h5>Personal</h5>
        <div className="d-flex gap-4 w-100">
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="weight">Weight *</label>
            <input
              className="w-100 input-item fw-bold fs-8"
              type="number"
              placeholder="Weight"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value) || '')}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="height">Height *</label>
            <input
              className="w-100 input-item fw-bold fs-8"
              type="number"
              placeholder="Height"
              id="height"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value) || '')}
            />
          </div>
        </div>
        <div className="d-flex gap-4 w-100">
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="dob">Your Birth Date *</label>
            <input
              className="w-100 input-item fw-bold fs-8"
              type="date"
              placeholder="DOB"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="fat">Body Fat *</label>
            <select
              name="fat"
              id="fat"
              className="w-100 input-item fw-bold fs-8"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
            >
              <option disabled value="">-- Select a value --</option>
              <option value="val1">val1</option>
              <option value="val2">val2</option>
              <option value="val3">val3</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-column w-100">
          <label className="fw-bold fs-8" htmlFor="about">About Yourself *</label>
          <textarea
            className="w-100 input-item fw-bold fs-9"
            placeholder="About yourself"
            id="about"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="bg-primary-800 text-black fw-bold mx-auto mt-3 w-80">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
