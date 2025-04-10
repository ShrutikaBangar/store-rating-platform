exports.getAllUsers = (req, res) => {
    const db = req.app.locals.db;
    db.query('SELECT id, name, email, address, role FROM users', (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to retrieve users' });
      res.json(results);
    });
  };
  
  exports.updatePassword = async (req, res) => {
    const db = req.app.locals.db;
    const { id } = req.user;
    const { newPassword } = req.body;
    const hashed = await bcrypt.hash(newPassword, 10);
    db.query('UPDATE users SET password = ? WHERE id = ?', [hashed, id], (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update password' });
      res.json({ message: 'Password updated successfully' });
    });
  };
  