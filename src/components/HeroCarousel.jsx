import { useEffect, useState } from 'react'

const SLIDES = [
  { img: '/imagenes/slider/slice1.jpg', texto: 'Placas madre gamer' },
  { img: '/imagenes/slider/slice2.jpg', texto: 'Tarjetas gráficas de última generación' },
  { img: '/imagenes/slider/slice3.jpg', texto: 'Gabinetes gamer' },
]

/** Carrusel con autoplay hecho con useState + useEffect (sin JS de Bootstrap). */
function HeroCarousel({ intervalo = 5000 }) {
  const [actual, setActual] = useState(0)
  const [pausado, setPausado] = useState(false)

  const ir = (i) => setActual((i + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    if (pausado) return
    const id = setInterval(() => setActual((a) => (a + 1) % SLIDES.length), intervalo)
    return () => clearInterval(id)
  }, [pausado, intervalo])

  return (
    <div
      className="slice-carousel"
      aria-roledescription="carrusel"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="slice-carousel__pista" style={{ transform: `translateX(-${actual * 100}%)` }}>
        {SLIDES.map((s, i) => (
          <div className="slice-carousel__item" key={s.img} aria-hidden={i !== actual}>
            <img src={s.img} alt={s.texto} />
            <span className="slice-carousel__caption">{s.texto}</span>
          </div>
        ))}
      </div>

      <button className="slice-carousel__ctrl slice-carousel__ctrl--prev" onClick={() => ir(actual - 1)} aria-label="Anterior">
        ‹
      </button>
      <button className="slice-carousel__ctrl slice-carousel__ctrl--next" onClick={() => ir(actual + 1)} aria-label="Siguiente">
        ›
      </button>

      <div className="slice-carousel__dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.img}
            className={i === actual ? 'activo' : ''}
            onClick={() => ir(i)}
            aria-label={`Imagen ${i + 1}`}
            aria-current={i === actual}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel
