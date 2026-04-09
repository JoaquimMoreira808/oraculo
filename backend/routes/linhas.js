const express = require('express');
const db = require('../config/db/connection');
const router = express.Router();

// GET - Listar linhas por máquina
router.get('/', async (req, res) => {
  try {
    const { maquina_id } = req.query;
    let query = 'SELECT * FROM linha WHERE is_active = "T"';
    const params = [];
    
    if (maquina_id) {
      query += ' AND maquina_id = ?';
      params.push(maquina_id);
    }
    
    query += ' ORDER BY id DESC';
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar linhas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Buscar linha por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM linha WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Linha não encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar linha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar nova linha
router.post('/', async (req, res) => {
  try {
    const { numero, tipo, operadora, senha, maquina_id } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO linha (numero, tipo, operadora, senha, maquina_id, is_active, created_on) VALUES (?, ?, ?, ?, ?, "T", NOW())',
      [numero, tipo, operadora, senha, maquina_id]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Linha criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar linha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar linha
router.put('/:id', async (req, res) => {
  try {
    const { numero, tipo, operadora, senha } = req.body;
    
    await db.execute(
      'UPDATE linha SET numero = ?, tipo = ?, operadora = ?, senha = ?, modified_on = NOW() WHERE id = ?',
      [numero, tipo, operadora, senha, req.params.id]
    );
    
    res.json({ message: 'Linha atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar linha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Excluir linha
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('UPDATE linha SET is_active = "F" WHERE id = ?', [req.params.id]);
    res.json({ message: 'Linha excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir linha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;