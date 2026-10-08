import { useState } from 'react'
import { AuthContext } from './AuthContext.js'

const CLAVE_SESION = 'mg-sesion'

function leerSesion() {
  try {
    const raw = sessionStorage.getItem(CLAVE_SESION)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Sesión simulada: no hay servidor, así que cualquier correo válido con
 * una contraseña de 6+ caracteres "inicia sesión". La sesión se guarda en
 * sessionStorage, por lo que se cierra al cerrar la pestaña.
 */
function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  const login = (correo, password) => {
    const correoOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
    if (!correoOk) throw new Error('Ingresá un correo válido.')
    if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.')

    const nombre = correo.split('@')[0]
    const sesion = { correo, nombre }
    try {
      sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
    } catch {
      /* sin storage: la sesión dura mientras no se recargue */
    }
    setUsuario(sesion)
    return sesion
  }

  const logout = () => {
    try {
      sessionStorage.removeItem(CLAVE_SESION)
    } catch {
      /* nada que limpiar */
    }
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
