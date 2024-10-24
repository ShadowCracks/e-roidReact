import React, { useState } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar: React.FC<{ text: string; secondaryText?: string }> = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setMobileNavOpen(!isMobileNavOpen);  // Toggle instead of separate open/close
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
          {/* Changed onClick to use toggleMobileNav */}
          <span className="hamburger" role="button" tabIndex={0} onClick={toggleMobileNav}>
            <img src="/images/icon-hamburger.svg" alt="Hamburger Icon" />
          </span>
        </div>

        {/* Mobile Header */}
        {isMobileNavOpen && (
          <div className="mobile-header bg-bg1">
            <div className="header-wrapper mx-auto">
              <div className="close-nav d-flex align-items-center justify-content-end h-100">
                {/* Changed onClick to use toggleMobileNav */}
                <img role="button" tabIndex={0} src="/images/icon-close.svg" alt="Close Icon" onClick={toggleMobileNav} />
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
