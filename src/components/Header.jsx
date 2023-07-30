// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <header>
      <div className="nav-container">
        <Link to="/">
          <img src="skjenegolf-logo.png" alt="logo" />
        </Link>

        <div className={`m-pages ${showMenu ? 'show-menu' : ''}`}>
          <Link to="/">
            <button>Home</button>
          </Link>
          <Link to="/add">
            <button>Add</button>
          </Link>
        </div>

        <div className="burger-menu" onClick={toggleMenu}>
          <div className={`bar ${showMenu ? 'bar-open' : ''}`}></div>
          <div className={`bar ${showMenu ? 'bar-open' : ''}`}></div>
          <div className={`bar ${showMenu ? 'bar-open' : ''}`}></div>
          <div className={`menu-items ${showMenu ? 'show' : ''}`}>
            <Link to="/" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/add" onClick={toggleMenu}>
              Add
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
