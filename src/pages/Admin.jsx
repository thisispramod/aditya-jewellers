import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Admin = () => {
    const { addProduct } = useProducts();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        category: 'Gold',
        price: '',
        originalPrice: '',
        image: '',
        isNew: false
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Adding product...');

        const result = await addProduct({
            name: formData.name,
            category: formData.category,
            price: Number(formData.price),
            originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
            image: formData.image,
            isNew: formData.isNew
        });

        if (result.success) {
            setStatus('✅ Product added successfully!');
            setFormData({
                name: '',
                category: 'Gold',
                price: '',
                originalPrice: '',
                image: '',
                isNew: false
            });
        } else {
            setStatus(`❌ Error: ${result.error}`);
        }

        setTimeout(() => setStatus(''), 3000);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="pt-24 pb-20 container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl font-bold text-center flex-1">Admin Panel: Add Product</h1>
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>

            <div className="max-w-md mx-auto bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
                {status && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm text-center">
                        {status}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-gold-500 focus:border-gold-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-gold-500 focus:border-gold-500 outline-none"
                        >
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Diamond">Diamond</option>
                            <option value="Necklaces">Necklaces</option>
                            <option value="Earrings">Earrings</option>
                            <option value="Bangles">Bangles</option>
                            <option value="Rings">Rings</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-gold-500 focus:border-gold-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-gold-500 focus:border-gold-500 outline-none"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Use a valid image URL (e.g., from Unsplash)</p>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="isNew"
                            id="isNew"
                            checked={formData.isNew}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="isNew" className="text-sm font-medium text-gray-700">Mark as New Arrival</label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gold-600 text-white py-2 rounded hover:bg-gold-700 transition-colors font-medium tracking-wide"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
