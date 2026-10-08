import { useContext } from 'react'
import { CartContext } from '../context/CartContext.js'

/** Acceso cómodo al CartContext desde cualquier componente. */
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
