import React, { createContext, useContext, useState, useEffect } from 'react';

const PriceContext = createContext();

export const usePrices = () => useContext(PriceContext);

const API_URL = 'https://aditya-jewellers.onrender.com/api';

export const PriceProvider = ({ children }) => {
    const [prices, setPrices] = useState({
        gold24k: 0,
        gold22k: 0,
        silver: 0,
        mode: 'LIVE',
        lastUpdate: null
    });
    const [loading, setLoading] = useState(true);

    const fetchRates = async () => {
        try {
            const response = await fetch(`${API_URL}/rates`);
            const data = await response.json();
            if (response.ok) {
                setPrices({
                    gold24k: Number(data.gold24k),
                    gold22k: Number(data.gold22k),
                    silver: Number(data.silver),
                    mode: data.mode,
                    lastUpdate: data.lastUpdate
                });
            }
        } catch (error) {
            console.error('Error fetching rates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
        // Refresh rates every 5 minutes on the frontend
        const interval = setInterval(fetchRates, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const updateMode = async (mode) => {
        try {
            const response = await fetch(`${API_URL}/rates/admin/mode`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mode })
            });
            const data = await response.json();
            if (data.success) {
                await fetchRates();
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    };

    const updateManualRates = async (rates) => {
        try {
            const response = await fetch(`${API_URL}/rates/admin/manual`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rates)
            });
            const data = await response.json();
            if (data.success) {
                await fetchRates();
                return { success: true };
            }
            return { success: false, error: data.error };
        } catch (error) {
            return { success: false, error: 'Network error' };
        }
    };

    const getAdminConfig = async () => {
        try {
            const response = await fetch(`${API_URL}/rates/admin`);
            return await response.json();
        } catch (error) {
            console.error('Error fetching admin config:', error);
            return null;
        }
    };

    return (
        <PriceContext.Provider value={{
            prices,
            loading,
            refreshRates: fetchRates,
            updateMode,
            updateManualRates,
            getAdminConfig
        }}>
            {children}
        </PriceContext.Provider>
    );
};
