const db = require('../config/db')

module.exports = {
  findByUsername: (username, cb) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], cb)
  },

  createUserAndMember: (userData, memberData, callback) => {
    // Insert member data first
    db.query('INSERT INTO members SET ?', memberData, (err, memberResult) => {
      if (err) return callback(err)

      const id_anggota = memberResult.insertId

      const { username, password, role } = userData
      db.query(
        'INSERT INTO users (username, password, role, id_anggota) VALUES (?, ?, ?, ?)',
        [username, password, role, id_anggota],
        callback
      )
    })
  },

  getUserProfile: (id_anggota, cb) => {
    db.query(
      'SELECT members.*, users.username, users.role FROM members JOIN users ON members.id = users.id_anggota WHERE members.id = ?',
      [id_anggota],
      cb
    )
  },
  updateUserWithMember: (id_user, id_anggota, data, callback) => {
    const { nama, email, kelamin, no_hp, alamat, username, password } = data;

    db.beginTransaction((err) => {
      if (err) return callback(err);

      db.query(
        'UPDATE members SET nama = ?, email = ?, kelamin = ?, no_hp = ?, alamat = ? WHERE id = ?',
        [nama, email, kelamin, no_hp, alamat, id_anggota],
        (err) => {
          if (err) return db.rollback(() => callback(err));

          const userUpdate = password
            ? db.query(
                'UPDATE users SET username = ?, password = ? WHERE id = ?',
                [username, password, id_user],
                (err) => {
                  if (err) return db.rollback(() => callback(err));
                  db.commit(callback);
                }
              )
            : db.query(
                'UPDATE users SET username = ? WHERE id = ?',
                [username, id_user],
                (err) => {
                  if (err) return db.rollback(() => callback(err));
                  db.commit(callback);
                }
              );
        }
      );
    });
  }
};