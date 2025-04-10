exports.getAllRatings = (req, res) => {
    const db = req.app.locals.db;
    const userId = req.user.id;
    const role = req.user.role;
  
    let query = `
      SELECT r.id, r.value, r.comment, u.name AS user_name, u.email AS user_email
      FROM ratings r
      JOIN users u ON r.user_id = u.id
      WHERE r.store_id = ?`;
  
    if (role === 'owner') {
      db.query('SELECT id FROM stores WHERE user_id = ?', [userId], (err, result) => {
        if (err || result.length === 0) return res.status(404).json({ message: 'Store not found' });
        const storeId = result[0].id;
        db.query(query, [storeId], (err, ratings) => {
          if (err) return res.status(500).json({ message: 'Failed to get ratings' });
          const avg = ratings.length ? ratings.reduce((a, b) => a + b.value, 0) / ratings.length : null;
          res.json({ ratings: ratings.map(r => ({ id: r.id, value: r.value, comment: r.comment, user: { name: r.user_name, email: r.user_email } })), averageRating: avg });
        });
      });
    } else {
      db.query('SELECT * FROM ratings', (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to get ratings' });
        res.json(results);
      });
    }
  };
  
  exports.submitRating = (req, res) => {
    const db = req.app.locals.db;
    const { storeId, value, comment } = req.body;
    const userId = req.user.id;
    db.query('INSERT INTO ratings (user_id, store_id, value, comment) VALUES (?, ?, ?, ?)', [userId, storeId, value, comment], (err) => {
      if (err) return res.status(500).json({ message: 'Failed to submit rating' });
      res.status(201).json({ message: 'Rating submitted' });
    });
  };
  
  exports.updateRating = (req, res) => {
    const db = req.app.locals.db;
    const ratingId = req.params.id;
    const { value, comment } = req.body;
    db.query('UPDATE ratings SET value = ?, comment = ? WHERE id = ?', [value, comment, ratingId], (err) => {
      if (err) return res.status(500).json({ message: 'Failed to update rating' });
      res.json({ message: 'Rating updated' });
    });
  };
  