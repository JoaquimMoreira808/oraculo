const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.get('/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params;
    const results = [];

    switch (type) {
      case 'empresa':
        const [contatos] = await db.query(
          `SELECT id, nome, departamento, telefone, 'contato' as type FROM contato WHERE empresa_id = ? AND is_active = 'T'`,
          [id]
        );
        const [maquinas] = await db.query(
          `SELECT id, nome, localidade, ipvpn, 'maquina' as type FROM maquina WHERE empresa_id = ? AND is_active = 'T'`,
          [id]
        );
        const [chatbots] = await db.query(
          `SELECT id, responsavel as nome, servidor, 'chatbot' as type FROM chatbot WHERE empresa_id = ? AND is_active = 'T'`,
          [id]
        );
        results.push(...contatos, ...maquinas, ...chatbots);
        break;

      case 'maquina':
        const [equipamentos] = await db.query(
          `SELECT id, nome, tipo, ip, 'equipamento' as type FROM equipamento WHERE maquina_id = ? AND is_active = 'T'`,
          [id]
        );
        const [linhas] = await db.query(
          `SELECT id, numero as nome, tipo, operadora, 'linha' as type FROM linha WHERE maquina_id = ? AND is_active = 'T'`,
          [id]
        );
        results.push(...equipamentos, ...linhas);
        break;

      case 'contato':
      case 'chatbot':
      case 'equipamento':
      case 'linha':
        let empresaId;
        if (type === 'contato') {
          const [contato] = await db.query(`SELECT empresa_id FROM contato WHERE id = ?`, [id]);
          empresaId = contato[0]?.empresa_id;
        } else if (type === 'chatbot') {
          const [chatbot] = await db.query(`SELECT empresa_id FROM chatbot WHERE id = ?`, [id]);
          empresaId = chatbot[0]?.empresa_id;
        } else if (type === 'equipamento') {
          const [equipamento] = await db.query(`SELECT m.empresa_id FROM equipamento e JOIN maquina m ON e.maquina_id = m.id WHERE e.id = ?`, [id]);
          empresaId = equipamento[0]?.empresa_id;
        } else if (type === 'linha') {
          const [linha] = await db.query(`SELECT m.empresa_id FROM linha l JOIN maquina m ON l.maquina_id = m.id WHERE l.id = ?`, [id]);
          empresaId = linha[0]?.empresa_id;
        }

        if (empresaId) {
          const [relatedContatos] = await db.query(
            `SELECT id, nome, departamento, 'contato' as type FROM contato WHERE empresa_id = ? AND id != ? AND is_active = 'T'`,
            [empresaId, type === 'contato' ? id : 0]
          );
          const [relatedMaquinas] = await db.query(
            `SELECT id, nome, localidade, 'maquina' as type FROM maquina WHERE empresa_id = ? AND is_active = 'T'`,
            [empresaId]
          );
          const [relatedChatbots] = await db.query(
            `SELECT id, responsavel as nome, servidor, 'chatbot' as type FROM chatbot WHERE empresa_id = ? AND id != ? AND is_active = 'T'`,
            [empresaId, type === 'chatbot' ? id : 0]
          );
          results.push(...relatedContatos, ...relatedMaquinas, ...relatedChatbots);
        }
        break;
    }

    res.json(results);
    
  } catch (error) {
    console.error('Erro na busca de relacionados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;