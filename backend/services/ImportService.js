const db = require('../config/db/connection');
const DataValidator = require('./DataValidator');

class ImportService {
  static async importRevendaCloud(data) {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const errors = DataValidator.validateRevendaCloud(row);
      
      if (errors.length > 0) {
        return { success: 0, error: `Linha ${i + 1}: ${errors[0]}` };
      }
      
      try {
        await db.query(
          `INSERT INTO revenda_cloud (razao_social, cnpj, nome_fantasia, telefone, email, is_active, created_on) 
           VALUES (?, ?, ?, ?, ?, 'T', NOW())`,
          [row.razao_social, row.cnpj, row.nome_fantasia, row.telefone, row.email]
        );
      } catch (error) {
        return { success: 0, error: `Linha ${i + 1}: ${error.message}` };
      }
    }
    
    return { success: data.length, error: null };
  }
  
  static async importOrganizacaoCloud(data) {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const errors = DataValidator.validateOrganizacaoCloud(row);
      
      if (errors.length > 0) {
        return { success: 0, error: `Linha ${i + 1}: ${errors[0]}` };
      }
      
      try {
        const revendaId = await this.findRevendaId(row.revenda_nome);
        if (!revendaId) {
          return { success: 0, error: `Linha ${i + 1}: Revenda '${row.revenda_nome}' não encontrada` };
        }
        
        await db.query(
          `INSERT INTO organizacao_cloud (revenda_id, razao_social, cnpj, nome_fantasia, telefone, email, cep, cidade, is_active, created_on) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'T', NOW())`,
          [revendaId, row.razao_social, row.cnpj, row.nome_fantasia, row.telefone, row.email, row.cep, row.cidade]
        );
      } catch (error) {
        return { success: 0, error: `Linha ${i + 1}: ${error.message}` };
      }
    }
    
    return { success: data.length, error: null };
  }
  
  static async importPerfilCloud(data) {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const errors = DataValidator.validatePerfilCloud(row);
      
      if (errors.length > 0) {
        return { success: 0, error: `Linha ${i + 1}: ${errors[0]}` };
      }
      
      try {
        const revendaId = await this.findRevendaId(row.revenda_nome);
        if (!revendaId) {
          return { success: 0, error: `Linha ${i + 1}: Revenda '${row.revenda_nome}' não encontrada` };
        }
        
        await db.query(
          `INSERT INTO perfil_cloud (revendacloud_id, nome, is_active, created_on) 
           VALUES (?, ?, 'T', NOW())`,
          [revendaId, row.nome]
        );
      } catch (error) {
        return { success: 0, error: `Linha ${i + 1}: ${error.message}` };
      }
    }
    
    return { success: data.length, error: null };
  }
  
  static async importContatoCloud(data) {
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      const errors = DataValidator.validateContatoCloud(row);
      
      if (errors.length > 0) {
        return { success: 0, error: `Linha ${i + 1}: ${errors[0]}` };
      }
      
      try {
        const revendaId = await this.findRevendaId(row.revenda_nome);
        if (!revendaId) {
          return { success: 0, error: `Linha ${i + 1}: Revenda '${row.revenda_nome}' não encontrada` };
        }
        
        const perfilId = await this.findPerfilId(row.perfil_nome, revendaId);
        if (!perfilId) {
          return { success: 0, error: `Linha ${i + 1}: Perfil '${row.perfil_nome}' não encontrado` };
        }
        
        await db.query(
          `INSERT INTO contato_cloud (revendacloud_id, perfil_id, nome, email, senha, is_active, created_on) 
           VALUES (?, ?, ?, ?, ?, 'T', NOW())`,
          [revendaId, perfilId, row.nome, row.email, row.senha]
        );
      } catch (error) {
        return { success: 0, error: `Linha ${i + 1}: ${error.message}` };
      }
    }
    
    return { success: data.length, error: null };
  }
  
  static async findRevendaId(nomeFantasia) {
    const [rows] = await db.query(
      'SELECT id FROM revenda_cloud WHERE nome_fantasia = ? AND is_active = "T"',
      [nomeFantasia]
    );
    return rows.length > 0 ? rows[0].id : null;
  }
  
  static async findPerfilId(nome, revendaId) {
    const [rows] = await db.query(
      'SELECT id FROM perfil_cloud WHERE nome = ? AND revendacloud_id = ? AND is_active = "T"',
      [nome, revendaId]
    );
    return rows.length > 0 ? rows[0].id : null;
  }
}

module.exports = ImportService;