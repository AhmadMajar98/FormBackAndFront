import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('firstName', data.firstName);

            alert('Login successful, redirecting to home...');
            navigate('/home');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login. Please try again.');
        }
    };

    return (
<div className='bg-gray-700 min-h-screen w-full flex items-center justify-center'>
    <form onSubmit={handleSubmit} className="max-w-4xl w-full p-8 bg-gray-900 rounded-lg shadow-lg text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-400">Login</h2>
        
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />
        <button
            type="submit"
            className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-md text-white font-semibold transition-all"
        >
            Login
        </button>
    </form>
</div>

    );
};

export default Login;
