const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use('/assets/images', express.static(path.join(__dirname, '../assets/images')));

const bookRoutes = require('./routes/book.routes');
const uploadRoutes = require('./routes/upload.routes');

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));
app.use(express.json());

app.use('/api', bookRoutes);
app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API running 🚀' });
});

module.exports = app;