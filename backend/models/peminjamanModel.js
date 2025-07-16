const db = require('../config/db');

module.exports = {
  getAll: (cb) => db.query('SELECT * FROM loans', cb),
  getById: (id, cb) => db.query('SELECT * FROM loans WHERE id = ?', [id], cb),
  getTotalLoans: (cb) => db.query('SELECT COUNT(*) AS total FROM loans', cb),
  getByMemberIdWithBook: (memberId, cb) => {
    const query = `
      SELECT loans.id, members.nama, books.judul, tanggal_pinjam, tanggal_kembali
      FROM loans
      JOIN members ON loans.member_id = members.id
      JOIN books ON loans.book_id = books.id
      WHERE loans.member_id = ?`;
    db.query(query, [memberId], cb);
  },
  getAllForAdmin: (cb) => {
    const query = `
      SELECT loans.id, members.nama AS nama_anggota, books.judul AS judul_buku,
            loans.tanggal_pinjam, loans.tanggal_kembali
      FROM loans
      JOIN members ON loans.member_id = members.id
      JOIN books ON loans.book_id = books.id`;
    db.query(query, cb);
  },
  create: (data, cb) => {
    const { member_id, book_id, tanggal_pinjam, tanggal_kembali } = data;
    db.query(
      'INSERT INTO loans (member_id, book_id, tanggal_pinjam, tanggal_kembali) VALUES (?, ?, ?, ?)',
      [member_id, book_id, tanggal_pinjam, tanggal_kembali],
      cb
    );
  },
  update: (id, data, cb) => db.query('UPDATE loans SET ? WHERE id = ?', [data, id], cb),
  delete: (id, cb) => db.query('DELETE FROM loans WHERE id = ?', [id], cb)
};