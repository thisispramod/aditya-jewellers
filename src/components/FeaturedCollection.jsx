import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FeaturedCollection = () => {
    const collections = [
        {
            id: 1,
            title: "Bridal Collection",
            // Classic Indian Bridal Jewellery
            image: "https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?q=80&w=2070&auto=format&fit=crop",
            link: "/collections/bridal"
        },
        {
            id: 2,
            title: "Antique Gold",
            // Antique/Temple Jewellery style
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
            link: "/collections/antique"
        },
        {
            id: 3,
            title: "Diamond Solitaires",
            // Diamond Ring/Jewellery
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
            link: "/collections/diamond"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-gold-600 uppercase tracking-widest text-sm font-semibold">Exquisite Craftsmanship</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mt-3 mb-6">Featured Collections</h2>
                    <div className="w-24 h-1 bg-gold-400 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {collections.map((item, index) => (
                        <Link to={item.link} key={item.id} className="group overflow-hidden relative h-[500px] cursor-pointer block">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10 duration-500"></div>

                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                            />

                            <div className="absolute bottom-0 left-0 w-full p-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 className="text-white font-serif text-3xl mb-2">{item.title}</h3>
                                <div className="flex items-center text-gold-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    <span className="uppercase tracking-widest text-sm font-medium mr-2">View Collection</span>
                                    <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/collections" className="inline-block px-10 py-3 border border-gray-900 text-gray-900 uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all duration-300">
                        View All Collections
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollection;
