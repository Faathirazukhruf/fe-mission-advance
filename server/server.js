const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');

dotenv.config(); // Membaca file .env

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(express.static('uploads')); // Folder untuk menyimpan file upload

// Koneksi ke database MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Cek koneksi ke database
connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// ** CRUD User Endpoint **

// Menambahkan user baru
app.post('/api/users', (req, res) => {
  const { username, password, email, profile_image_url } = req.body;

  const query = 'INSERT INTO users (username, password, email, profile_image_url) VALUES (?, ?, ?, ?)';
  connection.query(query, [username, password, email, profile_image_url], (err, result) => {
    if (err) {
      console.error('Error inserting data: ', err);
      return res.status(500).json({ message: 'Database insertion failed' });
    }
    return res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  });
});

// Mengambil semua user
app.get('/api/users', (req, res) => {
  const query = 'SELECT * FROM users';
  connection.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      return res.status(500).json({ message: 'Error fetching users' });
    }
    return res.json(result);
  });
});

// ** Kirim Email Endpoint **

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

app.post('/api/send-email', (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    return res.status(200).json({ message: 'Email sent successfully', info });
  });
});

// ** Upload Image Endpoint **

// Setup multer untuk upload gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Endpoint untuk upload gambar
app.post('/api/upload-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  return res.status(200).json({ message: 'Image uploaded successfully', file: req.file });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






