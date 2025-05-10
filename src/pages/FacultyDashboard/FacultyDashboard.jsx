import React, { useEffect, useState, useRef  } from 'react';
import {
  Box, Typography, Paper, Grid, List, ListItem, ListItemIcon, ListItemText,
  Button, Tabs, Tab, Modal, TextField, IconButton, Avatar
} from '@mui/material';
import {
  Edit as EditIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  PhotoCamera,
  Lock as LockIcon
} from '@mui/icons-material';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useNavigate } from 'react-router-dom';
import CourseForm from '../../components/CreateCourses/CreateCourses';
import EditCourseModal from '../../components/EditCourseModal/EditCourseModal';
import ChangePasswordModal from '../../components/ChangePassword/ChangePasswordModal';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const FacultyDashboard = () => {
  const [value, setValue] = useState(0);
  const [courses, setCourses] = useState([]);
  const [enrolledData, setEnrolledData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [editCourseOpen, setEditCourseOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [profileImage, setProfileImage] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [facultyDetails, setFacultyDetails] = useState({
    id:null,
    name: '',
    email: '',
    role: '',
    image: '',
    socials: [],
    userId: null
  });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user?.id) {
        alert('User not found in local storage.');
        return;
    }

    const userId=user.id;

    axios.get('http://localhost:3001/faculty')
      .then((res) => {
        const data = res.data.find(user => user.userId === userId);
        if (data) {
          setFacultyDetails({
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            socials: ["facebook", "linkedin", "instagram"],
            image: data.image || '',
            userId: data.userId
          });
          if (data.image) setProfileImage(data.image);
        }
      })
      .catch(err => console.error('Error fetching profile:', err));

    axios.get('http://localhost:3001/courses')
      .then(res => setCourses(res.data));

    axios.get('http://localhost:3001/enrolledcourses')
      .then(res => setEnrolledData(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert('Logged out!');
    navigate('/login');
  };

  const handleEditCourse = (id) => {
    setSelectedCourseId(id);
    setEditCourseOpen(true);
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file && ['image/jpeg', 'image/png'].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid JPEG or PNG image.');
    }
    fileInputRef.current.value = '';
  };

  const handleUpdateProfile = () => {
    const updated = {
      ...facultyDetails,
      image: newImage || facultyDetails.image
    };

    axios.put(`http://localhost:3001/faculty/${facultyDetails.id}`, updated)
    .then(() => {
      alert('Profile updated successfully');
      setProfileModalOpen(false);
      setProfileImage(updated.image);
    })
    .catch((err) => {
      console.error('Error updating profile:', err);
      alert('Error updating profile.');
    });
  };

  const chartOptions = {
    chart: { type: 'column' },
    title: { text: 'Enrolled Students per Course' },
    xAxis: {
      categories: courses.map(course => course.title),
    },
    yAxis: {
      title: { text: 'Number of Students' },
      allowDecimals: false,
    },
    series: [{
      name: 'Students',
      data: courses.map(course => {
        const courseIds = enrolledData.filter(enroll => enroll.courseIds.includes(course.id));
        return courseIds.length;
      }),
      colorByPoint: true,
    }],
    credits: { enabled: false },
  };

  return (
    <Box sx={{ background: 'linear-gradient(180deg, #b2d8ff, #ffffff)', minHeight: '100vh', p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <Avatar src={profileImage} sx={{ width: 100, height: 100, margin: 'auto' }} />
            <Typography variant="h6" sx={{ mt: 1 }}>{facultyDetails.name}</Typography>
            <Button onClick={() => setProfileModalOpen(true)} startIcon={<AccountCircleIcon />}>Edit Profile</Button>
            <Button onClick={handleLogout} color="error" startIcon={<LogoutIcon />}>Logout</Button>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={9}>
          <Paper sx={{ p: 2 }}>
            <Tabs value={value} onChange={(e, newVal) => setValue(newVal)}>
              <Tab label="Courses" />
              <Tab label="Enrolled Students" />
              <Tab label="Add Courses" />
            </Tabs>

            {value === 0 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>My Courses</Typography>
                <List>
                  {courses.map(course => (
                    <ListItem key={course.id}>
                      <ListItemText primary={course.title} secondary={course.subtitle} />
                      <ListItemIcon>
                        <IconButton onClick={() => handleEditCourse(course.id)}><EditIcon /></IconButton>
                      </ListItemIcon>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {value === 1 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>Enrolled Students</Typography>
                <HighchartsReact highcharts={Highcharts} options={chartOptions} />
              </Box>
            )}

            {value === 2 && (
              <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>Add New Course</Typography>
                <CourseForm />
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Profile Modal */}
      <Modal open={profileModalOpen} onClose={() => setProfileModalOpen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" gutterBottom>Edit Profile</Typography>

          <TextField label="Name" fullWidth margin="normal"
            value={facultyDetails.name}
            onChange={(e) => setFacultyDetails({ ...facultyDetails, name: e.target.value })}
          />

          <TextField label="Email" fullWidth margin="normal"
            value={facultyDetails.email} InputProps={{ readOnly: true }}
          />

          <TextField label="Role" fullWidth margin="normal"
            value={facultyDetails.role}
            onChange={(e) => setFacultyDetails({ ...facultyDetails, role: e.target.value })}
          />

          {(facultyDetails.image || newImage) && (
            <Box textAlign="center" my={2}>
              <Avatar src={newImage || facultyDetails.image} sx={{ width: 100, height: 100, margin: 'auto' }} />
              <Typography variant="body2">Current Profile Image</Typography>
            </Box>
          )}

          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={<PhotoCamera />}
            sx={{ mt: 2 }}
          >
            Upload New Image
            <input
              type="file"
              hidden
              accept="image/jpeg,image/png"
              onChange={handleProfileImageChange}
              ref={fileInputRef}
            />
          </Button>

          <Button
            variant="contained"
            startIcon={<LockIcon />}
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setChangePasswordOpen(true)}
          >
            Change Password
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleUpdateProfile}
          >
            Update Profile
          </Button>
        </Box>
      </Modal>

      <EditCourseModal
        open={editCourseOpen}
        onClose={() => setEditCourseOpen(false)}
        courseId={selectedCourseId}
      />

      <ChangePasswordModal
        open={changePasswordOpen}
        onClose={() => setChangePasswordOpen(false)}
      />
    </Box>
  );
};

export default FacultyDashboard;
