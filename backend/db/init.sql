-- Create Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(400),
  role ENUM('admin', 'user', 'owner') DEFAULT 'user'
);

-- Create Stores table
CREATE TABLE IF NOT EXISTS stores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  address VARCHAR(400),
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create Ratings table
CREATE TABLE IF NOT EXISTS ratings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  store_id INT NOT NULL,
  value INT CHECK (value >= 1 AND value <= 5),
  comment TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);

-- Insert sample users
INSERT INTO users (name, email, password, address, role) VALUES
('Admin User Sample', 'admin@example.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJHkgK5c3zvDURFm3Uom3q5SvBacXmzm', 'Admin Address', 'admin'),
('Normal User Sample', 'user@example.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJHkgK5c3zvDURFm3Uom3q5SvBacXmzm', 'User Address', 'user'),
('Store Owner Sample', 'owner@example.com', '$2b$10$CwTycUXWue0Thq9StjUM0uJHkgK5c3zvDURFm3Uom3q5SvBacXmzm', 'Owner Address', 'owner');

-- Insert sample store (assigned to store owner)
INSERT INTO stores (name, email, address, user_id) VALUES
('Cool Coffee', 'coffee@example.com', '123 Brew St.', 3);

-- Insert sample ratings
INSERT INTO ratings (user_id, store_id, value, comment) VALUES
(2, 1, 4, 'Great coffee, fast service!');
