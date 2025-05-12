import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Zoom,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: `linear-gradient(180deg, #b2d8ff, #ffffff)`,
        py: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          {/* Textual Content */}
          <Grid item xs={12} md={6}>
            <Zoom in timeout={600}>
              <Box>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  🚀 Revolutionizing AI Education
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                  At <strong>QuantumQuest</strong>, we go beyond traditional education. Our AI-powered learning hub is engineered for tomorrow’s innovators — delivering hyper-personalized experiences, live project simulators, and collaborative challenges.
                </Typography>

                <Divider sx={{ my: 3, width: "60%" }} />

                <List>
                  {[
                    {
                      icon: <FlashOnIcon color="primary" />,
                      text: "Smart, Adaptive Learning Paths tailored to your goals",
                    },
                    {
                      icon: <SchoolIcon color="primary" />,
                      text: "Instant Feedback Engine to accelerate your growth",
                    },
                    {
                      icon: <GroupWorkIcon color="primary" />,
                      text: "Collaborative AI Missions with real-world problems",
                    },
                    {
                      icon: <RocketLaunchIcon color="primary" />,
                      text: "95% Success Rate — We launch careers, not just lessons",
                    },
                  ].map((item, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </ListItem>
                  ))}
                </List>

                <Box mt={4} display="flex" gap={2}>
                  <Button variant="contained" size="large" color="primary" onClick={() => navigate("/register")}>
                    Start Your AI Journey
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    onClick={() => navigate("/all-courses")}
                  >
                    Explore Courses
                  </Button>
                </Box>
              </Box>
            </Zoom>
          </Grid>

          {/* Visual Element */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/assets/images/about-illustration.png"
              alt="QuantumQuest AI Learning"
              sx={{
                width: "100%",
                maxHeight: "500px",
                borderRadius: 3,
                boxShadow: 6,
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            />
          </Grid>
        </Grid>

        {/* Back to Home Button */}
        <Box display="flex" justifyContent="center" mt={8}>
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

export default AboutSection;
