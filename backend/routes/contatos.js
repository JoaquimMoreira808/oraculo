const express = require('express');
const db = require('../config/db/connection');
const router = express.Router();

// GET /contatos
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const empresaId = req.query.empresa_id;
    
    let query = `
      SELECT c.*, e.nome as empresa_nome 
      FROM contato c 
      LEFT JOIN empresa e ON c.empresa_id = e.id 
      WHERE c.is_active = 'T'
    `;
    
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM contato c 
      WHERE c.is_active = 'T'
    `;
    
    const params = [];
    const countParams = [];
    
    if (empresaId) {
      query += ' AND c.empresa_id = ?';
      countQuery += ' AND c.empresa_id = ?';
      params.push(empresaId);
      countParams.push(empresaId);
    }
    
    query += ' ORDER BY e.nome ASC, c.nome ASC';
    
    if (!empresaId) {
      query += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    
    const [rows] = await db.query(query, params);
    const [countResult] = await db.query(countQuery, countParams);
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    if (empresaId) {
      // Se filtrado por empresa, retorna todos os registros sem paginação
      res.json(rows);
    } else {
      res.json({
        data: rows,
        pagination: {
          page,
          limit,
          total,
          totalPages
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /contatos/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT c.*, e.nome as empresa_nome 
      FROM contato c 
      LEFT JOIN empresa e ON c.empresa_id = e.id 
      WHERE c.id = ? AND c.is_active = ?
    `, [req.params.id, 'T']);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Contato não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /contatos
router.post('/', async (req, res) => {
  try {
    const { empresa_id, nome, departamento, telefone, telefone2, email } = req.body;
    const [result] = await db.execute(`
      INSERT INTO contato (empresa_id, nome, departamento, telefone, telefone2, email, is_active, created_on, modified_on) 
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [empresa_id, nome, departamento, telefone, telefone2, email, 'T']);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /contatos/:id
router.put('/:id', async (req, res) => {
  try {
    const { empresa_id, nome, departamento, telefone, telefone2, email } = req.body;
    await db.execute(`
      UPDATE contato SET empresa_id = ?, nome = ?, departamento = ?, telefone = ?, telefone2 = ?, email = ?, modified_on = NOW() 
      WHERE id = ?
    `, [empresa_id, nome, departamento, telefone, telefone2, email, req.params.id]);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /contatos/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('UPDATE contato SET is_active = ? WHERE id = ?', ['F', req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;