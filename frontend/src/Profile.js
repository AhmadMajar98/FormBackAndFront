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
    const handleSignOut = async () => {
        const token = localStorage.getItem('token');
        try {
            await fetch('http://localhost:5001/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            localStorage.removeItem('token');
            localStorage.removeItem('firstName');
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };


    const userInfo = [
        { label: 'First Name', value: user.firstName || 'N/A' },
        { label: 'Last Name', value: user.lastName || 'N/A' },
        { label: 'Username', value: user.username || 'N/A' },
        { label: 'Email', value: user.email || 'N/A' },
        { label: 'Phone', value: user.phone || 'N/A' },
        { label: 'Address', value: user.address || 'N/A' },
        { label: 'City', value: user.city || 'N/A' },
        { label: 'State', value: user.state || 'N/A' },
        { label: 'Zip Code', value: user.zipCode || 'N/A' },
        { label: 'Gender', value: user.gender || 'N/A' },
        { label: 'Hobbies', value: user.hobbies.length > 0 ? user.hobbies.join(', ') : 'None' },
        { label: 'Brief', value: user.brief || 'N/A' },
        { label: 'Date of Birth', value: user.dateOfBirth || 'N/A' },
        { label: 'Favorite Color', value: user.favoriteColor || 'N/A' },
    ];
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-900 to-gray-900 flex items-center justify-center p-6">
              <div className="absolute top-4 right-4">
            <button
                onClick={handleSignOut}
                className="text-red-500 hover:text-red-400 underline transition duration-300 text-lg"
            >
                Sign Out
            </button>
        </div>
            <div className="bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-3xl w-full text-white">
                <h2 className="text-4xl font-extrabold text-blue-400 mb-8 text-center">Profile Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userInfo.map((info, index) => (
                        <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className="text-sm text-blue-300 font-semibold uppercase tracking-wider">{info.label}</p>
                            <p className="text-xl text-gray-100 mt-1">{info.value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 flex justify-center items-center">
                    <img
                        src={`http://localhost:5001/${user.image}`}
                        alt="User"
                        className="rounded-full w-28 h-28 object-cover border-4 border-blue-500 shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                </div>

                <div className="mt-8 text-center">
                    <a
                        href={`http://localhost:5001/${user.cv}`}
                        download
                        className="bg-blue-700 text-white font-bold py-2 px-6 rounded-full inline-block shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105"
                    >
                        Download CV
                    </a>
                </div>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => navigate('/home')}
                        className="bg-gray-700 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:bg-gray-600 transition-all duration-300 hover:scale-105"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
