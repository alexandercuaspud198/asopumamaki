import { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import routes from '../siteRoutes.json';

export default function SiteLayout() {
 const [openMenu, setOpenMenu] = useState(null);
 const { pathname } = useLocation();
 const mainRef = useRef(null);
 const toggleMenu = name => setOpenMenu(openMenu === name ? null : name);
 useEffect(() => {
   setOpenMenu(null);
   window.scrollTo({top: 0, behavior: 'instant'});
   const current = routes.find(route => route.path.replace(/\/$/, '') === pathname.replace(/\/$/, ''));
   document.title = (current?.title || 'Página no encontrada') + ' | Asociación Pumamaki';
   mainRef.current?.focus({preventScroll: true});
   const observer = new IntersectionObserver(entries => entries.forEach(entry => {
     if (entry.isIntersecting) { entry.target.classList.add('animate-in'); observer.unobserve(entry.target); }
   }), { threshold: 0.1 });
   document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
   return () => observer.disconnect();
 }, [pathname]);
 return <div className="min-h-screen bg-page" onKeyDown={event => {if(event.key === 'Escape') setOpenMenu(null);}}>
 <header className="network-header">

        <div className="nav-wrapper">
          <div className="flex items-center gap-3">
            <img
              src="https://customer-assets.emergentagent.com/job_1f02e8ad-74c3-41b3-a964-009dd04e8d7a/artifacts/qqgwka27_Imagen1-removebg-preview.png"
              alt="Logo Pumamaki"
              className="h-12 w-auto"
            />
          </div>
          <nav className="network-nav">
            <NavLink end to="/" className="network-nav-link" onClick={() => setOpenMenu(null)}>Inicio</NavLink>

            <div className="nav-dropdown">
              <button
                aria-expanded={openMenu === "nosotros"} onClick={() => toggleMenu('nosotros')}
                className="network-nav-link flex items-center gap-1"
              >
                Nosotros <ChevronDown className="w-4 h-4" />
              </button>
              {openMenu === 'nosotros' && (
                <div className="dropdown-menu">
                  <NavLink end to="/historia/" className="dropdown-item" onClick={() => setOpenMenu(null)}>Historia</NavLink>
                  <NavLink end to="/nosotros/" className="dropdown-item" onClick={() => setOpenMenu(null)}>Misión y Visión</NavLink>
                </div>
              )}
            </div>

            <div className="nav-dropdown">
              <button
                aria-expanded={openMenu === "trabajo"} onClick={() => toggleMenu('trabajo')}
                className="network-nav-link flex items-center gap-1"
              >
                Nuestro Trabajo <ChevronDown className="w-4 h-4" />
              </button>
              {openMenu === 'trabajo' && (
                <div className="dropdown-menu">
                  <NavLink end to="/agroecologia/" className="dropdown-item" onClick={() => setOpenMenu(null)}>Agroecología</NavLink>
                  <NavLink end to="/apicultura/" className="dropdown-item" onClick={() => setOpenMenu(null)}>Apicultura</NavLink>
                  <NavLink end to="/restauracion/" className="dropdown-item" onClick={() => setOpenMenu(null)}>Restauración</NavLink>
                </div>
              )}
            </div>

            <NavLink end to="/proyectos/" className="network-nav-link" onClick={() => setOpenMenu(null)}>Proyectos</NavLink>
            <NavLink end to="/productos/" className="network-nav-link" onClick={() => setOpenMenu(null)}>Productos</NavLink>
            <NavLink end to="/galeria/" className="network-nav-link" onClick={() => setOpenMenu(null)}>Galería</NavLink>
            <NavLink end to="/contacto/" className="network-nav-link" onClick={() => setOpenMenu(null)}>Contacto</NavLink>
          </nav>
        </div>
      </header>
 <main ref={mainRef} tabIndex={-1} className={pathname === '/' ? 'site-main' : 'site-main inner-page'}><Outlet /></main>
 <footer className="footer">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://customer-assets.emergentagent.com/job_1f02e8ad-74c3-41b3-a964-009dd04e8d7a/artifacts/qqgwka27_Imagen1-removebg-preview.png"
                  alt="Logo Pumamaki"
                  className="h-10 w-auto"
                />
                <span className="text-xl font-semibold text-text-primary">Pumamaki</span>
              </div>
              <p className="text-text-secondary">Reviviendo el verde de nuestros campos</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li><NavLink end to="/historia/" className="footer-link" onClick={() => setOpenMenu(null)}>Historia</NavLink></li>
                <li><NavLink end to="/nosotros/" className="footer-link" onClick={() => setOpenMenu(null)}>Misión y Visión</NavLink></li>
                <li><NavLink end to="/trabajo/" className="footer-link" onClick={() => setOpenMenu(null)}>Nuestro Trabajo</NavLink></li>
                <li><NavLink end to="/proyectos/" className="footer-link" onClick={() => setOpenMenu(null)}>Proyectos</NavLink></li>
                <li><NavLink end to="/galeria/" className="footer-link" onClick={() => setOpenMenu(null)}>Galería</NavLink></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Ubicación</h4>
              <p className="text-text-secondary">Vereda Guan Puente Alto<br />Guachucal, Nariño<br />Colombia</p>
            </div>
          </div>
          <div className="border-t border-border-light pt-8 text-center">
            <p className="text-text-light">© {new Date().getFullYear()} Asociación Pumamaki. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
 </div>;
}
