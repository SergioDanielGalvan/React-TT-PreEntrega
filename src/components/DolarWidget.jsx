import { useDolar } from '../hooks/useDolar.js'
import { formatearPesos } from '../utils/formato.js'

/** Aviso del dólar oficial en la NavBar. Si la API falla, no se muestra. */
function DolarWidget() {
  const dolar = useDolar()
  if (!dolar) return null

  return (
    <span
      className="mg-tc"
      title={`Dólar oficial · Compra ${formatearPesos(dolar.compra)} / Venta ${formatearPesos(dolar.venta)}`}
    >
      💵 USD <span className="tc-valor">{formatearPesos(dolar.venta)}</span>
    </span>
  )
}

export default DolarWidget
