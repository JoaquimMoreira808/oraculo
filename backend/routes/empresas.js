const express = require('express');
const db = require('../config/db/connection');
const router = express.Router();

// GET /empresas
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    const [rows] = await db.query(
      `SELECT * FROM empresa WHERE is_active = 'T' ORDER BY nome ASC LIMIT ${limit} OFFSET ${offset}`
    );
    
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM empresa WHERE is_active = 'T'`
    );
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /empresas/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM empresa WHERE id = ? AND is_active = ?',
      [req.params.id, 'T']
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Empresa não encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /empresas
router.post('/', async (req, res) => {
  try {
    const { nome, razao, cnpj, cidade, telefone, email } = req.body;
    const [result] = await db.execute(
      'INSERT INTO empresa (nome, razao, cnpj, cidade, telefone, email, is_active, created_on, modified_on) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [nome, razao, cnpj, cidade, telefone, email, 'T']
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /empresas/:id
router.put('/:id', async (req, res) => {
  try {
    const { nome, razao, cnpj, cidade, telefone, email } = req.body;
    await db.execute(
      'UPDATE empresa SET nome = ?, razao = ?, cnpj = ?, cidade = ?, telefone = ?, email = ?, modified_on = NOW() WHERE id = ?',
      [nome, razao, cnpj, cidade, telefone, email, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /empresas/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.execute(
      'UPDATE empresa SET is_active = ? WHERE id = ?',
      ['F', req.params.id]
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;