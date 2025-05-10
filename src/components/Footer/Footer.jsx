import React from "react";
import { Box, Container, Typography, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import SubFooter from "../SubFooter/SubFooter";
 
const Footer = () => {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1E3A8A, #1E40AF)", // Deep blue gradient
        color: "white",
        py: 3,
        px: 3,
        mt: 2,
      }}
    >
      <Container maxWidth="lg">
      <SubFooter/>
        <Grid container spacing={4}>
          {/* Left Section - Branding */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight="bold">
              QuantumQuest
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
              AI-driven learning platform.
            </Typography>
          </Grid>
 
          {/* Center Section - Navigation Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Link href="#" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/all-courses" color="inherit" underline="hover">
                Courses
              </Link>
              <Link href="/faculty" color="inherit" underline="hover">
                Instructors
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Contact
              </Link>
            </Box>
          </Grid>
 
          {/* Right Section - Social Media Icons */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
 
        {/* Divider Line */}
        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.3)", mt: 4, pt: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Sharanya Shetty. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
 
export default Footer;
 