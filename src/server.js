// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { sendEmail } = require('./config/mailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Konfigurasi Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ganti dengan layanan email lain jika perlu
    auth: {
        user: 'your-email@gmail.com', // Ganti dengan email Anda
        pass: 'your-email-password', // Ganti dengan password email Anda
    },
});

// Fungsi untuk mengirim email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: to,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
};

// Endpoint untuk registrasi
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    // Logika untuk menyimpan pengguna di database (jika ada)
    // Contoh: Simpan email dan password di database Anda

    try {
        // Kirim email konfirmasi
        await sendEmail(email, 'Pendaftaran Berhasil', 'Anda telah berhasil mendaftar!');
        res.status(200).send('Pendaftaran berhasil dan email konfirmasi telah dikirim.');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error during registration: ' + error.message);
    }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});