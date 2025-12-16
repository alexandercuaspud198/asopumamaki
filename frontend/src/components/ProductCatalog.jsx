import React, { useState, useEffect, useCallback } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const products = [
    {
        id: 1,
        category: 'Tubérculos',
        name: 'Papa Pastusa',
        image: 'https://via.placeholder.com/300?text=Papa+Pastusa',
        price: '$2.500 / kg'
    },
    {
        id: 2,
        category: 'Hortalizas',
        name: 'Lechuga Crespa',
        image: 'https://via.placeholder.com/300?text=Lechuga',
        price: '$1.800 / und'
    },
    {
        id: 3,
        category: 'Frutas',
        name: 'Mora de Castilla',
        image: 'https://via.placeholder.com/300?text=Mora',
        price: '$3.000 / lb'
    },
    {
        id: 4,
        category: 'Procesados',
        name: 'Mermelada de Mora',
        image: 'https://via.placeholder.com/300?text=Mermelada',
        price: '$8.500 / frasco'
    },
    {
        id: 5,
        category: 'Tubérculos',
        name: 'Ulluco',
        image: 'https://via.placeholder.com/300?text=Ulluco',
        price: '$4.200 / kg'
    },
    {
        id: 6,
        category: 'Frutas',
        name: 'Tomate de Árbol',
        image: 'https://via.placeholder.com/300?text=Tomate+Arbol',
        price: '$2.800 / kg'
    },
];

const categories = ['Todos', 'Tubérculos', 'Hortalizas', 'Frutas', 'Procesados'];

const ProductCatalog = () => {
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [selectedProduct, setSelectedProduct] = useState(null);

    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(product => product.category === activeCategory);

    const handleOpen = (product) => {
        setSelectedProduct(product);
    };

    const handleClose = () => {
        setSelectedProduct(null);
    };

    const handleNext = useCallback(() => {
        if (!selectedProduct) return;
        const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
        const nextIndex = (currentIndex + 1) % filteredProducts.length;
        setSelectedProduct(filteredProducts[nextIndex]);
    }, [selectedProduct, filteredProducts]);

    const handlePrev = useCallback(() => {
        if (!selectedProduct) return;
        const currentIndex = filteredProducts.findIndex(p => p.id === selectedProduct.id);
        const prevIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
        setSelectedProduct(filteredProducts[prevIndex]);
    }, [selectedProduct, filteredProducts]);

    // Keyboard navigation
    useEffect(() => {
        if (!selectedProduct) return;

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedProduct, handleNext, handlePrev]);

    return (
        <section className="py-12 px-4 md:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Nuestros Productos</h2>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${activeCategory === category
                                ? 'bg-green-600 text-white shadow-lg scale-105'
                                : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 border border-gray-200'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
                        >
                            <div
                                className="relative overflow-hidden h-64 cursor-pointer"
                                onClick={() => handleOpen(product)}
                            >
                                <div className="w-full h-full">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
                                    {product.category}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-lg font-medium text-gray-600">{product.price}</p>
                                <button
                                    onClick={() => handleOpen(product)}
                                    className="mt-4 w-full py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300"
                                >
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No hay productos en esta categoría.</p>
                )}

                {/* Lightbox Modal */}
                <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && handleClose()}>
                    <DialogContent className="max-w-4xl w-full border-none bg-transparent shadow-none p-0 overflow-hidden">
                        <VisuallyHidden.Root>
                            <DialogTitle>Detalle de {selectedProduct?.name}</DialogTitle>
                            <DialogDescription>
                                Vista ampliada del producto {selectedProduct?.name} con precio {selectedProduct?.price}
                            </DialogDescription>
                        </VisuallyHidden.Root>

                        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                            {/* Image Container */}
                            <div className="relative pointer-events-auto">
                                <button
                                    onClick={handleClose}
                                    className="absolute -top-10 right-0 text-white hover:text-gray-300 bg-black/20 hover:bg-black/40 rounded-full p-2 transition-colors z-50 backdrop-blur-sm"
                                    aria-label="Cerrar"
                                >
                                    <X size={24} />
                                </button>

                                {selectedProduct && (
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg shadow-2xl"
                                    />
                                )}

                                {/* Navigation Buttons */}
                                {filteredProducts.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 sm:opacity-100"
                                            aria-label="Imagen anterior"
                                        >
                                            <ChevronLeft size={32} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 sm:opacity-100"
                                            aria-label="Siguiente imagen"
                                        >
                                            <ChevronRight size={32} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
        </section>
    );
};

export default ProductCatalog;
