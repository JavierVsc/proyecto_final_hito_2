import { Link } from 'react-router-dom';
import { ProductImage } from './ProductImage';
import { useShop } from '../context/ShopContext';
import { currencyCLP } from '../utils/format';

export function ProductCard({ product }) {
  const { favorites, toggleFavorite, addToCart } = useShop();
  const isSaved = favorites.includes(product.id);
  return <article className="productCard">
    <Link to={`/productos/${product.id}`} className="productImg">
      <ProductImage src={product.image} alt={product.name} />
      {product.tag && <span className="badge">{product.tag}</span>}
    </Link>
    <button type="button" className={`heart ${isSaved ? 'saved' : ''}`} aria-label={isSaved ? 'Quitar de favoritos' : 'Guardar favorito'} aria-pressed={isSaved} onClick={() => toggleFavorite(product.id)}>{isSaved ? '♥' : '♡'}</button>
    <div className="productBody">
      <span className="brand">{product.brand}</span>
      <Link to={`/productos/${product.id}`}><h3>{product.name}</h3></Link>
      <div className="price">{currencyCLP(product.price)}</div>
      <div className="productBottom"><span className="stock">● En stock*</span><button type="button" className="smallBtn" onClick={() => addToCart(product.id)}>+ Agregar</button></div>
    </div>
  </article>;
}

export function ProductGrid({ products }) {
  if (!products.length) return <div className="empty"><h2>No se encontraron productos</h2><p>Prueba con otra categoría o búsqueda.</p></div>;
  return <div className="productGrid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>;
}
