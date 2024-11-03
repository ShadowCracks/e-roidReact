import React, { useEffect, useState } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import supabase from '../../utils/supabase'; // Adjust the import path as necessary

interface NavbarProps {
  text?: string;
  secondaryText?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Single toggle function instead of separate open/close
  const toggleMobileNav = () => {
    console.log('Toggle clicked, current state:', isMobileNavOpen); // For debugging
    setMobileNavOpen(!isMobileNavOpen);
  };

  // Check user authentication status
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        setIsLoggedIn(true);

        // Fetch the username if the user is logged in
        const { data: userData, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', data.session.user?.id)
          .single();

        if (error) {
          console.error('Error fetching username:', error);
        } else {
          setUsername(userData?.username ?? null);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  // Log out function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    setUsername(null);
    window.location.href = '/'; // Redirect to homepage after logout
  };

  return (
    <div className="header-container">
      <header className="bg-bg1 text-white">
        <div className="main-wrapper header-wrapper mx-auto d-flex align-items-center justify-content-between">
          <div className="navbar flex align-items-center gap-4">
            <nav className="d-flex align-items-center gap-5">
              <a href="/source" className="text-white fw-medium">Sources</a>
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
            <a style={{ borderRadius: '5px', border: '1px solid var(--primary-800)', padding: '6px 8px' }} href="/">
              <img src="/images/icon-FavoriteFilled(1).png" alt="Favorite Icon" />
            </a>
            {!isLoggedIn ? (
              <>
                <a style={{ backgroundColor: 'var(--primary-800)', width: '102px' }} href="/signup" className="fw-semibold fs-7 navbar-btn">
                  Sign up
                </a>
                <a href="/login" className="bg-white fw-semibold fs-7 navbar-btn">Login</a>
              </>
            ) : (
              <>
                {username && (
                  <a href={`/profile/${username}`} className="bg-white fw-semibold fs-7 navbar-btn">
                    Profile
                  </a>
                )}
                <button 
                  onClick={handleLogout} 
                  className="fw-semibold fs-7"  // Remove `navbar-btn` class to avoid potential conflicts
                  style={{
                    color: 'red',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
          <button 
            className="hamburger" 
            onClick={toggleMobileNav} 
            style={{ background: 'none', border: 'none', padding: 0 }}
          >
            <img src="/images/icon-hamburger.svg" alt="Hamburger Icon" />
          </button>
        </div>

        {isMobileNavOpen && (
          <div className="mobile-header bg-bg1">
            <div className="header-wrapper mx-auto">
              <div className="close-nav d-flex align-items-center justify-content-end h-100">
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
                {!isLoggedIn ? (
                  <>
                    <a style={{ backgroundColor: 'var(--primary-800)', width: '102px' }} href="signup" className="fw-semibold fs-7 navbar-btn">
                      Sign up
                    </a>
                    <a href="login" className="bg-white fw-semibold fs-7 navbar-btn">Login</a>
                  </>
                ) : (
                  <>
                    {username && (
                      <a href={`/profile/${username}`} className="bg-white fw-semibold fs-7 navbar-btn">
                        Profile
                      </a>
                    )}
                  <button 
                    onClick={handleLogout} 
                    className="bg-red fw-semibold fs-7 navbar-btn"
                    style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer' }}
                  >
                    Logout
                  </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
