import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ScrollToTop from '../ScrollToTop.jsx'

/**
 * Estructura común a todas las páginas: Header (con la NavBar),
 * el contenido de la ruta activa (<Outlet />) y el Footer.
 */
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="mg-main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
