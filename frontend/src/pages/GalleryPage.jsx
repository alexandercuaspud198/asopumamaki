import Gallery from '../components/Gallery';
export default function GalleryPage() {
  const galleryImages = [
    { src: `${process.env.PUBLIC_URL}/images/paramo.JPG`, alt: 'Paisaje del páramo' },
    { src: `${process.env.PUBLIC_URL}/images/indigena.jpg`, alt: 'Comunidad indígena' },
    { src: `${process.env.PUBLIC_URL}/images/asociacion.jpg`, alt: 'Asociación' },
    { src: `${process.env.PUBLIC_URL}/images/siembra.jpg`, alt: 'Siembra de árboles' },
    { src: `${process.env.PUBLIC_URL}/images/apicultura.jpg`, alt: 'Apicultura' },
    { src: `${process.env.PUBLIC_URL}/images/restauracion1.jpg`, alt: 'Restauración ambiental' },
    { src: `${process.env.PUBLIC_URL}/images/restauracion.jpg`, alt: 'Restauración ambiental' },
    { src: `${process.env.PUBLIC_URL}/images/restauracion2.jpg`, alt: 'Restauración ambiental' }
  ];
  return (
<section id="galeria">
        <Gallery images={galleryImages} />
      </section>
  );
}
