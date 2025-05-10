import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";
import axios from "axios";

const CourseForm = () => {
  const [course, setCourse] = useState({
    title: "",
    subtitle: "",
    description: "",
    students: "",
    reviews: "",
    price: "",
    image: "",
    facultyId: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Fetch facultyId using userId from localStorage
  useEffect(() => {
    const fetchFacultyId = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) {
          setError("User not found in localStorage.");
          return;
        }

        const user = JSON.parse(userData);
        const userId = user.id;

        const res = await axios.get(`http://localhost:3001/faculty?userId=${userId}`);

        if (res.data.length === 0) {
          setError("No faculty found for this user.");
          return;
        }

        const faculty = res.data[0]; // Assume one faculty per user
        setCourse((prev) => ({ ...prev, facultyId: faculty.id }));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch faculty ID.");
      }
    };

    fetchFacultyId();
  }, []);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setCourse((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const { title, subtitle, description} = course;

    if (!title || !subtitle || !description) {
      setError("Title, subtitle and description are required.");
      return;
    }

    try {
      const updatedCourse = {
        ...course,
        price: course.price.startsWith('$') ? course.price : `$${course.price}`
      };
      
      await axios.post("http://localhost:3001/courses", updatedCourse, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      setSuccess(true);
      setCourse((prev) => ({
        ...prev,
        title: "",
        subtitle: "",
        description: "",
        students: "",
        reviews: "",
        price: "",
        image: ""
      }));
    } catch (err) {
      console.error(err);
      setError("Failed to save course.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, margin: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add New AI Course
      </Typography>
      <Grid container spacing={2}>
        {[
          { label: "Title", name: "title" },
          { label: "Subtitle", name: "subtitle" },
          { label: "Description", name: "description", multiline: true },
          { label: "Students", name: "students" },
          { label: "Reviews", name: "reviews" },
          { label: "Price", name: "price" }
        ].map((field) => (
          <Grid item xs={12} sm={field.name === "description" ? 12 : 6} key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              value={course[field.name]}
              onChange={handleChange}
              multiline={field.multiline || false}
              minRows={field.multiline ? 3 : 1}
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button variant="outlined" component="label">
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleFileChange} />
          </Button>
          {course.image && (
            <Typography mt={1} color="green">
              Image selected ✓
            </Typography>
          )}
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Save Course
        </Button>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Course saved successfully!
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert severity="error" onClose={() => setError("")}>
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CourseForm;
