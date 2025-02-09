const express = require('express');
const router = express.Router();
const connection = require('./db');

// Create User
router.post('/create', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(query, [username, password], (err, results) => {
    if (err) throw err;
    res.send('User created successfully');
  });
});

// Read User
router.post('/read', (req, res) => {
  const { username } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update User
router.post('/update', (req, res) => {
  const { username, newPassword } = req.body;
  const query = 'UPDATE users SET password = ? WHERE username = ?';
  connection.query(query, [newPassword, username], (err, results) => {
    if (err) throw err;
    res.send('User updated successfully');
  });
});

// Delete User
router.post('/delete', (req, res) => {
  const { username } = req.body;
  const query = 'DELETE FROM users WHERE username = ?';
  connection.query(query, [username], (err, results) => {
    if (err) throw err;
    res.send('User deleted successfully');
  });
});

module.exports = router;