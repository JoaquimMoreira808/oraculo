const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// GET /numerobots?chatbot_id=X
router.get('/', async (req, res) => {
  try {
    const { chatbot_id } = req.query;
    const [rows] = await db.execute(
      'SELECT * FROM numerobot WHERE chatbot_id = ? AND is_active = ? ORDER BY tipo, numero',
      [chatbot_id, 'T']
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /numerobots/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM numerobot WHERE id = ? AND is_active = ?',
      [req.params.id, 'T']
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Número não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /numerobots
router.post('/', async (req, res) => {
  try {
    const { tipo, numero, chatbot_id } = req.body;
    const [result] = await db.execute(
      'INSERT INTO numerobot (tipo, numero, chatbot_id, is_active, created_on, modified_on) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [tipo, numero, chatbot_id, 'T']
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /numerobots/:id
router.put('/:id', async (req, res) => {
  try {
    const { tipo, numero } = req.body;
    await db.execute(
      'UPDATE numerobot SET tipo = ?, numero = ?, modified_on = NOW() WHERE id = ?',
      [tipo, numero, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /numerobots/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.execute(
      'UPDATE numerobot SET is_active = ? WHERE id = ?',
      ['F', req.params.id]
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;