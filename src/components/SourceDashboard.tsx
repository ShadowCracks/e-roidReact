
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'; // Your custom styles
import React from 'react';

const SourceDashboard: React.FC = () => {
  const products = Array(10).fill({
    imgSrc: 'images/osgear.png',
    rating: 1,
    site: 'steroidify.com',
    score: 95.82,
  });

  const comments = Array(4).fill({
    text: 'Forum topic >> "Blackout"',
    tag: '25.50',
  });

  return (
    <main className="main-container">
      <div id="header-container"></div>
      <div className="home-container">
        <section className="tab-options flex-wrap">
          <span className="tab-options_item active">
            <a href="#">All</a>
          </span>
          <span className="tab-options_item">
            <a href="#">Intl.</a>
          </span>
          <span className="tab-options_item">
            <a href="#">US</a>
          </span>
          <span className="tab-options_item">
            <a href="#">UK</a>
          </span>
          <span className="tab-options_item">
            <a href="#">EU</a>
          </span>
          <span className="tab-options_item">
            <a href="#">CA</a>
          </span>
          <span className="tab-options_item">
            <a href="#">AU</a>
          </span>
        </section>
        <section className="products-container">
          {products.map((product, idx) => (
            <div key={idx} className="product-item">
              <img src={product.imgSrc} alt="" />
              <span className="product-item_rating">{product.rating}</span>
              <a href="#" className="product-item_site">{product.site}</a>
              <span className="product-item_score">
                <span>Score</span>
                <span className="product-item_score_tag">{product.score}</span>
              </span>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default SourceDashboard;
