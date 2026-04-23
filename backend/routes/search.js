const express = require('express');
const db = require('../config/db/connection');
const router = express.Router();

// GET /search?q=termo&type=entidade
router.get('/', async (req, res) => {
  try {
    const { q, type } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.json([]);
    }

    const searchTerm = `%${q.trim()}%`;
    const results = [];
    
    // Filtrar por categoria
    if (type === 'dedicado') return res.json(await searchDedicado(searchTerm));
    if (type === 'cloud') return res.json(await searchCloud(searchTerm));

    // Se um tipo específico foi solicitado, busca apenas nele
    if (type && type !== 'all') {
      return res.json(await searchByType(type, searchTerm));
    }

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

    // Busca em revendas cloud
    const [revendasCloud] = await db.query(
      `SELECT id, nome_fantasia, razao_social, cnpj, telefone, email, 'revenda_cloud' as table_type
       FROM revenda_cloud 
       WHERE (nome_fantasia LIKE ? OR razao_social LIKE ? OR cnpj LIKE ? OR telefone LIKE ? OR email LIKE ?)
       LIMIT 3`,
      Array(5).fill(searchTerm)
    );

    // Busca em perfis cloud
    const [perfilsCloud] = await db.query(
      `SELECT p.id, p.nome, r.nome_fantasia as revenda_nome, 'perfil_cloud' as table_type
       FROM perfil_cloud p
       LEFT JOIN revenda_cloud r ON p.revendacloud_id = r.id
       WHERE p.nome LIKE ?
       LIMIT 3`,
      [searchTerm]
    );

    // Busca em contatos cloud
    const [contatosCloud] = await db.query(
      `SELECT c.id, c.nome, c.email, r.nome_fantasia as revenda_nome, p.nome as perfil_nome, 'contato_cloud' as table_type
       FROM contato_cloud c
       LEFT JOIN revenda_cloud r ON c.revendacloud_id = r.id
       LEFT JOIN perfil_cloud p ON c.perfil_id = p.id
       WHERE (c.nome LIKE ? OR c.email LIKE ?)
       LIMIT 3`,
      Array(2).fill(searchTerm)
    );

    // Busca em organizações cloud
    const [organizacoesCloud] = await db.query(
      `SELECT o.id, o.nome_fantasia, o.razao_social, o.cnpj, o.cidade, r.nome_fantasia as revenda_nome, 'organizacao_cloud' as table_type
       FROM organizacao_cloud o
       LEFT JOIN revenda_cloud r ON o.revenda_id = r.id
       WHERE (o.nome_fantasia LIKE ? OR o.razao_social LIKE ? OR o.cnpj LIKE ? OR o.cidade LIKE ?)
       LIMIT 3`,
      Array(4).fill(searchTerm)
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

    // Formata resultados de revendas cloud
    revendasCloud.forEach(revenda => {
      results.push({
        type: 'revenda_cloud',
        id: revenda.id,
        title: revenda.nome_fantasia,
        subtitle: revenda.razao_social,
        details: `${revenda.cnpj || 'N/A'} - ${revenda.telefone || 'N/A'}`
      });
    });

    // Formata resultados de perfis cloud
    perfilsCloud.forEach(perfil => {
      results.push({
        type: 'perfil_cloud',
        id: perfil.id,
        title: perfil.nome,
        subtitle: 'Perfil Cloud',
        details: `Revenda: ${perfil.revenda_nome || 'N/A'}`
      });
    });

    // Formata resultados de contatos cloud
    contatosCloud.forEach(contato => {
      results.push({
        type: 'contato_cloud',
        id: contato.id,
        title: contato.nome,
        subtitle: contato.email,
        details: `${contato.perfil_nome || 'N/A'} - ${contato.revenda_nome || 'N/A'}`
      });
    });

    // Formata resultados de organizações cloud
    organizacoesCloud.forEach(org => {
      results.push({
        type: 'organizacao_cloud',
        id: org.id,
        title: org.nome_fantasia,
        subtitle: org.razao_social,
        details: `${org.cidade || 'N/A'} - ${org.revenda_nome || 'N/A'}`
      });
    });

    res.json(results);
    
  } catch (error) {
    console.error('Erro na busca universal:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Função para buscar por tipo específico
async function searchByType(type, searchTerm) {
  const results = [];
  
  switch (type) {
    case 'empresa':
      const [empresas] = await db.query(
        `SELECT id, nome, razao, cnpj, cidade, telefone, email, 'empresa' as table_type
         FROM empresa 
         WHERE (nome LIKE ? OR razao LIKE ? OR cnpj LIKE ? OR cidade LIKE ? OR telefone LIKE ? OR email LIKE ?)
           AND is_active = 'T'
         LIMIT 20`,
        Array(6).fill(searchTerm)
      );
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
      break;
      
    case 'contato':
      const [contatos] = await db.query(
        `SELECT c.id, c.nome, c.departamento, c.telefone, c.email, e.nome as empresa_nome, e.id as empresa_id, 'contato' as table_type
         FROM contato c
         JOIN empresa e ON c.empresa_id = e.id
         WHERE (c.nome LIKE ? OR c.departamento LIKE ? OR c.telefone LIKE ? OR c.email LIKE ?)
           AND c.is_active = 'T'
         LIMIT 20`,
        Array(4).fill(searchTerm)
      );
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
      break;
      
    case 'maquina':
      const [maquinas] = await db.query(
        `SELECT m.id, m.nome, m.localidade, m.ipvpn, m.hardware, e.nome as empresa_nome, e.id as empresa_id, 'maquina' as table_type
         FROM maquina m
         JOIN empresa e ON m.empresa_id = e.id
         WHERE (m.nome LIKE ? OR m.localidade LIKE ? OR m.ipvpn LIKE ? OR m.hardware LIKE ?)
           AND m.is_active = 'T'
         LIMIT 20`,
        Array(4).fill(searchTerm)
      );
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
      break;
      
    case 'equipamento':
      const [equipamentos] = await db.query(
        `SELECT eq.id, eq.nome, eq.tipo, eq.ip, m.nome as maquina_nome, e.nome as empresa_nome, e.id as empresa_id, 'equipamento' as table_type
         FROM equipamento eq
         JOIN maquina m ON eq.maquina_id = m.id
         JOIN empresa e ON m.empresa_id = e.id
         WHERE (eq.nome LIKE ? OR eq.tipo LIKE ? OR eq.ip LIKE ?)
           AND eq.is_active = 'T'
         LIMIT 20`,
        Array(3).fill(searchTerm)
      );
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
      break;
      
    case 'linha':
      const [linhas] = await db.query(
        `SELECT l.id, l.numero, l.tipo, l.operadora, m.nome as maquina_nome, e.nome as empresa_nome, e.id as empresa_id, 'linha' as table_type
         FROM linha l
         JOIN maquina m ON l.maquina_id = m.id
         JOIN empresa e ON m.empresa_id = e.id
         WHERE (l.numero LIKE ? OR l.tipo LIKE ? OR l.operadora LIKE ?)
           AND l.is_active = 'T'
         LIMIT 20`,
        Array(3).fill(searchTerm)
      );
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
      break;
      
    case 'chatbot':
      const [chatbots] = await db.query(
        `SELECT c.id, c.servidor, c.responsavel, c.contato, e.nome as empresa_nome, e.id as empresa_id, 'chatbot' as table_type
         FROM chatbot c
         JOIN empresa e ON c.empresa_id = e.id
         WHERE (c.servidor LIKE ? OR c.responsavel LIKE ? OR c.contato LIKE ?)
           AND c.is_active = 'T'
         LIMIT 20`,
        Array(3).fill(searchTerm)
      );
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
      break;
      
    case 'revenda_cloud':
      const [revendasCloud] = await db.query(
        `SELECT id, nome_fantasia, razao_social, cnpj, telefone, email, 'revenda_cloud' as table_type
         FROM revenda_cloud 
         WHERE (nome_fantasia LIKE ? OR razao_social LIKE ? OR cnpj LIKE ? OR telefone LIKE ? OR email LIKE ?)
         LIMIT 20`,
        Array(5).fill(searchTerm)
      );
      revendasCloud.forEach(revenda => {
        results.push({
          type: 'revenda_cloud',
          id: revenda.id,
          title: revenda.nome_fantasia,
          subtitle: revenda.razao_social,
          details: `${revenda.cnpj || 'N/A'} - ${revenda.telefone || 'N/A'}`
        });
      });
      break;
      
    case 'perfil_cloud':
      const [perfilsCloud] = await db.query(
        `SELECT p.id, p.nome, r.nome_fantasia as revenda_nome, 'perfil_cloud' as table_type
         FROM perfil_cloud p
         LEFT JOIN revenda_cloud r ON p.revendacloud_id = r.id
         WHERE p.nome LIKE ?
         LIMIT 20`,
        [searchTerm]
      );
      perfilsCloud.forEach(perfil => {
        results.push({
          type: 'perfil_cloud',
          id: perfil.id,
          title: perfil.nome,
          subtitle: 'Perfil Cloud',
          details: `Revenda: ${perfil.revenda_nome || 'N/A'}`
        });
      });
      break;
      
    case 'contato_cloud':
      const [contatosCloud] = await db.query(
        `SELECT c.id, c.nome, c.email, r.nome_fantasia as revenda_nome, p.nome as perfil_nome, 'contato_cloud' as table_type
         FROM contato_cloud c
         LEFT JOIN revenda_cloud r ON c.revendacloud_id = r.id
         LEFT JOIN perfil_cloud p ON c.perfil_id = p.id
         WHERE (c.nome LIKE ? OR c.email LIKE ?)
         LIMIT 20`,
        Array(2).fill(searchTerm)
      );
      contatosCloud.forEach(contato => {
        results.push({
          type: 'contato_cloud',
          id: contato.id,
          title: contato.nome,
          subtitle: contato.email,
          details: `${contato.perfil_nome || 'N/A'} - ${contato.revenda_nome || 'N/A'}`
        });
      });
      break;
      
    case 'organizacao_cloud':
      const [organizacoesCloud] = await db.query(
        `SELECT o.id, o.nome_fantasia, o.razao_social, o.cnpj, o.cidade, r.nome_fantasia as revenda_nome, 'organizacao_cloud' as table_type
         FROM organizacao_cloud o
         LEFT JOIN revenda_cloud r ON o.revenda_id = r.id
         WHERE (o.nome_fantasia LIKE ? OR o.razao_social LIKE ? OR o.cnpj LIKE ? OR o.cidade LIKE ?)
         LIMIT 20`,
        Array(4).fill(searchTerm)
      );
      organizacoesCloud.forEach(org => {
        results.push({
          type: 'organizacao_cloud',
          id: org.id,
          title: org.nome_fantasia,
          subtitle: org.razao_social,
          details: `${org.cidade || 'N/A'} - ${org.revenda_nome || 'N/A'}`
        });
      });
      break;
  }
  
  return results;
}

// Função para buscar apenas dados dedicados
async function searchDedicado(searchTerm) {
  const results = [];
  
  // Busca em empresas
  const [empresas] = await db.query(
    `SELECT id, nome, razao, cnpj, cidade, telefone, email, 'empresa' as table_type
     FROM empresa 
     WHERE (nome LIKE ? OR razao LIKE ? OR cnpj LIKE ? OR cidade LIKE ? OR telefone LIKE ? OR email LIKE ?)
       AND is_active = 'T'
     LIMIT 10`,
    Array(6).fill(searchTerm)
  );

  // Busca em contatos
  const [contatos] = await db.query(
    `SELECT c.id, c.nome, c.departamento, c.telefone, c.email, e.nome as empresa_nome, e.id as empresa_id, 'contato' as table_type
     FROM contato c
     JOIN empresa e ON c.empresa_id = e.id
     WHERE (c.nome LIKE ? OR c.departamento LIKE ? OR c.telefone LIKE ? OR c.email LIKE ?)
       AND c.is_active = 'T'
     LIMIT 10`,
    Array(4).fill(searchTerm)
  );

  // Busca em máquinas
  const [maquinas] = await db.query(
    `SELECT m.id, m.nome, m.localidade, m.ipvpn, m.hardware, e.nome as empresa_nome, e.id as empresa_id, 'maquina' as table_type
     FROM maquina m
     JOIN empresa e ON m.empresa_id = e.id
     WHERE (m.nome LIKE ? OR m.localidade LIKE ? OR m.ipvpn LIKE ? OR m.hardware LIKE ?)
       AND m.is_active = 'T'
     LIMIT 10`,
    Array(4).fill(searchTerm)
  );

  // Busca em chatbots
  const [chatbots] = await db.query(
    `SELECT c.id, c.servidor, c.responsavel, c.contato, e.nome as empresa_nome, e.id as empresa_id, 'chatbot' as table_type
     FROM chatbot c
     JOIN empresa e ON c.empresa_id = e.id
     WHERE (c.servidor LIKE ? OR c.responsavel LIKE ? OR c.contato LIKE ?)
       AND c.is_active = 'T'
     LIMIT 10`,
    Array(3).fill(searchTerm)
  );

  // Formatar resultados dedicados
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

  return results;
}

// Função para buscar apenas dados cloud
async function searchCloud(searchTerm) {
  const results = [];
  
  // Busca em revendas cloud
  const [revendasCloud] = await db.query(
    `SELECT id, nome_fantasia, razao_social, cnpj, telefone, email, 'revenda_cloud' as table_type
     FROM revenda_cloud 
     WHERE (nome_fantasia LIKE ? OR razao_social LIKE ? OR cnpj LIKE ? OR telefone LIKE ? OR email LIKE ?)
     LIMIT 10`,
    Array(5).fill(searchTerm)
  );

  // Busca em perfis cloud
  const [perfilsCloud] = await db.query(
    `SELECT p.id, p.nome, r.nome_fantasia as revenda_nome, 'perfil_cloud' as table_type
     FROM perfil_cloud p
     LEFT JOIN revenda_cloud r ON p.revendacloud_id = r.id
     WHERE p.nome LIKE ?
     LIMIT 10`,
    [searchTerm]
  );

  // Busca em contatos cloud
  const [contatosCloud] = await db.query(
    `SELECT c.id, c.nome, c.email, r.nome_fantasia as revenda_nome, p.nome as perfil_nome, 'contato_cloud' as table_type
     FROM contato_cloud c
     LEFT JOIN revenda_cloud r ON c.revendacloud_id = r.id
     LEFT JOIN perfil_cloud p ON c.perfil_id = p.id
     WHERE (c.nome LIKE ? OR c.email LIKE ?)
     LIMIT 10`,
    Array(2).fill(searchTerm)
  );

  // Busca em organizações cloud
  const [organizacoesCloud] = await db.query(
    `SELECT o.id, o.nome_fantasia, o.razao_social, o.cnpj, o.cidade, r.nome_fantasia as revenda_nome, 'organizacao_cloud' as table_type
     FROM organizacao_cloud o
     LEFT JOIN revenda_cloud r ON o.revenda_id = r.id
     WHERE (o.nome_fantasia LIKE ? OR o.razao_social LIKE ? OR o.cnpj LIKE ? OR o.cidade LIKE ?)
     LIMIT 10`,
    Array(4).fill(searchTerm)
  );

  // Formatar resultados cloud
  revendasCloud.forEach(revenda => {
    results.push({
      type: 'revenda_cloud',
      id: revenda.id,
      title: revenda.nome_fantasia,
      subtitle: revenda.razao_social,
      details: `${revenda.cnpj || 'N/A'} - ${revenda.telefone || 'N/A'}`
    });
  });

  perfilsCloud.forEach(perfil => {
    results.push({
      type: 'perfil_cloud',
      id: perfil.id,
      title: perfil.nome,
      subtitle: 'Perfil Cloud',
      details: `Revenda: ${perfil.revenda_nome || 'N/A'}`
    });
  });

  contatosCloud.forEach(contato => {
    results.push({
      type: 'contato_cloud',
      id: contato.id,
      title: contato.nome,
      subtitle: contato.email,
      details: `${contato.perfil_nome || 'N/A'} - ${contato.revenda_nome || 'N/A'}`
    });
  });

  organizacoesCloud.forEach(org => {
    results.push({
      type: 'organizacao_cloud',
      id: org.id,
      title: org.nome_fantasia,
      subtitle: org.razao_social,
      details: `${org.cidade || 'N/A'} - ${org.revenda_nome || 'N/A'}`
    });
  });

  return results;
}

module.exports = router;