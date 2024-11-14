// mailer.js
const nodemailer = require('nodemailer');

// Konfigurasi transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // Anda bisa menggunakan layanan email lain seperti SendGrid, Mailgun, dll.
    auth: {
        user: 'your-email@gmail.com', // Ganti dengan email Anda
        pass: 'your-email-password', // Ganti dengan password email Anda
    },
});

// Fungsi untuk mengirim email
const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: 'your-email@gmail.com', // Ganti dengan email Anda
        to: to,
        subject: subject,
        text: text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };