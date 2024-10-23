import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './Account.css'; 

function Account() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const username = sessionStorage.getItem('username'); // Ambil username dari sessionStorage
    const token = sessionStorage.getItem('token'); // Ambil token dari sessionStorage

    if (!username || !token) {
      navigate('/'); // Arahkan ke halaman login jika username atau token tidak ada
    } else {
      // Ambil detail akun menggunakan username
      axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}` // Kirim token dalam header
        }
      })
      .then(response => {
        const users = response.data;
        const user = users.find(u => u.username === username);

        if (user) {
          setAccount(user); // Simpan data akun ke state
        } else {
          setError('Pengguna tidak ditemukan.');
        }
      })
      .catch(error => {
        console.error('Gagal memuat detail akun:', error);
        setError('Gagal memuat detail akun. Coba lagi nanti.');
      });
    }
  }, [API_URL, navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('username'); // Hapus username dari sessionStorage
    sessionStorage.removeItem('token'); // Hapus token dari sessionStorage
    navigate('/'); // Arahkan ke halaman login setelah logout
  };

  const handleDeleteAccount = async () => {
    const user = account; // Gunakan data pengguna yang sudah ditemukan

    if (window.confirm('Apakah Anda yakin ingin menghapus akun ini?')) {
      try {
        await axios.delete(`${API_URL}/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}` // Kirim token dalam header
          }
        });
        alert('Akun berhasil dihapus.');
        handleLogout(); // Logout setelah menghapus akun
      } catch (error) {
        console.error('Gagal menghapus akun:', error);
        setError('Gagal menghapus akun. Coba lagi nanti.');
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/beranda'); // Arahkan kembali ke halaman beranda
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h2 className="account-title">Detail Akun</h2>
        {error && <p className="error-message">{error}</p>}
        {account ? (
          <div className="account-details">
            <img src="Ellipse 395.png" alt="icon" className="profile-picture" /> 
            <h3 className="account-name">{account.username}</h3>
            <p className="account-email">{account.email}</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <button onClick={handleDeleteAccount} className="delete-button">Hapus Akun</button>
            <button onClick={handleBackToHome} className="back-button">Kembali ke Beranda</button> 
          </div>
        ) : (
          <p>Memuat detail akun...</p>
        )}
      </div>
    </div>
  );
}

export default Account;