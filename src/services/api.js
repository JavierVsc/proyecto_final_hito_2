const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';

export const apiAvailable = Boolean(BASE);

export async function apiRequest(path, { token, ...options } = {}) {
  if (!BASE) throw new Error('API_NOT_CONFIGURED');
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${BASE}/api/v1${path}`, { ...options, headers });
  if (response.status === 204) return null;
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error?.message || `Error HTTP ${response.status}`);
  return body;
}

const categoryNames = {1:'Notebooks',2:'Gaming',3:'Celulares',4:'Audio',5:'Monitores',6:'Accesorios'};

export function normalizeProduct(product) {
  return {
    id: product.id,
    brand: product.brand || 'Tecnología',
    name: product.name,
    price: Number(product.price_clp ?? product.price),
    cat: categoryNames[product.category_id] || product.cat || 'Accesorios',
    tag: product.tag || '',
    image: product.image_url || product.images?.[0]?.image_url || product.image || '',
    stock: Number(product.stock ?? 0),
    desc: product.description || product.desc || '',
  };
}

export const productsApi = {
  list: async () => (await apiRequest('/products?page=1&limit=100')).data.map(normalizeProduct),
  detail: async (id) => normalizeProduct(await apiRequest(`/products/${encodeURIComponent(id)}`)),
  create: async (payload, token) => apiRequest('/products', { method: 'POST', token, body: JSON.stringify(payload) }),
};

export const authApi = {
  login: (email, password) => apiRequest('/auth/login', {method:'POST', body:JSON.stringify({email,password})}),
  register: (full_name, email, password) => apiRequest('/auth/register', {method:'POST', body:JSON.stringify({full_name,email,password})}),
  profile: (token) => apiRequest('/users/me', {token}),
};
