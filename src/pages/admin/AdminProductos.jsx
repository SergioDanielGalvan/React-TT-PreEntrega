import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Cargando, ErrorCarga } from '../../components/Estado.jsx'
import { useCatalogo } from '../../hooks/useCatalogo.js'
import {
  descargarJSON,
  eliminarProducto,
  hayCambios,
  origenDe,
  restablecerCatalogo,
} from '../../utils/catalogo.js'
import { formatearPrecio } from '../../utils/formato.js'

const ETIQUETA_ORIGEN = {
  json: { texto: 'Original', clase: 'text-bg-secondary' },
  editado: { texto: 'Editado', clase: 'text-bg-warning' },
  nuevo: { texto: 'Nuevo', clase: 'text-bg-success' },
}

/** Panel de administración: listado (Read) con acceso a alta, edición y baja. */
function AdminProductos() {
  const { productos, cargando, error, recargar } = useCatalogo()
  const [busqueda, setBusqueda] = useState('')
  const [aviso, setAviso] = useState('')

  const filtrados = productos.filter((p) =>
    `${p.titulo} ${p.categoria}`.toLowerCase().includes(busqueda.trim().toLowerCase()),
  )

  const borrar = (p) => {
    if (!confirm(`¿Eliminar "${p.titulo}" del catálogo?`)) return
    eliminarProducto(p.id)
    setAviso(`"${p.titulo}" se eliminó.`)
    recargar()
  }

  const restablecer = () => {
    if (!confirm('¿Descartar todos los cambios y volver al productos.json original?')) return
    restablecerCatalogo()
    setAviso('Se restableció el catálogo original.')
    recargar()
  }

  return (
    <section className="seccion">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
          <div>
            <span className="seccion__eyebrow">Administración</span>
            <h1 className="seccion__titulo mb-0">Productos</h1>
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Link to="/admin/productos/nuevo" className="btn btn-acento">
              + Nuevo producto
            </Link>
            <button className="btn btn-borde" onClick={() => descargarJSON(productos)} disabled={cargando}>
              Exportar JSON
            </button>
            {hayCambios() && (
              <button className="btn btn-outline-danger" onClick={restablecer}>
                Restablecer
              </button>
            )}
          </div>
        </div>

        <p className="text-suave small">
          Los cambios se guardan en este navegador. Para publicarlos, usá <strong>Exportar JSON</strong> y
          reemplazá <code>public/productos.json</code> en el repositorio.
        </p>

        {aviso && (
          <div className="alert alert-success py-2 d-flex justify-content-between" role="status">
            <span>{aviso}</span>
            <button className="btn-close" onClick={() => setAviso('')} aria-label="Cerrar aviso" />
          </div>
        )}

        <input
          type="search"
          className="form-control mb-3 admin-buscador"
          placeholder="Buscar por nombre o categoría…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          aria-label="Buscar productos"
        />

        {cargando ? (
          <Cargando texto="Cargando catálogo…" />
        ) : error ? (
          <ErrorCarga mensaje={error} onReintentar={recargar} />
        ) : (
          <div className="table-responsive admin-tabla">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Categoría</th>
                  <th scope="col" className="text-end">Precio</th>
                  <th scope="col">Estado</th>
                  <th scope="col" className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((p) => {
                  const origen = ETIQUETA_ORIGEN[origenDe(p.id)]
                  return (
                    <tr key={p.id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img src={p.imagen} alt="" className="admin-miniatura" />
                          <div>
                            <Link to={`/producto/${p.id}`} className="carrito-fila__titulo">
                              {p.titulo}
                            </Link>
                            {p.destacado && <span className="badge text-bg-info ms-2">Destacado</span>}
                          </div>
                        </div>
                      </td>
                      <td className="text-suave">{p.categoria}</td>
                      <td className="text-end">{formatearPrecio(p.precio)}</td>
                      <td>
                        <span className={`badge ${origen.clase}`}>{origen.texto}</span>
                      </td>
                      <td className="text-end text-nowrap">
                        <Link to={`/admin/productos/editar/${p.id}`} className="btn btn-sm btn-borde me-2">
                          Editar
                        </Link>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => borrar(p)}>
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {filtrados.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-suave py-4">
                      No hay productos que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-suave small mt-2">{productos.length} productos en total.</p>
      </div>
    </section>
  )
}

export default AdminProductos
