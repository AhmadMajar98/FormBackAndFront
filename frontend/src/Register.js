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
                ? [...prevData.hobbies, value] // Add hobby if checked
                : prevData.hobbies.filter((hobby) => hobby !== value); // Remove hobby if unchecked
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
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <select name="gender" onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <div>
                <label>Hobbies:</label>
                <label>
                    <input type="checkbox" name="hobbies" value="Reading" onChange={handleHobbyChange} /> Reading
                </label>
                <label>
                    <input type="checkbox" name="hobbies" value="Traveling" onChange={handleHobbyChange} /> Traveling
                </label>
                <label>
                    <input type="checkbox" name="hobbies" value="Cooking" onChange={handleHobbyChange} /> Cooking
                </label>
            </div>
            <textarea name="brief" placeholder="Brief" onChange={handleChange}></textarea>
            <input type="date" name="dateOfBirth" onChange={handleChange} required />
            <input type="color" name="favoriteColor" onChange={handleChange} />
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} required />
            <input type="file" name="cv" accept="application/pdf" onChange={handleFileChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
