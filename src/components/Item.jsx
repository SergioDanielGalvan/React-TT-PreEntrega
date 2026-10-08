import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato.js'

/**
 * Card reutilizable de un producto. Recibe todos sus datos por props
 * y enlaza a la vista de detalle /producto/:id.
 * Con marcarDestacado, los productos "destacado" llevan una estrella
 * (se usa en el catálogo; en la fila de destacados de Inicio no hace falta).
 */
function Item({ id, titulo, categoria, precio, imagen, specs = [], destacado = false, marcarDestacado = false }) {
  const conEstrella = marcarDestacado && destacado

  return (
    <article className={`card-producto h-100 ${conEstrella ? 'card-producto--destacado' : ''}`}>
      <Link to={`/producto/${id}`} className="card-producto__media" tabIndex={-1} aria-hidden="true">
        <span className="card-producto__cat">{categoria}</span>
        {conEstrella && (
          <span className="card-producto__destacado" title="Producto destacado">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
            </svg>
            Destacado
          </span>
        )}
        <img src={imagen} alt="" loading="lazy" />
      </Link>
      <div className="card-producto__cuerpo">
        <h3 className="card-producto__titulo">
          <Link to={`/producto/${id}`}>{titulo}</Link>
          {conEstrella && <span className="visually-hidden"> (producto destacado)</span>}
        </h3>
        <ul className="card-producto__specs">
          {specs.slice(0, 3).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="card-producto__pie">
          <span className="precio">{formatearPrecio(precio)}</span>
          <Link to={`/producto/${id}`} className="btn btn-borde btn-sm">
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  )
}

export default Item
