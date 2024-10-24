import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstName') || 'Guest';

    useEffect(() => {
        const fetchCounter = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/counter');
                const data = await response.json();
                setCount(data.count);
            } catch (error) {
                console.error('Error fetching counter:', error);
            }
        };
        fetchCounter();
    }, []);

    const handleIncrement = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/counter/increment', {
                method: 'POST',
            });
            const data = await response.json();
            setCount(data.count);
        } catch (error) {
            console.error('Error incrementing counter:', error);
        }
    };

    const handleDecrement = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/counter/decrement', {
                method: 'POST',
            });
            const data = await response.json();
            setCount(data.count);
        } catch (error) {
            console.error('Error decrementing counter:', error);
        }
    };

    const handleProfileRedirect = () => {
        navigate('/profile');
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Welcome, {firstName}!</h2>
                <p className="text-2xl text-indigo-400 mb-6">Counter: <span className="font-semibold text-white">{count}</span></p>
                
                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        onClick={handleIncrement}
                        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    >
                        Increment
                    </button>
                    <button
                        onClick={handleDecrement}
                        className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-full transition duration-300"
                    >
                        Decrement
                    </button>
                </div>
                
                <button
                    onClick={handleProfileRedirect}
                    className="text-indigo-300 hover:text-indigo-400 underline transition duration-300 text-lg"
                >
                    Go to Profile
                </button>
            </div>
        </div>
    );
};

export default Home;
