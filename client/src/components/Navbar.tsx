import React, { useState } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface NavbarProps {
  text?: string;
  secondaryText?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  // Single toggle function instead of separate open/close
  const toggleMobileNav = () => {
    console.log('Toggle clicked, current state:', isMobileNavOpen); // For debugging
    setMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="header-container">
      <header className="bg-bg1 text-white">
        <div className="main-wrapper header-wrapper mx-auto d-flex align-items-center justify-content-between">
          <div className="navbar flex align-items-center gap-4">
            <nav className="d-flex align-items-center gap-5">
              <a href="#" className="text-white fw-medium">Sources</a>
              <a href="#" className="text-white fw-medium">Steroids</a>
              <a href="#" className="text-white fw-medium">Community</a>
            </nav>
            <form>
              <label className="header-search p-2 px-3 d-flex align-items-center" htmlFor="search">
                <img src="/images/icon-search.svg" alt="Search Icon" />
                <input className="mx-2" type="text" placeholder="Search" id="search" />
              </label>
            </form>
          </div>
          <div className="flex gap-3 nav-btns">
            <a style={{ borderRadius: '5px', border: '1px solid var(--primary-800)', padding: '6px 8px' }} href="#">
              <img src="/images/icon-FavoriteFilled.svg" alt="Favorite Icon" />
            </a>
            <a style={{ backgroundColor: 'var(--primary-800)', width: '102px' }} href="#" className="fw-semibold fs-7 navbar-btn">
              Sign up
            </a>
            <a href="#" className="bg-white fw-semibold fs-7 navbar-btn">Login</a>
          </div>
          {/* Changed to use toggleMobileNav */}
          <button 
            className="hamburger" 
            onClick={toggleMobileNav} 
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <img src="/images/icon-hamburger.svg" alt="Hamburger Icon" />
          </button>
        </div>

        {/* Mobile Header - Using && for conditional rendering */}
        {isMobileNavOpen && (
          <div className="mobile-header bg-bg1">
            <div className="header-wrapper mx-auto">
              <div className="close-nav d-flex align-items-center justify-content-end h-100">
                {/* Changed to use toggleMobileNav */}
                <button 
                  onClick={toggleMobileNav} 
                  style={{ background: 'none', border: 'none', padding: 0 }}
                >
                  <img src="/images/icon-close.svg" alt="Close Icon" />
                </button>
              </div>
              <div className="flex flex-column align-items-center gap-5 mt-5">
                <nav className="d-flex flex-column align-items-center gap-5">
                  <a href="#" className="text-white fw-medium">Sources</a>
                  <a href="#" className="text-white fw-medium">Steroids</a>
                  <a href="#" className="text-white fw-medium">Community</a>
                </nav>
                <label className="header-search p-2 px-3 d-flex align-items-center" htmlFor="search-mobile">
                  <img src="/images/icon-search.svg" alt="Search Icon" />
                  <input className="mx-2" type="text" placeholder="Search" id="search-mobile" />
                </label>
              </div>
              <div className="flex justify-content-center gap-3 mt-5">
                <a style={{ borderRadius: '5px', border: '1px solid var(--primary-800)', padding: '6px 8px' }} href="#">
                  <img src="/images/icon-FavoriteFilled.svg" alt="Favorite Icon" />
                </a>
                <a style={{ backgroundColor: 'var(--primary-800)', width: '102px' }} href="#" className="fw-semibold fs-7 navbar-btn">
                  Sign up
                </a>
                <a href="#" className="bg-white fw-semibold fs-7 navbar-btn">Login</a>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;