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
            <div className="history-timeline-date">
              <span>{event.year}</span>
              {timeline.provisional && <small>Fecha de ejemplo</small>}
            </div>
            <div className="history-timeline-story">
              <span className="history-timeline-step" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
