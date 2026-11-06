import { Link } from 'react-router-dom';
import { categories, photos } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ProductGrid } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const categoryIcons = ['⌘', '▣', '◈', '♫', '▭', '✦'];

export function Home() {
  useDocumentTitle('Inicio');
  const { products, loading, catalogError } = useShop();
  return <>
    <section className="hero">
      <div className="heroContent"><span className="heroTag">NEXBYTE · TIENDA OFICIAL</span><h1>Una nueva forma de vivir la <em>tecnología.</em></h1><p>Descubre notebooks, gaming, audio y accesorios en una sola tienda. Seleccionamos tecnología para cada idea.</p><Link to="/productos" className="btn btnPrimary">Explorar catálogo <b>↗</b></Link></div>
      <div className="heroImage"><ProductImage src={photos.notebook} alt="Notebook en escritorio"/><span className="heroBadge">Productos seleccionados por NEXBYTE</span></div>
    </section>
    <div className="benefits">
      <div className="benefit"><span className="benefitIcon">◇</span><div><strong>Una sola tienda</strong>Todos los productos vendidos por NEXBYTE</div></div>
      <div className="benefit"><span className="benefitIcon">◎</span><div><strong>Compra sencilla</strong>Explora y encuentra lo que necesitas</div></div>
      <div className="benefit"><span className="benefitIcon">✦</span><div><strong>Tecnología para todos</strong>Desde productividad hasta gaming</div></div>
    </div>
    <div className="sectionHeader"><div><span className="eyebrow">EXPLORA POR INTERÉS</span><h2>Nuestras categorías</h2></div><Link to="/productos" className="viewAll">Ver todo el catálogo →</Link></div>
    <div className="catGrid">{categories.map((name, i) => <Link key={name} className="cat" to={`/productos?categoria=${encodeURIComponent(name)}`}><span className="catIcon">{categoryIcons[i]}</span>{name}</Link>)}</div>
    <div className="sectionHeader"><div><span className="eyebrow">SELECCIÓN NEXBYTE</span><h2>Productos destacados</h2><p>Imágenes reales · precios de ejemplo para el prototipo</p></div><Link to="/productos" className="viewAll">Ver todos →</Link></div>
    {loading && <p className="muted">Cargando productos...</p>}
    {catalogError && <p role="status" className="notice">{catalogError}</p>}
    <ProductGrid products={products.slice(0, 8)} />
  </>;
}
