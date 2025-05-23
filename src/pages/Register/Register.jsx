import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Trim to avoid whitespace-only inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setError('All fields are required');
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password length validation
    if (trimmedPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Check for password match
    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Check if email is already registered
      const existing = await axios.get('http://localhost:3001/users', {
        params: { email: trimmedEmail }
      });

      if (existing.data.length > 0) {
        setError('Email already registered');
        return;
      }

      const newUser = {
        email: trimmedEmail,
        password: trimmedPassword,
        role: 'user'
      };

      await axios.post('http://localhost:3001/users', newUser);

      navigate('/login');
    } catch (err) {
      console.error(err);
      setError('An error occurred during registration');
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
            Register to Get Started
          </Typography>
          <form onSubmit={handleRegister} style={{ width: '100%' }}>
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
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Register
            </Button>

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Have an account?{" "}
                <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
                  Login here
                </Link>
              </Typography>
            </Box>
            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                Go Back to Home?{" "}
                <Link to="/home" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 'bold' }}>
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

export default RegisterPage;
