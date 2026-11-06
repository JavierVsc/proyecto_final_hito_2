import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { categories } from '../data/products';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Catalog() {
  useDocumentTitle('Catálogo');
  const { products, loading, catalogError } = useShop();
  const [params, setParams] = useSearchParams();
  const category = params.get('categoria') || '';
  const query = (params.get('q') || '').trim().toLocaleLowerCase('es');
  const [sorting, setSorting] = useState('recent');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const filtered = useMemo(() => {
    const result = products.filter(p => {
      const matchesCategory = !category || p.cat === category;
      const matchesText = !query || `${p.name} ${p.brand} ${p.cat}`.toLocaleLowerCase('es').includes(query);
      const matchesMinimum = !minPrice || p.price >= Number(minPrice);
      const matchesMaximum = !maxPrice || p.price <= Number(maxPrice);
      return matchesCategory && matchesText && matchesMinimum && matchesMaximum;
    });
    if (sorting === 'asc') return result.sort((a, b) => a.price - b.price);
    if (sorting === 'desc') return result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, category, query, minPrice, maxPrice, sorting]);

  const chooseCategory = (next) => {
    const updated = new URLSearchParams(params);
    if (next) updated.set('categoria', next); else updated.delete('categoria');
    setParams(updated);
  };

  return <>
    <div className="breadcrumb"><Link to="/">Inicio</Link> / Tienda / Catálogo</div>
    <div className="catalogTop"><div><span className="eyebrow">CATÁLOGO NEXBYTE</span><h1 className="pageTitle">Todos nuestros productos</h1><p className="muted" style={{margin:'5px 0'}}>{filtered.length} productos · Vendidos exclusivamente por NEXBYTE</p></div><select className="input" style={{maxWidth:175}} aria-label="Ordenar productos" value={sorting} onChange={event => setSorting(event.target.value)}><option value="recent">Más recientes</option><option value="asc">Precio: menor a mayor</option><option value="desc">Precio: mayor a menor</option></select></div>
    <div className="catalogLayout"><aside className="catalogAside"><h3>Filtrar productos</h3>
      <div className="filterSet"><h4>Categoría</h4>{categories.map(cat => <label className="checkLine" key={cat}><input type="radio" name="filtercat" checked={category === cat} onChange={() => chooseCategory(cat)}/> {cat}</label>)}<button type="button" className="viewAll linkButton" style={{display:'inline-block',marginTop:12}} onClick={() => chooseCategory('')}>Mostrar todas</button></div>
      <div className="filterSet"><h4>Rango de precio</h4><div className="formRow"><input className="input" type="number" min="0" placeholder="Mín." aria-label="Precio mínimo" value={minPrice} onChange={event => setMinPrice(event.target.value)}/><input className="input" type="number" min="0" placeholder="Máx." aria-label="Precio máximo" value={maxPrice} onChange={event => setMaxPrice(event.target.value)}/></div></div>
      <div className="filterSet"><h4>Disponibilidad</h4><p className="checkLine">● Productos disponibles</p></div>
    </aside><div>
      {loading && <p className="muted">Cargando productos...</p>}
      {catalogError && <p className="notice" role="status">{catalogError}</p>}
      {query && <p className="muted">Búsqueda: {params.get('q')}</p>}
      <ProductGrid products={filtered}/>
    </div></div>
  </>;
}
