import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';

const App = () => {
    const isAuthenticated = () => {
        return !!localStorage.getItem('token');
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/register" />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={isAuthenticated() ? <Home /> : <Navigate to="/login" />} />
                <Route path="/profile" element={isAuthenticated() ? <Profile /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
