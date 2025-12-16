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

module.exports = router;