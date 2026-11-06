import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { initialProducts } from '../data/products';
import { apiAvailable, authApi, productsApi, normalizeProduct } from '../services/api';

const ShopContext = createContext(null);

function readSession(key, fallback) {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function cartReducer(cart, action) {
  switch (action.type) {
    case 'ADD': {
      const found = cart.some(item => item.id === action.id);
      return found ? cart.map(item => item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item) : [...cart, { id: action.id, quantity: 1 }];
    }
    case 'REMOVE': return cart.filter(item => item.id !== action.id);
    case 'CHANGE': return action.quantity <= 0 ? cart.filter(item => item.id !== action.id) : cart.map(item => item.id === action.id ? { ...item, quantity: action.quantity } : item);
    case 'CLEAR': return [];
    default: return cart;
  }
}

export function ShopProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [cart, dispatch] = useReducer(cartReducer, [], () => readSession('nexbyte-cart', []));
  const [favorites, setFavorites] = useState(() => readSession('nexbyte-favorites', []));
  const [user, setUser] = useState(() => readSession('nexbyte-user', null));
  const [token, setToken] = useState(() => readSession('nexbyte-token', null));
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(Boolean(apiAvailable));
  const [catalogError, setCatalogError] = useState('');

  useEffect(() => {
    if (!apiAvailable) return;
    let active = true;
    productsApi.list()
      .then(items => { if (active) setProducts(items); })
      .catch(() => { if (active) setCatalogError('No fue posible obtener el catálogo del servidor.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => { window.sessionStorage.setItem('nexbyte-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.sessionStorage.setItem('nexbyte-favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => {
    if (user) window.sessionStorage.setItem('nexbyte-user', JSON.stringify(user));
    else window.sessionStorage.removeItem('nexbyte-user');
  }, [user]);
  useEffect(() => {
    if (token) window.sessionStorage.setItem('nexbyte-token', JSON.stringify(token));
    else window.sessionStorage.removeItem('nexbyte-token');
  }, [token]);
  useEffect(() => {
    if (!notification) return;
    const timer = window.setTimeout(() => setNotification(''), 3000);
    return () => window.clearTimeout(timer);
  }, [notification]);

  const toast = useCallback((message) => setNotification(message), []);
  const addToCart = useCallback((id) => {
    dispatch({ type: 'ADD', id });
    toast('Producto agregado al carrito');
  }, [toast]);
  const removeFromCart = useCallback((id) => dispatch({ type: 'REMOVE', id }), []);
  const changeQuantity = useCallback((id, quantity) => dispatch({ type: 'CHANGE', id, quantity }), []);
  const toggleFavorite = useCallback((id) => {
    if (!user) {
      toast('Inicia sesión para guardar favoritos');
      return false;
    }
    setFavorites(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id]);
    return true;
  }, [user, toast]);

  const loginDemo = useCallback((role = 'customer', name = 'Cliente NEXBYTE') => {
    if (apiAvailable) throw new Error('El acceso de demostración no está disponible con una API configurada.');
    const admin = role === 'admin';
    const demoUser = { id: admin ? 1 : 2, full_name: admin ? 'Administración NEXBYTE' : name, email: admin ? 'administracion@nexbyte.cl' : 'cliente@ejemplo.cl', role: admin ? 'admin' : 'customer' };
    setToken(null);
    setUser(demoUser);
    return demoUser;
  }, []);

  const login = useCallback(async ({ email, password }) => {
    if (!apiAvailable) return loginDemo('customer', email.split('@')[0] || 'Cliente NEXBYTE');
    const result = await authApi.login(email, password);
    setToken(result.token);
    setUser(result.user);
    return result.user;
  }, [loginDemo]);

  const register = useCallback(async ({ name, email, password }) => {
    if (!apiAvailable) {
      const demoUser = { id: Date.now(), full_name: name, email, role: 'customer' };
      setUser(demoUser);
      setToken(null);
      return demoUser;
    }
    await authApi.register(name, email, password);
    return login({ email, password });
  }, [login]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setFavorites([]);
    dispatch({ type: 'CLEAR' });
    setCartOpen(false);
  }, []);

  const createProduct = useCallback(async (form) => {
    if (user?.role !== 'admin') throw new Error('Solo administración puede agregar productos.');
    let product;
    if (apiAvailable) {
      const response = await productsApi.create({
        category_id: form.category_id,
        name: form.name,
        brand: form.brand,
        sku: form.sku,
        description: form.description,
        price_clp: Number(form.price),
        stock: Number(form.stock),
        images: form.image_url ? [form.image_url] : [],
      }, token);
      product = normalizeProduct({ ...form, ...response, image_url: form.image_url, description: form.description, price_clp: form.price, cat: form.cat });
    } else {
      product = { id: Date.now(), name: form.name, brand: form.brand, price: Number(form.price), cat: form.cat, stock: Number(form.stock), image: form.image_url, desc: form.description, tag: 'NOVEDAD' };
    }
    setProducts(current => [product, ...current]);
    toast('Producto agregado al catálogo');
    return product;
  }, [token, user, toast]);

  const cartQuantity = useMemo(() => cart.reduce((count, item) => count + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (products.find(p => p.id === item.id)?.price ?? 0) * item.quantity, 0), [cart, products]);
  const value = useMemo(() => ({ products, cart, cartOpen, setCartOpen, cartQuantity, cartTotal, favorites, user, loading, catalogError, notification, addToCart, removeFromCart, changeQuantity, toggleFavorite, login, loginDemo, register, logout, createProduct, toast, apiAvailable }),
    [products, cart, cartOpen, cartQuantity, cartTotal, favorites, user, loading, catalogError, notification, addToCart, removeFromCart, changeQuantity, toggleFavorite, login, loginDemo, register, logout, createProduct, toast]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('ShopProvider no encontrado');
  return context;
}
