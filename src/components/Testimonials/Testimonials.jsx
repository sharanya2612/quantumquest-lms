import React from 'react';
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';
 
const testimonials = [
  {
    name: 'John Doe',
    title: 'AI Engineer',
    feedback: "QuantumQuest's AI courses transformed my career! The hands-on projects and expert guidance were invaluable. Highly recommend for aspiring AI professionals.",
img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Jane Smith',
    title: 'AI Developer',
    feedback: "QuantumQuest's AI courses are amazing! The content is engaging, and the support is fantastic. Upto trends with the new technologies.I highly recommend it!",
img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'David Lee',
    title: 'Data Scientist',
    feedback: "QuantumQuest's AI training is top-notch! The curriculum is current, and the instructors are experts. A game-changer for my career!",
img: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
];
 
const Testimonials = () => {
  return (
    <Box sx={{ backgroundColor: '#1E3A8A', color: 'white', py: 8, textAlign: 'center' }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Real Stories
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 6 }}>
        What People Say
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {testimonials.map((item, index) => (
          <Grid item xs={12} md={3.5} key={index}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: '#1E40AF', color: 'white', borderRadius: 2 }}>
              <Avatar src={item.img} sx={{ width: 56, height: 56, mx: 'auto', mb: 2 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
{item.feedback}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
{item.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#D1D5DB' }}>
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
 
export default Testimonials;