exports.getAllStores = (req, res) => {
    const db = req.app.locals.db;
    db.query('SELECT id, name, email, address FROM stores', (err, results) => {
      if (err) return res.status(500).json({ message: 'Failed to get stores' });
      res.json(results);
    });
  };
  
  exports.addStore = (req, res) => {
    const db = req.app.locals.db;
    const { name, email, address } = req.body;
    db.query('INSERT INTO stores (name, email, address) VALUES (?, ?, ?)', [name, email, address], (err) => {
      if (err) return res.status(500).json({ message: 'Failed to add store' });
      res.status(201).json({ message: 'Store added successfully' });
    });
  };