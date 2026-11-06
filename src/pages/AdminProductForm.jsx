import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SidePanel } from '../components/SidePanel';
import { categories } from '../data/products';
import { useShop } from '../context/ShopContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const categoryIds = {Notebooks:1, Gaming:2, Celulares:3, Audio:4, Monitores:5, Accesorios:6};
const emptyForm = {name:'',brand:'',cat:'',sku:'',price:'',stock:'',description:'',image_url:''};

export function AdminProductForm() {
  useDocumentTitle('Agregar producto');
  const { createProduct, apiAvailable } = useShop();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const update = (name, value) => setForm(current => ({...current,[name]:value}));

  async function save(event) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const saved = await createProduct({...form,category_id:categoryIds[form.cat]});
      navigate(`/productos/${saved.id}`,{replace:true});
    } catch (problem) {
      setError(problem.message || 'No fue posible guardar el producto.');
    } finally { setSubmitting(false); }
  }

  return <>
    <div className="breadcrumb"><Link to="/">Inicio</Link> / Administración / Nuevo producto</div>
    <div className="accountLayout"><SidePanel admin/><div className="mainpanel">
      <div className="adminHeader"><div><span className="eyebrow">USO EXCLUSIVO DE NEXBYTE</span><h1 className="pageTitle">Agregar producto al catálogo</h1><p className="muted" style={{margin:'6px 0'}}>Gestión de productos de la tienda oficial</p></div><span className="pill" style={{background:'#dff5ff',color:'#116f9b'}}>ADMIN</span></div>
      <form onSubmit={save}><div className="adminForm"><div>
        <label className="field">Nombre del producto<input required className="input" value={form.name} onChange={event => update('name',event.target.value)} placeholder="Ej.: Notebook 14 pulgadas"/></label>
        <label className="field">Marca o fabricante<input required className="input" value={form.brand} onChange={event => update('brand',event.target.value)} placeholder="Ej.: Marca referencial"/></label>
        <label className="field">Código SKU<input required className="input" value={form.sku} onChange={event => update('sku',event.target.value)} placeholder="Ej.: NB-014"/></label>
        <label className="field">Categoría<select required className="input" value={form.cat} onChange={event => update('cat',event.target.value)}><option value="">Selecciona una categoría</option>{categories.map(category => <option key={category} value={category}>{category}</option>)}</select></label>
        <div className="formRow"><label className="field" style={{flex:1}}>Precio CLP<input required type="number" min="1" className="input" value={form.price} onChange={event => update('price',event.target.value)} placeholder="Ej.: 349990"/></label><label className="field" style={{flex:1}}>Stock disponible<input required type="number" min="0" className="input" value={form.stock} onChange={event => update('stock',event.target.value)} placeholder="Ej.: 12"/></label></div>
        <label className="field">Descripción<textarea required className="input" rows="5" value={form.description} onChange={event => update('description',event.target.value)} placeholder="Describe las características del producto..."/></label>
      </div><div>
        <div className="adminBox"><h3 style={{marginTop:0}}>Fotografías del producto</h3><div className="uploadZone"><span>▧</span><strong>Fotografía No Disponible</strong><small>Enlace a fotografía real: JPG, PNG o WebP</small></div><label className="field" style={{marginTop:15}}>URL de fotografía real<input type="url" className="input" value={form.image_url} onChange={event => update('image_url',event.target.value)} placeholder="https://..."/></label><div className="miniImageStrip"><div>＋</div><div>＋</div><div>＋</div></div></div>
        <div className="notice"><b>Permiso requerido:</b> rol <code>admin</code>. La API validará el token y el rol antes de aceptar modificaciones del catálogo. {!apiAvailable && 'Los cambios locales son demostrativos.'}</div>
      </div></div>
      {error && <p className="notice" role="alert">{error}</p>}
      <div className="adminSubmit"><Link className="btn btnLight" to="/admin/productos">Cancelar</Link><button className="btn btnPrimary" type="submit" disabled={submitting}>{submitting ? 'Guardando...' : 'Guardar producto →'}</button></div>
      </form>
    </div></div>
  </>;
}
