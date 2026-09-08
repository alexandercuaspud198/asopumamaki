import { Card, CardContent } from '../components/ui/card';
import { Wheat, Bug, Trees } from 'lucide-react';
export default function Work({ category }) {
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
const visibleLines = category ? workLines.filter(line => line.title === category) : workLines;
return (<section id="lineas" className="section-padding bg-section">
        <div className="container-custom">
          <h1 className="section-title fade-in">{category || "Nuestras Líneas de Trabajo"}</h1>
          <div className={category ? "max-w-3xl mx-auto" : "grid md:grid-cols-3 gap-8"}>
            {visibleLines.map((line, index) => (
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
      </section>);
}
