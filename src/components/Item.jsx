import { Link } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato.js'

/**
 * Card reutilizable de un producto. Recibe todos sus datos por props
 * y enlaza a la vista de detalle /producto/:id.
 */
function Item({ id, titulo, categoria, precio, imagen, specs = [] }) {
  return (
    <article className="card-producto h-100">
      <Link to={`/producto/${id}`} className="card-producto__media" tabIndex={-1} aria-hidden="true">
        <span className="card-producto__cat">{categoria}</span>
        <img src={imagen} alt="" loading="lazy" />
      </Link>
      <div className="card-producto__cuerpo">
        <h3 className="card-producto__titulo">
          <Link to={`/producto/${id}`}>{titulo}</Link>
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
