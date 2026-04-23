const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db/connection');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'omni-data-secret-change-in-production';
const JWT_EXPIRES = '8h';
const COOKIE_NAME = 'omni_token';

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const [rows] = await db.execute(
      "SELECT id, nome, email, senha_hash FROM usuario WHERE email = ? AND is_active = 'T'",
      [email.toLowerCase().trim()]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const usuario = rows[0];
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    await db.execute(
      'UPDATE usuario SET ultimo_login = NOW() WHERE id = ?',
      [usuario.id]
    );

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nome: usuario.nome },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000 // 8h
    });

    res.json({ nome: usuario.nome, email: usuario.email });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'strict' });
  res.json({ ok: true });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return res.status(401).json({ error: 'Não autenticado' });

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ nome: payload.nome, email: payload.email });
  } catch {
    res.status(401).json({ error: 'Sessão expirada' });
  }
});

module.exports = router;
module.exports.JWT_SECRET = JWT_SECRET;
module.exports.COOKIE_NAME = COOKIE_NAME;
