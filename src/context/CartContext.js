import { createContext } from 'react'

/**
 * Contexto global del carrito.
 * El estado y las funciones viven en <CartProvider>; los componentes
 * los consumen con el hook useCart().
 */
export const CartContext = createContext(null)
