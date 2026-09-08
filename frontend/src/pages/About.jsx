import { Card, CardContent } from '../components/ui/card';
import { Target, Eye, Heart, Leaf, Users, Sprout } from 'lucide-react';
export default function About() {

  return (
<section id="nosotros" className="section-padding">
        <div className="container-custom">
          <h1 className="section-title fade-in">¿Quiénes Somos?</h1>
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
                  La Asociación Indígena Agroecológica Reviviendo El Verde De Nuestros Campos “Pumamaki” es una organización del resguardo de Muellamués que trabaja en la conservación y propagación de árboles nativos para la restauración y protección ecológica de los ecosistemas alto andinos, con el fin de proteger el agua, aire, suelo y la biodiversidad en armonía y en equilibrio con la naturaleza.

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
                  En el 2030 la Asociación Indígena Agroecológica Reviviendo El Verde De Nuestros Campos “Pumamaki” será líder en el municipio de Guachucal en la investigación y propagación de diferentes especies nativas aptas para la restauración ecológica de los ecosistemas, basados en los estándares de calidad que permitan ampliar los canales de distribución y por ende contribuir en la recuperación de la biodiversidad, y la promoción de una cultura ambiental para preservar, mantener y prolongar la vida de la Madre Tierra.

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
  );
}
