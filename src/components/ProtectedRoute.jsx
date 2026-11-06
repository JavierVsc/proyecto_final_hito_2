import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export function ProtectedRoute({ role }) {
  const { user } = useShop();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (role && user.role !== role) return <Navigate to="/mi-cuenta" replace />;
  return <Outlet />;
}
