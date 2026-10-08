import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ItemList from '../components/ItemList.jsx'
import { Cargando, ErrorCarga } from '../components/Estado.jsx'
import { RUTA_PRODUCTOS } from '../utils/api.js'

/**
 * Contenedor del catálogo: trae los productos de productos.json con
 * fetch dentro de un useEffect, maneja carga y error, y delega el
 * dibujo en <ItemList /> → <Item />.
 *
 * - En /productos muestra el catálogo completo con filtro por categoría
 *   (?categoria=... en la URL, así el filtro se puede compartir).
 * - En la Home se usa con soloDestacados para la fila de destacados.
 */
function ItemListContainer({ soloDestacados = false }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)
  const [params, setParams] = useSearchParams()

  const categoria = soloDestacados ? null : params.get('categoria')

  useEffect(() => {
    const controller = new AbortController()

    const cargar = async () => {
      setCargando(true)
      setError(null)
      try {
        const respuesta = await fetch(RUTA_PRODUCTOS, { signal: controller.signal })
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`)
        const datos = await respuesta.json()
        setProductos(datos)
      } catch (err) {
        if (err.name !== 'AbortError') setError('No se pudieron cargar los productos.')
      } finally {
        if (!controller.signal.aborted) setCargando(false)
      }
    }

    cargar()
    // Si el componente se desmonta antes de terminar, cancelamos el pedido.
    return () => controller.abort()
  }, [intento])

  const categorias = [...new Set(productos.map((p) => p.categoria))]

  let visibles = productos
  if (soloDestacados) visibles = productos.filter((p) => p.destacado)
  else if (categoria) visibles = productos.filter((p) => p.categoria === categoria)

  const contenido = cargando ? (
    <Cargando texto={soloDestacados ? 'Cargando destacados…' : 'Cargando productos…'} />
  ) : error ? (
    <ErrorCarga mensaje={error} onReintentar={() => setIntento((n) => n + 1)} />
  ) : (
    <ItemList
      productos={visibles}
      columnas={soloDestacados ? 'col-12 col-sm-6 col-lg-4' : undefined}
    />
  )

  // En la Home solo devolvemos la grilla; la sección la arma Home.jsx.
  if (soloDestacados) return contenido

  return (
    <section className="seccion">
      <div className="container">
        <span className="seccion__eyebrow">Catálogo</span>
        <h1 className="seccion__titulo">{categoria ?? 'Todos los productos'}</h1>
        <p className="text-suave mb-4">
          Elegí un producto para ver su detalle y agregarlo al carrito.
        </p>

        {!cargando && !error && (
          <div className="filtros" role="group" aria-label="Filtrar por categoría">
            <button
              className={`btn btn-sm btn-borde ${!categoria ? 'active' : ''}`}
              onClick={() => setParams({})}
            >
              Todos ({productos.length})
            </button>
            {categorias.map((c) => (
              <button
                key={c}
                className={`btn btn-sm btn-borde ${categoria === c ? 'active' : ''}`}
                onClick={() => setParams({ categoria: c })}
              >
                {c} ({productos.filter((p) => p.categoria === c).length})
              </button>
            ))}
          </div>
        )}

        {contenido}
      </div>
    </section>
  )
}

export default ItemListContainer
