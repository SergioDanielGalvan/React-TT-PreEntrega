import { Link } from 'react-router-dom'
import { useForm, ValidationError } from '@formspree/react'

// Mismo formulario de Formspree que usaba el sitio HTML de Mundo Gaming.
const FORMSPREE_ID = 'meenrgll'

/** Contacto con @formspree/react (patrón tomado del TP grupal). */
function Contacto() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID)

  return (
    <section className="seccion">
      <div className="container">
        <div className="text-center mb-4">
          <span className="seccion__eyebrow">Hablemos</span>
          <h1 className="seccion__titulo">Formulario de contacto</h1>
          <p className="text-suave">¿Dudas con tu armado? Escribinos.</p>
        </div>

        {state.succeeded ? (
          <div className="mg-form text-center">
            <p className="fs-1 mb-2" aria-hidden="true">✅</p>
            <h2 className="h4">¡Mensaje enviado!</h2>
            <p className="text-suave">Te respondemos a la brevedad.</p>
            <Link to="/productos" className="btn btn-acento">
              Seguir viendo productos
            </Link>
          </div>
        ) : (
          <form className="mg-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="nombre">Nombre</label>
              <input className="form-control" id="nombre" name="nombre" placeholder="Juan Pérez" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">Correo electrónico</label>
              <input className="form-control" id="email" type="email" name="email" placeholder="juan@perez.com" required />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-danger small" />
            </div>
            <div className="mb-4">
              <label className="form-label" htmlFor="mensaje">Mensaje</label>
              <textarea className="form-control" id="mensaje" name="mensaje" rows="4" placeholder="Contanos en qué te ayudamos" required />
              <ValidationError prefix="Mensaje" field="mensaje" errors={state.errors} className="text-danger small" />
            </div>
            <ValidationError errors={state.errors} className="alert alert-danger py-2" />
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-acento" disabled={state.submitting}>
                {state.submitting ? 'Enviando…' : 'Enviar mensaje'}
              </button>
              <button type="reset" className="btn btn-borde">
                Limpiar
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

export default Contacto
