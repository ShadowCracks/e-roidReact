import React, { useState, useEffect } from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SteroidTalk from './SteroidTalk';
import SteroidReview from './SteroidReview';

const Steroid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'review' | 'talk'>('review');

  useEffect(() => {
    // Call any onLoad functions here in useEffect
    generateHeader('Steroid');
  }, []);

  // Function to simulate the onLoad behavior in JSX
  const generateHeader = (title: string) => {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = `
        <section 
          id="title-section" 
          class="text-uppercase bg-primary-800 text-dark p-2 d-flex align-items-center justify-content-center fs-1"
        >
          <span class="text-center">${title}</span>
        </section>`;
    }
  };

  return (
    <main className="main-container">
      <div id="header-container"></div>
      <div className="bread-crumbs w-80 mx-auto mt-3">
        <a href="#" className="fs-7 fw-semibold underline">
          Home
        </a>
        <span> &gt; </span>
        <span className="fs-7 fw-bolder text-primary-800">
          Steroid Source
        </span>
      </div>
      <div className="main-wrapper mx-auto mt-3">
        <div className="main-section mt-3 d-flex">
          <div>
            <div className="d-flex gap-2">
              <button
                onClick={() => setActiveTab('review')}
                className={`rounded-sm-btn fs-7 fw-bold ${activeTab === 'review' ? 'bg-black text-white' : ''}`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('talk')}
                className={`rounded-sm-btn fs-7 fw-bold ${activeTab === 'talk' ? 'bg-black text-white' : ''}`}
              >
                Talk
              </button>
            </div>
            <div className="content-section mt-3">
              {activeTab === 'review' ? <SteroidReview /> : <SteroidTalk />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Steroid;
