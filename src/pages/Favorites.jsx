import { Link } from 'react-router-dom';
import { SidePanel } from '../components/SidePanel';
import { ProductGrid } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Favorites() {
  useDocumentTitle('Mis favoritos');
  const { products, favorites } = useShop();
  return <div className="accountLayout"><SidePanel/><div className="mainpanel"><span className="eyebrow">MI CUENTA</span><h1 className="pageTitle">Mis favoritos</h1><p className="muted">Productos guardados en tu cuenta.</p><ProductGrid products={products.filter(p => favorites.includes(p.id))}/><p><Link className="viewAll" to="/productos">Volver al catálogo →</Link></p></div></div>;
}
