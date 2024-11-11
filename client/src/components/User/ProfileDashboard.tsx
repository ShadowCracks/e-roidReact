import { useState, useEffect } from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabContents from './TabContents';
import ProfileSettings from './ProfileSettings';
import supabase from '../../../utils/supabase';

const ProfileDashboard = ({ profileOwnerId }: { profileOwnerId: string }) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      // Added avatar_url to the select query
      const { data, error } = await supabase
        .from('profiles')
        .select('username, dob, height, weight, fat, about, last_seen, role, created_at, avatar_url')
        .eq('id', profileOwnerId)
        .single();

      if (error) {
        console.error('Error fetching profile data:', error.message);
      } else {
        setProfileData(data);
      }
    };

    const checkIfOwnProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setIsOwnProfile(user.id === profileOwnerId);
      } else {
        setIsOwnProfile(false);
      }
    };

    fetchProfileData();
    checkIfOwnProfile();
  }, [profileOwnerId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <header id="header-container" />
      <div className="bg-bg11">
        <div className="tab-list w-80 mx-auto d-flex align-items-center gap-4">
          <a 
            href="#"
            className={`tab-trigger fs-6 py-1-5 ${activeTab === 'Overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('Overview')}
          >
            Overview
          </a>
          {isOwnProfile && (
            <a 
              href="#"
              className={`tab-trigger fs-6 py-1-5 ${activeTab === 'Settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('Settings')}
            >
              Settings
            </a>
          )}
        </div>
      </div>
      <div className="main-wrapper mx-auto mt-3">
        <div className="main-section user-dashboard mt-3 d-flex justify-content-between">
          <section className="profile-card bg-bg11">
            <span className="color-bg bg-black"></span>
            <div className="profile-card_header d-flex flex-column align-items-center gap-2">
            <img 
              src={profileData.avatar_url || "/images/profile-pic.png"} 
              alt="Profile"
              style={{ 
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
              <span className="visibility-status online d-flex align-items-center gap-2">
                <span className="dot"></span><span>Online</span>
              </span>
              <h5 className="username">{profileData.username}</h5>
              <p className="about fs-8">{profileData.about}</p>
              <div className="tab w-100 mt-3">
                <div className="tab-list d-flex align-items-center gap-3">
                  <a href="#" className="tab-trigger active fs-9 py-0">Info</a>
                  <a href="#" className="tab-trigger fs-9 py-0">Stats</a>
                  <a href="#" className="tab-trigger fs-9 py-0">Karma</a>
                </div>
                <div className="tab-content" id="info">
                  <p><span className="fw-bold">Role :</span> <span>{profileData.role}</span></p>
                  <p><span className="fw-bold">Last seen :</span> <span>{profileData.last_seen}</span></p>
                  <p><span className="fw-bold">Since :</span> <span>{profileData.created_at}</span></p>
                  <p><span className="fw-bold">Born :</span> <span>{profileData.dob}</span></p>
                  <p><span className="fw-bold">Weight :</span> <span>{profileData.weight}</span></p>
                  <p><span className="fw-bold">Height :</span> <span>{profileData.height}</span></p>
                  <p><span className="fw-bold">Body Fat :</span> <span>{profileData.fat}%</span></p>
                </div>
              </div>
            </div>
          </section>

          {activeTab === 'Overview' ? <TabContents /> : isOwnProfile && <ProfileSettings />}
          
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;