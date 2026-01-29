const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// GET /maquinas
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const empresaId = req.query.empresa_id;
    
    let query = `
      SELECT m.*, e.nome as empresa_nome 
      FROM maquina m 
      LEFT JOIN empresa e ON m.empresa_id = e.id 
      WHERE m.is_active = 'T'
    `;
    
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM maquina m 
      WHERE m.is_active = 'T'
    `;
    
    const params = [];
    const countParams = [];
    
    if (empresaId) {
      query += ' AND m.empresa_id = ?';
      countQuery += ' AND m.empresa_id = ?';
      params.push(empresaId);
      countParams.push(empresaId);
    }
    
    query += ' ORDER BY m.nome ASC';
    
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

// GET /maquinas/:id
router.get('/:id', async (req, res) => {
  try {
    const [maquinas] = await db.execute(`
      SELECT m.*, e.nome as empresa_nome 
      FROM maquina m 
      LEFT JOIN empresa e ON m.empresa_id = e.id 
      WHERE m.id = ? AND m.is_active = ?
    `, [req.params.id, 'T']);
    
    if (maquinas.length === 0) {
      return res.status(404).json({ error: 'Máquina não encontrada' });
    }

    const [equipamentos] = await db.execute(
      'SELECT * FROM equipamento WHERE maquina_id = ? AND is_active = ?',
      [req.params.id, 'T']
    );

    const [rede] = await db.execute(
      'SELECT * FROM rede WHERE maquina_id = ? AND is_active = ?',
      [req.params.id, 'T']
    );

    const [troncoe1] = await db.execute(
      'SELECT * FROM troncoe1 WHERE maquina_id = ? AND is_active = ?',
      [req.params.id, 'T']
    );

    res.json({ ...maquinas[0], equipamentos, rede, troncoe1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /maquinas
router.post('/', async (req, res) => {
  try {
    const { empresa_id, nome, operacao, localidade, ipvpn, versao, hardware, obs } = req.body;
    const [result] = await db.execute(
      'INSERT INTO maquina (empresa_id, nome, operacao, localidade, ipvpn, versao, hardware, obs, is_active, created_on, modified_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [empresa_id, nome, operacao, localidade, ipvpn, versao, hardware, obs, 'T']
    );
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /maquinas/:id
router.put('/:id', async (req, res) => {
  try {
    const { empresa_id, nome, operacao, localidade, ipvpn, versao, hardware, obs } = req.body;
    await db.execute(
      'UPDATE maquina SET empresa_id = ?, nome = ?, operacao = ?, localidade = ?, ipvpn = ?, versao = ?, hardware = ?, obs = ?, modified_on = NOW() WHERE id = ?',
      [empresa_id, nome, operacao, localidade, ipvpn, versao, hardware, obs, req.params.id]
    );
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /maquinas/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.execute(
      'UPDATE maquina SET is_active = ? WHERE id = ?',
      ['F', req.params.id]
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;