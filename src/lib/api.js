/**
 * Busca dados da API com tratamento automático de paginação
 * @param {string} endpoint - Endpoint da API (ex: 'empresas', 'chatbots')
 * @param {Object} options - Opções da requisição
 * @returns {Promise<Array>} Array de dados ou array vazio
 */
export async function fetchApiData(endpoint, options = {}) {
  try {
    // Durante build-time, retorna array vazio
    if (typeof window === 'undefined') {
      return [];
    }
    
    const baseUrl = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/${endpoint}`;
    
    const response = await fetch(url, options);
    
    if (!response.ok) {
      console.error(`Erro na API ${endpoint}:`, response.status);
      return [];
    }
    
    const result = await response.json();
    
    // Se tem estrutura de paginação, retorna os dados
    if (result && typeof result === 'object' && result.data) {
      return Array.isArray(result.data) ? result.data : [];
    }
    
    // Se é array direto, retorna
    if (Array.isArray(result)) {
      return result;
    }
    
    // Fallback para array vazio
    return [];
    
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    return [];
  }
}

/**
 * Busca dados paginados da API
 * @param {string} endpoint - Endpoint da API (ex: 'empresas', 'chatbots')
 * @param {number} page - Número da página (padrão: 1)
 * @param {number} limit - Limite de itens por página (padrão: 10)
 * @param {Object} options - Opções adicionais da requisição
 * @returns {Promise<{data: Array, pagination: Object}>} Objeto com dados e informações de paginação
 */
export async function fetchPaginatedData(endpoint, page = 1, limit = 10, options = {}) {
  try {
    // Durante build-time, retorna estrutura vazia
    if (typeof window === 'undefined') {
      return { data: [], pagination: { page: 1, limit, total: 0, totalPages: 0 } };
    }
    
    const baseUrl = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/${endpoint}?page=${page}&limit=${limit}`;
    
    const response = await fetch(url, options);
    
    if (!response.ok) {
      console.error(`Erro na API ${endpoint}:`, response.status);
      return { data: [], pagination: { page: 1, limit, total: 0, totalPages: 0 } };
    }
    
    const result = await response.json();
    
    // Se tem estrutura de paginação, retorna os dados e paginação
    if (result && typeof result === 'object' && result.data) {
      return {
        data: Array.isArray(result.data) ? result.data : [],
        pagination: result.pagination || { page: 1, limit, total: 0, totalPages: 0 }
      };
    }
    
    // Se é array direto, simula paginação
    if (Array.isArray(result)) {
      return {
        data: result,
        pagination: { page: 1, limit: result.length, total: result.length, totalPages: 1 }
      };
    }
    
    // Fallback
    return { data: [], pagination: { page: 1, limit, total: 0, totalPages: 0 } };
    
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint}:`, error);
    return { data: [], pagination: { page: 1, limit, total: 0, totalPages: 0 } };
  }
}

/**
 * Busca universal em todas as tabelas do sistema
 * @param {string} query - Termo de busca
 * @param {string} type - Tipo de entidade para filtrar (opcional)
 * @returns {Promise<Array>} Array de resultados agrupados por empresa
 */
export async function universalSearch(query, type = 'all') {
  try {
    if (!query || query.trim().length < 2) {
      return [];
    }

    const baseUrl = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:3000';
    let url = `${baseUrl}/api/search?q=${encodeURIComponent(query.trim())}`;
    
    if (type && type !== 'all') {
      url += `&type=${encodeURIComponent(type)}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Erro na busca universal:', response.status);
      return [];
    }
    
    const results = await response.json();
    return Array.isArray(results) ? results : [];
    
  } catch (error) {
    console.error('Erro ao realizar busca universal:', error);
    return [];
  }
}

/**
 * Busca registros relacionados por chave estrangeira
 * @param {string} type - Tipo do registro (empresa, maquina, etc.)
 * @param {number} id - ID do registro
 * @returns {Promise<Array>} Array de registros relacionados
 */
export async function fetchRelatedRecords(type, id) {
  try {
    const baseUrl = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/related/${type}/${id}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error('Erro na busca de relacionados:', response.status);
      return [];
    }
    
    const results = await response.json();
    return Array.isArray(results) ? results : [];
    
  } catch (error) {
    console.error('Erro ao buscar registros relacionados:', error);
    return [];
  }
}