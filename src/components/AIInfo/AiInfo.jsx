import React from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardMedia,
  Paper,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AiInfo = () => {
  return (
    <Container maxWidth="xl" sx={{  mb: 8, p: 4 , backgroundColor:"white"}}>
      <Grid container spacing={6} alignItems="center">
        
        {/* Left Section - Text and Features */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
            QuantumQuest: <br /> Revolutionizing AI Education with Cutting-Edge Features
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 3, color: "#555" }}>
            QuantumQuest provides personalized learning paths, real-time feedback, and collaborative projects, ensuring an engaging and effective AI education experience.
          </Typography>
 
          {/* Features List */}
          <List>
            {["Adaptive Learning Paths", "Real-Time Feedback System", "AI Project Simulations"].map((feature, index) => (
              <ListItem key={index} sx={{ mb: 1 }}>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" fontSize="large" />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant: "" }} primary={feature} />
              </ListItem>
            ))}
          </List>
        </Grid>
 
        {/* Right Section - Images and Stats */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={6}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="550"  // Increased height
                  width="100"  // Reduced width
                  image="/assets/images/img1.png"
                  alt="AI Learning"
                />
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ borderRadius: 3, boxShadow: 3, marginTop:"50px",marginLeft:"10px" }}>
                <CardMedia
                  component="img"
                  height="550"  // Increased height
                  width="100"  // Reduced width
                  image="/assets/images/img2.png"
                  alt="AI Robotics"
                />
              </Card>
            </Grid>
          </Grid>
 
          {/* Student Success Stats */}
          <Paper
            elevation={4}
            sx={{
              mt: 4,
              p: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "12px",
              textAlign: "center",
              width:"150px",
              position: "relative",
              bottom: 120,
              right: 50,
            }}
          >
            <Box sx={{ position: "relative", display: "inline-flex", mr: 3 }}>
              <CircularProgress variant="determinate" value={95} size={80} thickness={6} color="primary" />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "15px",
                //   fontWeight: "bold",
                }}
              >
                95%
              </Box>
            </Box>
            <Typography >
              95% Student Success
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AiInfo;
