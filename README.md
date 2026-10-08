# Mundo Gaming · Pre-entrega React (Talento Tech)

E-commerce de hardware gamer (placas madre, tarjetas de video y gabinetes) hecho con **React + Vite**.
Es la migración a React del sitio HTML/JS del proyecto final de Front
([TPFinal-Front-TalentoTech-New](https://github.com/SergioDanielGalvan/TPFinal-Front-TalentoTech-New)),
sumando ideas del TP grupal **MocoSoft** ([front_tp2_grupal](https://github.com/alerod88/front_tp2_grupal)).

**Autor:** Sergio Daniel Galván

## Cómo correrlo

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # build de producción en /dist
npm run preview  # sirve el build
```

## Requisitos de la pre-entrega

| # | Requisito | Dónde está |
|---|-----------|------------|
| 1.1 | Estructura de carpetas organizada | `src/components`, `src/pages`, `src/context`, `src/hooks`, `src/data`, `src/utils` |
| 1.2 | `Layout.jsx` con `Header.jsx`, nav y `Footer.jsx` | `src/components/layout/` (`Layout` usa `<Outlet />` de react-router) |
| 1.3 | Footer con info de la empresa y tarjetas de 3 personas | `Footer.jsx` + `TeamCard.jsx` (datos en `src/data/equipo.json`) |
| 2.1 | `ItemListContainer` que carga `productos.json` con `useEffect` + `fetch` | `src/pages/ItemListContainer.jsx` (archivo en `public/productos.json`) |
| 2.2 | `Item.jsx` reutilizable que recibe datos por props | `src/components/Item.jsx` (lo usa `ItemList.jsx`) |
| 3.1 | Rutas con react-router-dom: `/`, `/productos`, `/producto/:id`, `/carrito` | `src/App.jsx` |
| 3.2 | NavBar con `<Link>` (sin recargas) | `NavBar.jsx` usa `<Link>` y `<NavLink>` (resalta la sección activa) |
| 4.1 | Componente que gestiona el estado global del carrito | `src/context/CartProvider.jsx` (`CartContext` + hook `useCart`) |
| 4.2 | Agregar desde el detalle llamando a `addToCart` | `src/components/ItemDetail.jsx` |
| 4.3 | `CartWidget` con contador en tiempo real desde el contexto | `src/components/CartWidget.jsx` |
| 4.4 | `/carrito` muestra el detalle consumiendo el contexto | `src/pages/Cart.jsx` |
| 5 | Deploy en Vercel/Netlify | `vercel.json` y `public/_redirects` para que las rutas no den 404 al recargar |

## Extras

- **Carga y errores:** spinner mientras llega el `fetch`, mensaje de error con botón *Reintentar*, y
  `AbortController` para cancelar el pedido si se cambia de página.
- **Filtro por categoría** en `/productos?categoria=...` (el filtro queda en la URL).
- **Carrito persistente** en `localStorage`; cantidades editables, eliminar ítems y vaciar.
- **Ruta protegida** `/checkout`: requiere iniciar sesión (login simulado en `/login`) y redirige
  de vuelta después de ingresar.
- **Dólar oficial** en la NavBar y precio aproximado en pesos en el detalle (dolarapi.com).
- **Modo claro / oscuro** con `data-bs-theme` de Bootstrap (idea del TP grupal).
- **Contacto con Formspree** usando `@formspree/react` (patrón del TP grupal).
- `ScrollToTop` al cambiar de ruta, página 404 y carrusel de imágenes hecho con hooks.

## Estructura

```
public/
  productos.json            "API" local de productos
  imagenes/                 logos, productos, slider, equipo
src/
  App.jsx                   rutas
  components/
    layout/                 Layout, Header, NavBar, Footer, TeamCard
    Item, ItemList, ItemDetail, ItemCount, CartWidget, ...
  pages/                    Home, ItemListContainer, ItemDetailContainer, Cart, Checkout, Login, Contacto, NotFound
  context/                  CartContext + CartProvider, AuthContext + AuthProvider
  hooks/                    useCart, useAuth, useDolar
  data/                     equipo, reseñas y marcas (JSON)
  styles/index.css          tema Mundo Gaming sobre Bootstrap 5
```

## Tecnologías

React 19 · Vite · react-router-dom · Bootstrap 5 · @formspree/react
