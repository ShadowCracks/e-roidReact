import React from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewContentSection: React.FC = () => {
  return (
    <section className="infos-container infos-container-secondary">
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
        <img src="images/home-img1.png" alt="Aside" />
      </div>

      <div className="info-col-gallery">
        <section className="workout-images d-flex flex-wrap">
          <img src="images/home-workout-img1.png" alt="Workout 1" />
          <img src="images/home-workout-img2.png" alt="Workout 2" />
          <img src="images/home-workout-img3.png" alt="Workout 3" />
          <img src="images/home-workout-img4.png" alt="Workout 4" />
          <img src="images/home-workout-img5.png" alt="Workout 5" />
          <img src="images/home-workout-img6.png" alt="Workout 6" />
          <img src="images/home-workout-img7.png" alt="Workout 7" />
          <img src="images/home-workout-img8.png" alt="Workout 8" />
          <img src="images/home-workout-img9.png" alt="Workout 9" />
          <img src="images/home-workout-img6.png" alt="Workout 6 Duplicate" />
        </section>
      </div>
    </section>
  );
};

export default NewContentSection;
