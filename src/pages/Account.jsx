import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Account.css';

function Account() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    const token = sessionStorage.getItem('token');

    if (!username || !token) {
      navigate('/');
    } else {
      axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const users = response.data;
        const user = users.find(u => u.username === username);

        if (user) {
          setAccount(user);
          setNewUsername(user.username);
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
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    const user = account;

    if (window.confirm('Apakah Anda yakin ingin menghapus akun ini?')) {
      try {
        await axios.delete(`${API_URL}/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        alert('Akun berhasil dihapus.');
        handleLogout();
      } catch (error) {
        console.error('Gagal menghapus akun:', error);
        setError('Gagal menghapus akun. Coba lagi nanti.');
      }
    }
  };

  const handleBackToHome = () => {
    navigate('/beranda');
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateAccount = async () => {
    const user = account;

    if (newUsername.trim() === '') {
      setError('Username tidak boleh kosong.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('username', newUsername);
      formData.append('password', newPassword);
      if (profileImage) {
        formData.append('profile_image', profileImage);
      }

      const response = await axios.put(`${API_URL}/users/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setAccount(response.data);
      setIsEditing(false);
      alert('Informasi akun berhasil diperbarui.');
    } catch (error) {
      console.error('Gagal memperbarui akun:', error);
      setError('Gagal memperbarui akun. Coba lagi nanti.');
    }
  };

  const handleImageUpload = (event) => {
    setProfileImage(event.target.files[0]);
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h2 className="account-title">Detail Akun</h2>
        {error && <p className="error-message">{error}</p>}
        {account ? (
          <div className="account-details">
            <img
              src={account.profile_image_url || 'Ellipse 395.png'}
              alt="icon"
              className="profile-picture"
            />
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  placeholder="Username"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Password (kosongkan jika tidak ingin mengubah)"
                />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
                <button onClick={handleUpdateAccount} className="update-button">
                  Simpan Perubahan
                </button>
                <button onClick={handleEditToggle} className="cancel-button">
                  Batal
                </button>
              </div>
            ) : (
              <div>
                <h3 className="account-name">{account.username}</h3>
                <p className="account-email">{account.email}</p>
                <button onClick={handleEditToggle} className="edit-button">
                  Edit Akun
                </button>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
                <button onClick={handleDeleteAccount} className="delete-button">
                  Hapus Akun
                </button>
                <button onClick={handleBackToHome} className="back-button">
                  Kembali ke Beranda
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>Memuat detail akun...</p>
        )}
      </div>
    </div>
  );
}

export default Account;