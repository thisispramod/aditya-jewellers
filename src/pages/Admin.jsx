import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Upload, Link as LinkIcon, X, Image as ImageIcon } from 'lucide-react';

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
    const [imageType, setImageType] = useState('url'); // 'url' or 'file'
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        if (name === 'image' && imageType === 'url') {
            setPreviewUrl(value);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const clearImage = () => {
        setSelectedFile(null);
        setPreviewUrl('');
        setFormData(prev => ({ ...prev, image: '' }));
        // Reset file input if it exists
        const fileInput = document.getElementById('imageFile');
        if (fileInput) fileInput.value = '';
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Adding product...');

    const data = new FormData();

    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('originalPrice', formData.originalPrice);
    data.append('isNew', formData.isNew);

    if (imageType === 'file' && selectedFile) {
        data.append('imageFile', selectedFile); // multer
    } else {
        data.append('image', formData.image); // URL case
    }

    const result = await addProduct(data);

    if (result.success) {
        setStatus('Product added successfully!');
        setFormData({
        name: '',
        category: 'Gold',
        price: '',
        originalPrice: '',
        image: '',
        isNew: false
        });
        setSelectedFile(null);
        setPreviewUrl('');
    } else {
        setStatus(`Error: ${result.error}`);
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

            <div className="max-w-2xl mx-auto flex flex-col md:flex-row gap-8">
                <div className="flex-1 bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
                    {status && (
                        <div className={`mb-4 p-3 rounded text-sm text-center ${status.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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

                        <div className="grid grid-cols-2 gap-4">
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
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                            <div className="flex space-x-2 mb-3">
                                <button
                                    type="button"
                                    onClick={() => { setImageType('url'); clearImage(); }}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-2 text-sm rounded border ${imageType === 'url' ? 'bg-gold-50 border-gold-500 text-gold-700' : 'bg-white border-gray-300 text-gray-600'}`}
                                >
                                    <LinkIcon size={16} />
                                    <span>Image Link</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setImageType('file'); clearImage(); }}
                                    className={`flex-1 flex items-center justify-center space-x-2 py-2 text-sm rounded border ${imageType === 'file' ? 'bg-gold-50 border-gold-500 text-gold-700' : 'bg-white border-gray-300 text-gray-600'}`}
                                >
                                    <Upload size={16} />
                                    <span>Upload File</span>
                                </button>
                            </div>

                            {imageType === 'url' ? (
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://images.unsplash.com/..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-gold-500 focus:border-gold-500 outline-none"
                                    required={imageType === 'url'}
                                />
                            ) : (
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="imageFile"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        required={imageType === 'file'}
                                    />
                                    <label
                                        htmlFor="imageFile"
                                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500 font-semibold">Click to upload image</p>
                                            <p className="text-xs text-gray-400">PNG, JPG or WEBP</p>
                                        </div>
                                    </label>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isNew"
                                id="isNew"
                                checked={formData.isNew}
                                onChange={handleChange}
                                className="mr-2 h-4 w-4 text-gold-600 border-gray-300 rounded focus:ring-gold-500"
                            />
                            <label htmlFor="isNew" className="text-sm font-medium text-gray-700">Mark as New Arrival</label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gold-600 text-white py-3 rounded hover:bg-gold-700 transition-all font-semibold tracking-wide shadow-md hover:shadow-lg active:transform active:scale-[0.98]"
                        >
                            Add Product
                        </button>
                    </form>
                </div>

                {/* Image Preview Section */}
                <div className="w-full md:w-72">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
                        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
                            <ImageIcon size={16} className="mr-2 text-gold-500" />
                            Live Preview
                        </h3>
                        <div className="aspect-square bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center relative">
                            {previewUrl ? (
                                <>
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                        onError={() => setPreviewUrl('')}
                                    />
                                    <button
                                        onClick={clearImage}
                                        className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </>
                            ) : (
                                <div className="text-center px-4">
                                    <ImageIcon size={48} className="mx-auto text-gray-300 mb-2" />
                                    <p className="text-xs text-gray-400 italic">No image selected or invalid URL</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-bold text-gray-900 truncate">{formData.name || 'Product Name'}</p>
                            <p className="text-xs text-gray-500">{formData.category}</p>
                            <p className="text-sm font-semibold text-gold-600 mt-1">₹ {formData.price || '0'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
