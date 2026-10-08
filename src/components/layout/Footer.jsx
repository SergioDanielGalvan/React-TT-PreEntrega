import { Link } from 'react-router-dom'
import TeamCard from './TeamCard.jsx'
import equipo from '../../data/equipo.json'

function Footer() {
  return (
    <footer className="mg-footer">
      <div className="container">
        <div className="row g-4">
          {/* Información de la empresa */}
          <div className="col-12 col-lg-4">
            <h2 className="d-flex align-items-center gap-2">
              <img src="/imagenes/logo-mg.svg" alt="" width="30" height="22" />
              Mundo Gaming
            </h2>
            <p className="mb-2">
              Resellers de las principales marcas de hardware gamer desde hace más de 10 años.
              Showroom con lo último en tecnología, venta al público y al gremio.
            </p>
            <address className="mb-1">📍 Av. Carabobo 25, CABA, Argentina</address>
            <p className="mb-1">🕘 Lunes a viernes de 9 a 18 h</p>
            <p className="mb-0">
              ✉️ <Link to="/contacto">Escribinos desde el formulario</Link>
            </p>
          </div>

          {/* Tarjetas del equipo */}
          <div className="col-12 col-lg-8">
            <h2>Nuestro equipo</h2>
            <div className="equipo-grid">
              {equipo.map((persona) => (
                <TeamCard key={persona.id} {...persona} />
              ))}
            </div>
          </div>
        </div>

        <div className="mg-footer__legal d-flex flex-wrap justify-content-between gap-2">
          <span>&copy; {new Date().getFullYear()} Mundo Gaming · Derechos reservados</span>
          <nav className="d-flex gap-3" aria-label="Enlaces del pie">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/carrito">Carrito</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
