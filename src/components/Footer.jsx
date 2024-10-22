import React from 'react';
import './Footer.css';

const Footer = () => {
  const genres = [
    'Aksi', 'Drama', 'Komedi', 'Sains & Alam', 'Animasi', 'Fantasi Ilmiah & Fantasi',
    'Petualangan', 'Thriller', 'Anak-anak', 'Kejahatan', 'Perang', 'Britama',
    'KDrama', 'Romants', 'Bantuan', 'FAQ', 'Kontak Kami', 'Poivasi', 'Syarat & Ketentuan'
  ];

  return (
    <footer>
      <img src="Logo.png" alt="Logo" />
      <div className="container">
        <div className="genre-list">
          {genres.map((genre, index) => (
            <div key={index} className="genre-item">{genre}</div>
          ))}
          </div>
      </div>
      <p>&copy; 2024 Chill All Rights Reserved. Created by Faathirazukhruf.</p>
    </footer>
  );
};

export default Footer;