import { useState } from 'react'
import { AuthContext } from './AuthContext.js'
import usuarios from '../data/usuarios.json'
import { verificarPassword } from '../utils/password.js'

const CLAVE_SESION = 'mg-sesion'
const RE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function leerSesion() {
  try {
    const raw = sessionStorage.getItem(CLAVE_SESION)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

/**
 * Sesión simulada (sin servidor):
 * - Las cuentas de src/data/usuarios.json están "hardcodeadas" con la
 *   contraseña hasheada (PBKDF2 + sal, ver utils/password.js): si el correo
 *   coincide, se hashea lo que escribió el usuario y se compara con el JSON.
 * - Cualquier otro correo válido con 6+ caracteres entra como cliente.
 * La sesión vive en sessionStorage: se cierra al cerrar la pestaña.
 *
 * ⚠️ El JSON con los hashes viaja dentro del JavaScript del sitio: el hash
 * no se puede revertir, pero una contraseña débil se puede adivinar probando.
 * En un sistema real el login lo valida un backend.
 */
function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  const login = async (correoIngresado, password) => {
    const correo = correoIngresado.trim().toLowerCase()
    if (!RE_CORREO.test(correo)) throw new Error('Ingresá un correo válido.')

    const cuenta = usuarios.find((u) => u.correo.toLowerCase() === correo)
    let sesion
    if (cuenta) {
      const ok = await verificarPassword(password, cuenta)
      if (!ok) throw new Error('Contraseña incorrecta.')
      sesion = { correo: cuenta.correo, nombre: cuenta.nombre, rol: cuenta.rol }
    } else {
      if (password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.')
      sesion = { correo, nombre: correo.split('@')[0], rol: 'cliente' }
    }

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

  const esAdmin = usuario?.rol === 'admin'

  return (
    <AuthContext.Provider value={{ usuario, esAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
