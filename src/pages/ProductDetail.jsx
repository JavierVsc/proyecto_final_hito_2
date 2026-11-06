import { Link, useParams, useNavigate } from 'react-router-dom';
import { ProductImage } from '../components/ProductImage';
import { CartIcon } from '../components/CartIcon';
import { useShop } from '../context/ShopContext';
import { currencyCLP } from '../utils/format';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, favorites, toggleFavorite } = useShop();
  const product = products.find(p => String(p.id) === id);
  useDocumentTitle(product?.name || 'Detalle de producto');
  if (!product) return <div className="empty"><h2>Producto no encontrado</h2><p>Regresa al catálogo para continuar.</p><button type="button" className="btn btnPrimary" onClick={() => navigate('/productos')}>Ir al catálogo</button></div>;

  return <>
    <div className="breadcrumb"><Link to="/">Inicio</Link> / <Link to="/productos">Tienda</Link> / <Link to={`/productos?categoria=${encodeURIComponent(product.cat)}`}>{product.cat}</Link> / {product.name}</div>
    <div className="detailGrid">
      <div className="detailVisual"><div className="detailMainImg"><ProductImage src={product.image} alt={product.name}/></div><div className="detailThumb"><ProductImage src={product.image} alt={`Miniatura de ${product.name}`} /></div></div>
      <div className="detailInfo"><span className="eyebrow">VENDIDO POR NEXBYTE · {product.brand.toUpperCase()}</span><h1>{product.name}</h1><div className="detailPrice">{currencyCLP(product.price)}</div><p className="stock">● Disponible para comprar*</p><p className="muted" style={{fontSize:13,lineHeight:1.8}}>{product.desc}</p><hr/><h3>Características de ejemplo</h3>
        <div className="specs"><div><small>Categoría</small><strong>{product.cat}</strong></div><div><small>Vendedor</small><strong>NEXBYTE</strong></div><div><small>Condición</small><strong>Nuevo*</strong></div><div><small>Despacho</small><strong>A definir</strong></div></div>
        <div className="detailButtons"><button type="button" className="btn btnPrimary" onClick={() => addToCart(product.id)}><CartIcon/> Agregar al carrito</button><button type="button" className="btn btnOutline" onClick={() => toggleFavorite(product.id)}>{favorites.includes(product.id) ? '♥ Guardado' : '♡ Guardar'}</button></div>
        <div className="notice">* Datos de precios, disponibilidad y características ilustrativos. No hay ventas ni pagos reales en el Hito 2.</div>
      </div>
    </div>
  </>;
}
