import { Card, CardContent } from '../components/ui/card';
import { Mountain } from 'lucide-react';
export default function Projects() {
  const projects = [
    {
      title: 'Promesas Climáticas',
      description: 'Compromiso con la acción climática mediante la restauración de ecosistemas y prácticas sostenibles que contribuyen a la mitigación del cambio climático.'
    },
    {
      title: 'Impulso Verde',
      description: 'Convenio ambiental que financió un proceso de siembra de aproximadamente 6.000 árboles al año. Las comunidades recibían los árboles y los beneficiarios asumían el compromiso de sembrarlos y cuidarlos.'
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
  return (
<section id="proyectos" className="section-padding">
        <div className="container-custom">
          <h1 className="section-title fade-in">Nuestros Proyectos</h1>
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
  );
}
