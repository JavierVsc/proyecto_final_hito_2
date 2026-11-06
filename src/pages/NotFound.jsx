import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
export function NotFound() {
  useDocumentTitle('Página no encontrada');
  return <div className="empty"><h2>Página no encontrada</h2><p>Esta dirección no existe en NEXBYTE.</p><Link to="/" className="btn btnPrimary">Volver al inicio</Link></div>;
}
