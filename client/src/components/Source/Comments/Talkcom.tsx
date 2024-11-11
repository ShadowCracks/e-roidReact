import React, { useState, useEffect } from 'react';
import supabase from '../../../../utils/supabase';

interface TalkSectionProps {
  setIstalkModalOpen: (isOpen: boolean) => void;
  sourceId: string;
}

interface TalkItemProps {
  talkId: string;
  userName: string;
  karmaPoints: number;
  likeCount: number;
  dislikeCount: number;
  comment: string;
  createdAt: string;
  userReaction?: 'like' | 'dislike' | null;
  onReactionChange: () => void;
}

const TALKS_PER_PAGE = 10;

const getTimeAgo = (date: string) => {
  const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
  const days = Math.floor(seconds / 86400);
  return days > 0 ? `${days}d ago` : 'today';
};

const talkcom: React.FC<TalkSectionProps> = ({ setIstalkModalOpen, sourceId }) => {
  const [talks, setTalks] = useState<TalkItemProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const fetchTalks = async () => {
    setLoading(true);
    if (!sourceId) {
      console.log('No sourceId provided');
      setLoading(false);
      return;
    }

    try {
      const { count, error: countError } = await supabase
        .from('talks')
        .select('*', { count: 'exact', head: true })
        .eq('source_id', sourceId);

      if (countError) throw countError;
      setTotalCount(count || 0);

      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('talks')
        .select(`
          talk_id,
          comment,
          created_at,
          profiles (username),
          source_id
        `)
        .eq('source_id', sourceId)
        .range((currentPage - 1) * TALKS_PER_PAGE, currentPage * TALKS_PER_PAGE - 1)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching talks:', error.message);
        return;
      }

      // Get reactions count for each talk
      const { data: reactionCounts, error: reactionsError } = await supabase
        .from('talk_reactions')
        .select('talk_id, reaction_type');

      if (reactionsError) throw reactionsError;

      let userReactions: Record<string, 'like' | 'dislike'> = {};
      if (user) {
        const { data: userReactionData } = await supabase
          .from('talk_reactions')
          .select('talk_id, reaction_type')
          .eq('user_id', user.id);

        if (userReactionData) {
          userReactions = userReactionData.reduce((acc, reaction) => ({
            ...acc,
            [reaction.talk_id]: reaction.reaction_type as 'like' | 'dislike'
          }), {} as Record<string, 'like' | 'dislike'>);
        }
      }

      const formattedTalks = (data as unknown as { 
        talk_id: string; 
        comment: string;
        created_at: string;
        profiles: { username: string }; 
        source_id: string;
      }[]).map(talk => {
        const talkReactions = reactionCounts?.filter(r => r.talk_id === talk.talk_id) || [];
        const likes = talkReactions.filter(r => r.reaction_type === 'like').length;
        const dislikes = talkReactions.filter(r => r.reaction_type === 'dislike').length;

        return {
          talkId: talk.talk_id,
          userName: talk.profiles.username,
          karmaPoints: likes - dislikes,
          likeCount: likes,
          dislikeCount: dislikes,
          comment: talk.comment,
          createdAt: talk.created_at,
          userReaction: userReactions[talk.talk_id],
          onReactionChange: fetchTalks
        };
      });

      setTalks(formattedTalks);
    } catch (err) {
      console.error('Error processing comments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTalks();
  }, [sourceId, currentPage]);

  const totalPages = Math.ceil(totalCount / TALKS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div>Loading comments...</div>;
  }

  return (
    <section className="talk bg-bg8 rounded-xl p-3">
      <div className="talk-head d-flex align-items-center justify-content-between">
        <h4 className="fw-bold">Comments ({totalCount})</h4>
        <button 
          onClick={() => setIstalkModalOpen(true)}
          className="rounded-btn bg-black text-white"
        >
          Write a comment
        </button>
      </div>

      <div className="review-list d-flex flex-column gap-3 mt-2 pt-2">
        {talks.length > 0 ? (
          talks.map((talk: TalkItemProps) => (
            <TalkItem 
              key={talk.talkId}
              {...talk}
            />
          ))
        ) : (
          <div>No talks yet. Be the first to talk!</div>
        )}
        
        {totalPages > 1 && (
          <div className="list-pagination my-2 mb-2 d-flex gap-2 align-items-center justify-content-center">
            <img 
              className="cursor-pointer"
              src="/images/icon-chevron-left.svg" 
              alt="" 
              onClick={() => handlePageChange(currentPage - 1)}
              style={{ cursor: currentPage === 1 ? 'default' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1 }}
            />
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <span
                    key={pageNumber}
                    className={`cursor-pointer p-1 d-flex align-items-center justify-content-center ${
                      currentPage === pageNumber ? 'active' : ''
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </span>
                );
              } else if (
                (pageNumber === currentPage - 2 && currentPage > 3) ||
                (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
              ) {
                return <span key={pageNumber}>...</span>;
              }
              return null;
            })}
            
            <img 
              className="cursor-pointer"
              src="/images/icon-chevron-right.svg" 
              alt="" 
              onClick={() => handlePageChange(currentPage + 1)}
              style={{ cursor: currentPage === totalPages ? 'default' : 'pointer', opacity: currentPage === totalPages ? 0.5 : 1 }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

const TalkItem: React.FC<TalkItemProps> = ({ 
  talkId,
  userName, 
  karmaPoints, 
  likeCount, 
  dislikeCount, 
  comment,
  createdAt,
  userReaction,
  onReactionChange
}) => {
  const handleReaction = async (type: 'like' | 'dislike') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Please login to react to talks');
        return;
      }

      if (userReaction === type) {
        await supabase
          .from('talk_reactions')
          .delete()
          .match({ 
            talk_id: talkId, 
            user_id: user.id 
          });
      } else {
        if (userReaction) {
          await supabase
            .from('talk_reactions')
            .delete()
            .match({ 
              talk_id: talkId, 
              user_id: user.id 
            });
        }

        await supabase
          .from('talk_reactions')
          .insert({
            talk_id: talkId,
            user_id: user.id,
            reaction_type: type
          });
      }

      onReactionChange();
    } catch (error) {
      console.error('Error handling reaction:', error);
    }
  };

  const isNew = new Date(createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000);

  return (
    <div className="review-item comment-item" id={talkId}>
      <div className="comment-head mb-2">
        <div className="user-profile">
          <img src="/images/aside-profile-pic.png" alt="" />
          <h6 className="m-0 fw-bold">{userName}</h6>
          <span title="Comment Karma Point" className="comment-karma_point bg-bg10">
            <img src="/images/icon-karma.svg" alt="" />
            <span className="karma-amount">{karmaPoints}</span>
          </span>
        </div>
        <div className="tags flex align-items-center gap-2">
          {isNew && <span className="tag-status">new</span>}
          <span className="tag-posted">{getTimeAgo(createdAt)}</span>
        </div>
      </div>

      <p className="fs-9 m-0 mt-1">{comment}</p>
      
      <div className="comment-footer">
        <button className="rounded-btn">Reply</button>
        <div className="like-dislike d-flex align-items-center gap-3">
          <button 
            className={`like d-flex align-items-center gap-1 ${userReaction === 'like' ? 'active' : ''}`}
            onClick={() => handleReaction('like')}
          >
            <img src="/images/icon-like.svg" alt="" />
            <span className="like-number">{likeCount}</span>
          </button>
          <button 
            className={`dislike d-flex align-items-center gap-1 ${userReaction === 'dislike' ? 'active' : ''}`}
            onClick={() => handleReaction('dislike')}
          >
            <img src="/images/icon-dislike.svg" alt="" />
            <span className="dislike-number">{dislikeCount}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default talkcom;