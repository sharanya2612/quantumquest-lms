// pages/Login/Login.js
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.get('http://localhost:3001/users', {
                params: { email: email.trim(), password: password.trim() },
            });

            if (response.data.length === 0) {
                setError('Invalid email or password');
                return;
            }

            const user = response.data[0];
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user); // <-- This triggers App to re-render with user

            if (user.role.trim() === 'admin') {
                navigate('/admin-dashboard');
            } else if (user.role.trim() === 'user') {
                navigate('/user-dashboard');
            } else if (user.role.trim() === 'faculty') {
                navigate('/faculty-dashboard');
            } else {
                setError('Unknown user role');
            }
        } catch (err) {
            setError('An error occurred while logging in');
            console.error(err);
        }
    };

    return (
        <Container
            maxWidth="xl"
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'linear-gradient(180deg, #b2d8ff, #ffffff)',
                p: 3,
            }}
        >
            <Paper elevation={6} sx={{ p: 3, borderRadius: 2, maxWidth: 400, width: '100%' }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                        Login to Start Learning
                    </Typography>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                mt: 2,
                                borderRadius: '30px',
                                textTransform: 'none',
                                boxShadow: 3,
                                '&:hover': {
                                    boxShadow: 6,
                                },
                            }}
                        >
                            Login
                        </Button>
                        <Box mt={2} textAlign="center">
                            <Typography variant="body2">
                                Don't have an account?{" "}
                                <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
                                    Register here
                                </Link>
                            </Typography>
                        </Box>
                        <Box mt={2} textAlign="center">
                            <Typography variant="body2">
                                Go Back to Home?{" "}
                                <Link to="/" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
                                    Click here
                                </Link>
                            </Typography>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
