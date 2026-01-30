const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// GET - Listar todas as organizações cloud
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT o.id, o.revenda_id, o.razao_social, o.cnpj, o.nome_fantasia, 
              o.telefone, o.email, o.cep, o.cidade, r.nome_fantasia as revenda_nome
       FROM organizacao_cloud o
       LEFT JOIN revenda_cloud r ON o.revenda_id = r.id
       WHERE o.is_active = 'T' 
       ORDER BY o.nome_fantasia`
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar organizações cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// GET - Buscar organização cloud por ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT * FROM organizacao_cloud WHERE id = ? AND is_active = 'T'`,
      [req.params.id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Organização cloud não encontrada' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar organização cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// POST - Criar nova organização cloud
router.post('/', async (req, res) => {
  try {
    const { revenda_id, razao_social, cnpj, nome_fantasia, telefone, email, cep, cidade } = req.body;
    
    const [result] = await db.query(
      `INSERT INTO organizacao_cloud (revenda_id, razao_social, cnpj, nome_fantasia, telefone, email, cep, cidade, is_active, created_on) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'T', NOW())`,
      [revenda_id, razao_social, cnpj, nome_fantasia, telefone, email, cep, cidade]
    );
    
    res.status(201).json({ 
      id: result.insertId, 
      message: 'Organização cloud criada com sucesso' 
    });
  } catch (error) {
    console.error('Erro ao criar organização cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// PUT - Atualizar organização cloud
router.put('/:id', async (req, res) => {
  try {
    const { revenda_id, razao_social, cnpj, nome_fantasia, telefone, email, cep, cidade } = req.body;
    
    const [result] = await db.query(
      `UPDATE organizacao_cloud 
       SET revenda_id = ?, razao_social = ?, cnpj = ?, nome_fantasia = ?, telefone = ?, email = ?, cep = ?, cidade = ?, modified_on = NOW()
       WHERE id = ? AND is_active = 'T'`,
      [revenda_id, razao_social, cnpj, nome_fantasia, telefone, email, cep, cidade, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Organização cloud não encontrada' });
    }
    
    res.json({ message: 'Organização cloud atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar organização cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// DELETE - Excluir organização cloud (soft delete)
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await db.query(
      `UPDATE organizacao_cloud SET is_active = 'F', modified_on = NOW() WHERE id = ?`,
      [req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Organização cloud não encontrada' });
    }
    
    res.json({ message: 'Organização cloud excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir organização cloud:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;