// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Mengambil token dari header

    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token tidak valid' });
        }
        req.user = user; // Menyimpan informasi user ke dalam request
        next(); // Melanjutkan ke middleware berikutnya
    });
};

module.exports = authenticateToken;