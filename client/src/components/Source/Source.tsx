// Source.tsx
import React, { useState, useEffect } from 'react';
import supabase from '../../../utils/supabase';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SourceTalk from './SourceTalk';
import SourceReview from './SourceReview';

interface NewSourceFormData {
  source_name: string;
  country: string[];
}

const Source: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'review' | 'talk'>('review');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<NewSourceFormData>({
    source_name: '',
    country: []
  });

  const countryOptions = [
    { value: 'US', label: 'United States' },
    { value: 'EU', label: 'European Union' },
    { value: 'CA', label: 'Canada' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'AU', label: 'Australia' },
    { value: 'INTL', label: 'International' }
  ];

  useEffect(() => {
    generateHeader('Source');
  }, []);

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

  const handleCountryToggle = (value: string) => {
    setFormData(prev => ({
      ...prev,
      country: prev.country.includes(value)
        ? prev.country.filter(country => country !== value)
        : [...prev.country, value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error('No authenticated user found');
        return;
      }

      await supabase
        .from('sourcereview')
        .insert([{
          source_name: formData.source_name,
          country: formData.country,
          review_count: 0,
          user_id: user.id
        }]);

      setShowModal(false);
      // Reset form
      setFormData({
        source_name: '',
        country: []
      });

    } catch (error) {
      console.error('Error creating source:', error);
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
            <div className="d-flex justify-content-between align-items-center">
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
              <button
                onClick={() => setShowModal(true)}
                className="rounded-sm-btn fs-7 fw-bold bg-primary-800 text-white"
              >
                Create New Source
              </button>
            </div>
            <div className="content-section mt-3">
              {activeTab === 'review' ? <SourceReview /> : <SourceTalk />}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center"
             onClick={() => setShowModal(false)}
             style={{ zIndex: 1050 }}>
          <div className="modal-content bg-white rounded-xl p-4 mx-3"
               onClick={e => e.stopPropagation()}
               style={{ maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fs-4 fw-bold m-0">Create New Source</h2>
              <button 
                className="btn-close" 
                onClick={() => setShowModal(false)}
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
              {/* Source Name Field */}
              <div className="form-group">
                <label className="fw-bold mb-2">Source Name</label>
                <input
                  type="text"
                  className="form-control bg-bg7 border-0 rounded-lg p-2"
                  value={formData.source_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, source_name: e.target.value }))}
                  placeholder="Enter source name"
                  required
                />
              </div>

              {/* Countries Selection */}
              <div className="form-group">
                <label className="fw-bold mb-2">Available Countries</label>
                <div className="d-flex flex-wrap gap-2">
                  {countryOptions.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleCountryToggle(value)}
                      className={`btn rounded-pill px-3 py-1 fs-7 ${
                        formData.country.includes(value)
                          ? 'bg-primary-800 text-white'
                          : 'bg-bg7 text-dark'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="d-flex gap-3 mt-4">
                <button
                  type="submit"
                  className="btn bg-primary-800 text-white fw-bold py-2 px-4 rounded-lg"
                >
                  Create Source
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn bg-bg7 text-dark fw-bold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Source;