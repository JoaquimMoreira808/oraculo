const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// GET /search?q=termo
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.json([]);
    }

    const searchTerm = `%${q.trim()}%`;
    const results = [];

    // Busca em empresas
    const [empresas] = await db.query(
      `SELECT id, nome, razao, cnpj, cidade, telefone, email, 'empresa' as table_type
       FROM empresa 
       WHERE (nome LIKE ? OR razao LIKE ? OR cnpj LIKE ? OR cidade LIKE ? OR telefone LIKE ? OR email LIKE ?)
         AND is_active = 'T'
       LIMIT 5`,
      Array(6).fill(searchTerm)
    );

    // Busca em contatos
    const [contatos] = await db.query(
      `SELECT c.id, c.nome, c.departamento, c.telefone, c.email, e.nome as empresa_nome, e.id as empresa_id, 'contato' as table_type
       FROM contato c
       JOIN empresa e ON c.empresa_id = e.id
       WHERE (c.nome LIKE ? OR c.departamento LIKE ? OR c.telefone LIKE ? OR c.email LIKE ?)
         AND c.is_active = 'T'
       LIMIT 5`,
      Array(4).fill(searchTerm)
    );

    // Busca em máquinas
    const [maquinas] = await db.query(
      `SELECT m.id, m.nome, m.localidade, m.ipvpn, m.hardware, e.nome as empresa_nome, e.id as empresa_id, 'maquina' as table_type
       FROM maquina m
       JOIN empresa e ON m.empresa_id = e.id
       WHERE (m.nome LIKE ? OR m.localidade LIKE ? OR m.ipvpn LIKE ? OR m.hardware LIKE ?)
         AND m.is_active = 'T'
       LIMIT 5`,
      Array(4).fill(searchTerm)
    );

    // Busca em equipamentos
    const [equipamentos] = await db.query(
      `SELECT eq.id, eq.nome, eq.tipo, eq.ip, m.nome as maquina_nome, e.nome as empresa_nome, e.id as empresa_id, 'equipamento' as table_type
       FROM equipamento eq
       JOIN maquina m ON eq.maquina_id = m.id
       JOIN empresa e ON m.empresa_id = e.id
       WHERE (eq.nome LIKE ? OR eq.tipo LIKE ? OR eq.ip LIKE ?)
         AND eq.is_active = 'T'
       LIMIT 5`,
      Array(3).fill(searchTerm)
    );

    // Busca em linhas
    const [linhas] = await db.query(
      `SELECT l.id, l.numero, l.tipo, l.operadora, m.nome as maquina_nome, e.nome as empresa_nome, e.id as empresa_id, 'linha' as table_type
       FROM linha l
       JOIN maquina m ON l.maquina_id = m.id
       JOIN empresa e ON m.empresa_id = e.id
       WHERE (l.numero LIKE ? OR l.tipo LIKE ? OR l.operadora LIKE ?)
         AND l.is_active = 'T'
       LIMIT 5`,
      Array(3).fill(searchTerm)
    );

    // Busca em chatbots
    const [chatbots] = await db.query(
      `SELECT c.id, c.servidor, c.responsavel, c.contato, e.nome as empresa_nome, e.id as empresa_id, 'chatbot' as table_type
       FROM chatbot c
       JOIN empresa e ON c.empresa_id = e.id
       WHERE (c.servidor LIKE ? OR c.responsavel LIKE ? OR c.contato LIKE ?)
         AND c.is_active = 'T'
       LIMIT 5`,
      Array(3).fill(searchTerm)
    );

    // Formata resultados de empresas
    empresas.forEach(empresa => {
      results.push({
        type: 'empresa',
        id: empresa.id,
        title: empresa.nome,
        subtitle: empresa.razao,
        details: `${empresa.cidade} - ${empresa.cnpj}`,
        empresa: { id: empresa.id, nome: empresa.nome }
      });
    });

    // Formata resultados de contatos
    contatos.forEach(contato => {
      results.push({
        type: 'contato',
        id: contato.id,
        title: contato.nome,
        subtitle: contato.departamento,
        details: `${contato.telefone} - ${contato.empresa_nome}`,
        empresa: { id: contato.empresa_id, nome: contato.empresa_nome }
      });
    });

    // Formata resultados de máquinas
    maquinas.forEach(maquina => {
      results.push({
        type: 'maquina',
        id: maquina.id,
        title: maquina.nome,
        subtitle: maquina.localidade,
        details: `${maquina.ipvpn} - ${maquina.empresa_nome}`,
        empresa: { id: maquina.empresa_id, nome: maquina.empresa_nome }
      });
    });

    // Formata resultados de equipamentos
    equipamentos.forEach(equipamento => {
      results.push({
        type: 'equipamento',
        id: equipamento.id,
        title: equipamento.nome,
        subtitle: equipamento.tipo,
        details: `${equipamento.ip} - ${equipamento.empresa_nome}`,
        empresa: { id: equipamento.empresa_id, nome: equipamento.empresa_nome }
      });
    });

    // Formata resultados de linhas
    linhas.forEach(linha => {
      results.push({
        type: 'linha',
        id: linha.id,
        title: linha.numero,
        subtitle: linha.tipo,
        details: `${linha.operadora} - ${linha.empresa_nome}`,
        empresa: { id: linha.empresa_id, nome: linha.empresa_nome }
      });
    });

    // Formata resultados de chatbots
    chatbots.forEach(chatbot => {
      results.push({
        type: 'chatbot',
        id: chatbot.id,
        title: chatbot.servidor,
        subtitle: chatbot.responsavel,
        details: `${chatbot.contato} - ${chatbot.empresa_nome}`,
        empresa: { id: chatbot.empresa_id, nome: chatbot.empresa_nome }
      });
    });

    res.json(results);
    
  } catch (error) {
    console.error('Erro na busca universal:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;