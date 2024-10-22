import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Duty After School</h1>
        <p>
          Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan,
          Departemen Pertahanan mulai merekrut lebih banyak tentara, termasuk
          siswa sekolah menengah. Mereka pun segera menjadi pejuang garis depan
          dalam perang.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-start">Mulai</button>
          <button className="btn btn-info">Selengkapnya</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;