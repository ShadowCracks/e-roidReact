import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../../utils/supabase';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReviewModal from './ReviewModal';
import RecentReviews from './Sidebar/RecentReview';
import NewSubmissions from './Sidebar/NewSubmissions';
import Reviewcom from './Comments/Reviewcom';

interface Profile {
  username: string;
  avatar_url: string | null;
}

interface SourceReview {
  source_id: string;
  source_name: string;
  overall: number;
  quality: number;
  delivery: number;
  service: number;
  pricing: number;
  review_count: number;
  average_rating: number;
  rank?: number;
  user_id?: string;
  profiles: Profile | null;
}

const SourceReviewInside: React.FC = () => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [sourcereview, setSource] = useState<SourceReview | null>(null);
  const { source_name } = useParams<{ source_name: string }>();
  
  useEffect(() => {
    const fetchSource = async () => {
      // First get all sources ordered by average_rating to calculate rank
      const { data: allSources } = await supabase
        .from('sourcereview')
        .select('source_id, average_rating')
        .order('average_rating', { ascending: false });

      // Then get the specific source details with user profile info
      const { data, error } = await supabase
        .from('sourcereview')
        .select(`
          source_id, 
          source_name,
          overall,
          quality,
          delivery,
          service,
          pricing,
          review_count,
          average_rating,
          user_id,
          profiles!sourcereview_user_id_fkey (
            username,
            avatar_url
          )
        `)
        .eq('source_name', source_name)
        .single();

      if (error) {
        console.error("Error fetching source:", error);
      } else if (data && allSources) {
        // Calculate rank
        const rank = allSources.findIndex(s => s.source_id === data.source_id) + 1;

        // Properly type and transform the data
        const transformedData: SourceReview = {
          source_id: data.source_id,
          source_name: data.source_name,
          overall: data.overall,
          quality: data.quality,
          delivery: data.delivery,
          service: data.service,
          pricing: data.pricing,
          review_count: data.review_count,
          average_rating: data.average_rating,
          user_id: data.user_id,
          rank,
          profiles: data.profiles || null
        };
        
        setSource(transformedData);
      }
    };

    if (source_name) {
      fetchSource();
    }
  }, [source_name]);

  return (
    <div className="d-flex flex-wrap flex-lg-nowrap gap-3">
      <div id="header-container"></div>
      <div>
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
                          <span className="fs-10 fw-semibold text-uppercase">OVERALL</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.review_count || 0}</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.overall || 0}%</span>
                        </div>
                        <div className="item-detail_table-body_item d-flex align-items-center gap-2 justify-content-between">
                          <span className="fs-10 fw-semibold text-uppercase">QUALITY</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.review_count || 0}</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.quality || 0}%</span>
                        </div>
                        <div className="item-detail_table-body_item d-flex align-items-center gap-2 justify-content-between">
                          <span className="fs-10 fw-semibold text-uppercase">DELIVERY</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.review_count || 0}</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.delivery || 0}%</span>
                        </div>
                        <div className="item-detail_table-body_item d-flex align-items-center gap-2 justify-content-between">
                          <span className="fs-10 fw-semibold text-uppercase">SERVICE</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.review_count || 0}</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.service || 0}%</span>
                        </div>
                        <div className="item-detail_table-body_item d-flex align-items-center gap-2 justify-content-between">
                          <span className="fs-10 fw-semibold text-uppercase">PRICING</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.review_count || 0}</span>
                          <span className="fs-10 fw-semibold text-uppercase">{sourcereview?.pricing || 0}%</span>
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
                      <span>{sourcereview?.rank || '-'}</span>
                      <span>Rank</span>
                    </div>
                  </div>
                  <div className="item-detail_stats-item rounded-lg bg-primary-800 d-flex flex-column align-items-center justify-content-center">
                    <div>
                      <span>{sourcereview?.average_rating?.toFixed(1) || 0}</span>
                      <span>Score</span>
                    </div>
                  </div>
                  <div className="item-detail_stats-item rounded-lg bg-primary-800 d-flex flex-column align-items-center justify-content-center">
                    <div>
                      <span>{sourcereview?.review_count || 0}</span>
                      <span>Votes</span>
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

            <Reviewcom 
              setIsReviewModalOpen={setIsReviewModalOpen} 
              sourceId={sourcereview?.source_id || ''}
            />
          </div>

          <aside className="d-flex flex-column gap-3">
            <div className="aside-card bg-bg6 rounded-lg">
              <div className="aside-card_subcard bg-bg7 rounded-lg px-5">
                {sourcereview?.profiles ? (
                  <>
                    {sourcereview.profiles.avatar_url ? (
                      <img 
                        src={sourcereview.profiles.avatar_url} 
                        alt="Profile" 
                        className="rounded-circle mb-2"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div 
                        className="rounded-circle bg-primary-800 mb-2 d-flex align-items-center justify-content-center text-white"
                        style={{ width: '50px', height: '50px' }}
                      >
                        {sourcereview.profiles.username.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <p className="fs-9 fw-bold p-0 m-0 line-h-sm">
                      {sourcereview.profiles.username}
                    </p>
                  </>
                ) : (
                  <p className="fs-9 fw-bold p-0 m-0 line-h-sm">ONESICK</p>
                )}
                <span className="aside-tags bg-primary-800 rounded-xl fs-10 fw-bold">
                  {sourcereview?.review_count || 0}
                </span>
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
        source_id={sourcereview?.source_id || ''}
      />
    </div>
  );
};

export default SourceReviewInside;