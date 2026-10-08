import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemDetail from '../components/ItemDetail.jsx'
import { Cargando, ErrorCarga } from '../components/Estado.jsx'
import { RUTA_PRODUCTOS } from '../utils/api.js'
import { aplicarCambios } from '../utils/catalogo.js'

/** Lee :id de la URL, busca ese producto y muestra <ItemDetail />. */
function ItemDetailContainer() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    const cargar = async () => {
      setCargando(true)
      setError(null)
      try {
        const respuesta = await fetch(RUTA_PRODUCTOS, { signal: controller.signal })
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        const datos = await respuesta.json()
        setProducto(aplicarCambios(datos).find((p) => p.id === id) ?? null)
      } catch (err) {
        if (err.name !== 'AbortError') setError('No se pudo cargar el producto.')
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargar()
    return () => controller.abort()
  }, [id, intento])

  return (
    <section className="seccion">
      <div className="container">
        {cargando ? (
          <Cargando texto="Cargando producto…" />
        ) : error ? (
          <ErrorCarga mensaje={error} onReintentar={() => setIntento((n) => n + 1)} />
        ) : producto ? (
          <ItemDetail producto={producto} />
        ) : (
          <div className="vacio">
            <p className="vacio__icono" aria-hidden="true">🔍</p>
            <h1 className="h3">Producto no encontrado</h1>
            <p className="text-suave">El producto que buscás no existe o ya no está disponible.</p>
            <Link to="/productos" className="btn btn-acento">
              Ver catálogo
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default ItemDetailContainer
