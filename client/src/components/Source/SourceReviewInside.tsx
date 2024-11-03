import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../../utils/supabase';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewModal from './ReviewModal';

const SourceReviewInside: React.FC = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [sourcereview, setSource] = useState<{ source_name: string } | null>(null);
  const { source_name } = useParams<{ source_name: string }>(); // Extract source_name from the URL

  useEffect(() => {
    const fetchSource = async () => {
      const { data, error } = await supabase
        .from('sourcereview')
        .select('source_name')
        .eq('source_name', source_name) // Use source_name for fetching
        .single();

      if (error) {
        console.error("Error fetching source:", error);
      } else {
        console.log("Fetched source data:", data);
        setSource(data);
      }
    };

    if (source_name) {
      fetchSource();
    }
  }, [source_name]);
  const handleReviewSubmit = (reviewData: any) => {
    console.log("Review submitted:", reviewData);
    // Add logic to handle the review submission
  };

  return (
    <div className="main-container">
      <div id="header-container"></div>
      <div className="bread-crumbs w-80 mx-auto mt-3">
        <a href="#" className="fs-7 fw-semibold underline">Home</a>
        <span>  </span>
        <span className="fs-7 fw-bolder text-primary-800">Steroid Source Reviews</span>
      </div>
      <div className="main-wrapper mx-auto mt-4">
        <div className="main-section mt-3 d-flex justify-content-between">
          <div className="source-review-inside w-100 flex flex-column">
            <section className="item-detail flex gap-3 bg-bg3 rounded-xl p-3">
              <div className="item-detail_content-wrapper flex gap-3">
                <div className="item-detail_img rounded-lg">
                  <img src="images/source-review-img.png" className="rounded-lg" alt="" />
                </div>
                <div className="item-detail_content">
                  <h5 className="fs-6 m-0">
                  {sourcereview?.source_name || 'Loading...'}
                  </h5>
                  <div className="review-stars">
                    <img src="/images/icon-review-star-empty.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                  </div>
                  <div className="item-detail_table-wrapper mt-2 d-flex align-items-end justify-content-between gap-4">
                    <div className="w-100 item-detail_table bg-white rounded-lg">
                      <div className="item-detail_table-head d-flex align-items-center gap-2 justify-content-between">
                        <span className="fs-9 fw-semibold">Category</span>
                        <span className="fs-9 fw-semibold">Count</span>
                        <span className="fs-9 fw-semibold">Average</span>
                      </div>
                      <div className="item-detail_table-body">
                        <div className="item-detail_table-body_item d-flex align-items-center gap-2 justify-content-between">
                          <span className="fs-10 fw-semibold text-uppercase">EFFECTIVENESS</span>
                          <span className="fs-10 fw-semibold text-uppercase">100</span>
                          <span className="fs-10 fw-semibold text-uppercase">10</span>
                        </div>
                        <div className="item-detail_table-body_item d-flex align-items-center gap-2 justify-content-between">
                          <span className="fs-10 fw-semibold text-uppercase">CREDIBILITY</span>
                          <span className="fs-10 fw-semibold text-uppercase">1</span>
                          <span className="fs-10 fw-semibold text-uppercase">99</span>
                        </div>
                        <div className="item-detail_table-body_item d-flex align-items-center gap-2 justify-content-between">
                          <span className="fs-10 fw-semibold text-uppercase">SIDE EFFECTS / PIP</span>
                          <span className="fs-10 fw-semibold text-uppercase">1</span>
                          <span className="fs-10 fw-semibold text-uppercase">10</span>
                        </div>
                      </div>
                    </div>
                    <a href="#" className="rounded-btn bg-primary-800">Discuss</a>
                  </div>
                </div>
              </div>
              <div className="item-detail_stats-wrapper d-flex align-items-center border-l-dt-white">
                <div className="item-detail_stats d-flex align-items-end gap-1 flex-wrap">
                  <div className="item-detail_stats-item rounded-lg bg-primary-800 d-flex flex-column align-items-center justify-content-center">
                    <div>
                      <span>1</span>
                      <span>Rank</span>
                    </div>
                  </div>
                  <div className="item-detail_stats-item rounded-lg bg-primary-800 d-flex flex-column align-items-center justify-content-center">
                    <div>
                      <span>71.7</span>
                      <span>Score</span>
                    </div>
                  </div>
                  <div className="item-detail_stats-item rounded-lg bg-primary-800 d-flex flex-column align-items-center justify-content-center">
                    <div>
                      <span>5</span>
                      <span>Votes</span>
                    </div>
                  </div>
                  <div className="item-detail_stats-item rounded-lg bg-primary-800 d-flex flex-column align-items-center justify-content-center">
                    <div>
                      <span>1</span>
                      <span>Rank</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="workout-images d-flex flex-wrap gap-2">
              <img src="/images/workout-img1.png" alt="" />
              <img src="/images/workout-img2.png" alt="" />
              <img src="/images/workout-img3.png" alt="" />
              <img src="/images/workout-img2.png" alt="" />
              <img src="/images/workout-img5.png" alt="" />
              <img src="/images/workout-img2.png" alt="" />
            </section>

            <section className="review bg-bg8 rounded-xl p-3">
              <div className="review-head d-flex align-items-center justify-content-between">
                <h4 className="fw-bold">Review</h4>
                <button 
                  onClick={() => setIsReviewModalOpen(true)}
                  className="rounded-btn bg-black text-white"
                >
                  Write a Review
                </button>
              </div>
              <div className="review-list d-flex flex-column gap-3 mt-2">
                <div className="review-item">
                  <h6 className="m-0 fw-bold">User</h6>
                  <div className="review-stars">
                    <img src="/images/icon-review-star-empty.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                  </div>
                  <p className="fs-9 m-0 mt-1">
                    600mg a week makes me hungry and vascular as fuck, is got for tendons so good with deca in a off season. 
                    Watchout for your rbc especially if u run high doses boldenone then its not mild anymore just run a mild 
                    or low dose and u get some benefits without any or low side effects.
                  </p>
                </div>
                <div className="review-item">
                  <h6 className="m-0 fw-bold">User</h6>
                  <div className="review-stars">
                    <img src="/images/icon-review-star-empty.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                    <img src="/images/icon-review-star.svg" alt="" />
                  </div>
                  <p className="fs-9 m-0 mt-1">
                    600mg a week makes me hungry and vascular as fuck, is got for tendons so good with deca in a off season. 
                    Watchout for your rbc especially if u run high doses boldenone then its not mild anymore just run a mild 
                    or low dose and u get some benefits without any or low side effects.
                  </p>
                </div>
                <div className="list-pagination my-2 mb-2 d-flex gap-2 align-items-center justify-content-center">
                  <img className="cursor-pointer" src="images/icon-chevron-left.svg" alt="" />
                  <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center active">1</span>
                  <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">2</span>
                  <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">3</span>
                  <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">...</span>
                  <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">24</span>
                  <img className="cursor-pointer" src="images/icon-chevron-right.svg" alt="" />
                </div>
              </div>
            </section>
          </div>

          <aside className="d-flex flex-column gap-3">
            <div className="aside-card bg-bg6 rounded-lg">
              <div className="aside-card_subcard bg-bg7 rounded-lg px-5">
                <p className="fs-9 fw-bold p-0 m-0 line-h-sm">ONESICK</p>
                <span className="aside-tags bg-primary-800 rounded-xl fs-10 fw-bold">3,333</span>
              </div>
            </div>

            <div className="aside-card bg-bg6 rounded-lg">
              <h4 className="">RECENT REVIEWS</h4>
              <div className="d-flex flex-column gap-1">
                {Array(4).fill(null).map((_, index) => (
                  <div key={index} className="aside-card_subcard bg-bg7 rounded-lg">
                    <p className="fs-9 fw-medium m-0 mb-1">
                      USGear is amazing, I have made 5 orders from them, their prices « 
                      <span className="fw-bold">Dav3891</span>
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

            <div className="aside-card bg-bg6 rounded-lg">
              <h4 className="">NEW SUMBISSIONS</h4>
              <div className="d-flex flex-column gap-1">
                <a href="#" className="aside-card_subcard bg-bg7 rounded-lg">
                  <p className="fs-9-5 fw-medium m-0">
                    <span className="fw-bold">Noreplay</span>
                    <span>{'>'}</span>
                    <span>almightypeptides.com</span>
                  </p>
                </a>
                <a href="#" className="aside-card_subcard bg-bg7 rounded-lg">
                  <p className="fs-9-5 fw-medium m-0">
                    <span className="fw-bold">PRO SUPPS</span>
                    <span>{'>'}</span>
                    <span>pro-supps.com</span>
                  </p>
                </a>
                <a href="#" className="aside-card_subcard bg-bg7 rounded-lg">
                  <p className="fs-9-5 fw-medium m-0">
                    <span className="fw-bold">PRO</span>
                    <span>{'>'}</span>
                    <span> balkanpharm.com</span>
                  </p>
                </a>
                <a href="#" className="aside-card_subcard bg-bg7 rounded-lg">
                  <p className="fs-9-5 fw-medium m-0">
                    <span className="fw-bold">PROdex</span>
                    <span>{'>'}</span>
                    <span>britishroids.com</span>
                  </p>
                </a>
                <a href="#" className="aside-card_subcard bg-bg7 rounded-lg">
                  <p className="fs-9-5 fw-medium m-0">
                    <span className="fw-bold">PROXIS</span>
                    <span>{'>'}</span>
                    <span>roid-stop.is</span>
                  </p>
                </a>
                <a href="#" className="aside-card_subcard bg-bg7 rounded-lg">
                  <p className="fs-9-5 fw-medium m-0">
                    <span className="fw-bold">PRO</span>
                    <span>{'>'}</span>
                    <span> balkanpharm.com</span>
                  </p>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      
      
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default SourceReviewInside;