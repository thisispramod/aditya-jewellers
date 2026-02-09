import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, Upload, Link as LinkIcon, X, Image as ImageIcon, TrendingUp, Settings2, Save } from 'lucide-react';
import { usePrices } from '../context/PriceContext';

const Admin = () => {
    const { addProduct } = useProducts();
    const { logout } = useAuth();
    const { updateMode, updateManualRates, getAdminConfig, prices: currentRates } = usePrices();
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState('products'); // 'products' or 'rates'

    // Product form state
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

    // Rates management state
    const [manualRates, setManualRates] = useState({
        gold24k: '',
        gold22k: '',
        silver: ''
    });
    const [rateMode, setRateMode] = useState('LIVE');
    const [rateStatus, setRateStatus] = useState('');

    useEffect(() => {
        if (activeTab === 'rates') {
            loadRateConfig();
        }
    }, [activeTab]);

    const loadRateConfig = async () => {
        const config = await getAdminConfig();
        if (config) {
            setManualRates({
                gold24k: config.manual_gold_24k,
                gold22k: config.manual_gold_22k,
                silver: config.manual_silver
            });
            setRateMode(config.mode);
        }
    };

    const handleRateChange = (e) => {
        const { name, value } = e.target;
        setManualRates(prev => ({ ...prev, [name]: value }));
    };

    const handleModeSwitch = async (mode) => {
        setRateStatus('Updating mode...');
        const result = await updateMode(mode);
        if (result.success) {
            setRateMode(mode);
            setRateStatus('✅ Mode updated successfully!');
        } else {
            setRateStatus(`❌ Error: ${result.error}`);
        }
        setTimeout(() => setRateStatus(''), 3000);
    };

    const handleManualRateSubmit = async (e) => {
        e.preventDefault();
        setRateStatus('Updating manual rates...');
        const result = await updateManualRates({
            gold24k: Number(manualRates.gold24k),
            gold22k: Number(manualRates.gold22k),
            silver: Number(manualRates.silver)
        });
        if (result.success) {
            setRateStatus('✅ Manual rates updated successfully!');
        } else {
            setRateStatus(`❌ Error: ${result.error}`);
        }
        setTimeout(() => setRateStatus(''), 3000);
    };

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

        let submissionData;

        if (imageType === 'file' && selectedFile) {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('category', formData.category);
            data.append('price', formData.price);
            data.append('originalPrice', formData.originalPrice);
            data.append('isNew', formData.isNew);
            data.append('imageFile', selectedFile);
            submissionData = data;
        } else {
            submissionData = {
                name: formData.name,
                category: formData.category,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
                image: formData.image,
                isNew: formData.isNew
            };
        }

        const result = await addProduct(submissionData);

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
            setSelectedFile(null);
            setPreviewUrl('');
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
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="font-serif text-3xl font-bold flex-1 text-center md:text-left">Admin Panel</h1>

                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'products' ? 'bg-white text-gold-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('rates')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'rates' ? 'bg-white text-gold-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Live Rates
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>

            {activeTab === 'products' ? (
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                            <ImageIcon className="mr-2 text-gold-500" />
                            Add New Product
                        </h2>
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
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full sticky top-24">
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
            ) : (
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-8">
                        {/* Mode Selector */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                                <Settings2 className="mr-2 text-gold-500" />
                                Pricing Control Mode
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => handleModeSwitch('LIVE')}
                                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${rateMode === 'LIVE' ? 'border-gold-500 bg-gold-50 text-gold-700' : 'border-gray-200 hover:border-gold-200 text-gray-500'}`}
                                >
                                    <TrendingUp size={32} />
                                    <div className="text-center">
                                        <p className="font-bold">Live Market</p>
                                        <p className="text-xs opacity-70">Synced with Global API</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleModeSwitch('MANUAL')}
                                    className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${rateMode === 'MANUAL' ? 'border-gold-500 bg-gold-50 text-gold-700' : 'border-gray-200 hover:border-gold-200 text-gray-500'}`}
                                >
                                    <Save size={32} />
                                    <div className="text-center">
                                        <p className="font-bold">Manual Entry</p>
                                        <p className="text-xs opacity-70">Admin Defined Rates</p>
                                    </div>
                                </button>
                            </div>

                            {rateStatus && (
                                <div className={`mt-4 p-3 rounded text-sm text-center ${rateStatus.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-gold-100 text-gold-700'}`}>
                                    {rateStatus}
                                </div>
                            )}
                        </div>

                        {/* Manual Rate Editor */}
                        <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition-opacity ${rateMode === 'MANUAL' ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                            <h2 className="text-xl font-bold mb-6 flex items-center text-gray-800">
                                <Save className="mr-2 text-gold-500" />
                                Update Manual Rates (₹/gm)
                            </h2>

                            <form onSubmit={handleManualRateSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gold 24K</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="gold24k"
                                            value={manualRates.gold24k}
                                            onChange={handleRateChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-gold-500 focus:border-gold-500 outline-none"
                                            required={rateMode === 'MANUAL'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gold 22K</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="gold22k"
                                            value={manualRates.gold22k}
                                            onChange={handleRateChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-gold-500 focus:border-gold-500 outline-none"
                                            required={rateMode === 'MANUAL'}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Silver</label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            name="silver"
                                            value={manualRates.silver}
                                            onChange={handleRateChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-gold-500 focus:border-gold-500 outline-none"
                                            required={rateMode === 'MANUAL'}
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-gold-600 text-white py-3 rounded hover:bg-gold-700 transition-all font-semibold shadow-md active:transform active:scale-[0.98]"
                                >
                                    Save Manual Rates
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Current Display Preview */}
                    <div className="w-full md:w-80">
                        <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl border border-gray-800 space-y-6 sticky top-24">
                            <div className="flex items-center justify-between">
                                <h3 className="text-gold-500 font-serif text-lg">Website View</h3>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-widest ${rateMode === 'LIVE' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                    {rateMode}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end border-b border-gray-800 pb-2">
                                    <span className="text-gray-400 text-xs uppercase">Gold 24K</span>
                                    <span className="text-xl font-bold text-gold-400">₹{Number(currentRates.gold24k).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-gray-800 pb-2">
                                    <span className="text-gray-400 text-xs uppercase">Gold 22K</span>
                                    <span className="text-xl font-bold text-gold-400">₹{Number(currentRates.gold22k).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <span className="text-gray-400 text-xs uppercase">Silver</span>
                                    <span className="text-xl font-bold text-gold-400">₹{Number(currentRates.silver).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <p className="text-[10px] text-gray-500 italic text-center">
                                Last updated: {currentRates.lastUpdate ? new Date(currentRates.lastUpdate).toLocaleString() : 'Never'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
