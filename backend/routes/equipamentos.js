const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// GET /equipamentos
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT eq.*, m.nome as maquina_nome 
      FROM equipamento eq 
      LEFT JOIN maquina m ON eq.maquina_id = m.id 
      WHERE eq.is_active = ? 
      ORDER BY eq.nome ASC
    `, ['T']);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /equipamentos/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT eq.*, m.nome as maquina_nome 
      FROM equipamento eq 
      LEFT JOIN maquina m ON eq.maquina_id = m.id 
      WHERE eq.id = ? AND eq.is_active = ?
    `, [req.params.id, 'T']);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Equipamento não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /equipamentos
router.post('/', async (req, res) => {
  try {
    const { maquina_id, nome, tipo, ip, senha } = req.body;
    const [result] = await db.execute(
      'INSERT INTO equipamento (maquina_id, nome, tipo, ip, senha, is_active, created_on, modified_on) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [maquina_id, nome, tipo, ip, senha, 'T']
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /equipamentos/:id
router.put('/:id', async (req, res) => {
  try {
    const { maquina_id, nome, tipo, ip, senha } = req.body;
    await db.execute(
      'UPDATE equipamento SET maquina_id = ?, nome = ?, tipo = ?, ip = ?, senha = ?, modified_on = NOW() WHERE id = ?',
      [maquina_id, nome, tipo, ip, senha, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /equipamentos/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.execute(
      'UPDATE equipamento SET is_active = ? WHERE id = ?',
      ['F', req.params.id]
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;