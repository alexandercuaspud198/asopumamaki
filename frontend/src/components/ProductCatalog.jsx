import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "./ui/dialog";

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

    const filteredProducts = activeCategory === 'Todos'
        ? products
        : products.filter(product => product.category === activeCategory);

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
                            <div className="relative overflow-hidden h-64 cursor-pointer">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="w-full h-full">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl border-none bg-transparent shadow-none p-0">
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                            />
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">
                                    {product.category}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-lg font-medium text-gray-600">{product.price}</p>
                                <button className="mt-4 w-full py-2 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-green-600 hover:text-white transition-colors duration-300">
                                    Ver Detalles
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <p className="text-center text-gray-500 mt-8">No hay productos en esta categoría.</p>
                )}
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
