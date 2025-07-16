const bookModel = require('../models/bookModel');

exports.getAllBooks = (req, res) => {
  bookModel.getAll((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getBookById = (req, res) => {
  bookModel.getById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) return res.status(404).json({ message: 'Buku tidak ditemukan' });
    res.json(result[0]);
  });
};

exports.getTotalBooks = (req, res) => {
  bookModel.getTotalBooks((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]);
  });
};

exports.createBook = (req, res) => {
  bookModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).json({ message: 'Buku ditambahkan', id: result.insertId });
  });
};

exports.updateBook = (req, res) => {
  const id = req.params.id
  const {
    judul,
    pengarang,
    penerbit,
    tahun_terbit,
    jumlah,
    lokasi_cabang_id
  } = req.body

  const data = { judul, pengarang, penerbit, tahun_terbit, jumlah, lokasi_cabang_id }

  bookModel.update(id, data, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal update buku', error: err })
    res.json({ message: 'Buku diperbarui' })
  })
};

exports.deleteBook = (req, res) => {
  bookModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Buku dihapus' });
  });
};