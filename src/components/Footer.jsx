import { Link } from 'react-router-dom';

export function Footer() {
  return <footer className="footer"><div className="wrap footergrid">
    <div><Link to="/" className="logo footLogo"><img className="brandImage" src="/logo_horizontal.png" width="520" height="120" alt="NEXBYTE" /></Link><p>Una tienda, toda la tecnología.<br/>Proyecto académico · Desafío Latam.</p></div>
    <div><strong>Explorar</strong><Link to="/productos">Catálogo</Link><Link to="/productos?categoria=Gaming">Gaming</Link><Link to="/productos?categoria=Accesorios">Accesorios</Link></div>
    <div><strong>Mi cuenta</strong><Link to="/login">Iniciar sesión</Link><Link to="/registro">Registrarme</Link><Link to="/mi-cuenta">Mi perfil</Link></div>
    <div><strong>Proyecto</strong><span>Desarrollo frontend · Hito 2</span><span>Precios y stock ilustrativos</span><span>Fotografías: Unsplash</span></div>
  </div><div className="wrap copyright">© 2026 NEXBYTE · Proyecto educativo. Sin ventas ni pagos reales.</div></footer>;
}
