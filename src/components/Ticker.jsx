import React, { useState, useEffect } from 'react';

const Ticker = () => {
    const [prices, setPrices] = useState({
        gold24k: 0,
        gold22k: 0,
        silver: 0
    });

    const [error, setError] = useState(false);

    const fetchRates = async () => {
        try {
            const res = await fetch('/api/rates'); // your backend API
            const data = await res.json();

            if (!res.ok) throw new Error('API error');

            setPrices({
                gold24k: Number(data.gold24k),
                gold22k: Number(data.gold22k),
                silver: Number(data.silver)
            });

            setError(false);
        } catch (err) {
            console.error('Failed to fetch rates', err);
            setError(true);
        }
    };

    useEffect(() => {
        fetchRates(); // initial fetch

        // Refresh prices every 5 minutes
        const interval = setInterval(fetchRates, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-gray-900 text-gold-100 py-3 overflow-hidden border-b border-gold-800">
            <div className="flex whitespace-nowrap animate-marquee">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center space-x-12 px-4">
                        <span className="text-sm font-medium tracking-wider">
                            TODAY&apos;S RATES (INR / gm)
                        </span>

                        <PriceItem label="Gold 24K (999)" price={prices.gold24k} />
                        <PriceItem label="Gold 22K (916)" price={prices.gold22k} />
                        <PriceItem label="Silver" price={prices.silver} />

                        <span className="text-gold-500 mx-4">|</span>

                        {error ? (
                            <span className="text-red-400 text-xs">
                                Live price unavailable
                            </span>
                        ) : (
                            <span className="text-sm font-medium tracking-wider">
                                Visit store for exact valuation
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                }
            `}</style>
        </div>
    );
};

const PriceItem = ({ label, price }) => (
    <div className="flex items-center space-x-2">
        <span className="text-gray-400 font-light text-xs uppercase">
            {label}:
        </span>
        <span className="font-bold text-gold-400">
            ₹{price ? price.toFixed(2) : '--'}
        </span>
    </div>
);

export default Ticker;
