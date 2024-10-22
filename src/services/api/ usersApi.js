import axios from 'axios';

// URL API MockAPI kamu
const API_URL = "https://67163d3d33bc2bfe40bd0b1a.mockapi.io/users";

// Fungsi untuk mendapatkan semua pengguna
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data; // Mengembalikan data pengguna
  } catch (error) {
    console.error("Gagal mengambil data pengguna:", error);
    throw error;
  }
};

// Fungsi untuk mendapatkan pengguna berdasarkan ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil data pengguna dengan ID ${id}:`, error);
    throw error;
  }
};

// Fungsi untuk menambahkan pengguna baru
export const createUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}`, userData);
    return response.data;
  } catch (error) {
    console.error("Gagal menambahkan pengguna:", error);
    throw error;
  }
};

// Fungsi untuk memperbarui data pengguna
export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Gagal memperbarui data pengguna dengan ID ${id}:`, error);
    throw error;
  }
};

// Fungsi untuk menghapus pengguna berdasarkan ID
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Gagal menghapus pengguna dengan ID ${id}:`, error);
    throw error;
  }
};
