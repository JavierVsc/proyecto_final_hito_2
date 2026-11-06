import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export function SidePanel({ admin = false }) {
  const { logout } = useShop();
  const navigate = useNavigate();
  return <aside className="sidepanel">
    <h3>{admin ? 'PANEL ADMINISTRATIVO' : 'MI CUENTA'}</h3>
    {admin ? <>
      <NavLink to="/admin/productos/nuevo" className={({ isActive }) => isActive ? 'active' : ''}>＋ Agregar producto</NavLink>
      <NavLink to="/admin/productos" end className={({ isActive }) => isActive ? 'active' : ''}>▦ Administrar catálogo</NavLink>
      <Link to="/mi-cuenta">◉ Mi perfil</Link>
    </> : <>
      <NavLink to="/mi-cuenta" end className={({ isActive }) => isActive ? 'active' : ''}>◉ Mi perfil</NavLink>
      <NavLink to="/mis-pedidos" className={({ isActive }) => isActive ? 'active' : ''}>▤ Mis pedidos</NavLink>
      <NavLink to="/mis-favoritos" className={({ isActive }) => isActive ? 'active' : ''}>♡ Favoritos</NavLink>
      <Link to="/productos">▦ Ver tienda</Link>
    </>}
    <button type="button" className="sideLogout" onClick={() => {logout();navigate('/');}}>Cerrar sesión</button>
    <Link className="sideminor" to="/">← Volver a la tienda</Link>
  </aside>;
}
