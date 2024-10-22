import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src="Logo.png" alt="Logo" className="logo" />
        <a href="/"><img src="Ellipse 395.png" alt="icon" className="icon" /></a>
        <nav>
          <ul>
            <li><a href="#">Series</a></li>
            <li><a href="#">Film</a></li>
            <li><a href="#">Daftar Saya</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;