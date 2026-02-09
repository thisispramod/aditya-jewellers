import { usePrices } from '../context/PriceContext';

const Ticker = () => {
    const { prices, loading } = usePrices();

    if (loading) return (
        <div className="bg-gray-900 text-gold-100 py-3 text-center text-xs animate-pulse">
            Fetching latest market rates...
        </div>
    );

    return (
        <div className="bg-gray-900 text-gold-100 py-3 overflow-hidden border-b border-gold-800">
            <div className="flex whitespace-nowrap animate-marquee">
                <div className="flex items-center space-x-12 px-4">
                    <span className="text-sm font-medium tracking-wider">TODAY'S RATES (INR/gm)</span>
                    <PriceItem label="Gold 24K (999)" price={prices.gold24k} />
                    <PriceItem label="Gold 22K (916)" price={prices.gold22k} />
                    <PriceItem label="Silver" price={prices.silver} />
                    <span className="text-gold-500 mx-4">|</span>
                    <span className="text-sm font-medium tracking-wider">Visit store for exact valuation</span>
                </div>
                {/* Duplicate for seamless infinite scroll effect */}
                <div className="flex items-center space-x-12 px-4" aria-hidden="true">
                    <span className="text-sm font-medium tracking-wider">TODAY'S RATES (INR/gm)</span>
                    <PriceItem label="Gold 24K (999)" price={prices.gold24k} />
                    <PriceItem label="Gold 22K (916)" price={prices.gold22k} />
                    <PriceItem label="Silver" price={prices.silver} />
                    <span className="text-gold-500 mx-4">|</span>
                    <span className="text-sm font-medium tracking-wider">Visit store for exact valuation</span>
                </div>
                <div className="flex items-center space-x-12 px-4" aria-hidden="true">
                    <span className="text-sm font-medium tracking-wider">TODAY'S RATES (INR/gm)</span>
                    <PriceItem label="Gold 24K (999)" price={prices.gold24k} />
                    <PriceItem label="Gold 22K (916)" price={prices.gold22k} />
                    <PriceItem label="Silver" price={prices.silver} />
                    <span className="text-gold-500 mx-4">|</span>
                    <span className="text-sm font-medium tracking-wider">Visit store for exact valuation</span>
                </div>
            </div>

            {/* Inline style for the animation since it's specific */}
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
        <span className="text-gray-400 font-light text-xs uppercase">{label}:</span>
        <span className="font-bold text-gold-400">₹{price.toFixed(2)}</span>
    </div>
);

export default Ticker;
