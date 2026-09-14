import { Leaf } from 'lucide-react';
import timeline from '../data/historyTimeline.json';
import './HistoryTimeline.css';
import ResponsiveImage from './ResponsiveImage';
import HistoryTree, { HistoryBranch } from './HistoryTree';

const treeTitles = {
  origen: 'La semilla',
  'formacion-sena': 'El primer brote',
  'primer-vivero': 'Echamos raíces',
  'espacio-propio': 'El árbol crece',
  'impulso-verde': 'Cuidamos el territorio',
  saberes: 'Nuevos frutos',
};

export default function HistoryTimeline() {
  const events = [...timeline.events].reverse();
  return (
    <div className="history-timeline">
      <header className="history-timeline-intro">
        <p className="history-timeline-eyebrow">MEMORIA COMUNITARIA</p>
        <h1>Nuestra<br />Historia</h1>
        <span className="history-small-rule" aria-hidden="true" />
        <h2>De una semilla,<br />una historia que crece</h2>
        <p>Raíces que nos unen.<br />Ramas que cuidan el territorio.</p>
        <p className="history-reading-note">Nuestra historia se lee desde las raíces hasta los nuevos frutos.</p>
        <a className="history-origin-link" href="#timeline-origen">Comenzar en la semilla <span aria-hidden="true">↓</span></a>
        {timeline.provisional && <p className="history-reference-note">Fechas ilustrativas · Fotos de referencia</p>}
      </header>
      <p className="history-tree-motto">Territorio<br />Comunidad<br />Vida <Leaf size={19} strokeWidth={1.4} aria-hidden="true" /></p>
      <div className="history-garden">
        <HistoryTree />
        <ol className="history-timeline-list" reversed aria-label="Historia de Pumamaki, desde los hitos más recientes hasta el origen">
          {events.map((event, index) => (
            <li key={event.id} className={`history-timeline-event ${index % 2 === 0 ? 'is-right' : 'is-left'}`}>
              <HistoryBranch side={index % 2 === 0 ? 'right' : 'left'} compact={index === 0} />
              <span className="history-event-node" aria-hidden="true" />
              <article className="history-timeline-card" aria-labelledby={`timeline-${event.id}`}>
                <div className="history-timeline-story">
                  <span className="history-timeline-year">{event.year}</span>
                  <h3 id={`timeline-${event.id}`} tabIndex={-1}>{treeTitles[event.id] || event.title}</h3>
                  <span className="history-small-rule" aria-hidden="true" />
                  <p>{event.description}</p>
                </div>
                <figure className="history-timeline-photo">
                  <ResponsiveImage
                    src={`${process.env.PUBLIC_URL}/${event.image}`}
                    alt={event.imageAlt}
                    width="640"
                    height="800"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    sizes="(max-width: 480px) calc(100vw - 108px), (max-width: 900px) 40vw, (max-width: 1100px) 19vw, 250px"
                  />
                </figure>
              </article>
            </li>
          ))}
        </ol>
      </div>
      <div className="history-tree-closing">
        <svg className="history-groundscape" viewBox="0 0 1200 220" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d="M0 15C175-25 218 189 420 186Q511 185 600 220H0ZM1200 15C1051 21 992 142 902 163Q810 162 721 220H1200Z" />
        </svg>
        <p>Pequeñas acciones<br />grandes cambios</p>
        <span className="history-growing-message">Seguimos creciendo <Leaf size={25} strokeWidth={1.4} aria-hidden="true" /></span>
        <p>Pumamaki<br />es comunidad</p>
      </div>
      {timeline.provisional && (
        <aside className="history-timeline-notice" aria-label="Fechas y fotografías provisionales">
          <strong>Memoria en construcción · Fechas de ejemplo</strong>
          <p>{timeline.notice}</p>
        </aside>
      )}
    </div>
  );
}
