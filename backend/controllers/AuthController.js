const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const db = req.app.locals.db;
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  });
};

exports.register = async (req, res) => {
  const db = req.app.locals.db;
  const { name, email, password, address } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)',
    [name, email, hashed, address, 'user'],
    (err) => {
      if (err) return res.status(500).json({ message: 'Registration failed' });
      res.status(201).json({ message: 'User registered successfully' });
    });
};