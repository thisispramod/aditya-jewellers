import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-20 pb-10 border-t-4 border-gold-600">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div>
                        <Link to="/" className="inline-block mb-6 group">
                            <span className="font-serif text-3xl font-bold tracking-widest text-white group-hover:text-gold-500 transition-colors">
                                ADITYA
                            </span>
                            <span className="block text-[0.6rem] tracking-[0.3em] uppercase text-gold-500 mt-1">Jewellers</span>
                        </Link>
                        <p className="text-gray-400 leading-relaxed mb-6 font-light">
                            Crafting timeless memories with purity and trust. Experince the finest gold, silver and diamond jewellery designed for generations.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon icon={<Facebook size={20} />} />
                            <SocialIcon icon={<Instagram size={20} />} />
                            <SocialIcon icon={<Twitter size={20} />} />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-serif text-xl mb-6 text-gold-100">Quick Links</h4>
                        <ul className="space-y-3 font-light text-gray-300">
                            <li><FooterLink to="/about">About Us</FooterLink></li>
                            <li><FooterLink to="/collections">Collections</FooterLink></li>
                            <li><FooterLink to="/gold-rate">Gold Rate</FooterLink></li>
                            <li><FooterLink to="/privacy">Privacy Policy</FooterLink></li>
                            <li><FooterLink to="/terms">Terms & Condtions</FooterLink></li>
                        </ul>
                    </div>

                    {/* Collections */}
                    <div>
                        <h4 className="font-serif text-xl mb-6 text-gold-100">Collections</h4>
                        <ul className="space-y-3 font-light text-gray-300">
                            <li><FooterLink to="/collections/bridal">Bridal Jewellery</FooterLink></li>
                            <li><FooterLink to="/collections/gold">Gold Chains</FooterLink></li>
                            <li><FooterLink to="/collections/diamond">Diamond Rings</FooterLink></li>
                            <li><FooterLink to="/collections/silver">Silver Articles</FooterLink></li>
                            <li><FooterLink to="/collections/antique">Antique Pieces</FooterLink></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-serif text-xl mb-6 text-gold-100">Visit Us</h4>
                        <ul className="space-y-4 font-light text-gray-300">
                            <li className="flex items-start">
                                <MapPin size={20} className="text-gold-500 mr-3 mt-1 flex-shrink-0" />
                                <span>123, Jewel Street, Jubilee Hills,<br />Hyderabad, Telangana - 500033</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="text-gold-500 mr-3 flex-shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="text-gold-500 mr-3 flex-shrink-0" />
                                <span>contact@adityajewellers.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-light">
                    <p>&copy; {new Date().getFullYear()} Aditya Jewellers. All rights reserved.</p>
                    <p>Designed with ❤️ for premium experience.</p>
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ icon }) => (
    <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gold-600 hover:text-white transition-all duration-300">
        {icon}
    </a>
);

const FooterLink = ({ to, children }) => (
    <Link to={to} className="hover:text-gold-500 transition-colors inline-block transform hover:translate-x-1 duration-300">
        {children}
    </Link>
);

export default Footer;
