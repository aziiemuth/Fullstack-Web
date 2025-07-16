const adminModel = require('../models/adminModel')

exports.getAdminProfile = (req, res) => {
  const adminId = req.session.user.id

  console.log('Session User:', req.session.user)
  adminModel.getAdminProfile(adminId, (err, results) => {
    if (err) {
      console.error('Error getAdminProfile:', err)
      return res.status(500).json({ message: 'Gagal memuat profil admin.' })
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Profil admin tidak ditemukan.' })
    }

    res.json(results[0])
  })
};

exports.updateAdminProfile = (req, res) => {
  const id_user = req.session.user.id

  const id_anggota = req.session.user.id_anggota
  const data = req.body

  if (!id_anggota) {
    return res.status(400).json({ message: 'ID anggota tidak ditemukan pada akun admin.' })
  }

  adminModel.updateAdminProfile(id_user, id_anggota, data, (err) => {
    if (err) {
      console.error('Error updateAdminProfile:', err)
      return res.status(500).json({ message: 'Gagal memperbarui profil admin.' })
    }

    res.json({ message: 'Profil admin berhasil diperbarui.' })
  })
};