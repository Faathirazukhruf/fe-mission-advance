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
          setNewUsername(user.username); // Set username untuk edit
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

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Toggle mode edit
  };

  const handleUpdateAccount = async () => {
    const user = account; // Gunakan data pengguna yang sudah ditemukan

    if (newUsername.trim() === '') {
      setError('Username tidak boleh kosong.');
      return;
    }

    try {
      const response = await axios.put(`${API_URL}/users/${user.id}`, {
        username: newUsername,
        password: newPassword, // Hanya kirim password jika diubah
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}` // Kirim token dalam header
        }
      });

      setAccount(response.data); // Update state dengan data yang baru
      setIsEditing(false); // Keluar dari mode edit
      alert('Informasi akun berhasil diperbarui.');
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
            <img src="Ellipse 395.png" alt="icon" className="profile-picture" /> 
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
                <button onClick={handleUpdateAccount} className="update-button">Simpan Perubahan</button>
                <button onClick={handleEditToggle} className="cancel-button">Batal</button>
              </div>
            ) : (
              <div>
                <h3 className="account-name">{account.username}</h3>
                <p className="account-email">{account.email}</p>
                <button onClick={handleEditToggle} className="edit-button">Edit Akun</button>
                <button onClick={handleLogout} className="logout-button">Logout</button>
                <button onClick={handleDeleteAccount} className="delete-button">Hapus Akun</button>
                <button onClick={handleBackToHome} className="back-button">Kembali ke Beranda</button> 
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