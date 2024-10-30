import React from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SourceTalk: React.FC = () => {
  return (
    <div className="main-wrapper mx-auto mt-3">
      <div className="main-section source-talk mt-3 d-flex justify-content-between">
        <div className="w-100">
          <div className="d-flex gap-2">
            <a href="source-review.html" className="rounded-sm-btn fs-7 fw-bold">
              Reviews
            </a>
            <a href="source-talk.html" className="rounded-sm-btn fs-7 fw-bold bg-black text-white">
              Talk
            </a>
          </div>
          <div className="list-container mt-5">
            <div className="list-body talks-list source-talks-list d-flex flex-column gap-1 mt-2">
              <a href="#" className="list-item bg-bg3 rounded-xl d-flex align-items-center justify-content-between">
                <div className="list-item_content">
                  <div className="d-flex flex-wrap align-items-center justify-content-start gap-3">
                    <p className="fw-bold text-uppercase m-0">pureanabolics.bz/</p>
                    <span className="m-0 fs-8">Osgear | Sep, 2014</span>
                  </div>
                </div>
                <div className="list-item_points d-flex gap-1 flex-wrap">
                  <span className="bg-bg4 rounded-xl p-1 px-2 fs-9-5 fw-semibold">
                    eighty7, 4 min 29 sec ago
                  </span>
                  <span className="bg-primary-800 rounded-xl p-1 px-2 fs-9-5 fw-semibold">
                    11,253
                  </span>
                </div>
              </a>
              
              <a href="#" className="list-item bg-bg3 rounded-xl d-flex align-items-center justify-content-between">
                <div className="list-item_content">
                  <div className="d-flex flex-wrap align-items-center justify-content-start gap-3">
                    <p className="fw-bold text-uppercase m-0">pureanabolics.bz/</p>
                    <span className="m-0 fs-8">Osgear | Sep, 2014</span>
                  </div>
                </div>
                <div className="list-item_points d-flex gap-1 flex-wrap">
                  <span className="bg-bg4 rounded-xl p-1 px-2 fs-9-5 fw-semibold">
                    eighty
                  </span>
                  <span className="bg-primary-800 rounded-xl p-1 px-2 fs-9-5 fw-semibold">
                    1
                  </span>
                </div>
              </a>
              
              <a href="#" className="list-item bg-bg3 rounded-xl d-flex align-items-center justify-content-between">
                <div className="list-item_content">
                  <div className="d-flex flex-wrap align-items-center justify-content-start gap-3">
                    <p className="fw-bold text-uppercase m-0">pureanabolics.bz/</p>
                    <span className="m-0 fs-8">Osgear | Sep, 2014</span>
                  </div>
                </div>
                <div className="list-item_points d-flex gap-1 flex-wrap">
                  <span className="bg-bg4 rounded-xl p-1 px-2 fs-9-5 fw-semibold">
                    1234567890123456, 4 min 29 sec ago
                  </span>
                  <span className="bg-primary-800 rounded-xl p-1 px-2 fs-9-5 fw-semibold">
                    11,253
                  </span>
                </div>
              </a>
            </div>
            
            <div className="list-pagination mt-3 d-flex gap-2 align-items-center justify-content-center">
              <img className="cursor-pointer" src="images/icon-chevron-left.svg" alt="" />
              <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center active">
                1
              </span>
              <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">
                2
              </span>
              <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">
                3
              </span>
              <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">
                ...
              </span>
              <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">
                24
              </span>
              <img className="cursor-pointer" src="images/icon-chevron-right.svg" alt="" />
            </div>
          </div>
        </div>
        
        <aside className="d-flex flex-column gap-3">
          <div className="aside-card bg-bg6 rounded-lg">
            <h4 className="">RECENT REVIEWS</h4>
            <div className="d-flex flex-column gap-1">
              {Array(4).fill(null).map((_, index) => (
                <div key={index} className="aside-card_subcard bg-bg7 rounded-lg">
                  <p className="fs-9 fw-medium m-0 mb-1">
                    USGear is amazing, I have made 5 orders from them, their prices « {' '}
                    <a href="#" className="fw-bold">Dav3891</a>
                  </p>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="aside-tags text-primary-800 bg-black rounded-xl fs-10 fw-medium">
                      Trenbolone-e 200
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
          <img src="images/aside-img.png" alt="" />
        </aside>
      </div>
    </div>
  );
};

export default SourceTalk;