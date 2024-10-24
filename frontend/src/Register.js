import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        gender: '',
        hobbies: [],
        brief: '',
        dateOfBirth: '',
        favoriteColor: '',
        image: null,
        cv: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0],
        }));
    };

    const handleHobbyChange = (e) => {
        const { value, checked } = e.target;
        setFormData((prevData) => {
            const hobbies = checked
                ? [...prevData.hobbies, value] 
                : prevData.hobbies.filter((hobby) => hobby !== value); 
            return {
                ...prevData,
                hobbies,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const response = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                body: form,
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            alert('Registration successful, redirecting to login...');
            navigate('/login');
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Error during registration. Please try again.');
        }
    };

    return (
<div className='bg-gray-700 min-h-screen w-full flex items-center justify-center'>
    <form onSubmit={handleSubmit} className="max-w-4xl w-full p-10 bg-gray-900 rounded-lg shadow-lg text-white">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-400">Register</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <select
                name="gender"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <textarea
                name="brief"
                placeholder="Brief Description"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="file"
                name="cv"
                accept="application/pdf"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-3 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <button
            type="submit"
            className="w-full mt-8 px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-bold transition-all"
        >
            Register
        </button>
    </form>
</div>


    );
};

export default Register;
