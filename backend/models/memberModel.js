const db = require('../config/db');

module.exports = {
  getAll: (cb) => db.query('SELECT * FROM members', cb),
  getById: (id, cb) => db.query('SELECT * FROM members WHERE id = ?', [id], cb),
  getTotalMembers: (cb) => db.query('SELECT COUNT(*) AS total FROM members', cb),
  create: (data, cb) => {
    const { nama, email, kelamin, no_hp, alamat } = data;
    db.query(
      'INSERT INTO members (nama, email, kelamin, no_hp, alamat) VALUES (?, ?, ?, ?, ?)',
      [nama, email, kelamin, no_hp, alamat], cb)
  },
  update: (id, data, cb) => db.query('UPDATE members SET ? WHERE id = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM members WHERE id = ?', [id], cb)
};