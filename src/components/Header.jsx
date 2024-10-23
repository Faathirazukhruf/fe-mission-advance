import React from 'react';
import { Link } from 'react-router-dom'; // Import Link dari react-router-dom
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src="Logo.png" alt="Logo" className="logo" />
        <Link to="/account"><img src="Ellipse 395.png" alt="icon" className="icon" /></Link> {/* Pastikan path ini benar */}
        <nav>
          <ul>
            <li><Link to="#">Series</Link></li>
            <li><Link to="#">Film</Link></li>
            <li><Link to="#">Daftar Saya</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;