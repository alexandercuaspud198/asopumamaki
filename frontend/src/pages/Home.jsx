import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
export default function Home() {

  return (
<section id="inicio" className="hero-section">
        <img
          className="hero-photo"
          src={`${process.env.PUBLIC_URL}/images/paramo.JPG`}
          alt="Frailejones entre la niebla y un paisaje de montañas y campos."
          width="2400"
          height="1344"
          fetchPriority="high"
        />
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="hero-content">
          <p className="hero-eyebrow">Resguardo de Muellamues · Nariño</p>
          <h1 className="hero-title">Protegiendo el páramo, fortaleciendo la vida</h1>
          <p className="hero-subtitle">Asociación indígena agroecológica Pumamaki</p>
          <p className="hero-tagline">Reviviendo el verde de nuestros campos</p>
          <Link to="/trabajo/" className="btn-primary hero-action">
            Conoce nuestro trabajo <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
      </section>
  );
}
