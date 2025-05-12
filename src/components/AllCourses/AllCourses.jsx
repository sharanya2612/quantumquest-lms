import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  CircularProgress,
  Button,
  Fade,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/courses');
        setCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Could not load courses. Try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        background: 'linear-gradient(to bottom, #cce7ff, #ffffff)',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        Explore Our AI Courses
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary">
        Learn AI with hands-on projects, expert mentorship, and cutting-edge tools.
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center" mt={4}>
          {error}
        </Typography>
      ) : (
        <>
          <Grid container spacing={4} justifyContent="center" mt={4}>
            {courses.map((course, index) => (
              <Fade in timeout={400 + index * 150} key={index}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: '100%',
                      backgroundColor: '#f0f0f0',
                      borderRadius: 2,
                      boxShadow: 2,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={course.image}
                      alt={course.title}
                    />
                    <CardContent>
                      <Typography variant="subtitle2" color="text.secondary">
                        {course.subtitle}
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        {course.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {course.description}
                      </Typography>
                      <Divider sx={{ marginY: 2, backgroundColor: '#dcdcdc' }} />
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center">
                          <PersonIcon sx={{ fontSize: 14, mr: 0.5 }} />
                          <Typography variant="caption">{course.students}</Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <ThumbUpIcon sx={{ fontSize: 14, mr: 0.5 }} />
                          <Typography variant="caption">{course.reviews}</Typography>
                        </Box>
                        <Typography
                          variant="subtitle1"
                          color="primary"
                          fontWeight={600}
                        >
                          {course.price}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Fade>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={8}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{
                px: 4,
                py: 1.5,
                fontWeight: 'bold',
                boxShadow: 3,
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              Back to Home
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AllCourses;
