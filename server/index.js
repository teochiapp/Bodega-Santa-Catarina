require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Router principal montado en /api
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
