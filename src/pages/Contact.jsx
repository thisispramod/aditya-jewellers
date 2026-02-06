import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Contact = () => {
    return (
        <div className="pt-24 pb-20 container mx-auto px-4">
            <h1 className="font-serif text-4xl text-center mb-12">Contact Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <h2 className="font-serif text-2xl text-gold-600 mb-6">Get in Touch</h2>
                    <div className="flex items-start space-x-4">
                        <MapPin className="text-gold-500 w-6 h-6 mt-1" />
                        <div>
                            <h3 className="font-bold text-gray-900">Store Address</h3> 
                            <p className="text-gray-600">Infront of State Bank of India Golhoura Thana,<br />Bansi Etwa Road, Uttar Pradesh -272153</p>
                            <a
                                href="https://maps.google.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-gold-600 underline mt-1 inline-block"
                            >
                                View on Map
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Phone className="text-gold-500 w-6 h-6" />
                        <div>
                            <h3 className="font-bold text-gray-900">Phone</h3>
                            <p className="text-gray-600">+91 8115502472</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Mail className="text-gold-500 w-6 h-6" />
                        <div>
                            <h3 className="font-bold text-gray-900">Email</h3>
                            <p className="text-gray-600">contact@adityajewellers.com</p>
                        </div>
                    </div>

                    <div className="pt-6">
                        <h3 className="font-bold text-gray-900 mb-2">Store Hours</h3>
                        <p className="text-gray-600">Mon - Sat: 10:00 AM - 9:00 PM</p>
                        <p className="text-gray-600">Sunday: 11:00 AM - 5:00 PM</p>
                    </div>

                    <a
                        href="https://wa.me/918115502472"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors shadow-lg mt-4"
                    >
                        <MessageCircle className="mr-2" size={20} />
                        Chat on WhatsApp
                    </a>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                    <h2 className="font-serif text-2xl text-gray-900 mb-6">Send us a Message</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input type="tel" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-gold-500 focus:border-gold-500 outline-none" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gold-600 transition-colors font-medium tracking-wide">
                            Submit Inquiry
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
