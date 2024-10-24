import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const InfoSection: React.FC = () => {
  return (
    <section className="infos-container">
      <div className="info-col">
        <div className="info-col_head">
          <p>Latest comments / Hot topics</p>
          <a href="#">View All</a>
        </div>
        <div className="info-col_body">
          {Array(4).fill('').map((_, index) => (
            <div className="info-item" key={index}>
              <div className="info-item_text">
                <p>Forum topic {'>>'} "Blackout"</p>
              </div>
              <div className="info-item_text_tags">
                <span className="tag">25.50</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-col">
        <div className="info-col_head">
          <p>Promos and Deals</p>
          <a href="#">View All</a>
        </div>
        <div className="info-col_body">
          {Array(4).fill('').map((_, index) => (
            <div className="info-item" key={index}>
              <div className="info-item_text">
                <p>Baboon pharma brand, 50% off. Buy TWO get ONE Free</p>
              </div>
              <div className="info-item_text_tags">
                <span className="replies">
                  <span>Replies</span><span className="tag">12</span>
                </span>
                <span className="tag">New Promo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-col">
        <div className="info-col_head">
          <p>New Content</p>
          <a href="#">View All</a>
        </div>
        <div className="info-col_body">
          {Array(4).fill('').map((_, index) => (
            <div className="info-item" key={index}>
              <div className="info-item_text">
                <p>ForeverFitBod1 {'>>'} "Blackout"</p>
              </div>
              <div className="info-item_text_tags">
                <span className="tag">Ends soon</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-col">
        <div className="info-col_head">
          <p>New Content</p>
          <a href="#">View All</a>
        </div>
        <div className="info-col_body">
          {Array(3).fill('').map((_, index) => (
            <div className="aside-card_subcard info-item bg-bg11 rounded-lg" key={index}>
              <div className="info-item_text">
                <p>
                  USGear is amazing, I have made 5 orders from them, their prices «
                  <a href="#" className="fw-bold">Dav3891</a>
                </p>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-1">
                <span className="aside-tags text-primary-800 bg-black rounded-xl fs-10 fw-medium">
                  Trenbolone-e 200
                </span>
                <div className="d-flex align-items-center justify-content-between gap-1">
                  <span className="p-2 px-2 rounded-xl bg-green d-flex align-items-center">
                    <img src="images/icon-tick.svg" alt="tick icon" />
                  </span>
                  <span className="p-1 px-2 rounded-xl bg-primary-800 fs-10 fw-bold">9/10</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info-col">
        <img src="images/aside-img.png" alt="Aside" />
      </div>
    </section>
  );
};

export default InfoSection;
