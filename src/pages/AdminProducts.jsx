import { Link } from 'react-router-dom';
import { SidePanel } from '../components/SidePanel';
import { ProductGrid } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function AdminProducts() {
  useDocumentTitle('Administrar productos');
  const { products } = useShop();
  return <>
    <div className="breadcrumb"><Link to="/">Inicio</Link> / Administración / Productos</div>
    <div className="accountLayout"><SidePanel admin/><div className="mainpanel"><div className="adminHeader"><div><span className="eyebrow">USO EXCLUSIVO DE NEXBYTE</span><h1 className="pageTitle">Productos de NEXBYTE</h1><p className="muted">{products.length} productos registrados en el catálogo</p></div><Link to="/admin/productos/nuevo" className="btn btnPrimary">＋ Agregar producto</Link></div><ProductGrid products={products}/></div></div>
  </>;
}
