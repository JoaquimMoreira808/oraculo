const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// GET - Listar senhas por máquina
router.get('/', async (req, res) => {
  try {
    const { maquina_id } = req.query;
    let query = 'SELECT * FROM senha WHERE is_active = "T"';
    const params = [];
    
    if (maquina_id) {
      query += ' AND maquina_id = ?';
      params.push(maquina_id);
    }
    
    query += ' ORDER BY id DESC';
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar senhas:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Buscar senha por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM senha WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Senha não encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar nova senha
router.post('/', async (req, res) => {
  try {
    const { servico, usuario, senha, maquina_id } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO senha (servico, usuario, senha, maquina_id, is_active, created_on) VALUES (?, ?, ?, ?, "T", NOW())',
      [servico, usuario, senha, maquina_id]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Senha criada com sucesso' });
  } catch (error) {
    console.error('Erro ao criar senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar senha
router.put('/:id', async (req, res) => {
  try {
    const { servico, usuario, senha } = req.body;
    
    await db.execute(
      'UPDATE senha SET servico = ?, usuario = ?, senha = ?, modified_on = NOW() WHERE id = ?',
      [servico, usuario, senha, req.params.id]
    );
    
    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Excluir senha
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('UPDATE senha SET is_active = "F" WHERE id = ?', [req.params.id]);
    res.json({ message: 'Senha excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir senha:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;