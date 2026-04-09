const express = require('express');
const db = require('../config/db/connection');
const router = express.Router();

// GET - Listar todas as revendas cloud
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT id, razao_social, cnpj, nome_fantasia, telefone, email 
       FROM revenda_cloud 
       WHERE is_active = 'T' 
       ORDER BY nome_fantasia`
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar revendas cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Buscar revenda cloud por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM revenda_cloud WHERE id = ? AND is_active = 'T'`,
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Revenda cloud não encontrada' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar revenda cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar nova revenda cloud
router.post('/', async (req, res) => {
  try {
    const { razao_social, cnpj, nome_fantasia, telefone, email } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO revenda_cloud (razao_social, cnpj, nome_fantasia, telefone, email, is_active, created_on) 
       VALUES (?, ?, ?, ?, ?, 'T', NOW())`,
      [razao_social, cnpj, nome_fantasia, telefone, email]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Revenda cloud criada com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao criar revenda cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar revenda cloud
router.put('/:id', async (req, res) => {
  try {
    const { razao_social, cnpj, nome_fantasia, telefone, email } = req.body;
    
    const [result] = await db.query(
      `UPDATE revenda_cloud 
       SET razao_social = ?, cnpj = ?, nome_fantasia = ?, telefone = ?, email = ?, modified_on = NOW()
       WHERE id = ? AND is_active = 'T'`,
      [razao_social, cnpj, nome_fantasia, telefone, email, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Revenda cloud não encontrada' });
    }
    
    res.json({ message: 'Revenda cloud atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar revenda cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Excluir revenda cloud (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      `UPDATE revenda_cloud SET is_active = 'F', modified_on = NOW() WHERE id = ?`,
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Revenda cloud não encontrada' });
    }
    
    res.json({ message: 'Revenda cloud excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir revenda cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;