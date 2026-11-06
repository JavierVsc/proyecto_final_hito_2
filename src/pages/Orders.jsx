import { Link } from 'react-router-dom';
import { SidePanel } from '../components/SidePanel';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Orders() {
  useDocumentTitle('Mis pedidos');
  return <div className="accountLayout"><SidePanel/><div className="mainpanel"><span className="eyebrow">MI CUENTA</span><h1 className="pageTitle">Mis pedidos</h1><div className="empty"><h2>No hay pedidos registrados</h2><p>El historial de pedidos se integrará con la API REST.</p><Link className="btn btnPrimary" to="/productos">Explorar catálogo</Link></div></div></div>;
}
