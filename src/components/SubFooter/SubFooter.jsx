import React, { useState, useRef } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import emailjs from "@emailjs/browser";

const SubFooter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = form.current.email.value;

    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // 1. Send to your backend
      const backendResponse = await axios.post("http://localhost:3001/email", {
        email,
      });

      if (backendResponse.status === 201 || backendResponse.status === 200) {
        // 2. Send via EmailJS
        await emailjs.sendForm(
          "service_gn6u9f5",    
          "template_eev5n7d", 
          form.current,
          "ttldPan7YOySa6aTr"   
        );

        setMessage("Successfully subscribed!");
        form.current.reset();
      } else {
        setMessage("Subscription failed on the server. Try again.");
      }
    } catch (error) {
      console.error("Error during subscription:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        color: "white",
        textAlign: "center",
        py: 8,
        px: 3,
        borderRadius: "12px",
        mt: 2,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          AI Experts
        </Typography>

        <Typography variant="h6" sx={{ opacity: 0.8, mb: 4 }}>
          Upskill your AI knowledge with us!
        </Typography>

        <form ref={form} onSubmit={handleSubscribe}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <TextField
              name="email"
              type="email"
              required
              variant="outlined"
              placeholder="Enter your email"
              sx={{
                bgcolor: "white",
                borderRadius: "30px",
                flex: 1,
                "& input": { padding: "12px" },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                bgcolor: "#4299E1",
                color: "white",
                borderRadius: "30px",
                px: 4,
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": { bgcolor: "#3182CE" },
              }}
            >
              {isLoading ? "Submitting..." : "Subscribe"}
            </Button>
          </Box>
        </form>

        {message && (
          <Typography
            variant="body1"
            sx={{ mt: 2, color: "white", fontWeight: "bold" }}
          >
            {message}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default SubFooter;
