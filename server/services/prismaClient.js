const { PrismaClient } = require('@prisma/client');

// Instancia única del cliente (patrón singleton para evitar múltiples conexiones)
const prisma = new PrismaClient();

module.exports = prisma;
