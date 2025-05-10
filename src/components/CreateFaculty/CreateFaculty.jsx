import React, { useState } from "react";
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

const FacultyForm = () => {
  const [faculty, setFaculty] = useState({
    name: "",
    role: "",
    email: "",
    socials: ["facebook", "linkedin", "instagram"],
    password: "fac1234" // Default password
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!faculty.name || !faculty.role || !faculty.email) {
      setError("Name, role, and email are required.");
      return;
    }

    try {
      // Step 1: Create user
      const userPayload = {
        email: faculty.email,
        password: faculty.password,
        role: "faculty" // Default role
      };

      const userRes = await axios.post("http://localhost:3001/users", userPayload, {
        headers: { "Content-Type": "application/json" }
      });

      const userId = userRes.data.id;

      // Step 2: Create faculty and link with userId
      const facultyPayload = {
        name: faculty.name,
        role: faculty.role,
        email: faculty.email,
        socials: faculty.socials,
        image: "", // Placeholder for future image upload
        userId: userId
      };

      await axios.post("http://localhost:3001/faculty", facultyPayload, {
        headers: { "Content-Type": "application/json" }
      });

      setSuccess(true);
      setFaculty({
        name: "",
        role: "",
        email: "",
        socials: ["facebook", "linkedin", "instagram"],
        password: "fac1234"
      });
    } catch (err) {
      console.error(err);
      setError("Failed to save faculty.");
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, margin: "auto", mt: 5 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Add New Faculty Member
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={faculty.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={faculty.role}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={faculty.email}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Box mt={3}>
        <Button variant="contained" onClick={handleSubmit} color="primary">
          Save Faculty
        </Button>
      </Box>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" onClose={() => setSuccess(false)}>
          Faculty saved successfully!
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

export default FacultyForm;
