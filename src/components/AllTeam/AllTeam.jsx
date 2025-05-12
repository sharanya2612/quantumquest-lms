import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, Grid,
  IconButton, Box, CircularProgress, Button, Fade
} from '@mui/material';
import { Facebook, LinkedIn, Instagram } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";

const SocialIcons = ({ socials }) => (
  <Box>
    {socials?.includes('facebook') && <IconButton color="primary"><Facebook /></IconButton>}
    {socials?.includes('linkedin') && <IconButton color="primary"><LinkedIn /></IconButton>}
    {socials?.includes('instagram') && <IconButton color="primary"><Instagram /></IconButton>}
  </Box>
);

const TeamCard = ({ member, index }) => (
  <Fade in timeout={500 + index * 200}>
    <Card
      sx={{
        width: 250,
        textAlign: 'center',
        m: 2,
        backgroundColor: '#f0f0f0',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
      elevation={3}
    >
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
  </Fade>
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
    <Box
      sx={{
        px: 4,
        py: 6,
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #cce7ff, #ffffff)',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Meet Our Faculty
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Explore our team of passionate educators and AI innovators.
      </Typography>

      {loading ? (
        <Box mt={4}><CircularProgress /></Box>
      ) : (
        <Grid container justifyContent="center">
          {faculty.map((member, index) => (
            <TeamCard key={index} member={member} index={index} />
          ))}
        </Grid>
      )}

      <Box display="flex" justifyContent="center" mt={8}>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: "bold",
            boxShadow: 3,
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default FacultyPage;
