import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleProfileRedirect = () => {
        navigate('/profile');
    };

    const firstName = localStorage.getItem('firstName');

    return (
        <div>
            <h2>Welcome, {firstName}!</h2>
            <button onClick={handleProfileRedirect}>Go to Profile</button>
        </div>
    );
};

export default Home;
