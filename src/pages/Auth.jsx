import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function Auth({ registerPage = false }) {
  useDocumentTitle(registerPage ? 'Registro' : 'Inicio de sesión');
  const { login, loginDemo, register, apiAvailable } = useShop();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const afterLogin = location.state?.from || '/mi-cuenta';

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (registerPage && form.password !== form.confirm) { setError('Las contraseñas no coinciden.'); return; }
    setSubmitting(true);
    try {
      await (registerPage ? register(form) : login(form));
      navigate(afterLogin, { replace:true });
    } catch (problem) {
      setError(problem.message || 'No fue posible completar el acceso.');
    } finally { setSubmitting(false); }
  }

  const openDemo = role => {
    loginDemo(role);
    navigate(role === 'admin' ? '/admin/productos/nuevo' : afterLogin, {replace:true});
  };

  return <div className="authWrapper">
    <section className="authBrand"><span className="eyebrow">BIENVENIDO A NEXBYTE</span><h2>Tu tecnología,<br/><span className="cyan">en un solo lugar.</span></h2><p>Tu cuenta personal es para comprar, consultar pedidos y guardar favoritos. Los clientes no pueden publicar productos.</p><div className="authFeatures"><span>✦ Catálogo administrado por NEXBYTE</span><span>✦ Favoritos y pedidos en tu cuenta</span><span>✦ Experiencia simple y segura</span></div></section>
    <section className="authPanel"><span className="eyebrow">MI CUENTA</span><h1>{registerPage ? 'Crea tu cuenta' : 'Iniciar sesión'}</h1><p>{registerPage ? 'Regístrate para realizar tus compras.' : 'Ingresa para administrar tu cuenta.'}</p>
      <form onSubmit={handleSubmit}>
        {registerPage && <label className="field">Nombre completo<input required className="input" name="name" autoComplete="name" placeholder="Tu nombre" value={form.name} onChange={event => setForm({...form,name:event.target.value})}/></label>}
        <label className="field">Correo electrónico<input required type="email" className="input" name="email" autoComplete="email" placeholder="tu@email.com" value={form.email} onChange={event => setForm({...form,email:event.target.value})}/></label>
        <label className="field">Contraseña<input required minLength={6} type="password" name="password" className="input" autoComplete={registerPage ? 'new-password':'current-password'} placeholder="Mínimo 6 caracteres" value={form.password} onChange={event => setForm({...form,password:event.target.value})}/></label>
        {registerPage ? <label className="field">Confirmar contraseña<input required minLength={6} type="password" name="confirm" className="input" autoComplete="new-password" placeholder="Repite tu contraseña" value={form.confirm} onChange={event => setForm({...form,confirm:event.target.value})}/></label> : <label className="checkme"><input type="checkbox"/> Mantener sesión iniciada</label>}
        {error && <p className="notice" role="alert">{error}</p>}
        <button className="btn btnPrimary" type="submit" disabled={submitting}>{submitting ? 'Procesando...' : registerPage ? 'Crear cuenta →' : 'Iniciar sesión →'}</button>
      </form>
      <div className="authSwitch">{registerPage ? <>¿Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></> : <>¿Todavía no tienes cuenta? <Link to="/registro">Registrarme</Link></>}</div>
      {!apiAvailable && <div className="notice">Versión frontend de demostración. Las contraseñas no se almacenan y no existe autenticación con servidor. {!registerPage && <div className="demoActions"><button type="button" className="btn btnLight" onClick={() => openDemo('customer')}>Cuenta cliente</button><button type="button" className="btn btnLight" onClick={() => openDemo('admin')}>Cuenta NEXBYTE</button></div>}</div>}
    </section>
  </div>;
}
