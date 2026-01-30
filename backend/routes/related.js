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
        const [contato] = await db.query(`SELECT empresa_id FROM contato WHERE id = ?`, [id]);
        if (contato[0]?.empresa_id) {
          const [relatedContatos] = await db.query(
            `SELECT id, nome, departamento, 'contato' as type FROM contato WHERE empresa_id = ? AND id != ? AND is_active = 'T'`,
            [contato[0].empresa_id, id]
          );
          results.push(...relatedContatos);
        }
        break;

      case 'chatbot':
        const [chatbot] = await db.query(`SELECT empresa_id FROM chatbot WHERE id = ?`, [id]);
        if (chatbot[0]?.empresa_id) {
          const [relatedChatbots] = await db.query(
            `SELECT id, responsavel as nome, servidor, 'chatbot' as type FROM chatbot WHERE empresa_id = ? AND id != ? AND is_active = 'T'`,
            [chatbot[0].empresa_id, id]
          );
          results.push(...relatedChatbots);
        }
        break;

      case 'equipamento':
        const [equipamento] = await db.query(`SELECT maquina_id FROM equipamento WHERE id = ?`, [id]);
        if (equipamento[0]?.maquina_id) {
          const [relatedEquipamentos] = await db.query(
            `SELECT id, nome, tipo, ip, 'equipamento' as type FROM equipamento WHERE maquina_id = ? AND id != ? AND is_active = 'T'`,
            [equipamento[0].maquina_id, id]
          );
          const [relatedLinhas] = await db.query(
            `SELECT id, numero as nome, tipo, operadora, 'linha' as type FROM linha WHERE maquina_id = ? AND is_active = 'T'`,
            [equipamento[0].maquina_id]
          );
          results.push(...relatedEquipamentos, ...relatedLinhas);
        }
        break;

      case 'linha':
        const [linha] = await db.query(`SELECT maquina_id FROM linha WHERE id = ?`, [id]);
        if (linha[0]?.maquina_id) {
          const [relatedEquipamentos] = await db.query(
            `SELECT id, nome, tipo, ip, 'equipamento' as type FROM equipamento WHERE maquina_id = ? AND is_active = 'T'`,
            [linha[0].maquina_id]
          );
          const [relatedLinhas] = await db.query(
            `SELECT id, numero as nome, tipo, operadora, 'linha' as type FROM linha WHERE maquina_id = ? AND id != ? AND is_active = 'T'`,
            [linha[0].maquina_id, id]
          );
          results.push(...relatedEquipamentos, ...relatedLinhas);
        }
        break;

      case 'revenda_cloud':
        const [perfisCloud] = await db.query(
          `SELECT id, nome, 'perfil_cloud' as type FROM perfil_cloud WHERE revendacloud_id = ? AND is_active = 'T'`,
          [id]
        );
        const [contatosCloud] = await db.query(
          `SELECT id, nome, email, 'contato_cloud' as type FROM contato_cloud WHERE revendacloud_id = ? AND is_active = 'T'`,
          [id]
        );
        const [organizacoesCloud] = await db.query(
          `SELECT id, nome_fantasia as nome, razao_social, 'organizacao_cloud' as type FROM organizacao_cloud WHERE revenda_id = ? AND is_active = 'T'`,
          [id]
        );
        results.push(...perfisCloud, ...contatosCloud, ...organizacoesCloud);
        break;

      case 'perfil_cloud':
        const [perfilCloud] = await db.query(`SELECT revendacloud_id FROM perfil_cloud WHERE id = ?`, [id]);
        if (perfilCloud[0]?.revendacloud_id) {
          const [relatedContatos] = await db.query(
            `SELECT id, nome, email, 'contato_cloud' as type FROM contato_cloud WHERE perfil_id = ? AND is_active = 'T'`,
            [id]
          );
          results.push(...relatedContatos);
        }
        break;

      case 'contato_cloud':
        const [contatoCloud] = await db.query(`SELECT revendacloud_id, perfil_id FROM contato_cloud WHERE id = ?`, [id]);
        if (contatoCloud[0]?.revendacloud_id) {
          const [relatedContatosCloud] = await db.query(
            `SELECT id, nome, email, 'contato_cloud' as type FROM contato_cloud WHERE revendacloud_id = ? AND id != ? AND is_active = 'T'`,
            [contatoCloud[0].revendacloud_id, id]
          );
          results.push(...relatedContatosCloud);
        }
        break;

      case 'organizacao_cloud':
        const [organizacaoCloud] = await db.query(`SELECT revenda_id FROM organizacao_cloud WHERE id = ?`, [id]);
        if (organizacaoCloud[0]?.revenda_id) {
          const [relatedOrganizacoes] = await db.query(
            `SELECT id, nome_fantasia as nome, razao_social, 'organizacao_cloud' as type FROM organizacao_cloud WHERE revenda_id = ? AND id != ? AND is_active = 'T'`,
            [organizacaoCloud[0].revenda_id, id]
          );
          results.push(...relatedOrganizacoes);
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