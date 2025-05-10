import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, Grid,
  IconButton, Button, Box, CircularProgress
} from '@mui/material';
import { Facebook, LinkedIn, Instagram } from '@mui/icons-material';
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

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await axios.get("http://localhost:3001/faculty");
        setTeamMembers(response.data);
      } catch (err) {
        console.error("Failed to fetch team data:", err);
        setError("Failed to load team members.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <Box sx={{ px: 4, py: 6, textAlign: 'center' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Our Team
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Meet our team of dedicated AI experts, passionate about shaping the future of AI education.
      </Typography>

      {loading ? (
        <Box mt={4}><CircularProgress /></Box>
      ) : error ? (
        <Typography color="error" mt={2}>{error}</Typography>
      ) : (
        <>
          <Grid container justifyContent="center">
            {teamMembers.slice(0, 4).map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </Grid>
          <Box mt={4}>
            <Button variant="outlined" size="large" onClick={() => navigate('/faculty')}>
              Meet Experts
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default OurTeam;
