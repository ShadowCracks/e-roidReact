import React, { useState } from 'react';
import '../style.css';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; text: string }) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ rating, text: reviewText });
    onClose();
    // Reset form
    setRating(0);
    setReviewText('');
  };

  return (
    <>
      <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 1000 }}>
        <div className="modal-content bg-bg3 rounded-xl p-4" style={{ maxWidth: '500px', width: '90%' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold m-0">Write a Review</h4>
            <button 
              onClick={onClose}
              className="btn-close bg-white rounded-circle"
              aria-label="Close"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="d-block mb-2 fs-7 fw-semibold">Rating</label>
              <div className="review-stars d-flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="star-btn bg-transparent border-0 p-0"
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    onClick={() => setRating(star)}
                  >
                    <img 
                      src={`images/icon-review-star${star <= (hoveredStar || rating) ? '' : '-empty'}.svg`}
                      alt={`Star ${star}`}
                      className="star-icon"
                      style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="d-block mb-2 fs-7 fw-semibold">Your Review</label>
              <textarea
                className="form-control bg-bg7 border-0 rounded-lg p-3 fs-9"
                rows={6}
                placeholder="Share your experience with this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-btn bg-bg7 text-dark fw-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-btn bg-primary-800 text-white fw-semibold"
                disabled={!rating || !reviewText.trim()}
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
// ReviewModal.tsx
export default ReviewModal;