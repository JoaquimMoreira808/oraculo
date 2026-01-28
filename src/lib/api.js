/**
 * Busca dados da API com tratamento automático de paginação
 * @param {string} endpoint - Endpoint da API (ex: 'empresas', 'chatbots')
 * @param {Object} options - Opções da requisição
 * @returns {Promise<Array>} Array de dados ou array vazio
 */
export async function fetchApiData(endpoint, options = {}) {
  try {
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
 * @param {string} endpoint - Endpoint da API
 * @param {number} page - Página atual
 * @param {number} limit - Itens por página
 * @returns {Promise<Object>} Objeto com data e pagination
 */
export async function fetchPaginatedData(endpoint, page = 1, limit = 10) {
  try {
    const baseUrl = import.meta.env.PUBLIC_BACKEND_URL || 'http://localhost:3000';
    const url = `${baseUrl}/api/${endpoint}?page=${page}&limit=${limit}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return { data: [], pagination: {} };
    }
    
    const result = await response.json();
    
    return {
      data: result.data || [],
      pagination: result.pagination || {}
    };
    
  } catch (error) {
    console.error(`Erro ao buscar ${endpoint} paginado:`, error);
    return { data: [], pagination: {} };
  }
}