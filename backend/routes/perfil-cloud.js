const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// GET - Listar todos os perfis cloud
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.id, p.revendacloud_id, p.nome, r.nome_fantasia as revenda_nome
       FROM perfil_cloud p
       LEFT JOIN revenda_cloud r ON p.revendacloud_id = r.id
       WHERE p.is_active = 'T' 
       ORDER BY p.nome`
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar perfis cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Buscar perfil cloud por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM perfil_cloud WHERE id = ? AND is_active = 'T'`,
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Perfil cloud não encontrado' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar perfil cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar novo perfil cloud
router.post('/', async (req, res) => {
  try {
    const { revendacloud_id, nome } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO perfil_cloud (revendacloud_id, nome, is_active, created_on) 
       VALUES (?, ?, 'T', NOW())`,
      [revendacloud_id, nome]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Perfil cloud criado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao criar perfil cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar perfil cloud
router.put('/:id', async (req, res) => {
  try {
    const { revendacloud_id, nome } = req.body;
    
    const [result] = await db.query(
      `UPDATE perfil_cloud 
       SET revendacloud_id = ?, nome = ?, modified_on = NOW()
       WHERE id = ? AND is_active = 'T'`,
      [revendacloud_id, nome, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Perfil cloud não encontrado' });
    }
    
    res.json({ message: 'Perfil cloud atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar perfil cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Excluir perfil cloud (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      `UPDATE perfil_cloud SET is_active = 'F', modified_on = NOW() WHERE id = ?`,
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Perfil cloud não encontrado' });
    }
    
    res.json({ message: 'Perfil cloud excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir perfil cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;