import React from 'react';

const About = () => {
    return (
        <div className="pt-24 pb-20 container mx-auto px-4">
            <h1 className="font-serif text-4xl text-center mb-8">About Aditya Jewellers</h1>
            <div className="max-w-4xl mx-auto text-lg leading-relaxed space-y-6 text-gray-700">
                <p>
                    Established in 1995, Aditya Jewellers has been a beacon of trust and quality in the world of fine jewellery.
                    We pride ourselves on our heritage of craftsmanship and our commitment to providing our customers with only the purest gold and silver.
                </p>
                <p>
                    Our journey began with a simple vision: to create jewellery that is not just an accessory, but a cherished heirloom.
                    Over the years, we have evolved, embracing modern designs while staying true to our traditional roots.
                </p>
                <div className="my-10 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Shop Interior / Owner Photo Placeholder</span>
                </div>
                <h2 className="font-serif text-2xl text-gold-600">Why Choose Us?</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>100% BIS Hallmarked Gold:</strong> We guarantee the purity of every gram you buy.</li>
                    <li><strong>Transparent Pricing:</strong> No hidden costs. We provide a detailed breakup of rates and making charges.</li>
                    <li><strong>Custom Designs:</strong> Our skilled karigars can bring your dream jewellery to life.</li>
                    <li><strong>Lifetime Service:</strong> We offer free cleaning and polishing for all jewellery purchased from us.</li>
                </ul>
            </div>
        </div>
    );
};

export default About;
