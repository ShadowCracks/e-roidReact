import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const TabContents = () => {
  return (
    <section className="main-tab-contents" id="overview">
      <div className="tab-content" id="overview">
        <div className="bg-bg11">
          <div className="tab-list overview-tablist mx-4 d-flex align-items-center gap-4">
            <a href="#" className="tab-trigger active fs-7 py-2">Activity</a>
            <a href="#" className="tab-trigger fs-7 py-2">Comments</a>
            <a href="#" className="tab-trigger fs-7 py-2">Pictures</a>
            <a href="#" className="tab-trigger fs-7 py-2">Bookmarks</a>
          </div>
        </div>
        <div className="overview-tabcontents mt-4">
          <section id="activity">
            <div className="list-body talks-list d-flex flex-column gap-1 mt-2">
              {[...Array(7)].map((_, index) => (
                <a
                  key={index}
                  href="#"
                  className="list-item steroid-talk-item bg-bg3 rounded-xl d-flex justify-content-between px-2"
                >
                  <div className="list-item_content">
                    <div className="d-flex align-items-center justify-content-start gap-2">
                      <img
                        className="steroid-talk-item-img"
                        src="images/steroids-talk-img.png"
                        alt="Steroid Talk"
                      />
                      <div className="steroid-talk_content_text flex align-items-center flex-wrap">
                        <p className="fw-bold text-uppercase m-0">Testoprop 100</p>
                        <span className="m-0 fs-9">(Test Propionate by Pharmaqo)</span>
                      </div>
                    </div>
                  </div>
                  <div className="list-item_points d-flex flex-wrap">
                    <div className="review-stars">
                      {[...Array(5)].map((_, starIndex) => (
                        <img
                          key={starIndex}
                          src={`images/icon-review-star${starIndex > 0 ? '' : '-empty'}.svg`}
                          alt="Star"
                        />
                      ))}
                    </div>
                    <span className="bg-bg4 rounded-xl p-1 px-2 fs-9-5 fw-semibold">71.152</span>
                    <span className="bg-primary-800 rounded-xl p-1 px-2 fs-9-5 fw-semibold">5</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default TabContents;
