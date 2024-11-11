import { FC, FormEvent, useState, useEffect } from 'react';
import supabase from '../../../utils/supabase';

interface TalkModalProps {
  isOpen: boolean;
  onClose: () => void;
  source_id: string;
}

const TalkModal: FC<TalkModalProps> = ({ isOpen, onClose, source_id }) => {
  const [talkText, setTalkText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session }} = await supabase.auth.getSession();
      if (session && session.user) {
        setUser(session.user);
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
        .from('talks')
        .insert({
          source_id,
          comment: talkText,
          user_id: user?.id,
        });

      if (error) {
        console.error('Error saving talk', error);
      } else {
        console.log('Talk saved successfully:', data);
        onClose();
        setTalkText('');
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return talkText.trim().length > 0;
  };

  return (
    <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 d-flex align-items-center justify-content-center" style={{ zIndex: 1000 }}>
      <div className="modal-content bg-bg3 rounded-xl p-4" style={{ maxWidth: '500px', width: '90%' }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold m-0">Write a comment</h4>
          <button onClick={onClose} className="btn-close bg-white rounded-circle" aria-label="Close" />
        </div>

        <form onSubmit={handleSubmit} className="talk-form">
          <div className="mb-4">
            <label className="d-block mb-2 fs-7 fw-semibold">Your Comment</label>
            <textarea
              className="form-control bg-bg7 border-0 rounded-lg p-3 fs-9"
              rows={6}
              placeholder="Share your experience with this product..."
              value={talkText}
              onChange={(e) => setTalkText(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" onClick={onClose} className="rounded-btn bg-bg7 text-dark fw-semibold">
              Cancel
            </button>
            <button type="submit" className="rounded-btn bg-primary-800 text-white fw-semibold" disabled={!isFormValid() || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Comment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TalkModal;