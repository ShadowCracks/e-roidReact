import React, { useState, useEffect } from 'react';
import supabase from '../../../../utils/supabase';

interface ReviewSectionProps {
 setIsReviewModalOpen: (isOpen: boolean) => void;
 sourceId: string;
}

interface ReviewItemProps {
 reviewId: string;
 userName: string;
 karmaPoints: number;
 likeCount: number;
 dislikeCount: number;
 comment: string;
 userReaction?: 'like' | 'dislike' | null;
 onReactionChange: () => void;
 overall_rating: number;
 product_effectiveness: number;
 customer_service: number;
 shipping_and_delivery: number;
 price_to_performance: number;
}

// Star Rating Component
const StarRating: React.FC<{ rating: number; title: string }> = ({ rating, title }) => {
 return (
   <div className="flex flex-col gap-1">
     <span className="text-sm text-gray-600">{title}</span>
     <div className="flex gap-1">
       {[1, 2, 3, 4, 5].map((star) => (
         <img
           key={star}
           src={`/images/icon-review-star${star <= rating ? '' : '-empty'}.svg`}
           alt={`Star ${star}`}
           className="w-4 h-4"
         />
       ))}
     </div>
   </div>
 );
};

const Reviewcom: React.FC<ReviewSectionProps> = ({ setIsReviewModalOpen, sourceId }) => {
 const [reviews, setReviews] = useState<ReviewItemProps[]>([]);
 const [loading, setLoading] = useState(true);

 const fetchReviews = async () => {
   setLoading(true);
   if (!sourceId) {
     console.log('No sourceId provided');
     setLoading(false);
     return;
   }

   try {
     const { data: { user } } = await supabase.auth.getUser();
     
     const { data, error } = await supabase
       .from('reviews')
       .select(`
         review_id,
         comment,
         profiles (username),
         source_id,
         overall_rating,
         product_effectiveness,
         customer_service,
         shipping_and_delivery,
         price_to_performance
       `)
       .eq('source_id', sourceId);

     if (error) {
       console.error('Error fetching reviews:', error.message);
       return;
     }

     // Get reactions count for each review
     const { data: reactionCounts, error: reactionsError } = await supabase
       .from('review_reactions')
       .select('review_id, reaction_type');

     if (reactionsError) throw reactionsError;

     // Get user's reactions if logged in
     let userReactions: Record<string, 'like' | 'dislike'> = {};
     if (user) {
       const { data: userReactionData } = await supabase
         .from('review_reactions')
         .select('review_id, reaction_type')
         .eq('user_id', user.id);

       if (userReactionData) {
         userReactions = userReactionData.reduce((acc, reaction) => ({
           ...acc,
           [reaction.review_id]: reaction.reaction_type as 'like' | 'dislike'
         }), {} as Record<string, 'like' | 'dislike'>);
       }
     }

     const formattedReviews = (data as unknown as { 
       review_id: string; 
       comment: string; 
       profiles: { username: string }; 
       source_id: string;
       overall_rating: number;
       product_effectiveness: number;
       customer_service: number;
       shipping_and_delivery: number;
       price_to_performance: number;
     }[]).map(review => {
       const reviewReactions = reactionCounts?.filter(r => r.review_id === review.review_id) || [];
       const likes = reviewReactions.filter(r => r.reaction_type === 'like').length;
       const dislikes = reviewReactions.filter(r => r.reaction_type === 'dislike').length;

       return {
         reviewId: review.review_id,
         userName: review.profiles.username,
         karmaPoints: 0,
         likeCount: likes,
         dislikeCount: dislikes,
         comment: review.comment,
         userReaction: userReactions[review.review_id],
         onReactionChange: fetchReviews,
         overall_rating: review.overall_rating || 0,
         product_effectiveness: review.product_effectiveness || 0,
         customer_service: review.customer_service || 0,
         shipping_and_delivery: review.shipping_and_delivery || 0,
         price_to_performance: review.price_to_performance || 0
       };
     });

     setReviews(formattedReviews);
   } catch (err) {
     console.error('Error processing reviews:', err);
   } finally {
     setLoading(false);
   }
 };

 useEffect(() => {
   fetchReviews();
 }, [sourceId]);

 if (loading) {
   return <div>Loading reviews...</div>;
 }

 return (
   <section className="review bg-bg8 rounded-xl p-3">
     <div className="review-head d-flex align-items-center justify-content-between">
       <h4 className="fw-bold">Reviews ({reviews.length})</h4>
       <button 
         onClick={() => setIsReviewModalOpen(true)}
         className="rounded-btn bg-black text-white"
       >
         Write a Review
       </button>
     </div>

     <div className="review-list d-flex flex-column gap-3 mt-2 pt-2">
       {reviews.length > 0 ? (
         reviews.map((review, index) => (
           <ReviewItem 
             key={index}
             {...review}
           />
         ))
       ) : (
         <div>No reviews yet. Be the first to review!</div>
       )}
       {reviews.length > 0 && <Pagination />}
     </div>
   </section>
 );
};

const ReviewItem: React.FC<ReviewItemProps> = ({ 
 reviewId,
 userName, 
 karmaPoints, 
 likeCount, 
 dislikeCount, 
 comment,
 userReaction,
 onReactionChange,
 overall_rating,
 product_effectiveness,
 customer_service,
 shipping_and_delivery,
 price_to_performance
}) => {
 const handleReaction = async (type: 'like' | 'dislike') => {
   try {
     const { data: { user } } = await supabase.auth.getUser();
     if (!user) {
       alert('Please login to react to reviews');
       return;
     }

     if (userReaction === type) {
       const { error } = await supabase
         .from('review_reactions')
         .delete()
         .match({ 
           review_id: reviewId, 
           user_id: user.id 
         });

       if (error) throw error;
     } else {
       if (userReaction) {
         await supabase
           .from('review_reactions')
           .delete()
           .match({ 
             review_id: reviewId, 
             user_id: user.id 
           });
       }

       const { error } = await supabase
         .from('review_reactions')
         .insert({
           review_id: reviewId,
           user_id: user.id,
           reaction_type: type
         });

       if (error) throw error;
     }

     onReactionChange();
   } catch (error) {
     console.error('Error handling reaction:', error);
   }
 };

 return (
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

     <div className="bg-bg7 rounded-lg p-3 mb-3 grid grid-cols-2 md:grid-cols-3 gap-3">
       <StarRating title="Overall Rating" rating={overall_rating} />
       <StarRating title="Product Effectiveness" rating={product_effectiveness} />
       <StarRating title="Customer Service" rating={customer_service} />
       <StarRating title="Shipping & Delivery" rating={shipping_and_delivery} />
       <StarRating title="Price to Performance" rating={price_to_performance} />
     </div>

     <p className="fs-9 m-0 mt-1">{comment}</p>
     <div className="comment-footer d-flex align-items-center justify-content-between mt-2">
       <div className="like-dislike d-flex align-items-center gap-3">
         <button 
           className={`like d-flex align-items-center gap-1 ${userReaction === 'like' ? 'active' : ''}`}
           onClick={() => handleReaction('like')}
         >
           <img src="/images/icon-like.svg" alt="Like" />
           <span className="like-number">{likeCount}</span>
         </button>
         <button 
           className={`dislike d-flex align-items-center gap-1 ${userReaction === 'dislike' ? 'active' : ''}`}
           onClick={() => handleReaction('dislike')}
         >
           <img src="/images/icon-dislike.svg" alt="Dislike" />
           <span className="dislike-number">{dislikeCount}</span>
         </button>
       </div>
     </div>
   </div>
 );
};

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