const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const app = express();

dotenv.config();
require('./config/db');

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));app.use(express.json());
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 hari
  }
}));

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const cabangRoutes = require('./routes/cabangRoutes');
const peminjamanRoutes = require('./routes/peminjamanRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes)
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/cabang', cabangRoutes);
app.use('/api/peminjaman', peminjamanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});