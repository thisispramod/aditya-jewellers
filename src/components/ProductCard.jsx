import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    return (
        <div className="group bg-white p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 relative">
            {/* New Badge */}
            {product.isNew && (
                <span className="absolute top-4 left-4 z-10 bg-gray-900 text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider">
                    New Arrival
                </span>
            )}

            {/* Image Container */}
            <div className="relative overflow-hidden aspect-square mb-4 bg-gray-50">
                {/* <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                /> */}
                <img
                src={`${import.meta.env.VITE_API_URL}/${product.image}`}
                alt={product.name}
                />
                {/* Overlay Actions */}
                <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                    <button className="bg-white p-2 rounded-full shadow-md text-gray-800 hover:text-red-500 hover:bg-red-50 transition-colors" title="Add to Wishlist">
                        <Heart size={18} />
                    </button>
                    <a
                        href={`https://wa.me/919876543210?text=I'm interested in ${product.name} (ID: ${product.id})`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-green-500 p-2 rounded-full shadow-md text-white hover:bg-green-600 transition-colors"
                        title="Enquire on WhatsApp"
                    >
                        <MessageCircle size={18} />
                    </a>
                </div>
            </div>

            {/* Details */}
            <div className="text-center">
                <p className="text-xs text-gold-600 uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="font-serif text-lg text-gray-900 mb-2 truncate group-hover:text-gold-600 transition-colors cursor-pointer">{product.name}</h3>
                <div className="flex justify-center items-center space-x-2">
                    <span className="font-bold text-gray-900">₹{product.price.toLocaleString('en-IN')}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
