require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;
app.set('trust proxy', 1);

// Carpeta de subidas estáticas
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));
app.use('/email-assets', express.static(path.join(__dirname, 'email-assets')));

// Router principal montado en /api
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
