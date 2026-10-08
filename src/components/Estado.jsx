/** Mensajes de carga y error reutilizables. */
export function Cargando({ texto = 'Cargando…' }) {
  return (
    <div className="estado" role="status">
      <div className="spinner-rgb" aria-hidden="true" />
      <p className="mb-0">{texto}</p>
    </div>
  )
}

export function ErrorCarga({ mensaje, onReintentar }) {
  return (
    <div className="estado" role="alert">
      <p className="fs-2 mb-2" aria-hidden="true">⚠️</p>
      <p className="mb-1">{mensaje}</p>
      <small className="d-block mb-3">Verificá tu conexión o volvé a intentar.</small>
      {onReintentar && (
        <button className="btn btn-borde btn-sm" onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  )
}
