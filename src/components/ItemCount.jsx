/** Selector de cantidad controlado (− / número / +). */
function ItemCount({ cantidad, setCantidad, min = 1, max = 10 }) {
  return (
    <div className="item-count" role="group" aria-label="Cantidad">
      <button
        type="button"
        onClick={() => setCantidad(cantidad - 1)}
        disabled={cantidad <= min}
        aria-label="Restar uno"
      >
        −
      </button>
      <span aria-live="polite">{cantidad}</span>
      <button
        type="button"
        onClick={() => setCantidad(cantidad + 1)}
        disabled={cantidad >= max}
        aria-label="Sumar uno"
      >
        +
      </button>
    </div>
  )
}

export default ItemCount
