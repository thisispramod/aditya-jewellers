import React from 'react';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';

const Collections = () => {
    const [activeFilter, setActiveFilter] = React.useState('All');
    const { products } = useProducts();

    const filteredProducts = activeFilter === 'All'
        ? products
        : products.filter(p => p.category === activeFilter || (activeFilter === 'Gold' && p.name.includes('Gold')));

    return (
        <div className="pt-24 pb-20 container mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">Our Collections</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">Browse through our wide range of handcrafted jewellery.</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['All', 'Gold', 'Silver', 'Necklaces', 'Earrings', 'Bangles', 'Rings'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-2 border rounded-full transition-colors text-sm uppercase tracking-wider ${activeFilter === filter
                                ? 'bg-gold-500 text-white border-gold-500'
                                : 'bg-white text-gray-700 border-gray-200 hover:border-gold-500 hover:text-gold-600'
                            }`}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                    No products found in this category.
                </div>
            )}
        </div>
    );
};

export default Collections;
