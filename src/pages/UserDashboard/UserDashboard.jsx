import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Container,
  CircularProgress
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const userRes = await axios.get("http://localhost:3001/users");
      const loggedInUser = userRes.data?.find((u) => u.email === JSON.parse(localStorage.getItem('user')).email);

      if (!loggedInUser) {
        navigate("/login");
        return;
      }
      setUser(loggedInUser);

      const [courseRes, enrolledRes] = await Promise.all([
        axios.get("http://localhost:3001/courses"),
        axios.get("http://localhost:3001/enrolledcourses")
      ]);

      setCourses(courseRes.data);

      const userEnrolled = enrolledRes.data.find(
        (entry) => entry.userId === loggedInUser.id
      );

      setEnrolledCourseIds(userEnrolled ? userEnrolled.courseIds : []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    alert("Logged out!");
    localStorage.clear();
    navigate("/login");
  };

  const handleEnroll = async (courseId) => {
    if (!user) {
      alert("User data not found. Please log in again.");
      navigate("/login");
      return;
    }
  
    try {
      // Fetch enrolled courses for all users
      const enrolledRes = await axios.get("http://localhost:3001/enrolledcourses");
  
      // Find the current user's enrolled record
      const userEnrollEntry = enrolledRes.data.find(
        (entry) => entry.userId === user.id
      );
  
      let updatedCourseIds;
  
      if (userEnrollEntry) {
        // PATCH if entry already exists
        updatedCourseIds = [...userEnrollEntry.courseIds, courseId];
        await axios.patch(`http://localhost:3001/enrolledcourses/${userEnrollEntry.id}`, {
          courseIds: updatedCourseIds
        });
      } else {
        // POST if entry does not exist yet
        updatedCourseIds = [courseId];
        await axios.post(`http://localhost:3001/enrolledcourses`, {
          userId: user.id,
          courseIds: updatedCourseIds
        });
      }
  
      // Update UI
      setEnrolledCourseIds(updatedCourseIds);
      alert("Successfully enrolled!");
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Failed to enroll.");
    }
  };
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  const enrolledCourses = courses.filter((course) => enrolledCourseIds.includes(course.id));
  const availableCourses = courses.filter((course) => !enrolledCourseIds.includes(course.id));

  return (
    <Container>
      <Box py={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" fontWeight={700}>
            Welcome, {user?.name}
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Your Enrolled Courses
        </Typography>
        <Grid container spacing={3} mb={5}>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => (
              <Grid item xs={12} md={4} key={course.id}>
                <Card>
                  <CardMedia component="img" height="180" image={course.image} alt={course.title} />
                  <CardContent>
                    <Typography variant="subtitle2" color="text.secondary">
                      {course.subtitle}
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {course.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body2" sx={{ px: 2 }}>
              You haven't enrolled in any courses yet.
            </Typography>
          )}
        </Grid>

        <Typography variant="h5" fontWeight={600} gutterBottom>
          Available Courses
        </Typography>
        <Grid container spacing={4}>
          {availableCourses.map((course) => (
            <Grid item xs={12} md={4} key={course.id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia component="img" height="180" image={course.image} alt={course.title} />
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {course.subtitle}
                  </Typography>
                  <Typography variant="h6" fontWeight={600}>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {course.description}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption">{course.students} Students</Typography>
                    <Typography variant="caption">{course.reviews} Reviews</Typography>
                    <Typography variant="subtitle1" color="primary" fontWeight={600}>
                      {course.price}
                    </Typography>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => handleEnroll(course.id)}
                    disabled={enrolledCourseIds.includes(course.id)}
                  >
                    Enroll
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default UserDashboard;
