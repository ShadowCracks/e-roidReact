import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import supabase from '../../../utils/supabase';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TalkModal from './TalkModal';
import RecentReviews from './Sidebar/RecentReview';
import NewSubmissions from './Sidebar/NewSubmissions';
import Talkcom from './Comments/Talkcom';

interface SourceTalk {
  source_id: string;
  source_name: string;
}

const SourceTalkInside: React.FC = () => {
  const [isTalkModalOpen, setIsTalkModalOpen] = useState(false);
  const [sourcetalk, setSource] = useState<SourceTalk | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { source_name } = useParams<{ source_name: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchSource = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!source_name) {
          throw new Error('Source name is required');
        }

        const decodedSourceName = decodeURIComponent(source_name.replace(/-/g, ' '));

        const { data, error: supabaseError } = await supabase
          .from('sourcetalk')
          .select('source_id, source_name')
          .ilike('source_name', decodedSourceName)
          .single();

        if (supabaseError) {
          console.error('Supabase error:', supabaseError);
          if (supabaseError.code === 'PGRST116') {
            throw new Error(`No source found with name: ${decodedSourceName}`);
          }
          throw supabaseError;
        }

        if (!data) {
          throw new Error('No data returned from the database');
        }

        setSource(data);
      } catch (err) {
        console.error('Error fetching source:', err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSource();
  }, [source_name]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap flex-lg-nowrap gap-3">
      <div id="header-container"></div>
      <div>
        <Link to="/" className="fs-7 fw-semibold underline">Home</Link>
        <span>  </span>
        <Link to="/sourcetalk" className="fs-7 fw-bolder text-primary-800">Steroid Source talks</Link>
      </div>
      <div className="main-wrapper mx-auto mt-4">
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
            <button 
              className="btn btn-link"
              onClick={() => navigate('/sourcetalk')}
            >
              Return to Source Talk List
            </button>
          </div>
        ) : (
          <div className="main-section mt-3 d-flex justify-content-between">
            <div className="source-talk-inside w-100 flex flex-column gap-4">
              <section className="item-detail flex gap-3 bg-bg3 rounded-xl p-3">
                <div className="item-detail_content-wrapper flex gap-3">
                  <div className="item-detail_content">
                    <h4 className="fs-5 fw-bold">{sourcetalk?.source_name}</h4>
                    <div className="item-detail_content-text">
                      <h5>Important Information</h5>
                      <p>
                        <span className="fw-bold">Estimated T/A: </span>7 to 10 day
                      </p>
                      <p>
                        <span className="fw-bold">Minimum Order: </span>Western Union
                        and Moneygram $200. Bitcoin $100
                      </p>
                      <p>
                        <span className="fw-bold">Payment Methods: </span>DON'T GO TO
                        WALMART! Western Union at WALGREENS ONLY. Moneygram at CVS
                        PHARMACY ONLY. Bitcoin.
                      </p>
                      <p>
                        <span className="fw-bold">Please note </span>Website
                        https://pureanabolics.bz/ Email: sales@Pureanabolics.bz
                        USA only. No APO or FPO.
                      </p>
                      <p>WE HAVE THE LOWEST PRICES AROUND.</p>
                    </div>
                    <div className="item-detail_content-text">
                      <h5>INJECTABLES</h5>
                      <p>
                        Dbol Injectable 50mg/mlDHB 100mg/mlEQ 300mg/mlMast E
                        200mg/mlMast P 100mg/mlDeca 300mg/mlNPP 100mg/mlPrimo E
                        200mg/
                      </p>
                      <p>
                        mlSustanon 300mg/mlTest C 250mg/mlTest E 300mg/mlTest P
                        100mg/mlTNE 100mg/mlTren A 100mg/mlTren E 200mg/mlTriblend
                        1 100mg
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <Talkcom 
                setIstalkModalOpen={setIsTalkModalOpen} 
                sourceId={sourcetalk?.source_id || ''}
              />
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
        )}
      </div>
      
      <TalkModal
        isOpen={isTalkModalOpen}
        onClose={() => setIsTalkModalOpen(false)}
        source_id={sourcetalk?.source_id || ''}
      />
    </div>
  );
};

export default SourceTalkInside;