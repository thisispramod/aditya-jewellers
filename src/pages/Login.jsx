import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, User } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError(''); // Clear error on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await login(credentials.username, credentials.password);

            if (result.success) {
                // Successfully logged in
                navigate('/admin');
            } else {
                // Login failed
                setError(result.error || 'Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred. Please check if the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gold-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gold-500 rounded-full flex items-center justify-center mb-4">
                        <Lock className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-gray-900">Admin Login</h2>
                    <p className="mt-2 text-sm text-gray-600">Sign in to access the admin panel</p>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-100">
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={credentials.username}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all"
                                    placeholder="Enter username"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Default credentials: <span className="font-mono bg-gray-100 px-2 py-1 rounded">Ask Me</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
