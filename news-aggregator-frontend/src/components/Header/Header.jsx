import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserContext } from '../../context';

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
    <div className={`navigation-pages ${menuOpen ? 'expanded' : ''}`}>
      <ul className={`${menuOpen ? 'expanded' : ''}`}>
        <li>
          <Link to="/user-profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

/**
 * The user info component that displays the user information.
 * For Simplicity i made the image to be static and therefore
 * registered users cannot change images as this feature is 
 * not supported in this version
 */
const UserInfo = () => (
  <UserContext.Consumer>
    {({ user }) => (
      <div className="user-info">
        <UserImage />
        <span className="user-name">{user?.name}</span>
      </div>
    )}
  </UserContext.Consumer>
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
