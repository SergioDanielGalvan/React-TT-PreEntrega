import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

function Login() {
  const { usuario, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const destino = location.state?.desde ?? '/'

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Si ya hay sesión, no tiene sentido mostrar el formulario.
  if (usuario) return <Navigate to={destino} replace />

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      login(correo.trim(), password)
      navigate(destino, { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section className="seccion">
      <div className="container">
        <form className="mg-form" onSubmit={handleSubmit} noValidate>
          <h1 className="h3 mb-1">Ingresar</h1>
          <p className="text-suave small mb-4">
            {location.state?.desde
              ? 'Iniciá sesión para continuar con tu compra.'
              : 'Login de demostración: cualquier correo válido y una contraseña de 6+ caracteres.'}
          </p>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="form-label" htmlFor="correo">Correo electrónico</label>
            <input
              id="correo"
              type="email"
              className="form-control"
              placeholder="juan@perez.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="btn btn-acento w-100">
            Ingresar
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login
