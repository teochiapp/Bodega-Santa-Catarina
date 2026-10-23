// Limitador de peticiones en memoria (por IP). Suficiente para un único proceso Node;
// si se escala a varias instancias, reemplazar por un store compartido (Redis).
const rateLimit = ({ windowMs, max, message }) => {
  const hits = new Map();

  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) if (entry.reset <= now) hits.delete(key);
  }, windowMs).unref();

  return (req, res, next) => {
    const now = Date.now();
    const key = req.ip;
    const entry = hits.get(key);
    if (!entry || entry.reset <= now) {
      hits.set(key, { count: 1, reset: now + windowMs });
      return next();
    }
    entry.count += 1;
    if (entry.count > max) {
      return res.status(429).json({ error: message || 'Demasiadas solicitudes. Inténtalo más tarde.' });
    }
    next();
  };
};

module.exports = rateLimit;
