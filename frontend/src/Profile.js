import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const fetchUserProfile = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:5001/api/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Could not fetch user profile');
            }

            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
            alert('Please log in again.');
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
            <p>Hobbies: {user.hobbies.join(', ')}</p>
            <p>Brief: {user.brief}</p>
            <p>Date of Birth: {user.dateOfBirth}</p>
            <p>Favorite Color: {user.favoriteColor}</p>
            <img src={`/${user.image}`} alt="User" />
            <p><a href={`/${user.cv}`} download>Download CV</a></p>
            <button onClick={() => navigate('/home')}>Home</button>
        </div>
    );
};

export default Profile;
