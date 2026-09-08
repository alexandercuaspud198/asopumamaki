import timeline from '../data/historyTimeline.json';
import './HistoryTimeline.css';

export default function HistoryTimeline() {
  return (
    <section className="history-timeline" aria-labelledby="timeline-heading">
      <header className="history-timeline-intro">
        <p className="history-timeline-eyebrow">MEMORIA COMUNITARIA</p>
        <h2 id="timeline-heading">Un camino que crece con nuestra gente</h2>
        <p>De las primeras semillas al trabajo compartido por el territorio.</p>
      </header>
      {timeline.provisional && (
        <aside className="history-timeline-notice" aria-label="Fechas provisionales">
          <strong>Fechas de ejemplo · Por confirmar</strong>
          <p>{timeline.notice}</p>
        </aside>
      )}
      <ol className="history-timeline-list">
        {timeline.events.map((event, index) => (
          <li key={event.id} className="history-timeline-event">
            <article className="history-timeline-card" aria-labelledby={`timeline-${event.id}`}>
              <div className="history-timeline-date">
                <span>{event.year}</span>
                {timeline.provisional && <small>Fecha de ejemplo</small>}
              </div>
              <figure className="history-timeline-photo">
                <img
                  src={`${process.env.PUBLIC_URL}/${event.image}`}
                  alt={event.imageAlt}
                  width="1600"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                />
                {timeline.provisional && <figcaption>Fotografía de referencia del archivo de Pumamaki</figcaption>}
              </figure>
              <div className="history-timeline-story">
                <span className="history-timeline-step" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 id={`timeline-${event.id}`}>{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
