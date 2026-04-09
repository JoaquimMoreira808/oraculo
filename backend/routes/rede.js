const express = require('express');
const db = require('../config/db/connection');
const router = express.Router();

// GET - Listar redes por máquina
router.get('/', async (req, res) => {
  try {
    const { maquina_id } = req.query;
    let query = 'SELECT * FROM rede WHERE is_active = "T"';
    const params = [];
    
    if (maquina_id) {
      query += ' AND maquina_id = ?';
      params.push(maquina_id);
    }
    
    query += ' ORDER BY id DESC';
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar redes:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Buscar rede por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM rede WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Rede não encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar rede:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar nova rede
router.post('/', async (req, res) => {
  try {
    const { ip, placa, tipo, maquina_id } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO rede (ip, placa, tipo, maquina_id, is_active, created_on) VALUES (?, ?, ?, ?, "T", NOW())',
      [ip, placa, tipo, maquina_id]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Rede criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar rede:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar rede
router.put('/:id', async (req, res) => {
  try {
    const { ip, placa, tipo } = req.body;
    
    await db.execute(
      'UPDATE rede SET ip = ?, placa = ?, tipo = ?, modified_on = NOW() WHERE id = ?',
      [ip, placa, tipo, req.params.id]
    );
    
    res.json({ message: 'Rede atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar rede:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Excluir rede
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('UPDATE rede SET is_active = "F" WHERE id = ?', [req.params.id]);
    res.json({ message: 'Rede excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir rede:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;