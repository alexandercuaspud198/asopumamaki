import { Card, CardContent } from '../components/ui/card';
import { Phone, Mail, MapPin, Facebook, BookOpen, Youtube } from 'lucide-react';
export default function Contact() {

  return (
<section id="contacto" className="section-padding">
        <div className="container-custom">
          <h1 className="section-title fade-in">Contáctanos</h1>
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
  );
}
