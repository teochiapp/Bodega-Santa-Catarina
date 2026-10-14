const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { verificarToken } = require('../middlewares/authMiddleware');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanName = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 40);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${cleanName || 'img'}-${uniqueSuffix}${ext}`);
  },
});

// Filtro de tipos de archivo permitidos
const fileFilter = (req, file, cb) => {
  const allowedMimes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/avif',
  ];
  if (allowedMimes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes (JPG, PNG, WEBP, GIF, SVG, AVIF)'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB máximo
  },
});

// Middleware para verificar token de forma permisiva si estamos en desarrollo
const verificarAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader && process.env.NODE_ENV !== 'production') {
    // Permitir en entorno local si el usuario no tiene token configurado en una llamada directa
    return next();
  }
  return verificarToken(req, res, next);
};

// POST /api/upload - Subir una sola imagen (campo 'imagen')
router.post('/', verificarAuth, (req, res) => {
  upload.single('imagen')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'La imagen supera el límite permitido de 10 MB' });
      }
      return res.status(400).json({ error: `Error de subida: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    return res.status(201).json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  });
});

// DELETE /api/upload/:filename - Eliminar archivo del servidor si se desea limpiar
router.delete('/:filename', verificarAuth, (req, res) => {
  try {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return res.json({ success: true, message: 'Archivo eliminado correctamente' });
    }
    return res.json({ success: true, message: 'El archivo ya no existía en el servidor' });
  } catch (error) {
    console.error('Error al eliminar archivo:', error);
    return res.status(500).json({ error: 'No se pudo eliminar el archivo del servidor' });
  }
});

module.exports = router;
