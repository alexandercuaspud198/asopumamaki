import React, { useState, useEffect, useCallback } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
} from "./ui/dialog";
import { ChevronLeft, ChevronRight, Leaf, X } from 'lucide-react';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

const products = [
    {
        id: 1,
        category: 'Tubérculos',
        name: 'Papa Pastusa',
        price: '$2.500 / kg'
    },
    {
        id: 2,
        category: 'Hortalizas',
        name: 'Lechuga Crespa',
        price: '$1.800 / und'
    },
    {
        id: 3,
        category: 'Frutas',
        name: 'Mora de Castilla',
        price: '$3.000 / lb'
    },
    {
        id: 4,
        category: 'Procesados',
        name: 'Mermelada de Mora',
        price: '$8.500 / frasco'
    },
    {
        id: 5,
        category: 'Tubérculos',
        name: 'Ulluco',
        price: '$4.200 / kg'
    },
    {
        id: 6,
        category: 'Frutas',
        name: 'Tomate de Árbol',
        price: '$2.800 / kg'
    },
];

const categories = ['Todos', 'Tubérculos', 'Hortalizas', 'Frutas', 'Procesados'];

const ProductPhotoPlaceholder = () => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-green-50 text-green-800">
        <Leaf className="h-14 w-14" aria-hidden="true" />
        <span className="text-sm font-medium">Fotografía pendiente</span>
    </div>
);

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
                <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">Nuestros Productos</h1>
                <p className="mx-auto mb-8 max-w-2xl text-center text-gray-600">
                    Catálogo de referencia. Los productos, precios y disponibilidad requieren confirmación con la asociación.
                </p>

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
                                    <ProductPhotoPlaceholder />
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
                                    {product.category}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-lg font-medium text-gray-600">Precio de referencia: {product.price}</p>
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
                                Producto de referencia: {selectedProduct?.name}. Precio de referencia: {selectedProduct?.price}. Confirmar producto, precio y disponibilidad con la asociación.
                            </DialogDescription>
                        </VisuallyHidden.Root>

                        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                            {/* Image Container */}
                            <div className="relative w-full overflow-hidden rounded-lg bg-white shadow-2xl pointer-events-auto">
                                <button
                                    onClick={handleClose}
                                    className="absolute top-3 right-3 text-white hover:text-gray-300 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors z-50 backdrop-blur-sm"
                                    aria-label="Cerrar"
                                >
                                    <X size={24} />
                                </button>

                                {selectedProduct && (
                                    <>
                                        <div className="h-64 sm:h-96">
                                            <ProductPhotoPlaceholder />
                                        </div>
                                        <div className="p-6 text-center text-gray-800">
                                            <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
                                            <p className="mt-2">Precio de referencia: {selectedProduct.price}</p>
                                            <p className="mt-2 text-sm text-gray-600">Confirmar producto, precio y disponibilidad con la asociación.</p>
                                        </div>
                                    </>
                                )}

                                {/* Navigation Buttons */}
                                {filteredProducts.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm"
                                            aria-label="Producto anterior"
                                        >
                                            <ChevronLeft size={32} />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all backdrop-blur-sm"
                                            aria-label="Siguiente producto"
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

            <style>{`
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
