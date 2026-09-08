import { Card, CardContent } from '../components/ui/card';
import HistoryTimeline from '../components/HistoryTimeline';

export default function History() {

  return (
<section id="historia" className="section-padding bg-subtle">
        <div className="container-custom">
          <h1 className="section-title fade-in">Nuestra Historia</h1>
          <HistoryTimeline />
          <div className="max-w-4xl mx-auto">
            <details className="history-full-story">
              <summary>Leer el relato completo de nuestra historia</summary>
            <Card className="network-card">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6 text-body-medium text-text-secondary leading-relaxed">
                  <p>
                    La Asociación Pumamaki tiene su origen en un grupo de shagreros del Resguardo de Muellamues que se reunió para fortalecer los conocimientos tradicionales, conservar las semillas propias, practicar la agricultura propia y cuidar el territorio.
                  </p>
                  <p>
                    El proceso inicial se desarrolló con el Programa Jóvenes Emprendedores Rurales del SENA. Allí aprendieron a elaborar abonos orgánicos, recuperar semillas nativas, conservar especies y aplicar prácticas sostenibles para el manejo de la tierra. Su participación posterior en procesos ambientales contribuyó a consolidar la organización.
                  </p>
                  <p>
                    La mayoría de sus asociados son mujeres indígenas, guardianas del territorio y cuidadoras del medio ambiente. Pumamaki vincula a familias del Resguardo de Muellamues, fortalece la economía familiar mediante actividades ambientales y productivas, y promueve la transmisión de conocimientos ancestrales.
                  </p>
                  <p>
                    Don Humberto Revelo, primer presidente de la asociación, aportó su liderazgo y prestó un lote de su vivienda para crear el primer vivero comunitario. En ese espacio comenzaron a trabajar colectivamente en:
                  </p>
                  <ul className="space-y-3 ml-6">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Reconocimiento de plantas propias del territorio.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Manejo y conservación de especies.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Elaboración de abonos orgánicos.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-primary mt-2 flex-shrink-0"></div>
                      <span>Recuperación y propagación de especies.</span>
                    </li>
                  </ul>
                  <p>
                    Después de aproximadamente seis años de trabajo, la asociación buscó un espacio propio para fortalecer sus procesos. En su trayectoria participó en un convenio ambiental con Impulso Verde para la siembra de aproximadamente 6.000 árboles anuales. Impulso Verde financiaba el proceso; las comunidades recibían los árboles y los beneficiarios se comprometían a sembrarlos y cuidarlos.
                  </p>
                  <p className="text-lg font-semibold text-text-primary mt-8">
                    La historia de Pumamaki reúne el trabajo comunitario, el cuidado del territorio y los conocimientos ancestrales que las familias comparten con las nuevas generaciones.
                  </p>
                </div>
              </CardContent>
            </Card>
            </details>
          </div>
        </div>
      </section>
  );
}
