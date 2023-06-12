import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(prevMenuOpen => !prevMenuOpen);
  };

  return (
    <header className="header">
      <Logo />
      <UserNavigation menuOpen={menuOpen} handleMenuToggle={handleMenuToggle} />
    </header>
  );
};

const Logo = () => (
  <div className="logo">
    <Link to="/">
      <img src="/path/to/logo.png" alt="Logo" />
    </Link>
  </div>
);

const UserNavigation = ({ menuOpen, handleMenuToggle }) => (
  <div className="user-navigation">
    <NavigationPages menuOpen={menuOpen} />
    <UserInfo />
    <HamburgerMenu menuOpen={menuOpen} handleMenuToggle={handleMenuToggle} />
  </div>
);

const NavigationPages = ({ menuOpen }) => {
  return (
    <nav className={`navigation-pages ${menuOpen ? 'expanded' : ''}`}>
      <ul className={`${menuOpen ? 'expanded' : ''}`}>
        <li>
          <Link to="/user-profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};



const UserInfo = () => (
  <div className="user-info">
    <UserImage />
    <span className="user-name">John Doe</span>
  </div>
);

const UserImage = () => (
  <img
    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80"
    alt="User"
    className="user-image"
  />
);

const HamburgerMenu = ({ menuOpen, handleMenuToggle }) => (
  <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={handleMenuToggle}>
    <div className="line"></div>
    <div className="line"></div>
    <div className="line"></div>
  </div>
);

export default Header;
