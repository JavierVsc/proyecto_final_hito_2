# NEXBYTE

**Proyecto final · Hito 2 — Desarrollo Frontend**  
**Desafío Latam · Full Stack JavaScript**

NEXBYTE es una tienda en línea de productos tecnológicos con un único vendedor: la propia tienda. Los clientes pueden explorar productos, iniciar sesión y acceder a su perfil, favoritos y carrito. La administración del catálogo está reservada al rol administrador.

## Tecnologías

- React y Vite
- React Router DOM
- Context API para estado global
- Hooks `useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`, `useContext`, `useRef`
- CSS y JavaScript

## Navegación

| Ruta | Acceso | Vista |
| --- | --- | --- |
| `/` | Público | Página principal |
| `/productos` | Público | Catálogo y filtros |
| `/productos/:id` | Público | Detalle de producto |
| `/registro` | Público | Registro |
| `/login` | Público | Inicio de sesión |
| `/mi-cuenta` | Sesión | Perfil |
| `/mis-favoritos` | Sesión | Favoritos |
| `/mis-pedidos` | Sesión | Pedidos |
| `/admin/productos` | Administrador | Gestión del catálogo |
| `/admin/productos/nuevo` | Administrador | Creación de productos |

## Estado global

`ShopContext` centraliza los productos, carrito, favoritos y sesión. Los componentes `Header`, `CartDrawer`, `ProductCard` y las vistas consumen este contexto. El catálogo se construye mediante componentes parametrizados y renderización dinámica.

## Integración con backend

El frontend incorpora `src/services/api.js` para consumir la API REST prevista en el Hito 1. En ausencia de `VITE_API_URL` utiliza datos de demostración; no realiza ventas, cobros ni autenticación segura. El panel administrativo del prototipo representa el flujo de una futura autorización validada por el backend.

## Identidad visual

La aplicación conserva el logo oficial `public/logo_horizontal.png` y la identidad de NEXBYTE establecida en el Hito 1. Los perfiles utilizan siluetas genéricas y las fotografías de productos se obtienen de fuentes externas, con alternativa de texto cuando no están disponibles.
