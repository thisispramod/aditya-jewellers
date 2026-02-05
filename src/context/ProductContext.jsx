import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const API_URL = 'http://localhost:5000/api';

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from API on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_URL}/products`);
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const addProduct = async (newProduct) => {
        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            const data = await response.json();

            if (response.ok) {
                // Add the new product to the local state
                setProducts(prev => [data.product, ...prev]);
                return { success: true, message: 'Product added successfully!' };
            } else {
                return { success: false, error: data.error || 'Failed to add product' };
            }
        } catch (error) {
            console.error('Error adding product:', error);
            return { success: false, error: 'Connection error. Please check if the server is running.' };
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, loading, refreshProducts: fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );
};
