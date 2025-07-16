const db = require('../config/db');

module.exports = {
  getAll: (cb) => {
    db.query(`
      SELECT books.*, branches.nama_cabang 
      FROM books
      JOIN branches ON books.lokasi_cabang_id = branches.id`, cb);
  },
  getById: (id, cb) => {
    db.query('SELECT * FROM books WHERE id = ?', [id], cb);
  },
  getTotalBooks: (cb) => {
    db.query('SELECT COUNT(*) AS total FROM books', cb);
  },
  create: (data, cb) => {
    const { judul, pengarang, penerbit, tahun_terbit, jumlah, lokasi_cabang_id } = data;
    db.query(
      'INSERT INTO books (judul, pengarang, penerbit, tahun_terbit, jumlah, lokasi_cabang_id) VALUES (?, ?, ?, ?, ?, ?)',
      [judul, pengarang, penerbit, tahun_terbit, jumlah, lokasi_cabang_id], cb);
  },
  update: (id, data, cb) => {
    db.query('UPDATE books SET ? WHERE id = ?', [data, id], cb);
  },
  delete: (id, cb) => {
    db.query('DELETE FROM books WHERE id = ?', [id], cb);
  }
};