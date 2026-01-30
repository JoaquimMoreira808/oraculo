const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// GET - Listar todos os contatos cloud
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT c.id, c.revendacloud_id, c.perfil_id, c.nome, c.email,
              r.nome_fantasia as revenda_nome, p.nome as perfil_nome
       FROM contato_cloud c
       LEFT JOIN revenda_cloud r ON c.revendacloud_id = r.id
       LEFT JOIN perfil_cloud p ON c.perfil_id = p.id
       WHERE c.is_active = 'T' 
       ORDER BY c.nome`
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar contatos cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Buscar contato cloud por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM contato_cloud WHERE id = ? AND is_active = 'T'`,
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contato cloud não encontrado' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar contato cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar novo contato cloud
router.post('/', async (req, res) => {
  try {
    const { revendacloud_id, perfil_id, nome, email, senha } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO contato_cloud (revendacloud_id, perfil_id, nome, email, senha, is_active, created_on) 
       VALUES (?, ?, ?, ?, ?, 'T', NOW())`,
      [revendacloud_id, perfil_id, nome, email, senha]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Contato cloud criado com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao criar contato cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar contato cloud
router.put('/:id', async (req, res) => {
  try {
    const { revendacloud_id, perfil_id, nome, email, senha } = req.body;
    
    const [result] = await db.query(
      `UPDATE contato_cloud 
       SET revendacloud_id = ?, perfil_id = ?, nome = ?, email = ?, senha = ?, modified_on = NOW()
       WHERE id = ? AND is_active = 'T'`,
      [revendacloud_id, perfil_id, nome, email, senha, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contato cloud não encontrado' });
    }
    
    res.json({ message: 'Contato cloud atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar contato cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Excluir contato cloud (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      `UPDATE contato_cloud SET is_active = 'F', modified_on = NOW() WHERE id = ?`,
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contato cloud não encontrado' });
    }
    
    res.json({ message: 'Contato cloud excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir contato cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;