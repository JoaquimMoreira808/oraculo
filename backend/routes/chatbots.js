const express = require('express');
const db = require('../config/db/connection');
const router = express.Router();

// GET /chatbots
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const empresaId = req.query.empresa_id;
    
    let query = `
      SELECT c.*, e.nome as empresa_nome 
      FROM chatbot c 
      LEFT JOIN empresa e ON c.empresa_id = e.id 
      WHERE c.is_active = 'T'
    `;
    
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM chatbot c 
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
    
    query += ' ORDER BY e.nome ASC, c.login ASC';
    
    if (!empresaId) {
      query += ` LIMIT ${limit} OFFSET ${offset}`;
    }
    
    const [rows] = await db.query(query, params);
    const [countResult] = await db.query(countQuery, countParams);
    
    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);
    
    if (empresaId) {
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

// GET /chatbots/:id
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT c.*, e.nome as empresa_nome 
      FROM chatbot c 
      LEFT JOIN empresa e ON c.empresa_id = e.id 
      WHERE c.id = ? AND c.is_active = ?
    `, [req.params.id, 'T']);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Chatbot não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /chatbots
router.post('/', async (req, res) => {
  try {
    const { 
      empresa_id, servidor, login, senha, responsavel, contato,
      bot_whatsapp, bot_facebook, bot_instagram, bot_email, 
      bot_website, bot_telegram, obs, qt_licenca 
    } = req.body;
    
    const [result] = await db.execute(`
      INSERT INTO chatbot (
        empresa_id, servidor, login, senha, responsavel, contato,
        bot_whatsapp, bot_facebook, bot_instagram, bot_email,
        bot_website, bot_telegram, obs, qt_licenca, is_active, 
        created_on, modified_on
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `, [
      empresa_id, servidor, login, senha, responsavel, contato,
      bot_whatsapp || 'F', bot_facebook || 'F', bot_instagram || 'F', 
      bot_email || 'F', bot_website || 'F', bot_telegram || 'F', 
      obs, qt_licenca, 'T'
    ]);
    
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /chatbots/:id
router.put('/:id', async (req, res) => {
  try {
    const { 
      empresa_id, servidor, login, senha, responsavel, contato,
      bot_whatsapp, bot_facebook, bot_instagram, bot_email, 
      bot_website, bot_telegram, obs, qt_licenca 
    } = req.body;
    
    await db.execute(`
      UPDATE chatbot SET 
        empresa_id = ?, servidor = ?, login = ?, senha = ?, 
        responsavel = ?, contato = ?, bot_whatsapp = ?, 
        bot_facebook = ?, bot_instagram = ?, bot_email = ?, 
        bot_website = ?, bot_telegram = ?, obs = ?, 
        qt_licenca = ?, modified_on = NOW() 
      WHERE id = ?
    `, [
      empresa_id, servidor, login, senha, responsavel, contato,
      bot_whatsapp || 'F', bot_facebook || 'F', bot_instagram || 'F', 
      bot_email || 'F', bot_website || 'F', bot_telegram || 'F', 
      obs, qt_licenca, req.params.id
    ]);
    
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /chatbots/:id
router.delete('/:id', async (req, res) => {
  try {
    await db.execute(
      'UPDATE chatbot SET is_active = ? WHERE id = ?',
      ['F', req.params.id]
    );
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;