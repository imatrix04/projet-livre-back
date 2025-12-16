const express = require('express');
const cors = require('cors');

const app = express();

const bookRoutes = require('./routes/book.routes');

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));
app.use(express.json());

app.use('/api', bookRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API running 🚀' });
});

module.exports = app;