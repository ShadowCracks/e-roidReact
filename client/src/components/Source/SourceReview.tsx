import React from 'react';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SourceReview: React.FC = () => {
  return (
    <div className="d-flex flex-wrap flex-lg-nowrap gap-3">
      <div>
        <div className="list-container mt-5">
          <div className="list-options d-flex gap-2 justify-content-end">
            <select name="cars" id="cars" className="cursor-pointer fs-8 fw-bold">
              <option selected disabled value="all">All Categories</option>
              <option value="1">Category # 1</option>
              <option value="2">Category # 2</option>
              <option value="3">Category # 2</option>
            </select>
            <select name="cars" id="cars" className="cursor-pointer fs-8 fw-bold">
              <option selected disabled value="world">Worldwide</option>
              <option value="1">Option # 1</option>
              <option value="2">Option # 2</option>
              <option value="3">Option # 2</option>
            </select>
          </div>
          <div className="list-body d-flex flex-column gap-2 mt-3">
            <div className="list-item bg-bg3 rounded-xl px-4 d-flex align-items-center">
              <div className="list-item_content-wrapper d-flex align-items-center">
                <div className="list-item_number d-flex align-items-center">
                  <div className="flex align-items-center justify-content-center">
                    <span className="fs-9 fw-bold d-flex align-items-center justify-content-center bg-black text-white circle-tag rounded-xl text-center">
                      1
                    </span>
                  </div>
                  <h2 className="fs-3 fw-bold m-0">0.00</h2>
                </div>
                <div className="list-item_content">
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <p className="fw-bold text-uppercase m-0">osgear.se</p>
                    <span className="m-0 fs-10">Osgear | Sep, 2014</span>
                  </div>
                  <p className="fs-9-5 p-0">
                    El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como po.
                  </p>
                </div>
              </div>
              <div className="list-item_points d-flex gap-1 flex-wrap">
                {Array(10).fill(null).map((_, index) => (
                  <span 
                    key={index}
                    className={`${index === 9 ? 'bg-primary-800' : 'bg-bg4'} rounded-xl p-1 px-2 fs-9 fw-semibold`}
                  >
                    99.41
                  </span>
                ))}
              </div>
            </div>
            
            {Array(5).fill(null).map((_, index) => (
              <div key={index} className="list-item bg-bg3 rounded-xl px-4 d-flex align-items-center">
                <div className="list-item_content-wrapper d-flex align-items-center">
                  <div className="list-item_number d-flex align-items-center">
                    <div className="flex align-items-center justify-content-center">
                      <span className="fs-9 fw-bold d-flex align-items-center justify-content-center bg-black text-white circle-tag rounded-xl text-center">
                        1
                      </span>
                    </div>
                    <h2 className="fs-3 fw-bold m-0">95.99</h2>
                  </div>
                  <div className="list-item_content">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                      <p className="fw-bold text-uppercase m-0">osgear.se</p>
                      <span className="m-0 fs-10">Osgear | Sep, 2014</span>
                    </div>
                    <p className="fs-9-5 p-0">
                      El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como po.
                    </p>
                  </div>
                </div>
                <div className="list-item_points min-w-5e d-flex gap-1 flex-wrap">
                  {Array(Math.max(1, 3 - index)).fill(null).map((_, i) => (
                    <span 
                      key={i}
                      className={`${i === (2 - index) ? 'bg-primary-800' : 'bg-bg4'} rounded-xl p-1 px-2 fs-9 fw-semibold`}
                    >
                      99.41
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="list-pagination mt-3 d-flex gap-2 align-items-center justify-content-center">
            <img className="cursor-pointer" src="images/icon-chevron-left.svg" alt="" />
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
          <h4 className="">LATEST SOURCE REVIEWS</h4>
          <div className="d-flex flex-column gap-1">
            {Array(4).fill(null).map((_, index) => (
              <div key={index} className="aside-card_subcard bg-bg7 rounded-lg">
                <p className="fs-9 fw-medium m-0 mb-1">
                  USGear is amazing, I have made 5 orders from them, their prices « <a href="#" className="fw-bold">Dav3891</a>
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
  );
};

export default SourceReview;