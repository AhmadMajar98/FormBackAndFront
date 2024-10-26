import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const firstName = localStorage.getItem('firstName') || 'Guest';

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchCounter = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/home', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setCount(data.count || 0);
                } else {
                    console.error('Failed to fetch home data:', response.status);
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error fetching home data:', error);
                navigate('/login');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCounter();
    }, [navigate, token]);

    const handleIncrement = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/counter/increment', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCount(data.count);
            } else {
                console.error('Failed to increment counter:', response.status);
            }
        } catch (error) {
            console.error('Error incrementing counter:', error);
        }
    };

    const handleDecrement = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/counter/decrement', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCount(data.count);
            } else {
                console.error('Failed to decrement counter:', response.status);
            }
        } catch (error) {
            console.error('Error decrementing counter:', error);
        }
    };

    const handleProfileRedirect = () => {
        navigate('/profile');
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
