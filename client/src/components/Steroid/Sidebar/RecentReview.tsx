import '../../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecentReviews = () => {
  return (
    <div className="aside-card bg-bg6 rounded-lg">
      <h4>RECENT REVIEWS</h4>
      <div className="d-flex flex-column gap-1">
        {Array(4).fill(null).map((_, index) => (
          <div key={index} className="aside-card_subcard bg-bg7 rounded-lg p-2">
            <p className="fs-9 fw-medium m-0 mb-1">
              USGear is amazing, I have made 5 orders from them, their prices are great —{' '}
              <span className="fw-bold">Dav3891</span>
            </p>
            <div className="d-flex align-items-center justify-content-between">
              <span className="aside-tags text-primary-800 bg-black rounded-xl fs-10 fw-medium">
                Trenbolone-e 200
              </span>
              <div className="d-flex align-items-center justify-content-between gap-1">
                <span className="p-2 px-2 rounded-xl bg-green d-flex align-items-center">
                  <img src="/images/icon-tick.svg" alt="Tick icon" />
                </span>
                <span className="p-1 px-2 rounded-xl bg-primary-800 fs-10 fw-bold">
                  9/10
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReviews;
