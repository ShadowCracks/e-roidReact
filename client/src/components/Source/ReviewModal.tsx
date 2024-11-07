import { FC, FormEvent, useState, useEffect } from 'react';
import supabase from '../../../utils/supabase';

interface StarRatingProps {
  rating: number;
  hoveredStar: number;
  onHover: (value: number) => void;
  onRate: (value: number) => void;
  label: string;
}

interface Ratings {
  overall: number;
  effectiveness: number;
  customerService: number;
  shipping: number;
  pricePerformance: number;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  source_id: string; // Passing the source_id here for review association
}

const StarRating: FC<StarRatingProps> = ({ rating, hoveredStar, onHover, onRate, label }) => (
  <div className="mb-3">
    <label className="d-block mb-2 fs-7 fw-semibold">{label}</label>
    <div className="review-stars d-flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="star-btn bg-transparent border-0 p-0"
          onMouseEnter={() => onHover(star)}
          onMouseLeave={() => onHover(0)}
          onClick={() => onRate(star)}
        >
          <img
            src={`/images/icon-review-star${star <= (hoveredStar || rating) ? '' : '-empty'}.svg`}
            alt={`Star ${star}`}
            className="star-icon"
            style={{ width: '24px', height: '24px', cursor: 'pointer' }}
          />
        </button>
      ))}
    </div>
  </div>
);

const ReviewModal: FC<ReviewModalProps> = ({ isOpen, onClose, source_id }) => {
  const [ratings, setRatings] = useState<Ratings>({
    overall: 0,
    effectiveness: 0,
    customerService: 0,
    shipping: 0,
    pricePerformance: 0,
  });
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Fetch the session and user information
    const fetchUser = async () => {
      const { data: { session }} = await supabase.auth.getSession();
      if (session && session.user) {
        setUser(session.user);  // Store user info
      }
    };
    fetchUser();
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          source_id, // associating the review with the specific source
          overall_rating: ratings.overall,
          product_effectiveness: ratings.effectiveness,
          customer_service: ratings.customerService,
          shipping_and_delivery: ratings.shipping,
          price_to_performance: ratings.pricePerformance,
          comment: reviewText,
          user_id: user?.id,  // Adding user_id here
        });

      if (error) {
        console.error('Error saving review:', error);
      } else {
        console.log('Review saved successfully:', data);
        onClose(); // Close the modal on successful submission
        setReviewText('');
        setRatings({
          overall: 0,
          effectiveness: 0,
          customerService: 0,
          shipping: 0,
          pricePerformance: 0,
        });
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (category: keyof Ratings, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const isFormValid = () => {
    return (
      ratings.overall > 0 &&
      ratings.effectiveness > 0 &&
      ratings.customerService > 0 &&
      ratings.shipping > 0 &&
      ratings.pricePerformance > 0 &&
      reviewText.trim().length > 0
    );
  };

  return (
    <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 1000 }}>
      <div className="modal-content bg-bg3 rounded-xl p-4" style={{ maxWidth: '500px', width: '90%' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold m-0">Write a Review</h4>
          <button onClick={onClose} className="btn-close bg-white rounded-circle" aria-label="Close" />
        </div>

        <form onSubmit={handleSubmit} className="review-form">
          <StarRating
            label="Overall Rating"
            rating={ratings.overall}
            hoveredStar={0}
            onHover={() => {}}
            onRate={(value) => handleRatingChange('overall', value)}
          />
          <StarRating
            label="Product Effectiveness"
            rating={ratings.effectiveness}
            hoveredStar={0}
            onHover={() => {}}
            onRate={(value) => handleRatingChange('effectiveness', value)}
          />
          <StarRating
            label="Customer Service"
            rating={ratings.customerService}
            hoveredStar={0}
            onHover={() => {}}
            onRate={(value) => handleRatingChange('customerService', value)}
          />
          <StarRating
            label="Shipping and Delivery"
            rating={ratings.shipping}
            hoveredStar={0}
            onHover={() => {}}
            onRate={(value) => handleRatingChange('shipping', value)}
          />
          <StarRating
            label="Price to Performance"
            rating={ratings.pricePerformance}
            hoveredStar={0}
            onHover={() => {}}
            onRate={(value) => handleRatingChange('pricePerformance', value)}
          />

          <div className="mb-4">
            <label className="d-block mb-2 fs-7 fw-semibold">Your Review</label>
            <textarea
              className="form-control bg-bg7 border-0 rounded-lg p-3 fs-9"
              rows={6}
              placeholder="Share your experience with this product..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" onClick={onClose} className="rounded-btn bg-bg7 text-dark fw-semibold">
              Cancel
            </button>
            <button type="submit" className="rounded-btn bg-primary-800 text-white fw-semibold" disabled={!isFormValid() || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
