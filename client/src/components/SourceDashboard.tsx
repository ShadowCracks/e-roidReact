import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import React, { useEffect, useState } from 'react';
import  supabase  from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';

interface Product {
  imgSrc: string;
  rating: number;
  site: string;
  score: number;
  countries: string[];
}

interface SourceReview {
  source_id: string;
  source_name: string;
  average_rating: number;
  review_count: number;
  country: {
    countries: string[];
  };
  overall: number;
  quality: number;
  delivery: number;
  service: number;
  pricing: number;
}

const SourceDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('sourcereview')
      .select(`
        source_id,
        source_name,
        overall,
        review_count,
        country,
        quality,
        delivery,
        service,
        pricing
      `)
      .order('overall', { ascending: false });
    
    if (error) {
      console.error('Error:', error);
      return;
    }

    const processedData: Product[] = (data as SourceReview[]).map((item, index) => ({
      imgSrc: '/images/osgear.png',
      rating: index + 1,
      site: item.source_name,
      score: item.overall || 0,
      countries: item.country?.countries || []
    }));

    setProducts(processedData);
  };

  const getFilteredProducts = () => {
    if (activeFilter === 'All') return products;
    return products.filter(product => 
      product.countries?.includes(activeFilter)
    );
  };

  const handleProductClick = (sourceName: string) => {
    // Navigate to the source detail page
    navigate(`/source/${encodeURIComponent(sourceName)}`);
  };

  return (
    <main className="main-container">
      <div id="header-container"></div>
      <div className="home-container">
        <section className="tab-options flex-wrap">
          <span 
            className={`tab-options_item ${activeFilter === 'All' ? 'active' : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>All</a>
          </span>
          <span 
            className={`tab-options_item ${activeFilter === 'INTL' ? 'active' : ''}`}
            onClick={() => setActiveFilter('INTL')}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>Intl.</a>
          </span>
          <span 
            className={`tab-options_item ${activeFilter === 'USA' ? 'active' : ''}`}
            onClick={() => setActiveFilter('USA')}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>US</a>
          </span>
          <span 
            className={`tab-options_item ${activeFilter === 'UK' ? 'active' : ''}`}
            onClick={() => setActiveFilter('UK')}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>UK</a>
          </span>
          <span 
            className={`tab-options_item ${activeFilter === 'EU' ? 'active' : ''}`}
            onClick={() => setActiveFilter('EU')}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>EU</a>
          </span>
          <span 
            className={`tab-options_item ${activeFilter === 'CA' ? 'active' : ''}`}
            onClick={() => setActiveFilter('CA')}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>CA</a>
          </span>
          <span 
            className={`tab-options_item ${activeFilter === 'AU' ? 'active' : ''}`}
            onClick={() => setActiveFilter('AU')}
          >
            <a href="#" onClick={(e) => e.preventDefault()}>AU</a>
          </span>
        </section>
        <section className="products-container">
          {getFilteredProducts().map((product, idx) => (
            <div 
              key={idx} 
              className="product-item"
              onClick={() => handleProductClick(product.site)}
              style={{ cursor: 'pointer' }}
            >
              <img src={product.imgSrc} alt="" />
              <span className="product-item_rating">{product.rating}</span>
              <span className="product-item_site">{product.site}</span>
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