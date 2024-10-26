import { useState } from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TabContents from './TabContents';
import ProfileSettings from './ProfileSettings';

const ProfileDashboard = () => {
  // State to track the selected tab
  const [activeTab, setActiveTab] = useState('Overview');

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
          <a 
            href="#"
            className={`tab-trigger fs-6 py-1-5 ${activeTab === 'Settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('Settings')}
          >
            Settings
          </a>
        </div>
      </div>
      <div className="main-wrapper mx-auto mt-3">
        <div className="main-section user-dashboard mt-3 d-flex justify-content-between">
          <section className="profile-card bg-bg11">
            <span className="color-bg bg-black"></span>
            <div className="profile-card_header d-flex flex-column align-items-center gap-2">
              <img src="images/profile-pic.png" alt="Profile" />
              <span className="visibility-status online d-flex align-items-center gap-2">
                <span className="dot"></span><span>Online</span>
              </span>
              <h5 className="username">Onesick</h5>
              <p className="about fs-8">Gym Coach and Trainer</p>
              <div className="tab w-100 mt-3">
                <div className="tab-list d-flex align-items-center gap-3">
                  <a href="#" className="tab-trigger active fs-9 py-0">Info</a>
                  <a href="#" className="tab-trigger fs-9 py-0">Stats</a>
                  <a href="#" className="tab-trigger fs-9 py-0">Karma</a>
                </div>
                <div className="tab-content" id="info">
                  <p><span className="fw-bold">Role :</span> <span>User</span></p>
                  <p><span className="fw-bold">Last seen :</span> <span>2023/12/2</span></p>
                  <p><span className="fw-bold">Since :</span> <span>2023/12/2</span></p>
                  <p><span className="fw-bold">Born :</span> <span>2023/12/2</span></p>
                  <p><span className="fw-bold">Weight :</span> <span>80</span></p>
                  <p><span className="fw-bold">Height :</span> <span>6</span></p>
                  <p><span className="fw-bold">Body Fat :</span> <span>14%</span></p>
                </div>
              </div>
            </div>
          </section>

          {/* Conditionally render TabContents or ProfileSettings */}
          {activeTab === 'Overview' ? <TabContents /> : <ProfileSettings />}
          
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
