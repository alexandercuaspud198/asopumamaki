import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import routes from '../siteRoutes.json';

export default function SiteLayout() {
 const [openMenu, setOpenMenu] = useState(null);
 const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const { pathname } = useLocation();
 const mainRef = useRef(null);
 const headerRef = useRef(null);
 const mobileToggleRef = useRef(null);
 const submenuRefs = useRef({});
 const closeMenus = () => {
   setOpenMenu(null);
   setMobileMenuOpen(false);
 };
 const toggleMenu = name => setOpenMenu(current => current === name ? null : name);
 const handleEscape = event => {
   if (event.key !== 'Escape') return;
   if (openMenu) {
     submenuRefs.current[openMenu]?.focus();
     setOpenMenu(null);
   } else if (mobileMenuOpen) {
     mobileToggleRef.current?.focus();
     setMobileMenuOpen(false);
   }
 };
 useEffect(() => {
   const handleOutsideClick = event => {
     if (!headerRef.current?.contains(event.target)) {
       setOpenMenu(null);
       setMobileMenuOpen(false);
     }
   };
   const desktop = window.matchMedia('(min-width: 1024px)');
   const handleResize = () => {
     setOpenMenu(null);
     setMobileMenuOpen(false);
   };
   document.addEventListener('pointerdown', handleOutsideClick);
   desktop.addEventListener('change', handleResize);
   return () => {
     document.removeEventListener('pointerdown', handleOutsideClick);
     desktop.removeEventListener('change', handleResize);
   };
 }, []);
 useEffect(() => {
   setOpenMenu(null);
   setMobileMenuOpen(false);
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
 return <div className="min-h-screen bg-page">
 <header
   ref={headerRef}
   className="network-header"
   onKeyDown={handleEscape}
   onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenus(); }}
 >

        <div className="nav-wrapper">
          <Link to="/" className="site-logo" aria-label="Pumamaki, ir al inicio" onClick={closeMenus}>
            <img
              src={`${process.env.PUBLIC_URL}/images/optimized/logo-pumamaki.webp`}
              alt="Logo Pumamaki"
              width="416"
              height="233"
              className="site-logo-image"
            />
          </Link>
          <button
            ref={mobileToggleRef}
            type="button"
            className="mobile-menu-toggle"
            aria-expanded={mobileMenuOpen}
            aria-controls="site-navigation"
            onClick={() => { setMobileMenuOpen(current => !current); setOpenMenu(null); }}
          >
            {mobileMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
            {mobileMenuOpen ? 'Cerrar' : 'Menú'}
          </button>
          <nav id="site-navigation" aria-label="Navegación principal" className={`network-nav${mobileMenuOpen ? ' is-open' : ''}`}>
            <NavLink end to="/" className="network-nav-link" onClick={closeMenus}>Inicio</NavLink>

            <div className="nav-dropdown">
              <button
                ref={element => { submenuRefs.current.nosotros = element; }}
                type="button"
                aria-controls="submenu-nosotros"
                aria-expanded={openMenu === "nosotros"} onClick={() => toggleMenu('nosotros')}
                className={`network-nav-link flex items-center gap-1${['/historia/', '/nosotros/'].includes(pathname) ? ' is-current-section' : ''}`}
              >
                Nosotros <ChevronDown className="w-4 h-4" />
              </button>
              {openMenu === 'nosotros' && (
                <div id="submenu-nosotros" className="dropdown-menu">
                  <NavLink end to="/historia/" className="dropdown-item" onClick={closeMenus}>Historia</NavLink>
                  <NavLink end to="/nosotros/" className="dropdown-item" onClick={closeMenus}>Misión y Visión</NavLink>
                </div>
              )}
            </div>

            <div className="nav-dropdown">
              <button
                ref={element => { submenuRefs.current.trabajo = element; }}
                type="button"
                aria-controls="submenu-trabajo"
                aria-expanded={openMenu === "trabajo"} onClick={() => toggleMenu('trabajo')}
                className={`network-nav-link flex items-center gap-1${['/trabajo/', '/agroecologia/', '/apicultura/', '/restauracion/'].includes(pathname) ? ' is-current-section' : ''}`}
              >
                Nuestro Trabajo <ChevronDown className="w-4 h-4" />
              </button>
              {openMenu === 'trabajo' && (
                <div id="submenu-trabajo" className="dropdown-menu">
                  <NavLink end to="/trabajo/" className="dropdown-item" onClick={closeMenus}>Ver todo nuestro trabajo</NavLink>
                  <NavLink end to="/agroecologia/" className="dropdown-item" onClick={closeMenus}>Agroecología</NavLink>
                  <NavLink end to="/apicultura/" className="dropdown-item" onClick={closeMenus}>Apicultura</NavLink>
                  <NavLink end to="/restauracion/" className="dropdown-item" onClick={closeMenus}>Restauración</NavLink>
                </div>
              )}
            </div>

            <NavLink end to="/proyectos/" className="network-nav-link" onClick={closeMenus}>Proyectos</NavLink>
            <NavLink end to="/productos/" className="network-nav-link" onClick={closeMenus}>Productos</NavLink>
            <NavLink end to="/galeria/" className="network-nav-link" onClick={closeMenus}>Galería</NavLink>
            <NavLink end to="/contacto/" className="network-nav-link" onClick={closeMenus}>Contacto</NavLink>
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
                  src={`${process.env.PUBLIC_URL}/images/optimized/logo-pumamaki.webp`}
                  alt="Logo Pumamaki"
                  width="416"
                  height="233"
                  loading="lazy"
                  decoding="async"
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
