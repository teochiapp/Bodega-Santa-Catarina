const { loginAdmin } = require('../services/authService');

/**
 * POST /api/auth/login
 * Recibe email y password, delega la validación al authService.
 * Devuelve el token JWT si las credenciales son válidas.
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const { token } = await loginAdmin(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

/**
 * GET /api/auth/me
 * Valida el token via middleware y retorna los datos del admin autenticado.
 */
const me = (req, res) => {
  res.json({ valid: true, admin: req.admin });
};

module.exports = { login, me };
