import { useEffect, useRef, useState } from 'react';
import timeline from '../data/historyTimeline.json';
import './HistoryTimeline.css';
import ResponsiveImage from './ResponsiveImage';
import HistoryTree from './HistoryTree';

const growthStages = [
  { title: 'Semillas', description: 'El comienzo de un sueño compartido.' },
  { title: 'El primer brote', description: 'El conocimiento nutre nuestras raíces.' },
  { title: 'Echamos raíces', description: 'El trabajo colectivo nos da fuerza.' },
  { title: 'Nuevas ramas', description: 'Encontramos espacio para seguir creciendo.' },
  { title: 'Un árbol que florece', description: 'Nuestro cuidado se extiende por el territorio.' },
  { title: 'Semillas para el futuro', description: 'Un legado vivo para las nuevas generaciones.' },
];
const stageFor = index => Math.round(index * 5 / Math.max(1, timeline.events.length - 1));

export default function HistoryTimeline() {
  const [activeEvent, setActiveEvent] = useState(0);
  const eventsRef = useRef([]);
  const stage = stageFor(activeEvent);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(entries => {
      const firstEvent = eventsRef.current[0];
      const lastEvent = eventsRef.current[timeline.events.length - 1];
      if (firstEvent?.getBoundingClientRect().top > window.innerHeight * .6) {
        setActiveEvent(0);
        return;
      }
      if (lastEvent?.getBoundingClientRect().bottom < window.innerHeight * .3) {
        setActiveEvent(timeline.events.length - 1);
        return;
      }
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) setActiveEvent(Number(visible[0].target.dataset.eventIndex));
    }, { rootMargin: '-30% 0px -40% 0px', threshold: [0, .15, .4] });
    eventsRef.current.forEach(event => { if (event) observer.observe(event); });
    return () => observer.disconnect();
  }, []);

  const goToEvent = index => {
    setActiveEvent(index);
    const event = eventsRef.current[index];
    event?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    event?.querySelector('h3')?.focus({ preventScroll: true });
  };

  return (
    <section className="history-timeline" aria-labelledby="timeline-heading">
      <header className="history-timeline-intro">
        <p className="history-timeline-eyebrow">MEMORIA COMUNITARIA</p>
        <h2 id="timeline-heading">De una semilla, una historia que crece</h2>
        <p>Raíces que nos unen. Ramas que cuidan el territorio.</p>
        <p className="history-growth-instruction">Recorre nuestra historia y descubre cómo crece el árbol de Pumamaki.</p>
      </header>
      {timeline.provisional && (
        <aside className="history-timeline-notice" aria-label="Fechas provisionales">
          <strong>Fechas de ejemplo · Por confirmar</strong>
          <p>{timeline.notice}</p>
        </aside>
      )}
      <div className="history-garden">
        <div className="history-growth-panel" aria-label="Crecimiento del árbol de Pumamaki">
          <HistoryTree stage={stage} />
          <div className="history-growth-caption">
            <span className="history-growth-count">{String(activeEvent + 1).padStart(2, '0')} / {String(timeline.events.length).padStart(2, '0')}</span>
            <p className="history-growth-title">{growthStages[stage].title}</p>
            <p className="history-growth-description">{growthStages[stage].description}</p>
            <nav className="history-growth-nav" aria-label="Hitos de nuestra historia">
              {timeline.events.map((event, index) => (
                <button key={event.id} type="button" aria-label={`Ir a ${event.year}: ${event.title}`} aria-current={activeEvent === index ? 'step' : undefined} onClick={() => goToEvent(index)}>
                  <span aria-hidden="true" />
                </button>
              ))}
            </nav>
          </div>
        </div>
        <ol className="history-timeline-list">
        {timeline.events.map((event, index) => (
          <li key={event.id} ref={element => { eventsRef.current[index] = element; }} data-event-index={index} className={`history-timeline-event${activeEvent === index ? ' is-current' : ''}`}>
            <svg className="history-event-branch" viewBox="0 0 140 100" aria-hidden="true" focusable="false">
              <path className="history-branch-line" d="M0 80C42 79 44 27 140 27M63 52Q64 29 82 18" />
              <path className="history-branch-leaf" d="M83 19C64 19 66 1 88 2C99 14 94 24 83 19Z" />
              <path className="history-branch-leaf" d="M43 71C39 50 20 48 13 55C16 75 32 80 43 71Z" />
            </svg>
            <article className="history-timeline-card" aria-labelledby={`timeline-${event.id}`}>
              <div className="history-timeline-date">
                <div>
                  <span className="history-timeline-year">{event.year}</span>
                  {timeline.provisional && <small>Fecha de ejemplo</small>}
                </div>
                <span className="history-timeline-stage">{growthStages[stageFor(index)].title}</span>
              </div>
              <figure className="history-timeline-photo">
                <ResponsiveImage
                  src={`${process.env.PUBLIC_URL}/${event.image}`}
                  alt={event.imageAlt}
                  width="1600"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 860px) calc(100vw - 56px), (max-width: 1200px) calc(50vw - 158px), 420px"
                />
                {timeline.provisional && <figcaption>Fotografía de referencia del archivo de Pumamaki</figcaption>}
              </figure>
              <div className="history-timeline-story">
                <span className="history-timeline-step" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 id={`timeline-${event.id}`} tabIndex={-1}>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </article>
          </li>
        ))}
        </ol>
      </div>
    </section>
  );
}
