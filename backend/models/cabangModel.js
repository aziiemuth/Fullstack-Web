const db = require('../config/db');

module.exports = {
  getAll: (cb) => db.query('SELECT * FROM branches', cb),
  getById: (id, cb) => db.query('SELECT * FROM branches WHERE id = ?', [id], cb),
  getTotalBranches: (cb) => db.query('SELECT COUNT(*) AS total FROM branches', cb),
  create: (data, cb) => {
    const { nama_cabang, alamat, penanggung_jawab } = data;
    db.query(
      'INSERT INTO branches (nama_cabang, alamat, penanggung_jawab) VALUES (?, ?, ?)',
      [nama_cabang, alamat, penanggung_jawab], cb);
  },
  update: (id, data, cb) => db.query('UPDATE branches SET ? WHERE id = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM branches WHERE id = ?', [id], cb)
};