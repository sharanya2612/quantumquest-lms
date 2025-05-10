import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardMedia, Divider, CircularProgress, Button
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/courses");
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Could not load courses. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        All AI Courses
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
              <Grid item xs={12} md={3} key={index}>
                <Card sx={{ height: '100%', backgroundColor: '#f0f0f0', borderRadius: 2, boxShadow: 2 }}>
                  <CardMedia component="img" height="200" image={course.image} alt={course.title} />
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">{course.subtitle}</Typography>
                    <Typography variant="h6" fontWeight={600}>{course.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{course.description}</Typography>
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
                      <Typography variant="subtitle1" color="primary" fontWeight={600}>{course.price}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="contained" startIcon={<HomeIcon />} onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AllCourses;
