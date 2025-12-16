import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
    { id: 1, src: 'https://picsum.photos/800/600?random=1', alt: 'Galería Imagen 1' },
    { id: 2, src: 'https://picsum.photos/800/600?random=2', alt: 'Galería Imagen 2' },
    { id: 3, src: 'https://picsum.photos/800/600?random=3', alt: 'Galería Imagen 3' },
    { id: 4, src: 'https://picsum.photos/800/600?random=4', alt: 'Galería Imagen 4' },
    { id: 5, src: 'https://picsum.photos/800/600?random=5', alt: 'Galería Imagen 5' },
    { id: 6, src: 'https://picsum.photos/800/600?random=6', alt: 'Galería Imagen 6' },
];

const Gallery = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleOpen = (index) => {
        setCurrentIndex(index);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, []);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    }, []);

    // Keyboard support
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleNext, handlePrev]);

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Galería de Imágenes</h2>

                {/* Grid View */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            onClick={() => handleOpen(index)}
                            className="relative aspect-video overflow-hidden rounded-lg shadow-md cursor-pointer group"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white opacity-0 group-hover:opacity-100 font-semibold text-lg drop-shadow-md">
                                    Ver
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox Modal */}
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-sm animate-fade-in">
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-50"
                            aria-label="Cerrar galería"
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation Buttons */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 z-50 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft size={48} />
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2 z-50 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
                            aria-label="Siguiente imagen"
                        >
                            <ChevronRight size={48} />
                        </button>

                        {/* Main Image */}
                        <div className="relative w-full h-full p-4 flex items-center justify-center pointer-events-none">
                            <img
                                src={images[currentIndex].src}
                                alt={images[currentIndex].alt}
                                className="max-w-full max-h-screen object-contain shadow-2xl pointer-events-auto"
                            />
                            <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm pointer-events-auto">
                                Imagen {currentIndex + 1} de {images.length}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </section>
    );
};

export default Gallery;
