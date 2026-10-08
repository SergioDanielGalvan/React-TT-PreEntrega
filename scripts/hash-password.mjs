// Genera la entrada de usuarios.json para una contraseña.
//
//   npm run hash -- "miContraseña"
//
// Copiá "sal", "hash" e "iteraciones" en el usuario de src/data/usuarios.json.
// Cada ejecución usa una sal nueva, así que el hash sale distinto aunque la
// contraseña sea la misma: es lo esperado.
import { ITERACIONES, generarSal, hashPassword } from '../src/utils/password.js'

const password = process.argv[2]
if (!password) {
  console.error('Uso: npm run hash -- "contraseña"')
  process.exit(1)
}

const sal = generarSal()
const hash = await hashPassword(password, sal, ITERACIONES)
console.log(JSON.stringify({ sal, hash, iteraciones: ITERACIONES }, null, 2))
