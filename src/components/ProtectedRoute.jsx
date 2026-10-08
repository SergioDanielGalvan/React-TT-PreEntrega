import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

/**
 * Envuelve rutas que requieren sesión. Si no hay usuario, redirige a
 * /login recordando a dónde quería ir, para volver después de ingresar.
 */
function ProtectedRoute({ children }) {
  const { usuario } = useAuth()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }
  return children
}

export default ProtectedRoute
