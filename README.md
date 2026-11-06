# NEXBYTE

https://nexbyte-hito-2.onrender.com

**Proyecto final · Hito 2 — Desarrollo Frontend**

NEXBYTE es una tienda en línea de productos tecnológicos con un único vendedor: la propia tienda. Los clientes pueden explorar productos, iniciar sesión y acceder a su perfil, favoritos y carrito. La administración del catálogo está reservada al rol administrador.

## Tecnologías

- React y Vite
- React Router DOM
- Context API para estado global
- Hooks `useState`, `useEffect`, `useReducer`, `useMemo`, `useCallback`, `useContext`, `useRef`
- CSS y JavaScript

## Cumplimiento de los requisitos — Hito 2

**1. Creación del proyecto e instalación de dependencias (1 punto)**

El proyecto fue creado utilizando `npx create-vite` con React. Las dependencias necesarias están definidas en `package.json` e instaladas mediante npm.

**2. Navegación con React Router (3 puntos)**

Se implementó React Router para navegar entre las distintas vistas de la tienda, utilizando rutas públicas, privadas y administrativas. Se emplean `Link`, `NavLink`, `useNavigate` y redirecciones programáticas.

**3. Componentes reutilizables, props y renderización dinámica (1 punto)**

La interfaz utiliza componentes reutilizables como `Header`, `Footer`, `ProductCard` y `ProductGrid`. Los datos se transmiten mediante props y los productos se muestran dinámicamente utilizando `.map()`.

**4. Uso de hooks de React (2 puntos)**

Se utilizan hooks como `useState`, `useEffect`, `useMemo`, `useReducer`, `useCallback`, `useContext` y `useRef` para gestionar estados, efectos, formularios, filtros e interacciones de la aplicación.

**5. Manejo de estado global con Context API (3 puntos)**

Se implementó `ShopContext` junto con `ShopProvider` para compartir y administrar el estado global de productos, carrito, favoritos y sesión de usuario entre los diferentes componentes.

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