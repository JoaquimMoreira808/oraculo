const jwt = require('jsonwebtoken');
const { JWT_SECRET, COOKIE_NAME } = require('../routes/auth');

const INTERNAL_API_KEY = process.env.INTERNAL_API_KEY;

function requireAuth(req, res, next) {
  // Permite chamadas internas SSR via header
  if (INTERNAL_API_KEY && req.headers['x-internal-key'] === INTERNAL_API_KEY) {
    return next();
  }

  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Não autenticado' });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Sessão expirada' });
  }
}

module.exports = requireAuth;
