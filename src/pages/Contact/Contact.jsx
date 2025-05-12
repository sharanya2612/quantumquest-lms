import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Slide,
  Snackbar,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ContactPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  // Basic email regex
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!isValidEmail(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:3001/contact", formData);
      setSnackbar({
        open: true,
        message: "Message submitted successfully!",
        severity: "success",
      });
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
      setSnackbar({
        open: true,
        message: "There was an error submitting the message.",
        severity: "error",
      });
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #b2d8ff, #ffffff)",
        minHeight: "100vh",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        <Slide in direction="up" timeout={600}>
          <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
              Contact Us
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" align="center" mb={4}>
              We’d love to hear from you! Fill out the form below or find us on the map.
            </Typography>

            <Grid container spacing={4}>
              {/* Contact Form */}
              <Grid item xs={12} md={6}>
                <form onSubmit={handleSubmit} noValidate>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    margin="normal"
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    sx={{ mt: 2 }}
                  >
                    Send Message
                  </Button>
                </form>
              </Grid>

              {/* Map */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    height: "100%",
                    boxShadow: 3,
                  }}
                >
                  <iframe
                    title="Our Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0932491543335!2d-122.41941568468197!3d37.77492977975906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5f7680ef%3A0x9355f130f7163e43!2sSan+Francisco%2C+CA%2C+USA!5e0!3m2!1sen!2sin!4v1616583087986!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Slide>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} variant="filled">
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Back to Home Button */}
        <Box display="flex" justifyContent="center" mt={6}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: "bold",
              boxShadow: 3,
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage;
