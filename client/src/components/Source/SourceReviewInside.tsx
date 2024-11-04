import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../../utils/supabase';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewModal from './ReviewModal';
import RecentReviews from './Sidebar/RecentReview';
import NewSubmissions from './Sidebar/NewSubmissions';
import Reviewcom from './Comments/Reviewcom';

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
                  <div className="review-stars d-flex flex-row">
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

            <Reviewcom setIsReviewModalOpen={setIsReviewModalOpen} />


          </div>

          <aside className="d-flex flex-column gap-3">
            <div className="aside-card bg-bg6 rounded-lg">
              <div className="aside-card_subcard bg-bg7 rounded-lg px-5">
                <p className="fs-9 fw-bold p-0 m-0 line-h-sm">ONESICK</p>
                <span className="aside-tags bg-primary-800 rounded-xl fs-10 fw-bold">3,333</span>
              </div>
            </div>

            <RecentReviews />
            <NewSubmissions />    

           
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