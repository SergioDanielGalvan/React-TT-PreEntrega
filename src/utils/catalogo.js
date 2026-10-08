/*
  CRUD del catálogo sin backend.

  productos.json (en /public) es la base y nunca se modifica desde el
  navegador. Lo que hace el administrador se guarda como una lista de
  cambios en localStorage y se aplica encima de lo que trae el fetch:

    { altas: [productos nuevos],
      ediciones: { id: producto editado },
      bajas: [ids eliminados] }

  Con "Exportar JSON" se descarga el catálogo ya con los cambios aplicados,
  para reemplazar public/productos.json y publicarlos para todos.
*/
const CLAVE = 'mg-cambios-catalogo'

const VACIO = { altas: [], ediciones: {}, bajas: [] }

export function leerCambios() {
  try {
    const raw = localStorage.getItem(CLAVE)
    return raw ? { ...VACIO, ...JSON.parse(raw) } : { ...VACIO }
  } catch {
    return { ...VACIO }
  }
}

function guardar(cambios) {
  localStorage.setItem(CLAVE, JSON.stringify(cambios))
}

/** Devuelve el catálogo final: JSON − bajas, con ediciones, + altas. */
export function aplicarCambios(delJson) {
  const { altas, ediciones, bajas } = leerCambios()
  const ids = new Set(delJson.map((p) => p.id))
  return [
    ...delJson.filter((p) => !bajas.includes(p.id)).map((p) => ediciones[p.id] ?? p),
    ...altas.filter((p) => !ids.has(p.id)),
  ]
}

/** De dónde sale un producto: 'json', 'editado' o 'nuevo' (para el panel). */
export function origenDe(id) {
  const { altas, ediciones } = leerCambios()
  if (altas.some((p) => p.id === id)) return 'nuevo'
  if (ediciones[id]) return 'editado'
  return 'json'
}

/* ---------------- C · R · U · D ---------------- */

export function crearProducto(producto) {
  const c = leerCambios()
  guardar({ ...c, altas: [...c.altas, producto] })
}

export function actualizarProducto(producto) {
  const c = leerCambios()
  if (c.altas.some((p) => p.id === producto.id)) {
    guardar({ ...c, altas: c.altas.map((p) => (p.id === producto.id ? producto : p)) })
  } else {
    guardar({ ...c, ediciones: { ...c.ediciones, [producto.id]: producto } })
  }
}

export function eliminarProducto(id) {
  const c = leerCambios()
  if (c.altas.some((p) => p.id === id)) {
    guardar({ ...c, altas: c.altas.filter((p) => p.id !== id) })
  } else {
    const ediciones = { ...c.ediciones }
    delete ediciones[id]
    guardar({ ...c, ediciones, bajas: [...new Set([...c.bajas, id])] })
  }
}

/** Descarta todos los cambios y vuelve al productos.json original. */
export function restablecerCatalogo() {
  localStorage.removeItem(CLAVE)
}

export function hayCambios() {
  const { altas, ediciones, bajas } = leerCambios()
  return altas.length > 0 || Object.keys(ediciones).length > 0 || bajas.length > 0
}

/** "RTX 4070 Ti Súper" → "rtx-4070-ti-super-lq3k9" (id legible y único). */
export function generarId(titulo) {
  const base = titulo
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)
  return `${base || 'producto'}-${Date.now().toString(36).slice(-5)}`
}

/** Descarga el catálogo completo como productos.json. */
export function descargarJSON(productos) {
  const blob = new Blob([JSON.stringify(productos, null, 2)], { type: 'application/json' })
  const enlace = document.createElement('a')
  enlace.href = URL.createObjectURL(blob)
  enlace.download = 'productos.json'
  enlace.click()
  URL.revokeObjectURL(enlace.href)
}
