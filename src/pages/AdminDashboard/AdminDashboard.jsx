import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Typography, Paper, Grid, CircularProgress, List, ListItem, ListItemIcon, ListItemText, Divider, Button } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import FacultyForm from "../../components/CreateFaculty/CreateFaculty";
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [loadingContact, setLoadingContact] = useState(true);
  const [contact, setContact] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out!");
    localStorage.clear();
    navigate("/login");
  };


  useEffect(() => {
    axios.get("http://localhost:3001/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err))
      .finally(() => setLoadingUsers(false));

    axios.get("http://localhost:3001/email")
      .then((res) => setSubscribers(res.data))
      .catch((err) => console.error("Error fetching subscribers:", err))
      .finally(() => setLoadingSubs(false));

    axios.get("http://localhost:3001/contact")
      .then((res) => setContact(res.data))
      .catch((err) => console.error("Error fetching contact:", err))
      .finally(() => setLoadingContact(false));

    axios.get("http://localhost:3001/courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Error fetching courses:", err))
      .finally(() => setLoadingCourses(false));
  }, []);

  const adminUsers = users.filter(u => u.role === "admin");
  const facultyUsers = users.filter(u => u.role === "faculty");
  const studentUsers = users.filter(u => u.role === "user");

  const chartOptions = {
    chart: { type: "column" },
    title: { text: "User Role Distribution" },
    xAxis: { categories: ["Admin", "Faculty", "Student"] },
    yAxis: { title: { text: "Count" }, allowDecimals: false },
    series: [{
      name: "Users",
      data: [adminUsers.length, facultyUsers.length, studentUsers.length],
      colorByPoint: true
    }],
    credits: { enabled: false }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      // Step 1: Delete course from the courses list
      axios.delete(`http://localhost:3001/courses/${courseId}`);

      // Step 2: Fetch all user-course mappings
      const { data: userCourseMappings } = await axios.get("http://localhost:3001/enrolledcourses");

      // Step 3: Remove the deleted courseId from all mappings
      await Promise.all(userCourseMappings.map(async (entry) => {
        if (entry.courseIds.includes(courseId)) {
          const updatedCourseIds = entry.courseIds.filter(id => id !== courseId);
          await axios.patch(`http://localhost:3001/enrolledcoursess/${entry.id}`, {
            courseIds: updatedCourseIds
          });
        }
      }));

      // Step 4: Refresh courses state
      setCourses(prev => prev.filter(course => course.id !== courseId));
      alert("Course deleted successfully!");
    } catch (error) {
      console.error("Failed to delete course:", error);
      alert("Failed to delete course.");
    }
  };


  return (
    <Box sx={{
      background: `linear-gradient(180deg, #b2d8ff, #ffffff)`,
      minHeight: "100vh",
      p: 4
    }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      <Button
        variant="outlined"
        color="error"
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
      >
        Logout
      </Button>

      {/* User Summary Cards */}
      <Grid container spacing={2} mb={4} mt={2}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: "#bee3f8" }}>
            <Typography variant="h6">Admins</Typography>
            <Typography variant="h5">{adminUsers.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: "#c6f6d5" }}>
            <Typography variant="h6">Faculty</Typography>
            <Typography variant="h5">{facultyUsers.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, bgcolor: "#fefcbf" }}>
            <Typography variant="h6">Students</Typography>
            <Typography variant="h5">{studentUsers.length}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Chart */}
      {!loadingUsers ? (
        <Paper sx={{ p: 2, mb: 4 }}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Paper>
      ) : (
        <CircularProgress />
      )}

      <FacultyForm />

      {/* Subscribed Users */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Subscribed Users
        </Typography>
        <Paper sx={{ maxHeight: 300, overflow: "auto", p: 2 }}>
          {loadingSubs ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={100}>
              <CircularProgress />
            </Box>
          ) : subscribers.length === 0 ? (
            <Typography>No subscribers found.</Typography>
          ) : (
            <List>
              {subscribers.map((subscriber, index) => (
                <React.Fragment key={subscriber.id || index}>
                  <ListItem>
                    <ListItemIcon>
                      <EmailIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={subscriber.email} />
                  </ListItem>
                  {index < subscribers.length - 1 && <Divider />}
                </React.Fragment>
              ))}

            </List>
          )}
        </Paper>
      </Box>
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Courses
        </Typography>
        <Paper sx={{ maxHeight: 300, overflow: "auto", p: 2 }}>
          {loadingCourses ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={100}>
              <CircularProgress />
            </Box>
          ) : courses.length === 0 ? (
            <Typography>No courses found.</Typography>
          ) : (
            <List>
              {courses.map((course, index) => (
                <React.Fragment key={course.id}>
                  <ListItem
                    secondaryAction={
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Delete
                      </Button>
                    }
                  >
                    <ListItemText primary={course.title || `Course ${course.id}`} />
                  </ListItem>
                  {index < courses.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>

      {/* Contact Messages */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Contact Messages
        </Typography>
        <Paper sx={{ maxHeight: 300, overflow: "auto", p: 2 }}>
          {loadingContact ? (
            <Box display="flex" justifyContent="center" alignItems="center" height={100}>
              <CircularProgress />
            </Box>
          ) : contact.length === 0 ? (
            <Typography>No Messages found.</Typography>
          ) : (
            <List>
              {contact.map((contact, index) => (
                <React.Fragment key={contact.id || index}>
                  <ListItem alignItems="flex-start">
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4} display="flex" alignItems="center">
                        <PersonIcon sx={{ color: "primary.main", mr: 1 }} />
                        <Typography variant="body1">{contact.name}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} display="flex" alignItems="center">
                        <EmailIcon sx={{ color: "primary.main", mr: 1 }} />
                        <Typography variant="body1">{contact.email}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={4} display="flex" alignItems="center">
                        <ChatBubbleIcon sx={{ color: "primary.main", mr: 1 }} />
                        <Typography variant="body2">{contact.message}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index < contact.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
