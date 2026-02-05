import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex flex-col items-center group">
                        <span className={`font-serif text-2xl md:text-3xl font-bold tracking-widest ${scrolled ? 'text-gray-900' : 'text-gray-900 md:text-white' // Text logic needs to adapt to hero image if not scrolled, defaulting to dark for now on small screens or assume light hero
                            } ${!scrolled && 'md:text-gold-500'}`}>
                            ADITYA
                        </span>
                        <span className="text-[0.6rem] tracking-[0.3em] uppercase text-gold-600">Jewellers</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink to="/" label="Home" scrolled={scrolled} />
                        <NavLink to="/collections" label="Collections" scrolled={scrolled} />
                        <NavLink to="/about" label="About Us" scrolled={scrolled} />
                        <NavLink to="/contact" label="Contact" scrolled={scrolled} />
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-5">
                        <button className={`${scrolled ? 'text-gray-600' : 'text-gold-600'} hover:text-gold-500 transition-colors`}>
                            <Search size={22} />
                        </button>
                        <button className={`${scrolled ? 'text-gray-600' : 'text-gold-600'} hover:text-gold-500 transition-colors relative`}>
                            <ShoppingBag size={22} />
                            <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gold-600"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white absolute top-full left-0 w-full shadow-lg border-t border-gray-100 overflow-hidden"
                    >
                        <div className="flex flex-col py-6 px-4 space-y-4 text-center">
                            <MobileNavLink to="/" label="Home" />
                            <MobileNavLink to="/collections" label="Collections" />
                            <MobileNavLink to="/about" label="About Us" />
                            <MobileNavLink to="/contact" label="Contact" />
                            <div className="flex justify-center space-x-6 pt-4 border-t border-gray-100 mt-2">
                                <button className="text-gray-600 hover:text-gold-500"><Search size={24} /></button>
                                <button className="text-gray-600 hover:text-gold-500"><ShoppingBag size={24} /></button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const NavLink = ({ to, label, scrolled }) => (
    <Link
        to={to}
        className={`font-sans tracking-wide text-sm font-medium hover:text-gold-500 transition-colors relative group ${scrolled ? 'text-gray-800' : 'text-gray-800' // Simplified for now, can adjust for transparent header
            }`}
    >
        {label}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

const MobileNavLink = ({ to, label }) => (
    <Link
        to={to}
        className="font-serif text-lg text-gray-800 hover:text-gold-600 py-2 block"
    >
        {label}
    </Link>
);

export default Navbar;
