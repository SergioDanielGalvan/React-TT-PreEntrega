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

## Cuentas y roles

Las cuentas están "hardcodeadas" en `src/data/usuarios.json`, **sin contraseñas en texto plano**:
cada usuario guarda un hash **PBKDF2-SHA256** (100.000 iteraciones) con una **sal aleatoria propia**
(`src/utils/password.js`, Web Crypto API). Al ingresar se hashea lo que escribió el usuario y se
compara con el JSON.

| Rol | Correo |
|-----|--------|
| Administrador | `admin@mundogaming.com` |
| Administrador | `ventas@mundogaming.com` |
| Cliente | `cliente@mundogaming.com` |

Las contraseñas de prueba se entregan aparte (no están en el repositorio).
Cualquier otro correo válido con una contraseña de 6+ caracteres entra como **cliente**.

**Agregar o cambiar una cuenta:**

```bash
npm run hash -- "nuevaContraseña"
```

Copiá `sal`, `hash` e `iteraciones` que imprime en el usuario del JSON (con `"rol": "admin"` si es
administrador).

> El hash no se puede revertir, pero el JSON viaja en el JavaScript del sitio y una contraseña débil
> se puede adivinar probando. Por eso conviene usar contraseñas largas; en un sistema real el login
> lo valida un backend. La verificación necesita `https` o `localhost` (Web Crypto).

## Administración de productos (CRUD)

Solo para administradores (`ProtectedRoute soloAdmin`). Un cliente que entra a `/admin` ve un 403.

| Ruta | Qué hace |
|------|----------|
| `/admin/productos` | Listado con buscador, estado de cada producto (original / editado / nuevo) y acciones |
| `/admin/productos/nuevo` | Alta |
| `/admin/productos/editar/:id` | Edición (el formulario llega precargado) |
| Botón **Eliminar** | Baja, con confirmación |

**Cómo se guarda:** no hay backend, así que `public/productos.json` es la base y los cambios del
admin (altas, ediciones y bajas) se guardan en `localStorage` y se aplican encima del `fetch`
(`src/utils/catalogo.js`). Con **Exportar JSON** se descarga el catálogo con los cambios aplicados
para reemplazar `public/productos.json` y publicarlos. **Restablecer** descarta los cambios.

### Imágenes con ImgBB

La imagen se puede **subir a [ImgBB](https://imgbb.com/)** desde el formulario o **pegar la URL** de
una ya subida (por ejemplo, del álbum de la cuenta). Para subir hace falta la API key:

1. Con la cuenta de ImgBB iniciada, entrá a <https://api.imgbb.com/> y copiá la key.
2. **En local:** copiá `.env.example` como `.env.local` y pegá la key en `VITE_IMGBB_KEY`.
   Reiniciá `npm run dev` para que Vite la lea. `.env.local` no se sube a GitHub.
3. **En Vercel:** *Settings → Environment Variables* → `VITE_IMGBB_KEY` = tu key → *Redeploy*.

> La API de ImgBB no permite elegir álbum: las imágenes quedan en la cuenta y se pueden mover al
> álbum desde la web. La key también queda visible en el JavaScript del sitio.

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
- **Rutas protegidas:** `/checkout` requiere sesión; `/admin/...` requiere rol administrador.
- **Dólar oficial** en la NavBar y precio aproximado en pesos en el detalle (dolarapi.com).
- **Modo claro / oscuro** con `data-bs-theme` de Bootstrap (idea del TP grupal).
- **Contacto con Formspree** usando `@formspree/react` (patrón del TP grupal).
- **Contacto** con el formulario a la izquierda y el mapa de Google Maps del local a la derecha.
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
  pages/admin/              AdminProductos (listado), ProductoForm (alta/edición)
  context/                  CartContext + CartProvider, AuthContext + AuthProvider
  hooks/                    useCart, useAuth, useDolar, useCatalogo
  data/                     usuarios, equipo, reseñas y marcas (JSON)
  utils/                    formato de precios, imgbb.js (subida), catalogo.js (CRUD)
  styles/index.css          tema Mundo Gaming sobre Bootstrap 5
```

## Tecnologías

React 19 · Vite · react-router-dom · Bootstrap 5 · @formspree/react
