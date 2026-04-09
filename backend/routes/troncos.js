const express = require('express');
const db = require('../config/db/connection');
const router = express.Router();

// GET - Listar troncos por máquina
router.get('/', async (req, res) => {
  try {
    const { maquina_id } = req.query;
    let query = 'SELECT * FROM troncoe1 WHERE is_active = "T"';
    const params = [];
    
    if (maquina_id) {
      query += ' AND maquina_id = ?';
      params.push(maquina_id);
    }
    
    query += ' ORDER BY id DESC';
    
    const [rows] = await db.execute(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar troncos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Buscar tronco por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM troncoe1 WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Tronco não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar tronco:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar novo tronco
router.post('/', async (req, res) => {
  try {
    const { ddd, prefixo, numero_ini, numero_fin, equipamento, placalink, operadora, obs, maquina_id } = req.body;
    
    const [result] = await db.execute(
      'INSERT INTO troncoe1 (ddd, prefixo, numero_ini, numero_fin, equipamento, placalink, operadora, obs, maquina_id, is_active, created_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, "T", NOW())',
      [ddd, prefixo, numero_ini, numero_fin, equipamento, placalink, operadora, obs, maquina_id]
    );
    
    res.status(201).json({ id: result.insertId, message: 'Tronco criado com sucesso' });
  } catch (error) {
    console.error('Erro ao criar tronco:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar tronco
router.put('/:id', async (req, res) => {
  try {
    const { ddd, prefixo, numero_ini, numero_fin, equipamento, placalink, operadora, obs } = req.body;
    
    await db.execute(
      'UPDATE troncoe1 SET ddd = ?, prefixo = ?, numero_ini = ?, numero_fin = ?, equipamento = ?, placalink = ?, operadora = ?, obs = ?, modified_on = NOW() WHERE id = ?',
      [ddd, prefixo, numero_ini, numero_fin, equipamento, placalink, operadora, obs, req.params.id]
    );
    
    res.json({ message: 'Tronco atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar tronco:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Excluir tronco
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('UPDATE troncoe1 SET is_active = "F" WHERE id = ?', [req.params.id]);
    res.json({ message: 'Tronco excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir tronco:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;