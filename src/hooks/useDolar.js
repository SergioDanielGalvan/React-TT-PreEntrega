import { useEffect, useState } from 'react'

/*
  Cotización del dólar oficial (dolarapi.com: JSON con CORS habilitado).
  La promesa se comparte a nivel módulo: aunque varios componentes usen
  el hook, la API se consulta una sola vez por carga de página.
*/
const DOLAR_API = 'https://dolarapi.com/v1/dolares/oficial'
let pedido = null

function obtenerDolar() {
  if (!pedido) {
    pedido = fetch(DOLAR_API)
      .then((r) => {
        if (!r.ok) throw new Error('HTTP ' + r.status)
        return r.json()
      })
      .catch((error) => {
        pedido = null // permite reintentar en el próximo montaje
        throw error
      })
  }
  return pedido
}

/** Devuelve { compra, venta } o null mientras carga / si falla. */
export function useDolar() {
  const [dolar, setDolar] = useState(null)

  useEffect(() => {
    let activo = true
    obtenerDolar()
      .then((d) => activo && setDolar({ compra: d.compra, venta: d.venta }))
      .catch(() => activo && setDolar(null))
    return () => {
      activo = false
    }
  }, [])

  return dolar
}
