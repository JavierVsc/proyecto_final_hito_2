import { Link } from 'react-router-dom';
import { SidePanel } from '../components/SidePanel';
import { useShop } from '../context/ShopContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Profile() {
  useDocumentTitle('Mi perfil');
  const { user, favorites, toast } = useShop();
  return <>
    <div className="breadcrumb"><Link to="/">Inicio</Link> / Mi cuenta / Perfil</div>
    <div className="accountLayout"><SidePanel/><div className="mainpanel">
      <div className="adminHeader"><div><span className="eyebrow">CUENTA {user.role === 'admin' ? 'ADMINISTRADOR' : 'CLIENTE'}</span><h1 className="pageTitle">Mi perfil</h1></div><button type="button" className="btn btnLight" onClick={() => toast('La edición del perfil se conectará a la API')}>Editar perfil</button></div>
      <div className="profileHero"><span className="avatarIcon large" role="img" aria-label="Silueta genérica de usuario"/><div><h2>{user.full_name}</h2><p>{user.email}</p><span className="pill" style={{background:'#e3f7ff',color:'#157aac',padding:'5px 9px',fontSize:10}}>{user.role === 'admin' ? 'Administración NEXBYTE' : 'Cuenta de cliente'} · Demo</span></div></div>
      <div className="stats"><div className="stat"><b>00</b><small>Pedidos</small></div><div className="stat"><b>{String(favorites.length).padStart(2,'0')}</b><small>Favoritos</small></div><div className="stat"><b>00</b><small>Direcciones guardadas</small></div></div>
      <h3 className="sectionMini">Mis pedidos recientes</h3><div className="empty"><h2>Sin pedidos registrados</h2><p>Los pedidos se integrarán con el backend.</p><Link className="btn btnPrimary" to="/productos">Explorar productos</Link></div>
      <div className="notice">NEXBYTE es el único vendedor. Las cuentas cliente no pueden crear productos.</div>
    </div></div>
  </>;
}
