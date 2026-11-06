import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { CartIcon } from './CartIcon';

export function Header() {
  const { cartQuantity, setCartOpen, user, logout } = useShop();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const searchRef = useRef(null);
  useEffect(() => {
    const focusSearch = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', focusSearch);
    return () => document.removeEventListener('keydown', focusSearch);
  }, []);

  const submitSearch = event => {
    event.preventDefault();
    navigate(`/productos${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
  };

  return <>
    <div className="announce"><div className="wrap">TECNOLOGÍA PARA CADA IDEA <span className="announceRight">Tienda oficial NEXBYTE · Chile</span></div></div>
    <header className="siteheader">
      <div className="wrap topnav">
        <Link to="/" className="logo" aria-label="NEXBYTE, ir al inicio"><img className="brandImage" src="/logo_horizontal.png" width="520" height="120" alt="NEXBYTE" /></Link>
        <form className="searchBox" onSubmit={submitSearch} role="search"><span className="searchIcon">⌕</span><input ref={searchRef} type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar notebooks, consolas, accesorios..." aria-label="Buscar productos"/><span className="kbd">⌘ K</span></form>
        <div className="navActions">
          {user ? <button className="miniLink navTextButton" type="button" onClick={() => { logout(); navigate('/'); }}>Salir</button> : <><Link to="/login" className="miniLink">Ingresar</Link><Link to="/registro" className="pill outline">Crear cuenta</Link></>}
          <Link to="/mi-cuenta" className="iconRound" aria-label="Mi cuenta"><span className="avatarIcon"><i /></span></Link>
          <button type="button" className="iconRound" aria-label="Abrir carrito" onClick={() => setCartOpen(true)}><CartIcon/><span className="counter">{cartQuantity}</span></button>
        </div>
      </div>
      <nav className="categoryNav" aria-label="Navegación principal"><div className="wrap navrow">
        <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Inicio</NavLink>
        <NavLink to="/productos" className={({isActive}) => isActive ? 'active' : ''}>Tienda y catálogo</NavLink>
        <Link to="/productos?categoria=Notebooks">Notebooks</Link>
        <Link to="/productos?categoria=Gaming">Gaming</Link>
        <Link to="/productos?categoria=Accesorios">Accesorios</Link>
        <span className="navspacer" />
        <Link className="adminLink" to="/admin/productos/nuevo">● Administración</Link>
      </div></nav>
    </header>
  </>;
}
