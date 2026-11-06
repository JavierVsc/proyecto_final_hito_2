import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';
import { Favorites } from './pages/Favorites';
import { Orders } from './pages/Orders';
import { AdminProductForm } from './pages/AdminProductForm';
import { AdminProducts } from './pages/AdminProducts';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0,0); }, [pathname]);
  return null;
}

function Layout() {
  const { notification } = useShop();
  return <>
    <ScrollToTop />
    <Header />
    <main className="wrap" id="contenido" tabIndex="-1"><Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/productos" element={<Catalog/>}/>
      <Route path="/productos/:id" element={<ProductDetail/>}/>
      <Route path="/registro" element={<Auth registerPage/>}/>
      <Route path="/login" element={<Auth/>}/>
      <Route element={<ProtectedRoute/>}>
        <Route path="/mi-cuenta" element={<Profile/>}/>
        <Route path="/mis-favoritos" element={<Favorites/>}/>
        <Route path="/mis-pedidos" element={<Orders/>}/>
      </Route>
      <Route element={<ProtectedRoute role="admin"/>}>
        <Route path="/admin/productos" element={<AdminProducts/>}/>
        <Route path="/admin/productos/nuevo" element={<AdminProductForm/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes></main>
    <Footer/>
    <CartDrawer/>
    <div className={`toast ${notification ? 'show' : ''}`} role="status" aria-live="polite">{notification}</div>
  </>;
}

export default function App() {
  return <BrowserRouter><ShopProvider><Layout/></ShopProvider></BrowserRouter>;
}
