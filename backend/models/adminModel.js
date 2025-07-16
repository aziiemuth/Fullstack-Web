const db = require('../config/db')
const bcrypt = require('bcrypt')

module.exports = {
  getAdminProfile: (adminId, cb) => {
  db.query(
    `SELECT users.id, users.username, members.email, members.nama, members.kelamin, members.no_hp, members.alamat
     FROM users
     LEFT JOIN members ON users.id_anggota = members.id
     WHERE users.id = ?`,
    [adminId], cb)
  },

  updateAdminProfile: (id_user, id_anggota, data, callback) => {
    const { nama, email, kelamin, no_hp, alamat, username, password } = data

    db.beginTransaction(async (err) => {
      if (err) return callback(err)

      db.query(
        'UPDATE members SET nama = ?, email = ?, kelamin = ?, no_hp = ?, alamat = ? WHERE id = ?',
        [nama, email, kelamin, no_hp, alamat, id_anggota],
        (err) => {
          if (err) return db.rollback(() => callback(err))

          if (password && password.trim() !== '') {
            bcrypt.hash(password, 10, (err, hashed) => {
              if (err) return db.rollback(() => callback(err))

              db.query(
                'UPDATE users SET username = ?, password = ? WHERE id = ?',
                [username, hashed, id_user],
                (err) => {
                  if (err) return db.rollback(() => callback(err))
                  db.commit(callback)
                }
              )
            })
          } else {
            db.query(
              'UPDATE users SET username = ? WHERE id = ?',
              [username, id_user],
              (err) => {
                if (err) return db.rollback(() => callback(err))
                db.commit(callback)
              }
            );
          };
        }
      );
    });
  }
};