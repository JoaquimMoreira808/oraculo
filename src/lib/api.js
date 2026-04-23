const isBrowser = typeof window !== 'undefined';
const BASE = isBrowser ? '/api' : `http://localhost:${process.env.PORT || 3000}/api`;
const INTERNAL_KEY = !isBrowser ? (process.env.INTERNAL_API_KEY || '') : '';

const opts = (method = 'GET', body = null) => {
  const options = { method, headers: {} };
  if (isBrowser) {
    options.credentials = 'include';
  } else {
    options.headers['x-internal-key'] = INTERNAL_KEY;
  }
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }
  return options;
};

const handleResponse = async (res) => {
  if (res.status === 401) {
    if (isBrowser) window.location.replace('/login');
    return null;
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export async function fetchApiData(endpoint) {
  try {
    const res = await fetch(`${BASE}/${endpoint}`, opts());
    const result = await handleResponse(res);
    if (!result) return [];
    if (result?.data) return Array.isArray(result.data) ? result.data : [];
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}

export async function fetchPaginatedData(endpoint, page = 1, limit = 10) {
  try {
    const res = await fetch(`${BASE}/${endpoint}?page=${page}&limit=${limit}`, opts());
    const result = await handleResponse(res);
    if (!result) return { data: [], pagination: { page: 1, limit, total: 0, totalPages: 0 } };
    if (result?.data) return { data: Array.isArray(result.data) ? result.data : [], pagination: result.pagination || { page: 1, limit, total: 0, totalPages: 0 } };
    if (Array.isArray(result)) return { data: result, pagination: { page: 1, limit: result.length, total: result.length, totalPages: 1 } };
    return { data: [], pagination: { page: 1, limit, total: 0, totalPages: 0 } };
  } catch {
    return { data: [], pagination: { page: 1, limit, total: 0, totalPages: 0 } };
  }
}

export async function universalSearch(query, type = 'all') {
  try {
    if (!query || query.trim().length < 2) return [];
    let url = `${BASE}/search?q=${encodeURIComponent(query.trim())}`;
    if (type && type !== 'all') url += `&type=${encodeURIComponent(type)}`;
    const res = await fetch(url, opts());
    const result = await handleResponse(res);
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}

export async function fetchRelatedRecords(type, id) {
  try {
    const res = await fetch(`${BASE}/related/${type}/${id}`, opts());
    const result = await handleResponse(res);
    return Array.isArray(result) ? result : [];
  } catch {
    return [];
  }
}

export async function apiGet(endpoint) {
  const res = await fetch(`${BASE}/${endpoint}`, opts());
  return handleResponse(res);
}

export async function apiPost(endpoint, body) {
  const res = await fetch(`${BASE}/${endpoint}`, opts('POST', body));
  return handleResponse(res);
}

export async function apiPut(endpoint, body) {
  const res = await fetch(`${BASE}/${endpoint}`, opts('PUT', body));
  return handleResponse(res);
}

export async function apiDelete(endpoint) {
  const res = await fetch(`${BASE}/${endpoint}`, opts('DELETE'));
  return handleResponse(res);
}
