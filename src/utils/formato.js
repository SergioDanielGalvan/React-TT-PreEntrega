/** Precio de catálogo (los productos están cotizados en dólares). */
export function formatearPrecio(valor) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(valor)
}

/** Importe en pesos argentinos, sin decimales. */
export function formatearPesos(valor) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor)
}
