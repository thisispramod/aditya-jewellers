import React from 'react';
import Hero from '../components/Hero';
import Ticker from '../components/Ticker';
import FeaturedCollection from '../components/FeaturedCollection';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';

// Mock Data for "New Arrivals"
const newArrivals = [
    {
        id: 101,
        name: "Floral Gold Necklace",
        category: "Necklace",
        price: 45000,
        image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=2070&auto=format&fit=crop",
        isNew: true
    },
    {
        id: 102,
        name: "Diamond Stud Earrings",
        category: "Earrings",
        price: 12500,
        originalPrice: 15000,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop",
        isNew: true
    },
    {
        id: 103,
        name: "Traditional Gold Bangle",
        category: "Bangles",
        price: 85000,
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop",
        isNew: true
    },
    {
        id: 104,
        name: "Silver Anklets Pair",
        category: "Silver",
        price: 3200,
        image: "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=2025&auto=format&fit=crop",
        isNew: false
    }
];

const Home = () => {
    return (
        <div className="bg-white">
            <Hero />
            <Ticker />

            {/* Welcome Section */}
            <section className="py-20 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto"
                >
                    <span className="text-gold-600 uppercase tracking-widest text-sm font-semibold mb-2 block">Since 1995</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">Purity is Our Promise</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mb-8"></div>
                    <p className="text-gray-600 font-light text-lg leading-relaxed">
                        At Aditya Jewellers, we believe every piece of jewellery tells a story.
                        With over three decades of trust and craftsmanship, we bring you designs that blend tradition with modernity.
                        Our commitment to purity and quality ensures that every purchase is an investment for generations to come.
                    </p>
                </motion.div>
            </section>

            <FeaturedCollection />

            {/* New Arrivals Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-gold-600 uppercase tracking-widest text-sm font-semibold">Fresh Designs</span>
                            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mt-2">New Arrivals</h2>
                        </div>
                        <a href="/collections" className="hidden md:block text-gray-500 hover:text-gold-600 transition-colors uppercase tracking-widest text-sm font-medium border-b border-transparent hover:border-gold-600 pb-1">
                            View All Products
                        </a>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {newArrivals.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="md:hidden text-center mt-10">
                        <a href="/collections" className="text-gold-600 uppercase tracking-widest text-sm font-bold border-b border-gold-600 pb-1">
                            View All Products
                        </a>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-16 bg-gold-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <TrustBadge
                            icon="💎"
                            title="100% Certified"
                            desc="HUID Hallmarked Gold"
                        />
                        <TrustBadge
                            icon="✨"
                            title="Lifetime Exchange"
                            desc="Best value for old gold"
                        />
                        <TrustBadge
                            icon="🛠️"
                            title="Custom Design"
                            desc="Crafted to your vision"
                        />
                        <TrustBadge
                            icon="🛡️"
                            title="Insured Shipping"
                            desc="Safe & secure delivery"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const TrustBadge = ({ icon, title, desc }) => (
    <div className="flex flex-col items-center text-center p-4">
        <div className="text-4xl mb-4">{icon}</div>
        <h4 className="font-serif text-lg text-gray-900 font-bold mb-1">{title}</h4>
        <p className="text-sm text-gray-500 font-light">{desc}</p>
    </div>
);

export default Home;
