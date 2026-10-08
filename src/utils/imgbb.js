/*
  Subida de imágenes a ImgBB (https://api.imgbb.com/).
  La API key se lee de la variable de entorno VITE_IMGBB_KEY
  (archivo .env.local en desarrollo, Settings → Environment Variables en Vercel).

  ⚠️ Todo lo que empieza con VITE_ queda dentro del JavaScript que descarga
  el navegador, así que la key es visible para quien inspeccione el sitio.
  Para un TP está bien; en un sitio real la subida se hace desde un backend.
*/
const IMGBB_URL = 'https://api.imgbb.com/1/upload'

export const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY

export const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
export const TAMANO_MAXIMO_MB = 5

/** Valida un archivo antes de subirlo. Devuelve un mensaje de error o null. */
export function validarImagen(archivo) {
  if (!archivo) return 'Elegí una imagen.'
  if (!TIPOS_PERMITIDOS.includes(archivo.type)) return 'La imagen tiene que ser JPG, PNG, WEBP o GIF.'
  if (archivo.size > TAMANO_MAXIMO_MB * 1024 * 1024) return `La imagen no puede superar los ${TAMANO_MAXIMO_MB} MB.`
  return null
}

/**
 * Sube el archivo y devuelve { url, thumb, deleteUrl }.
 * Lanza un Error con un mensaje legible si algo falla.
 */
export async function subirImagen(archivo, nombre) {
  if (!IMGBB_KEY) {
    throw new Error('Falta la API key de ImgBB (VITE_IMGBB_KEY). Revisá el README.')
  }

  const datos = new FormData()
  datos.append('image', archivo)
  if (nombre) datos.append('name', nombre)

  const respuesta = await fetch(`${IMGBB_URL}?key=${IMGBB_KEY}`, {
    method: 'POST',
    body: datos,
  })

  const json = await respuesta.json().catch(() => null)
  if (!respuesta.ok || !json?.success) {
    const detalle = json?.error?.message ?? `HTTP ${respuesta.status}`
    throw new Error(`ImgBB rechazó la imagen: ${detalle}`)
  }

  return {
    url: json.data.url,
    thumb: json.data.thumb?.url ?? json.data.url,
    deleteUrl: json.data.delete_url,
  }
}
