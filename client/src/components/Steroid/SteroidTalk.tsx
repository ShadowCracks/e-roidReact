import React, { useEffect, useState } from 'react';
import supabase from '../../../utils/supabase';
import { useNavigate } from 'react-router-dom'; // Updated to use useNavigate from React Router v6
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Steroid {
  source_name: string;
  average_rating: number;
}

const SteroidTalk: React.FC = () => {
  const [sources, setSources] = useState<Steroid[]>([]);
  const navigate = useNavigate(); // Updated to use useNavigate

  useEffect(() => {
    const fetchSources = async () => {
      const { data, error } = await supabase
        .from('sourcetalk')
        .select('source_name, average_rating')
        .order('average_rating', { ascending: false });

      if (error) {
        console.error("Error fetching sources:", error);
      } else {
        setSources(data || []);
      }
    };

    fetchSources();
  }, []);

  const handleCardClick = (sourceName: string) => {
    const formattedName = encodeURIComponent(sourceName);
    navigate(`/sourcetalk/${formattedName}`);
  };

  return (
    <div className="d-flex flex-wrap flex-lg-nowrap gap-3">
      <div>
        <div className="list-container mt-5">
          <div className="list-options d-flex gap-2 justify-content-end">
            <select className="cursor-pointer fs-8 fw-bold">
              <option selected disabled value="all">All Categories</option>
              <option value="1">New</option>
              <option value="2">Rank</option>
              <option value="3">Trending</option>
            </select>
            <select className="cursor-pointer fs-8 fw-bold">
              <option selected disabled value="world">Worldwide</option>
              <option value="1">Option # 1</option>
              <option value="2">Option # 2</option>
              <option value="3">Option # 3</option>
            </select>
          </div>

          <div className="list-body d-flex flex-column gap-2 mt-3">
            {sources.length > 0 ? (
              sources.map((source, index) => (
                <div 
                  key={index} 
                  className="list-item bg-bg3 rounded-xl px-4 d-flex align-items-center cursor-pointer"
                  onClick={() => handleCardClick(source.source_name)}
                >
                  <div className="list-item_content-wrapper d-flex align-items-center">
                    <div className="list-item_number d-flex align-items-center">
                      <div className="flex align-items-center justify-content-center">
                        <span className="fs-9 fw-bold d-flex align-items-center justify-content-center bg-black text-white circle-tag rounded-xl text-center">
                          {index + 1}
                        </span>
                      </div>
                      <h2 className="fs-3 fw-bold m-0">{source.average_rating?.toFixed(2)}</h2>
                    </div>
                    <div className="list-item_content">
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <p className="fw-bold text-uppercase m-0">{source.source_name}</p>
                        <span className="m-0 fs-10">Average Rating</span>
                      </div>
                      <p className="fs-9-5 p-0">
                        This is a brief description or review of the source. Replace with actual review data if available.
                      </p>
                    </div>
                  </div>
                  <div className="list-item_points d-flex gap-1 flex-wrap">
                    {Array(10).fill(null).map((_, i) => (
                      <span 
                        key={i}
                        className={`${i < Math.round(source.average_rating) ? 'bg-primary-800' : 'bg-bg4'} rounded-xl p-1 px-2 fs-9 fw-semibold`}
                      >
                        {(source.average_rating * 10).toFixed(2)}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">No sources found.</div>
            )}
          </div>

          <div className="list-pagination mt-3 d-flex gap-2 align-items-center justify-content-center">
            <img className="cursor-pointer" src="/images/icon-chevron-left.svg" alt="" />
            <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center active">1</span>
            <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">2</span>
            <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">3</span>
            <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">...</span>
            <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">24</span>
            <img className="cursor-pointer" src="images/icon-chevron-right.svg" alt="" />
          </div>
        </div>
      </div>

      <aside className="d-flex flex-column gap-3">
        <div className="aside-card bg-bg6 rounded-lg">
          <h4>LATEST SOURCE REVIEWS</h4>
          <div className="d-flex flex-column gap-1">
            {Array(4).fill(null).map((_, i) => (
              <div key={i} className="aside-card_subcard bg-bg7 rounded-lg">
                <p className="fs-9 fw-medium m-0 mb-1">
                  Review snippet goes here. Replace with actual review content.
                </p>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="aside-tags text-primary-800 bg-black rounded-xl fs-10 fw-medium">
                    Product Name
                  </span>
                  <div className="d-flex align-items-center justify-content-between gap-1">
                    <span className="p-2 px-2 rounded-xl bg-green d-flex align-items-center">
                      <img src="images/icon-tick.svg" alt="" />
                    </span>
                    <span className="p-1 px-2 rounded-xl bg-primary-800 fs-10 fw-bold">
                      9/10
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <img src="/images/aside-img.png" alt="" />
      </aside>
    </div>
  );
};

export default SteroidTalk;