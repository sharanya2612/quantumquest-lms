// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserDashboard from './pages/UserDashboard/UserDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import LoginPage from './pages/Login/Login';
import RegisterPage from './pages/Register/Register';
import AllCourses from './components/AllCourses/AllCourses';
import FacultyPage from './components/AllTeam/AllTeam';
import FacultyDashboard from './pages/FacultyDashboard/FacultyDashboard';
import AboutSection from './pages/About/About';
import ContactPage from './pages/Contact/Contact';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/login" element={<LoginPage setUser={setUser} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/all-courses" element={<AllCourses />} />
                <Route path="/faculty" element={<FacultyPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route
                    path="/admin-dashboard"
                    element={
                        user && user.role === 'admin' ? (
                            <AdminDashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/user-dashboard"
                    element={
                        user && user.role === 'user' ? (
                            <UserDashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/faculty-dashboard"
                    element={
                        user && user.role === 'faculty' ? (
                            <FacultyDashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
