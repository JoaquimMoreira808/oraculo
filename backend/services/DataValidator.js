class DataValidator {
  static validateRevendaCloud(data) {
    const errors = [];
    
    if (!data.razao_social?.trim()) {
      errors.push('razao_social é obrigatório');
    }
    
    if (!data.nome_fantasia?.trim()) {
      errors.push('nome_fantasia é obrigatório');
    }
    
    if (data.email && !this.isValidEmail(data.email)) {
      errors.push('email deve ter formato válido');
    }
    
    return errors;
  }
  
  static validateOrganizacaoCloud(data) {
    const errors = [];
    
    if (!data.revenda_nome?.trim()) {
      errors.push('revenda_nome é obrigatório');
    }
    
    if (!data.razao_social?.trim()) {
      errors.push('razao_social é obrigatório');
    }
    
    if (!data.nome_fantasia?.trim()) {
      errors.push('nome_fantasia é obrigatório');
    }
    
    if (data.email && !this.isValidEmail(data.email)) {
      errors.push('email deve ter formato válido');
    }
    
    return errors;
  }
  
  static validatePerfilCloud(data) {
    const errors = [];
    
    if (!data.revenda_nome?.trim()) {
      errors.push('revenda_nome é obrigatório');
    }
    
    if (!data.nome?.trim()) {
      errors.push('nome é obrigatório');
    }
    
    return errors;
  }
  
  static validateContatoCloud(data) {
    const errors = [];
    
    if (!data.revenda_nome?.trim()) {
      errors.push('revenda_nome é obrigatório');
    }
    
    if (!data.perfil_nome?.trim()) {
      errors.push('perfil_nome é obrigatório');
    }
    
    if (!data.nome?.trim()) {
      errors.push('nome é obrigatório');
    }
    
    if (!data.email?.trim()) {
      errors.push('email é obrigatório');
    } else if (!this.isValidEmail(data.email)) {
      errors.push('email deve ter formato válido');
    }
    
    if (!data.senha?.trim()) {
      errors.push('senha é obrigatório');
    }
    
    return errors;
  }
  
  static isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

module.exports = DataValidator;