import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, Grid,
  IconButton, Box, CircularProgress, Button
} from '@mui/material';
import { Facebook, LinkedIn, Instagram, Home } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SocialIcons = ({ socials }) => (
  <Box>
    {socials?.includes('facebook') && <IconButton color="primary"><Facebook /></IconButton>}
    {socials?.includes('linkedin') && <IconButton color="primary"><LinkedIn /></IconButton>}
    {socials?.includes('instagram') && <IconButton color="primary"><Instagram /></IconButton>}
  </Box>
);

const TeamCard = ({ member }) => (
  <Card sx={{ width: 250, textAlign: 'center', m: 2, backgroundColor: '#f0f0f0' }} elevation={3}>
    <CardMedia
      component="img"
      image={member.image}
      alt={member.name}
      sx={{ borderRadius: '50%', width: 150, height: 150, mx: 'auto', mt: 2 }}
    />
    <CardContent>
      <Typography variant="h6" fontWeight="bold">{member.name}</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>{member.role}</Typography>
      <SocialIcons socials={member.socials} />
    </CardContent>
  </Card>
);

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get('http://localhost:3001/faculty');
        setFaculty(response.data);
      } catch (error) {
        console.error('Error fetching faculty:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  return (
    <Box sx={{ px: 4, py: 6, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        All Faculty Members
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Explore our full team of AI education leaders.
      </Typography>

      {loading ? (
        <Box mt={4}><CircularProgress /></Box>
      ) : (
        <Grid container justifyContent="center">
          {faculty.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </Grid>
      )}

      <Box mt={4}>
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default FacultyPage;
