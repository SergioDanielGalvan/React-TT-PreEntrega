/*
  Hash de contraseñas con PBKDF2-SHA256 (Web Crypto API).

  - Irreversible: del hash no se puede volver a la contraseña.
  - Sal aleatoria por usuario: dos usuarios con la misma contraseña tienen
    hashes distintos y no sirven las tablas precalculadas (rainbow tables).
  - Muchas iteraciones: cada intento cuesta tiempo, lo que frena la fuerza bruta.

  Funciona en el navegador (localhost o https) y en Node 18+, por eso lo usa
  también scripts/hash-password.mjs para generar los hashes del JSON.
*/
export const ITERACIONES = 100_000

const aHex = (buffer) => [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, '0')).join('')
const deHex = (hex) => new Uint8Array(hex.match(/.{2}/g).map((b) => parseInt(b, 16)))

export function generarSal(bytes = 16) {
  return aHex(globalThis.crypto.getRandomValues(new Uint8Array(bytes)))
}

/** Devuelve el hash (hex) de la contraseña con esa sal e iteraciones. */
export async function hashPassword(password, salHex, iteraciones = ITERACIONES) {
  const subtle = globalThis.crypto?.subtle
  if (!subtle) {
    throw new Error('El navegador no permite verificar contraseñas acá (se necesita https o localhost).')
  }
  const clave = await subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt: deHex(salHex), iterations: iteraciones },
    clave,
    256,
  )
  return aHex(bits)
}

/** Compara sin cortar en el primer carácter distinto (tiempo constante). */
function igualesSeguro(a, b) {
  if (a.length !== b.length) return false
  let dif = 0
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return dif === 0
}

/** true si la contraseña corresponde a la cuenta { sal, hash, iteraciones }. */
export async function verificarPassword(password, cuenta) {
  const calculado = await hashPassword(password, cuenta.sal, cuenta.iteraciones ?? ITERACIONES)
  return igualesSeguro(calculado, cuenta.hash)
}
