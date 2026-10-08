import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CartProvider from './context/CartProvider.jsx'
import AuthProvider from './context/AuthProvider.jsx'
import Layout from './components/layout/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import ItemListContainer from './pages/ItemListContainer.jsx'
import ItemDetailContainer from './pages/ItemDetailContainer.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Login from './pages/Login.jsx'
import Contacto from './pages/Contacto.jsx'
import AdminProductos from './pages/admin/AdminProductos.jsx'
import ProductoForm from './pages/admin/ProductoForm.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Todas las vistas comparten Header + NavBar + Footer */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<ItemListContainer />} />
              <Route path="/producto/:id" element={<ItemDetailContainer />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/login" element={<Login />} />

              {/* Ruta protegida: solo usuarios con sesión iniciada */}
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />

              {/* CRUD de productos: solo cuentas con rol "admin" */}
              <Route
                path="/admin/productos"
                element={
                  <ProtectedRoute soloAdmin>
                    <AdminProductos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/productos/nuevo"
                element={
                  <ProtectedRoute soloAdmin>
                    <ProductoForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/productos/editar/:id"
                element={
                  <ProtectedRoute soloAdmin>
                    <ProductoForm />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
