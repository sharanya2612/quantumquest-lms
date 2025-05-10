import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const SubFooter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      setIsLoading(true);
      setMessage("");

      // POST request to your endpoint
      const response = await axios.post("http://localhost:3001/email", {
        email,
      });

      if (response.status === 201) {
        setMessage("Successfully subscribed!");
        setEmail("");
      } else {
        setMessage("Something went wrong. Try again later.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setMessage("Subscription failed.");
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            variant="contained"
            onClick={handleSubscribe}
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
