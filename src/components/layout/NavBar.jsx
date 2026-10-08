import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import CartWidget from '../CartWidget.jsx'
import DolarWidget from '../DolarWidget.jsx'
import ThemeToggle from '../ThemeToggle.jsx'
import { useAuth } from '../../hooks/useAuth.js'

const SECCIONES = [
  { to: '/', texto: 'Inicio', end: true },
  { to: '/productos', texto: 'Productos' },
  { to: '/contacto', texto: 'Contacto' },
]

function NavBar() {
  // El menú hamburguesa se controla con estado de React (sin el JS de Bootstrap)
  const [abierto, setAbierto] = useState(false)
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const cerrar = () => setAbierto(false)

  const cerrarSesion = () => {
    logout()
    cerrar()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-expand-lg mg-nav" aria-label="Navegación principal">
      <div className="container">
        <Link className="navbar-brand marca d-flex align-items-center gap-2" to="/" onClick={cerrar}>
          <img src="/imagenes/logo-mg.svg" alt="" width="36" height="26" />
          <span>Mundo Gaming</span>
        </Link>

        <div className="d-flex align-items-center gap-3 order-lg-last">
          <CartWidget onClick={cerrar} />
          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menuPrincipal"
            aria-expanded={abierto}
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setAbierto(!abierto)}
          >
            {abierto ? '✕' : '☰'}
          </button>
        </div>

        <div className={`collapse navbar-collapse ${abierto ? 'show' : ''}`} id="menuPrincipal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {SECCIONES.map((s) => (
              <li className="nav-item" key={s.to}>
                {/* NavLink agrega la clase "active" a la sección actual */}
                <NavLink className="nav-link" to={s.to} end={s.end} onClick={cerrar}>
                  {s.texto}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-wrap align-items-center gap-3 me-lg-3">
            <DolarWidget />
            <ThemeToggle />
            {usuario ? (
              <span className="d-flex align-items-center gap-2">
                <span className="text-suave small">
                  Hola, <strong className="text-body">{usuario.nombre}</strong>
                </span>
                <button className="btn btn-sm btn-borde" onClick={cerrarSesion}>
                  Salir
                </button>
              </span>
            ) : (
              <NavLink className="nav-link" to="/login" onClick={cerrar}>
                Ingresar
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
