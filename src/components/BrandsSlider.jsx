import marcas from '../data/marcas.json'

/**
 * Marquee de logos. La pista lleva la lista dos veces: al desplazarla
 * -50% el segundo set ocupa el lugar del primero y el loop es continuo.
 */
function BrandsSlider() {
  return (
    <section className="marcas-slider" aria-label="Marcas disponibles">
      <div className="marcas-track">
        {[...marcas, ...marcas].map((m, i) => {
          const duplicado = i >= marcas.length
          return (
            <div className="marca-chip" key={`${m.nombre}-${i}`} aria-hidden={duplicado || undefined}>
              <img src={m.logo} alt={duplicado ? '' : m.nombre} loading="lazy" />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default BrandsSlider
