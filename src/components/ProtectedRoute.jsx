import { Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

/**
 * Envuelve rutas que requieren sesión.
 * - Sin sesión: redirige a /login recordando a dónde quería ir.
 * - Con soloAdmin y un usuario que no es admin: muestra "acceso denegado".
 */
function ProtectedRoute({ children, soloAdmin = false }) {
  const { usuario, esAdmin } = useAuth()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }

  if (soloAdmin && !esAdmin) {
    return (
      <section className="seccion text-center">
        <div className="container">
          <p className="no-encontrado__codigo">403</p>
          <h1 className="h3">Acceso solo para administradores</h1>
          <p className="text-suave">
            Ingresaste como <strong>{usuario.correo}</strong>, que no tiene permisos de administración.
          </p>
          <Link to="/" className="btn btn-acento">
            Volver al inicio
          </Link>
        </div>
      </section>
    )
  }

  return children
}

export default ProtectedRoute
