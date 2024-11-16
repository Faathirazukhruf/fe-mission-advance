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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const base64Image = await convertToBase64(file);
        setProfileImage(base64Image);
      } catch (error) {
        console.error('Error converting image:', error);
        setError('Gagal mengupload gambar');
      }
    }
  };

  const handleUpdateAccount = async () => {
    const user = account;

    if (newUsername.trim() === '') {
      setError('Username tidak boleh kosong.');
      return;
    }

    try {
      // Persiapkan data yang akan diupdate
      const updateData = {
        username: newUsername,
        profile_image_url: profileImage || account.profile_image_url
      };

      // Tambahkan password ke updateData jika ada perubahan password
      if (newPassword) {
        updateData.password = newPassword;
      }

      const response = await axios.put(`${API_URL}/users/${user.id}`, updateData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      // Update state account dengan data terbaru
      setAccount(response.data);
      setIsEditing(false);
      // Reset state profileImage
      setProfileImage(null);
      alert('Informasi akun berhasil diperbarui.');

      // Update username di session storage jika berubah
      if (newUsername !== sessionStorage.getItem('username')) {
        sessionStorage.setItem('username', newUsername);
      }
    } catch (error) {
      console.error('Gagal memperbarui akun:', error);
      setError('Gagal memperbarui akun. Coba lagi nanti.');
    }
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <h2 className="account-title">Detail Akun</h2>
        {error && <p className="error-message">{error}</p>}
        {account ? (
          <div className="account-details">
            <img
              src={profileImage || account.profile_image_url || "Ellipse 395.png"}
              alt="Photo profile akun"
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
                <h2 className="image-input">Update Photo Profile:</h2>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  accept="image/*"
                  placeholder='Upload Photo Profile akun'
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