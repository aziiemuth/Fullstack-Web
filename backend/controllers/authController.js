const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

exports.login = (req, res) => {
  const { username, password } = req.body;

  userModel.findByUsername(username, (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json(err);
      if (!match) return res.status(401).json({ message: 'Password salah' });

      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
        id_anggota: user.id_anggota
      };

      res.json({ message: 'Login berhasil', user: req.session.user });
    });
  });
};

exports.register = (req, res) => {
  const { username, password, role, nama, email, kelamin, no_hp, alamat } = req.body;

  bcrypt.hash(password, 10, (err, hashed) => {
    if (err) return res.status(500).json(err);

    const userData = { username, password: hashed, role }
    const memberData = { nama, email, kelamin, no_hp, alamat }

    userModel.createUserAndMember(userData, memberData, (err, result) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Registrasi berhasil', id: result.insertId });
    });
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Gagal logout' });
    res.clearCookie('connect.sid');
    res.json({ message: 'Logout berhasil' });
  });
};

exports.getCurrentUser = (req, res) => {
  const sessionUser = req.session.user;
  if (!sessionUser) return res.status(401).json({ message: 'Unauthorized' });

  userModel.getUserProfile(sessionUser.id_anggota, (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal mengambil data profil' });
    if (result.length === 0) return res.status(404).json({ message: 'User tidak ditemukan' });

    const profile = {
      ...result[0],
      id: sessionUser.id,
      username: sessionUser.username,
      role: sessionUser.role
    };

    res.json(profile);
  });
};

exports.updateProfile = async (req, res) => {
  const sessionUser = req.session.user;
  if (!sessionUser) return res.status(401).json({ message: 'Unauthorized' });

  try {
    let data = req.body;

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    userModel.updateUserWithMember(sessionUser.id, sessionUser.id_anggota, data, (err) => {
      if (err) return res.status(500).json({ message: 'Gagal update profil', error: err });
      res.json({ message: 'Profil berhasil diperbarui' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

exports.Authenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

exports.Admin = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
};