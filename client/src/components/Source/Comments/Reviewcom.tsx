import React from 'react';

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

const Reviewcom: React.FC<ReviewSectionProps> = ({ setIsReviewModalOpen }) => {
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
        {/* Sample reviews, replace with dynamic data if needed */}
        <ReviewItem 
          userName="User"
          karmaPoints={922}
          likeCount={12223}
          dislikeCount={322}
          comment="600mg a week makes me hungry and vascular as ever, is good for tendons so good with deca in an off season. Watch out for your rbc, especially if you run high doses of boldenone; then it's not mild anymore. Just run a mild or low dose and you get some benefits without any or low side effects."
        />

        {/* Pagination */}
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
            <div className="review-stars d-flex flex-row">
              <img src="/images/icon-review-star-empty.svg" alt="Star" />
              <img src="/images/icon-review-star.svg" alt="Star" />
              <img src="/images/icon-review-star.svg" alt="Star" />
              <img src="/images/icon-review-star.svg" alt="Star" />
              <img src="/images/icon-review-star.svg" alt="Star" />
            </div>
            <img src="/images/icon-karma.svg" alt="Karma Icon" />
            <span className="karma-amount">{karmaPoints}</span>
          </span>
        </div>
      </div>
      <div className="tags d-flex align-items-center gap-2">
        <span className="tag-status">new</span>
        <span className="tag-posted">10d ago</span>
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
