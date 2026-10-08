import { useCallback, useEffect, useState } from 'react'
import { RUTA_PRODUCTOS } from '../utils/api.js'
import { aplicarCambios } from '../utils/catalogo.js'

/**
 * Catálogo para el panel de administración: productos.json + cambios locales.
 * Devuelve { productos, cargando, error, recargar }.
 */
export function useCatalogo() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [version, setVersion] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetch(RUTA_PRODUCTOS, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((datos) => {
        setProductos(aplicarCambios(datos))
        setError(null)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError('No se pudo cargar el catálogo.')
      })
      .finally(() => {
        if (!controller.signal.aborted) setCargando(false)
      })
    return () => controller.abort()
  }, [version])

  // Después de un alta/edición/baja, vuelve a leer y aplicar los cambios.
  const recargar = useCallback(() => setVersion((v) => v + 1), [])

  return { productos, cargando, error, recargar }
}
