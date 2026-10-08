import { useEffect, useState } from 'react'
import { CartContext } from './CartContext.js'

const CLAVE_STORAGE = 'mg-carrito'

/** Lee el carrito guardado (si lo hay) para no perderlo al recargar. */
function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(CLAVE_STORAGE)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

function CartProvider({ children }) {
  // useState controla los productos seleccionados y su cantidad.
  const [cart, setCart] = useState(leerCarritoGuardado)

  // Cada cambio del carrito se persiste en localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(cart))
    } catch {
      /* modo privado o storage lleno: el carrito sigue funcionando en memoria */
    }
  }, [cart])

  /** Agrega un producto. Si ya estaba, suma la cantidad. */
  const addToCart = (producto, cantidad = 1) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item,
        )
      }
      const { id, titulo, precio, imagen, categoria } = producto
      return [...prev, { id, titulo, precio, imagen, categoria, cantidad }]
    })
  }

  /** Cambia la cantidad de un ítem; si llega a 0 lo quita. */
  const updateQuantity = (id, cantidad) => {
    setCart((prev) =>
      cantidad <= 0
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) => (item.id === id ? { ...item, cantidad } : item)),
    )
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  const isInCart = (id) => cart.some((item) => item.id === id)

  // Valores derivados: se recalculan en cada render, siempre al día.
  const totalQuantity = cart.reduce((acc, item) => acc + item.cantidad, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isInCart,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
