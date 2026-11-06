import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const source = name => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');
const app = source('src/App.jsx');
const context = source('src/context/ShopContext.jsx');
const header = source('src/components/Header.jsx');

const routes = ['/', '/productos', '/productos/:id', '/registro', '/login', '/mi-cuenta', '/mis-favoritos', '/mis-pedidos', '/admin/productos', '/admin/productos/nuevo'];

test('NEXBYTE mantiene rutas públicas, privadas y administrativas', () => {
  for (const route of routes) assert.ok(app.includes(`path="${route}"`), `Falta la ruta ${route}`);
  assert.match(app, /ProtectedRoute role="admin"/);
});

test('Context API gestiona productos, carrito, favoritos y sesión', () => {
  for (const item of ['createContext','ShopProvider','useReducer','useMemo','useCallback','useEffect','products','cart','favorites','user']) assert.ok(context.includes(item), `Falta ${item}`);
});

test('Navegación utiliza enlaces React Router y redirección programática', () => {
  assert.match(header, /useNavigate/);
  assert.match(header, /NavLink/);
  assert.match(header, /navigate\(/);
});

test('El logo oficial original está presente', () => {
  assert.ok(existsSync(new URL('../public/logo_horizontal.png', import.meta.url)));
});

test('La configuración SPA incluye reescritura para Vercel', () => {
  assert.match(source('vercel.json'), /index.html/);
});
