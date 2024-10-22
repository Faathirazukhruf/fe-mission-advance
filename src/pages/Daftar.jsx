import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Daftar.css"; 
import logo from '/src/assets/Logo.png';  
import background from '/src/assets/Daftarbro.jpeg';  

function Daftar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
  event.preventDefault();

  if (!username || !password || !confirmPassword) {
    setError("Semua field harus diisi");
    return;
  }

  if (password !== confirmPassword) {
    setError("Password dan konfirmasi password tidak cocok");
    return;
  }

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
      username: username,
      password: password,
    });

    console.log("Pendaftaran berhasil:", response.data);
    navigate("/beranda");
  } catch (error) {
    console.error("Pendaftaran gagal:", error);
    setError("Gagal mendaftarkan pengguna. Coba lagi nanti.");
  }
};

  return (
    <>
      <div className="cover" style={{ backgroundImage: `url(${background})` }}></div>
      <div className="container">
        <div className="login-box">
          <div className="logo-container">
            <img src={logo} alt="Chill" className="centered-logo" />
          </div>
          <h2>Daftar</h2>
          <p>Selamat datang</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Kata Sandi</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label>Konfirmasi Kata Sandi</label>
            </div>
            <button type="submit" className="buttonmasuk">
              <span>Daftar</span>
            </button>
            <div className="or-box">
              <div className="line"></div>
              <span>Atau</span>
              <div className="line"></div>
            </div>
            <a href="https://accounts.google.com/signin" className="google-button">
              <img
                src="https://www.google.com/images/branding/product/ico/googleg_lodp.ico"
                alt="Google G Logo"
              />
              <span>Masuk dengan Google</span>
            </a>
          </form>
          <p className="loginulang">
            Sudah punya akun? <a href="/" className="inilogin">Login</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Daftar;
