import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import supabase from '../../../utils/supabase';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ProfileSettings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    avatar_url: null as string | null,
    weight: '' as number | '',
    height: '' as number | '',
    dob: null as Date | null,
    fat: '',
    about: ''
  });
  
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url, weight, height, dob, fat, about')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfileData({
          ...data,
          dob: data.dob ? new Date(data.dob) : null,
          weight: data.weight || '',
          height: data.height || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files ? event.target.files[0] : null;
      if (!file) return;

      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          cacheControl: '3600'
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          avatar_url: publicUrl,
          updated_at: new Date().toISOString() 
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setProfileData(prev => ({
        ...prev,
        avatar_url: publicUrl
      }));

      alert('Profile picture updated successfully!');

    } catch (error: any) {
      console.error('Error uploading image:', error);
      alert(error.message || 'Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({
          weight: profileData.weight,
          height: profileData.height,
          dob: profileData.dob?.toISOString(),
          fat: profileData.fat,
          about: profileData.about,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-tab-contents bg-bg11 rounded">
      <h4>Settings</h4>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 w-100 mt-3">
        <h5 className="mt-3">Profile Picture</h5>
        <div className="d-flex flex-column w-100">
          <label className="fw-bold fs-8" htmlFor="profile-picture-input">
            Upload Picture
          </label>
          <input
            className="w-100 input-item fw-bold fs-8"
            type="file"
            id="profile-picture-input"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={loading}
          />
          {profileData.avatar_url && (
            <div className="profile-picture-uploaded mt-2">
              <img 
                src={profileData.avatar_url} 
                alt="Profile" 
                className="rounded"
                style={{ maxWidth: '200px', height: 'auto' }}
              />
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
              value={profileData.weight}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                weight: Number(e.target.value) || ''
              }))}
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="height">Height *</label>
            <input
              className="w-100 input-item fw-bold fs-8"
              type="number"
              placeholder="Height"
              id="height"
              value={profileData.height}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                height: Number(e.target.value) || ''
              }))}
            />
          </div>
        </div>

        <div className="d-flex gap-4 w-100">
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="dob">Your Birth Date *</label>
            <DatePicker
              selected={profileData.dob}
              onChange={(date: Date | null) => setProfileData(prev => ({
                ...prev,
                dob: date
              }))}
              className="w-100 input-item fw-bold fs-8"
              dateFormat="MM/dd/yyyy"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              placeholderText="Select date"
            />
          </div>
          <div className="d-flex flex-column w-100">
            <label className="fw-bold fs-8" htmlFor="fat">Body Fat *</label>
            <select
              name="fat"
              id="fat"
              className="w-100 input-item fw-bold fs-8"
              value={profileData.fat}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                fat: e.target.value
              }))}
            >
              <option disabled value="">-- Select a value --</option>
              <option value="5-10%">5-10%</option>
              <option value="11-15%">11-15%</option>
              <option value="16-20%">16-20%</option>
              <option value="21-25%">21-25%</option>
              <option value="26-30%">26-30%</option>
              <option value="31%+">31%+</option>
            </select>
          </div>
        </div>

        <div className="d-flex flex-column w-100">
          <label className="fw-bold fs-8" htmlFor="about">About Yourself *</label>
          <textarea
            className="w-100 input-item fw-bold fs-9"
            placeholder="About yourself"
            id="about"
            value={profileData.about}
            onChange={(e) => setProfileData(prev => ({
              ...prev,
              about: e.target.value
            }))}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="bg-primary-800 text-black fw-bold mx-auto mt-3 w-80"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;