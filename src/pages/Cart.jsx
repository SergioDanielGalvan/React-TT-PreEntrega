import { Link } from 'react-router-dom'
import ItemCount from '../components/ItemCount.jsx'
import { useCart } from '../hooks/useCart.js'
import { formatearPrecio } from '../utils/formato.js'

/** Vista /carrito: todo se lee y se modifica a través del CartContext. */
function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalQuantity, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <section className="seccion">
        <div className="container">
          <div className="vacio">
            <p className="vacio__icono" aria-hidden="true">🛒</p>
            <h1 className="h3">Tu carrito está vacío</h1>
            <p className="text-suave">Agregá productos desde el catálogo.</p>
            <Link to="/productos" className="btn btn-acento">
              Ver productos
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const vaciar = () => {
    if (confirm('¿Seguro que querés borrar todo el carrito?')) clearCart()
  }

  return (
    <section className="seccion">
      <div className="container">
        <span className="seccion__eyebrow">Tu compra</span>
        <h1 className="seccion__titulo">Carrito</h1>

        <div className="row g-4 mt-1">
          <div className="col-12 col-lg-8">
            {cart.map((item) => (
              <div className="carrito-fila" key={item.id}>
                <img src={item.imagen} alt="" />
                <div>
                  <Link to={`/producto/${item.id}`} className="carrito-fila__titulo">
                    {item.titulo}
                  </Link>
                  <p className="text-suave small mb-2">
                    {item.categoria} · {formatearPrecio(item.precio)} c/u
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <ItemCount
                      cantidad={item.cantidad}
                      setCantidad={(n) => updateQuantity(item.id, n)}
                      min={1}
                    />
                    <button className="btn btn-sm btn-link text-danger p-0" onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </button>
                  </div>
                </div>
                <strong className="carrito-fila__subtotal">
                  {formatearPrecio(item.precio * item.cantidad)}
                </strong>
              </div>
            ))}
            <div className="d-flex justify-content-between mt-3">
              <Link to="/productos" className="text-suave">
                ← Seguir comprando
              </Link>
              <button className="btn btn-sm btn-outline-danger" onClick={vaciar}>
                Vaciar carrito
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <aside className="carrito-resumen">
              <h2 className="h5">Resumen</h2>
              <p className="d-flex justify-content-between text-suave mb-2">
                <span>Productos</span>
                <span>{totalQuantity}</span>
              </p>
              <div className="carrito-total border-top pt-3 mb-3">
                <span>Total</span>
                <span>{formatearPrecio(totalPrice)}</span>
              </div>
              <Link to="/checkout" className="btn btn-acento w-100">
                Finalizar compra
              </Link>
              <p className="text-suave small mt-2 mb-0">Para finalizar necesitás iniciar sesión.</p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
