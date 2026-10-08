/** Tarjeta de un integrante del equipo (se usa en el Footer). */
function TeamCard({ nombre, rol, avatar, github }) {
  return (
    <article className="tarjeta-persona">
      <img src={avatar} alt={`Avatar de ${nombre}`} loading="lazy" />
      <div>
        <h3 className="tarjeta-persona__nombre h6">{nombre}</h3>
        <p className="tarjeta-persona__rol">{rol}</p>
        {github && (
          <p className="tarjeta-persona__links mb-0">
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </p>
        )}
      </div>
    </article>
  )
}

export default TeamCard
