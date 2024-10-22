import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import './Beranda.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Hero />
       <div className="movie-list">
        <h2>Melanjutkan Tonton Film</h2>
        <div className="movie-list-grid">
          <div className="movie-card">
            <img src="Frame 66@2x.png" alt="Don't Look Up" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>Don't Look Up</h3>
              <button className="watch-button">Lanjutkan</button>
            </div>
          </div>

          <div className="movie-card">
            <img src="Frame 79.png" alt="All of us are dead" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>All of us are dead</h3>
              <button className="watch-button">Lanjutkan</button>
            </div>
          </div>

          <div className="movie-card">
            <img src="2000e Épingle 🥳🥳.jpeg" alt="Blue Lock" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>Blue Lock</h3>
              <button className="watch-button">Lanjutkan</button>
            </div>
          </div>

          <div className="movie-card">
            <img src="Frame 68@2x.png" alt="A Man Called Otto" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>A Man Called Otto</h3>
              <button className="watch-button">Lanjutkan</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="movie-list">
        <h2>Film trending</h2>
        <div className="movie-list-grid">
          <div className="movie-card">
            <img src="Frame 74.png" alt="The tomorrow war" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>The tomorrow war</h3>
              <button className="watch-button">Mulai</button>
            </div>
          </div>

          <div className="movie-card">
            <img src="Frame 75.png" alt="Quantumania" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>Quantumania</h3>
              <button className="watch-button">Mulai</button>
            </div>
          </div>

          <div className="movie-card">
            <img src="Frame 76 (1).png" alt="Guardians of the Galaxy" className="movie-card-image" />
            <div className="movie-card-info2">               
              <h3>Guardians of the Galaxy</h3>
              <button className="watch-button">Mulai</button>
            </div>
          </div>

          <div className="movie-card">
            <img src="Suzume (2022).jpeg" alt="Suzume" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>Suzume</h3>
              <button className="watch-button">Mulai</button>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-list">
        <h2>Rilis baru</h2>
        <div className="movie-list-grid">
          <div className="movie-card">
            <img src="Rectangle 9.png" alt="Duty After School" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>Duty After School</h3>
              <button className="watch-button">Mulai</button>
            </div>
          </div>

          <div className="movie-card">
            <img src="Frame 79.png" alt="All of us are dead" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>All of us are dead</h3>
              <button className="watch-button">Mulai</button>
            </div>
          </div>

          <div className="movie-card">
            <img src="Frame 77.png" alt="Big Hero 6" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>Big Hero 6</h3>
              <button className="watch-button">Mulai</button>
            </div>
          </div>

          <div className="movie-card">
            <img src="Frame 76.png" alt="Sonic" className="movie-card-image" />
            <div className="movie-card-info">
              <h3>Sonic</h3>
              <button className="watch-button">Mulai</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default App;