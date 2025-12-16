const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Config stockage multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../assets/images')); // adapte le chemin si besoin
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // on utilise le nom du fichier envoyé par le client
  }
});

const upload = multer({ storage });

router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Aucun fichier uploadé' });

  // Chemin public accessible (à adapter selon ta config serveur)
  const imageUrl = `/assets/images/${req.file.filename}`;

  res.json({ imageUrl });
});

module.exports = router;