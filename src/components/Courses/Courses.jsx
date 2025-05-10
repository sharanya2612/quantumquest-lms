import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import HomeIcon from '@mui/icons-material/Home';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation to home

const AILearningServices = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/courses");
        setCourses(response.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Failed to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const visibleCourses = showAll ? courses : courses.slice(0, 3);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h6" align="center" color="text.secondary" gutterBottom>
        Expert Guidance
      </Typography>
      <Typography variant="h4" align="center" fontWeight={700} gutterBottom>
        Unlock AI Potential: Diverse Learning Services for Future.
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
        Explore QuantumQuest's AI learning services, tailored for every skill level, guided by experts.
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
            {visibleCourses.map((course, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    backgroundColor: '#f0f0f0',
                    borderRadius: 2,
                    boxShadow: 2,
                    width: '90%'
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
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {course.description}
                    </Typography>
                    <Divider sx={{ marginY: 2, backgroundColor: '#dcdcdc' }} />
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                      <Box display="flex" alignItems="center">
                        <PersonIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                        <Typography variant="caption">{course.students}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <ThumbUpIcon sx={{ fontSize: 14, marginRight: 0.5 }} />
                        <Typography variant="caption">{course.reviews}</Typography>
                      </Box>
                      <Typography variant="subtitle1" color="primary" fontWeight={600}>
                        {course.price}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="outlined"
              sx={{ color: '#2196f3', borderColor: '#2196f3' }}
              onClick={() => navigate("/all-courses")}
            >
              View More
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AILearningServices;
