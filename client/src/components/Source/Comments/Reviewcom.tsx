import React, { useState, useEffect } from 'react';
import supabase from '../../../../utils/supabase';

interface ReviewSectionProps {
  setIsReviewModalOpen: (isOpen: boolean) => void;
}

interface ReviewItemProps {
  userName: string;
  karmaPoints: number;
  likeCount: number;
  dislikeCount: number;
  comment: string;
}

// Updated interface to handle nullable profiles
interface SupabaseReviewResponse {
  comment: string;
  profiles: {
    username: string;
  } | null;  // Make profiles nullable
}

const Reviewcom: React.FC<ReviewSectionProps> = ({ setIsReviewModalOpen }) => {
  const [reviews, setReviews] = useState<ReviewItemProps[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('comment, profiles (username)');
     
        if (error) {
          console.error('Error fetching reviews:', error.message);
          return;
        }
        
        if (data) {
          const formattedReviews = (data as unknown as SupabaseReviewResponse[]).map(review => ({
            userName: review.profiles?.username || 'Anonymous', // Add null check and fallback
            karmaPoints: 0,
            likeCount: 0,
            dislikeCount: 0,
            comment: review.comment,
          }));
          console.log('Fetched data:', data);

          setReviews(formattedReviews);
        }
      } catch (err) {
        console.error('Error processing reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="review bg-bg8 rounded-xl p-3">
      <div className="review-head d-flex align-items-center justify-content-between">
        <h4 className="fw-bold">Reviews</h4>
        <button 
          onClick={() => setIsReviewModalOpen(true)}
          className="rounded-btn bg-black text-white"
        >
          Write a Review
        </button>
      </div>

      <div className="review-list d-flex flex-column gap-3 mt-2 pt-2">
        {reviews.map((review, index) => (
          <ReviewItem 
            key={index}
            userName={review.userName}
            karmaPoints={review.karmaPoints}
            likeCount={review.likeCount}
            dislikeCount={review.dislikeCount}
            comment={review.comment}
          />
        ))}
        <Pagination />
      </div>
    </section>
  );
};

// Component for individual review items
const ReviewItem: React.FC<ReviewItemProps> = ({ userName, karmaPoints, likeCount, dislikeCount, comment }) => (
  <div className="review-item comment-item">
    <div className="comment-head mb-2 d-flex align-items-center justify-content-between">
      <div className="user-profile d-flex align-items-center gap-2">
        <img src="/images/aside-profile-pic.png" alt="Profile" className="profile-pic" />
        <div>
          <h6 className="m-0 fw-bold">{userName}</h6>
          <span title="Comment Karma Point" className="comment-karma_point bg-bg10 d-flex align-items-center">
            <span className="karma-amount">{karmaPoints}</span>
          </span>
        </div>
      </div>
    </div>
    <p className="fs-9 m-0 mt-1">{comment}</p>
    <div className="comment-footer d-flex align-items-center justify-content-between mt-2">
      <div className="like-dislike d-flex align-items-center gap-3">
        <button className="like d-flex align-items-center gap-1">
          <img src="/images/icon-like.svg" alt="Like" />
          <span className="like-number">{likeCount}</span>
        </button>
        <button className="dislike d-flex align-items-center gap-1">
          <img src="/images/icon-dislike.svg" alt="Dislike" />
          <span className="dislike-number">{dislikeCount}</span>
        </button>
      </div>
    </div>
  </div>
);

// Pagination component
const Pagination: React.FC = () => (
  <div className="list-pagination my-2 mb-2 d-flex gap-2 align-items-center justify-content-center">
    <img className="cursor-pointer" src="/images/icon-chevron-left.svg" alt="Previous" />
    <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center active">1</span>
    <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">2</span>
    <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">3</span>
    <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">...</span>
    <span className="cursor-pointer p-1 d-flex align-items-center justify-content-center">24</span>
    <img className="cursor-pointer" src="/images/icon-chevron-right.svg" alt="Next" />
  </div>
);

export default Reviewcom;