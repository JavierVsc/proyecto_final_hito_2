import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductImage } from './ProductImage';
import { currencyCLP } from '../utils/format';

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, products, cartQuantity, cartTotal, removeFromCart, changeQuantity, toast } = useShop();
  useEffect(() => {
    if (!cartOpen) return;
    const close = event => { if (event.key === 'Escape') setCartOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [cartOpen, setCartOpen]);
  if (!cartOpen) return null;
  return <div className="overlay" onClick={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
    <section className="drawer" role="dialog" aria-modal="true" aria-label="Carrito de compras">
      <div className="drawerHeader"><h2>Tu carrito <span>({cartQuantity})</span></h2><button type="button" className="close" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">×</button></div>
      {cart.length ? <>
        {cart.map(item => {
          const product = products.find(p => p.id === item.id);
          if (!product) return null;
          return <div className="drawerProduct" key={item.id}>
            <ProductImage src={product.image} alt={product.name} />
            <div><Link to={`/productos/${product.id}`} onClick={() => setCartOpen(false)}><b>{product.name}</b></Link><br/><span className="muted">{currencyCLP(product.price)}</span><div className="cartControls"><button type="button" aria-label="Reducir cantidad" onClick={() => changeQuantity(item.id, item.quantity - 1)}>−</button> {item.quantity} <button type="button" aria-label="Aumentar cantidad" onClick={() => changeQuantity(item.id, item.quantity + 1)}>+</button> <button type="button" onClick={() => removeFromCart(item.id)}>Quitar</button></div></div>
          </div>;
        })}
        <h3>Total ilustrativo: {currencyCLP(cartTotal)}</h3>
        <button type="button" className="btn btnPrimary" style={{ width:'100%' }} onClick={() => toast('El pago estará disponible en una etapa posterior')}>Continuar</button>
      </> : <div className="empty" style={{ marginTop:30 }}><h2>Tu carrito está vacío</h2><p>Explora el catálogo y agrega un producto.</p></div>}
      <p className="hint">Carrito de demostración. Sin cobros ni pedidos reales.</p>
    </section>
  </div>;
}
