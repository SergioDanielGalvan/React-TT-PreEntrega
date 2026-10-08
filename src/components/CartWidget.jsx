import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart.js'

/** Ícono del carrito con la cantidad total, leída del CartContext. */
function CartWidget({ onClick }) {
  const { totalQuantity } = useCart()
  const [animar, setAnimar] = useState(false)
  const anterior = useRef(totalQuantity)

  // Pequeño "pop" del contador cada vez que cambia la cantidad.
  useEffect(() => {
    if (totalQuantity === anterior.current) return
    anterior.current = totalQuantity
    setAnimar(true)
    const t = setTimeout(() => setAnimar(false), 300)
    return () => clearTimeout(t)
  }, [totalQuantity])

  return (
    <Link
      to="/carrito"
      className="btn btn-acento btn-sm cart-widget"
      aria-label={`Carrito: ${totalQuantity} productos`}
      onClick={onClick}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M2.5 3h2.6l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6" />
      </svg>
      <span className="d-none d-sm-inline">Carrito</span>
      {totalQuantity > 0 && (
        <span className={`cart-widget__badge ${animar ? 'pop' : ''}`}>{totalQuantity}</span>
      )}
    </Link>
  )
}

export default CartWidget
