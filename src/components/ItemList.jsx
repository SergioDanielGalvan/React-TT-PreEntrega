import Item from './Item.jsx'

/** Grilla responsive que renderiza un <Item /> por producto. */
function ItemList({ productos, columnas = 'col-12 col-sm-6 col-lg-4 col-xl-3' }) {
  if (productos.length === 0) {
    return <p className="estado">No hay productos en esta categoría.</p>
  }

  return (
    <div className="row g-4">
      {productos.map((producto) => (
        <div className={columnas} key={producto.id}>
          <Item {...producto} />
        </div>
      ))}
    </div>
  )
}

export default ItemList
