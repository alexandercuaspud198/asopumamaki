import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Leaf, Droplets, Trees, Sprout, Heart, Users, Target, Eye, BookOpen, Mountain, Bug, Wheat, Phone, Mail, MapPin, Facebook, ChevronDown, Youtube } from 'lucide-react';

const Home = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const workLines = [
    {
      icon: <Wheat className="w-12 h-12" />,
      title: 'Agroecología',
      description: 'Promovemos chagras ancestrales, conservación de semillas nativas, suelos sanos y agricultura sostenible para garantizar la seguridad alimentaria de nuestras comunidades.',
      features: ['Chagras ancestrales', 'Semillas nativas', 'Suelos sanos', 'Agricultura sostenible']
    },
    {
      icon: <Bug className="w-12 h-12" />,
      title: 'Apicultura',
      description: 'Fomentamos la apicultura para la biodiversidad, polinización en ecosistemas de alta montaña, inclusión de mujeres y jóvenes indígenas, y producción apícola para la economía local.',
      features: ['Biodiversidad', 'Polinización', 'Inclusión social', 'Economía local']
    },
    {
      icon: <Trees className="w-12 h-12" />,
      title: 'Restauración Ambiental',
      description: 'Nuestra línea principal enfocada en reforestación con árboles nativos, recuperación de áreas degradadas, protección de fuentes de agua y mitigación del cambio climático.',
      features: ['Reforestación', 'Áreas degradadas', 'Fuentes de agua', 'Cambio climático'],
      isMain: true
    }
  ];

  const projects = [
    {
      title: 'Promesas Climáticas',
      description: 'Compromiso con la acción climática mediante la restauración de ecosistemas y prácticas sostenibles que contribuyen a la mitigación del cambio climático.'
    },
    {
      title: 'Impulso Verde',
      description: 'Iniciativa que promueve el desarrollo sostenible y la economía verde en nuestras comunidades, fortaleciendo las prácticas agroecológicas tradicionales.'
    },
    {
      title: 'A Ciencia Cierta',
      description: 'Proyecto de investigación y monitoreo científico de la biodiversidad del páramo, utilizando tecnología y conocimiento ancestral.'
    },
    {
      title: 'Páramos para la Vida',
      description: 'Programa integral de conservación y restauración de ecosistemas de páramo, protegiendo las fuentes de agua y la biodiversidad única de estos territorios.'
    }
  ];

  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1729865638468-bae23d8de8a1', alt: 'Paisaje del páramo' },
    { url: 'https://images.unsplash.com/photo-1727514851322-82de7818e379', alt: 'Comunidad indígena' },
    { url: 'https://images.unsplash.com/photo-1758390282329-0d93cf35d4ad', alt: 'Agricultura sostenible' },
    { url: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg', alt: 'Siembra de árboles' },
    { url: 'https://images.unsplash.com/photo-1590334280735-e8121293dbf6', alt: 'Apicultura' },
    { url: 'https://images.unsplash.com/photo-1590334280249-a8f0c9f46a1b', alt: 'Trabajo con abejas' },
    { url: 'https://images.pexels.com/photos/9324330/pexels-photo-9324330.jpeg', alt: 'Restauración ambiental' },
    { url: 'https://images.pexels.com/photos/2260933/pexels-photo-2260933.jpeg', alt: 'Colmenas' }
  ];

  return (
    <div className="min-h-screen bg-page">
      {/* Header/Navbar */}
      <header className="network-header">
        <div className="nav-wrapper">
          <div className="flex items-center gap-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_1f02e8ad-74c3-41b3-a964-009dd04e8d7a/artifacts/qqgwka27_Imagen1-removebg-preview.png" 
              alt="Logo Pumamaki" 
              className="h-12 w-auto"
            />
            <span className="network-logo">Pumamaki</span>
          </div>
          <nav className="network-nav">
            <button onClick={() => scrollToSection('inicio')} className="network-nav-link">Inicio</button>
            
            <div className="nav-dropdown">
              <button 
                onClick={() => toggleMenu('nosotros')}
                className="network-nav-link flex items-center gap-1"
              >
                Nosotros <ChevronDown className="w-4 h-4" />
              </button>
              {openMenu === 'nosotros' && (
                <div className="dropdown-menu">
                  <button onClick={() => { scrollToSection('historia'); setOpenMenu(null); }} className="dropdown-item">Historia</button>
                  <button onClick={() => { scrollToSection('nosotros'); setOpenMenu(null); }} className="dropdown-item">Misión y Visión</button>
                </div>
              )}
            </div>

            <div className="nav-dropdown">
              <button 
                onClick={() => toggleMenu('trabajo')}
                className="network-nav-link flex items-center gap-1"
              >
                Nuestro Trabajo <ChevronDown className="w-4 h-4" />
              </button>
              {openMenu === 'trabajo' && (
                <div className="dropdown-menu">
                  <button onClick={() => { scrollToSection('lineas'); setOpenMenu(null); }} className="dropdown-item">Agroecología</button>
                  <button onClick={() => { scrollToSection('lineas'); setOpenMenu(null); }} className="dropdown-item">Apicultura</button>
                  <button onClick={() => { scrollToSection('lineas'); setOpenMenu(null); }} className="dropdown-item">Restauración</button>
                </div>
              )}
            </div>

            <button onClick={() => scrollToSection('proyectos')} className="network-nav-link">Proyectos</button>
            <button onClick={() => scrollToSection('galeria')} className="network-nav-link">Galería</button>
            <button onClick={() => scrollToSection('contacto')} className="network-nav-link">Contacto</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title fade-in">Protegiendo el páramo, fortaleciendo la vida</h1>
          <p className="hero-subtitle fade-in">Asociación indígena agroecológica "Pumamaki"</p>
          <p className="hero-tagline fade-in">Reviviendo el verde de nuestros campos</p>
          <Button 
            onClick={() => scrollToSection('nosotros')} 
            className="btn-primary fade-in"
          >
            Conoce Nuestro Trabajo
          </Button>
        </div>
      </section>

      {/* Historia */}
      <section id="historia" className="section-padding bg-subtle">
        <div className="container-custom">
          <h2 className="section-title fade-in">Nuestra Historia</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="network-card fade-in">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6 text-body-medium text-text-secondary leading-relaxed">
                  <p>
                    La Asociación Pumamaki nació en el año 2016 como una iniciativa comunitaria inspirada en el cuidado del páramo, la protección del agua y el fortalecimiento cultural del pueblo Pasto. Su creación surgió de la necesidad de responder a los desafíos ambientales del territorio y de unir esfuerzos para conservar los ecosistemas que sostienen la vida en Guachucal y Muellamués.
                  </p>
                  <p>
                    Desde su fundación, Pumamaki se ha caracterizado por ser una organización con un fuerte liderazgo femenino. Actualmente está conformada por 24 socios, de los cuales 18 son mujeres que aportan su conocimiento, experiencia y compromiso en procesos de conservación, producción sostenible, gobernanza comunitaria y transmisión de saberes ancestrales.
                  </p>
                  <p className="font-semibold text-text-primary">A lo largo de su trayectoria, Pumamaki ha impulsado acciones fundamentales para el bienestar del territorio, como:</p>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Protección y restauración del ecosistema de páramo.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Monitoreo comunitario de la biodiversidad.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Fortalecimiento de prácticas productivas sostenibles como la chagra, la apicultura y viveros comunitarios.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Gestión de conflictos socioambientales y planificación territorial.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Formación de mujeres, jóvenes y familias en temas ambientales, culturales y organizativos.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Integración de saberes ancestrales con herramientas técnicas modernas para la gestión ambiental.</span>
                    </li>
                  </ul>
                  <p className="text-lg font-semibold text-text-primary mt-8">
                    Hoy, la Asociación Pumamaki es un referente regional en conservación y trabajo comunitario. Su labor continúa guiada por el respeto a la Madre Tierra, el compromiso con las futuras generaciones y la convicción de que el territorio se cuida colectivamente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quiénes Somos */}
      <section id="nosotros" className="section-padding">
        <div className="container-custom">
          <h2 className="section-title fade-in">¿Quiénes Somos?</h2>
          <div className="grid md:grid-cols-1 gap-8 mb-12">
            <Card className="network-card fade-in">
              <CardContent className="p-8">
                <p className="text-body-large text-text-secondary leading-relaxed">
                  La Asociación indígena agroecológica Pumamaki trabaja en la recuperación de ecosistemas estratégicos de páramo y alta montaña en Muellamués, Nariño. A través de la siembra de árboles nativos, restauración ecológica y prácticas agrícolas sostenibles, protegemos la biodiversidad y las fuentes de agua, mitigando el cambio climático y garantizando el bienestar de la comunidad indígena.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="network-card fade-in hover-lift">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="icon-circle">
                    <Target className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="card-title">Misión</h3>
                <p className="card-description">
                  Recuperar y conservar los ecosistemas de páramo y alta montaña mediante prácticas agroecológicas ancestrales y restauración ambiental, fortaleciendo la identidad cultural y el bienestar de nuestra comunidad indígena.
                </p>
              </CardContent>
            </Card>

            <Card className="network-card fade-in hover-lift">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="icon-circle">
                    <Eye className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="card-title">Visión</h3>
                <p className="card-description">
                  Ser referente en conservación de ecosistemas de páramo y prácticas agroecológicas sostenibles, contribuyendo a la mitigación del cambio climático y al desarrollo integral de nuestras comunidades.
                </p>
              </CardContent>
            </Card>

            <Card className="network-card fade-in hover-lift">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <div className="icon-circle">
                    <Heart className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="card-title">Valores</h3>
                <ul className="card-description space-y-2">
                  <li className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-brand-primary" />
                    <span>Comunitario</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-primary" />
                    <span>Ancestral</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-brand-primary" />
                    <span>Sostenible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Líneas de Trabajo */}
      <section id="lineas" className="section-padding bg-section">
        <div className="container-custom">
          <h2 className="section-title fade-in">Nuestras Líneas de Trabajo</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {workLines.map((line, index) => (
              <Card 
                key={index} 
                className={`network-card fade-in hover-lift ${line.isMain ? 'card-highlight' : ''}`}
              >
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="icon-circle-large">
                      {line.icon}
                    </div>
                  </div>
                  <h3 className="card-title">{line.title}</h3>
                  {line.isMain && (
                    <span className="badge-main">Línea Principal</span>
                  )}
                  <p className="card-description mb-6">{line.description}</p>
                  <div className="space-y-2">
                    {line.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-text-secondary text-sm">
                        <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="section-padding">
        <div className="container-custom">
          <h2 className="section-title fade-in">Nuestros Proyectos</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="network-card fade-in hover-lift">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="icon-circle">
                      <Mountain className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="card-title mb-3">{project.title}</h3>
                      <p className="card-description">{project.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="section-padding bg-subtle">
        <div className="container-custom">
          <h2 className="section-title fade-in">Galería</h2>
          <p className="text-center text-body-medium text-text-secondary mb-12 fade-in">Momentos de nuestro trabajo en el páramo</p>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item fade-in hover-scale">
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="gallery-image"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto y YouTube */}
      <section id="contacto" className="section-padding">
        <div className="container-custom">
          <h2 className="section-title fade-in">Contáctanos</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="fade-in">
              <h3 className="text-2xl font-semibold text-text-primary mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="icon-circle">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Teléfono</p>
                    <p className="text-text-secondary">3215654899</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="icon-circle">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Correo Electrónico</p>
                    <p className="text-text-secondary">Asopumamaki22@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="icon-circle">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">Dirección</p>
                    <p className="text-text-secondary">Vereda Guan Puente Alto, Guachucal, Nariño, Colombia</p>
                  </div>
                </div>
              </div>

              {/* Mapa de Google */}
              <div className="mt-8">
                <h4 className="text-xl font-semibold text-text-primary mb-4">Nuestra Ubicación</h4>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.2644784793717!2d-77.7853317!3d0.927985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e295d4610a787eb%3A0xef0807ea0e018803!2sAsociaci%C3%B3n%20Pumamaki!5e0!3m2!1ses!2sco!4v1699999999999!5m2!1ses!2sco"
                    width="100%"
                    height="300"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación Asociación Pumamaki"
                  ></iframe>
                </div>
                <a 
                  href="https://www.google.com/maps/place/Asociaci%C3%B3n+Pumamaki/@0.927985,-77.7853317,877m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8e295d4610a787eb:0xef0807ea0e018803!8m2!3d0.9279796!4d-77.7827568!16s%2Fg%2F11ln_gt6ss?hl=es&entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-hover font-semibold mt-3 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Ver en Google Maps
                </a>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-semibold text-text-primary mb-4">Síguenos en Redes Sociales</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/share/1AJ47C7zdL/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-button"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://www.tiktok.com/@asociacion.pumamaki?is_from_webapp=1&sender_device=pc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-button"
                    aria-label="TikTok"
                  >
                    <BookOpen className="w-6 h-6" />
                  </a>
                  <a 
                    href="https://youtube.com/@asociacionpumamaki1024" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-button"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="fade-in">
              <Card className="network-card">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="icon-circle">
                      <Youtube className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-text-primary">Nuestro Canal de YouTube</h3>
                  </div>
                  <p className="text-text-secondary mb-6">
                    Conoce más sobre nuestro trabajo y las actividades que realizamos en el páramo.
                  </p>
                  <div className="youtube-preview-box">
                    <div className="youtube-preview-content">
                      <Youtube className="w-20 h-20 text-brand-primary mb-4" />
                      <h4 className="text-xl font-semibold text-text-primary mb-2">
                        Visita Nuestro Canal
                      </h4>
                      <p className="text-text-secondary mb-6">
                        Descubre videos sobre nuestra labor en el páramo, conservación de la biodiversidad, apicultura comunitaria y mucho más.
                      </p>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                          <span>Documentales sobre restauración ambiental</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                          <span>Entrevistas con nuestra comunidad</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                          <span>Actividades de formación y sensibilización</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a 
                    href="https://youtube.com/@asociacionpumamaki1024" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary w-full mt-6 inline-flex items-center justify-center gap-2"
                  >
                    <Youtube className="w-5 h-5" />
                    Visitar Nuestro Canal
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><button onClick={() => scrollToSection('historia')} className="footer-link">Historia</button></li>
                <li><button onClick={() => scrollToSection('nosotros')} className="footer-link">Misión y Visión</button></li>
                <li><button onClick={() => scrollToSection('lineas')} className="footer-link">Nuestro Trabajo</button></li>
                <li><button onClick={() => scrollToSection('proyectos')} className="footer-link">Proyectos</button></li>
                <li><button onClick={() => scrollToSection('galeria')} className="footer-link">Galería</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Ubicación</h4>
              <p className="text-text-secondary">Vereda Guan Puente Alto<br />Guachucal, Nariño<br />Colombia</p>
            </div>
          </div>
          <div className="border-t border-border-light pt-8 text-center">
            <p className="text-text-light">© 2025 Asociación Pumamaki. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;