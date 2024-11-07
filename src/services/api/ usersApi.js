import axios from 'axios';

// Kode yang menggunakan MySQL
import { createUser, getUsers, updateUser, deleteUser } from './mysql';

export async function login(email, password) {
  // Gunakan fungsi getUsers() dari MySQL
  const users = await getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  return user;
}

export async function register(userData) {
  // Gunakan fungsi createUser() dari MySQL
  await createUser(userData);
}

export async function updateUserData(userId, userData) {
  // Gunakan fungsi updateUser() dari MySQL
  await updateUser(userId, userData);
}

export async function deleteUserAccount(userId) {
  // Gunakan fungsi deleteUser() dari MySQL
  await deleteUser(userId);
}