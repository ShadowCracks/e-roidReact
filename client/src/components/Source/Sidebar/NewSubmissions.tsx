import '../../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const NewSubmissions = () => {
  return (
    <div className="aside-card bg-bg6 rounded-lg">
      <h4>NEW SUBMISSIONS</h4>
      <div className="d-flex flex-column gap-1">
        {[
          { name: 'Noreplay', link: 'almightypeptides.com' },
          { name: 'PRO SUPPS', link: 'pro-supps.com' },
          { name: 'PRO', link: 'balkanpharm.com' },
          { name: 'PROdex', link: 'britishroids.com' },
          { name: 'PROXIS', link: 'roid-stop.is' },
          { name: 'PRO', link: 'balkanpharm.com' },
        ].map((submission, index) => (
          <a href="#" key={index} className="aside-card_subcard bg-bg7 rounded-lg">
            <p className="fs-9-5 fw-medium m-0">
              <span className="fw-bold">{submission.name}</span>
              <span>{'>'}</span>
              <span>{submission.link}</span>
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewSubmissions;
