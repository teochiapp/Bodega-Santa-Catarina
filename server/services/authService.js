const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

/**
 * Mock de usuario admin — reemplazar con consulta a DB cuando se defina el schema de Prisma.
 * La contraseña es el hash bcrypt de "admin1234".
 */
const MOCK_ADMIN = {
  id: 1,
  email: 'admin@bodegasantacatarina.com',
  // bcrypt hash de "admin1234" — generado con saltRounds: 10
  passwordHash: '$2b$10$Brm0Q4v1h6QXKV42AUJUUOtz4VhAAUV7vwXGN02skO.VCX9sM3FxW',
};

/**
 * Verifica las credenciales del admin y genera un JWT si son válidas.
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string }} — token firmado con expiración de 8h
 * @throws Error con mensaje descriptivo si las credenciales son inválidas
 */
const loginAdmin = async (email, password) => {
  if (email !== MOCK_ADMIN.email) {
    throw new Error('Credenciales inválidas');
  }

  const passwordValida = await bcrypt.compare(password, MOCK_ADMIN.passwordHash);
  if (!passwordValida) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign(
    { id: MOCK_ADMIN.id, email: MOCK_ADMIN.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return { token };
};

module.exports = { loginAdmin };
