const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send( 'Server error' );
  }
});

router.post('/books', async (req, res) => {
  const { title, author, year, available, image } = req.body;

  // Simple validation
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }
  try {
    const query = `
      INSERT INTO books (title, author, year, available, image)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [title, author, year || null, available !== undefined ? available : true, image || null];

    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]); // renvoie le livre créé
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;