import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2075&auto=format&fit=crop")',
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl text-white"
                >
                    <span className="block text-gold-300 tracking-[0.3em] uppercase text-sm mb-4 font-medium">
                        Aditya Jewellers
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-6">
                        Timeless <br />
                        <span className="text-gold-200">Elegance</span>
                    </h1>
                    <p className="font-sans text-lg md:text-xl text-gray-200 mb-10 max-w-lg font-light leading-relaxed">
                        Discover our exquisite collection of handcrafted gold and silver jewellery, designed to celebrate your most precious moments.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/collections"
                            className="px-8 py-4 bg-gold-500 text-white font-medium tracking-wide hover:bg-gold-600 transition-colors text-center shadow-lg"
                        >
                            Explore Collections
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-4 border border-white text-white font-medium tracking-wide hover:bg-white/10 transition-colors text-center backdrop-blur-sm"
                        >
                            Visit Our Store
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
            >
                <span className="text-xs uppercase tracking-widest mb-2 opacity-80">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gold-400 to-transparent"></div>
            </motion.div>
        </section>
    );
};

export default Hero;
