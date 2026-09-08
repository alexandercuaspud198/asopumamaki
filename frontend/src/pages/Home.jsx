import { Link } from 'react-router-dom';
export default function Home() {

  return (
<section id="inicio" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title fade-in">Protegiendo el páramo, fortaleciendo la vida</h1>
          <p className="hero-subtitle fade-in">Asociación indígena agroecológica "Pumamaki"</p>
          <p className="hero-tagline fade-in">Reviviendo el verde de nuestros campos</p>
          <Link to="/trabajo/" className="btn-primary fade-in">
            Conoce Nuestro Trabajo
          </Link>
        </div>
      </section>
  );
}
