import { Box, Grid, Typography, Card } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ChatIcon from "@mui/icons-material/Chat";
import MovieIcon from "@mui/icons-material/Movie";

// Feature data
const features = [
  {
    title: "AI Core",
    description: "Dive into AI's core, mastering algorithms and neural networks.",
    icon: <StarIcon sx={{ fontSize: 50, color: "black" }} />,
  },
  {
    title: "AI Trends",
    description: "Stay ahead with courses on the latest AI trends. Explore AI World",
    icon: <ChatIcon sx={{ fontSize: 50, color: "black" }} />,
  },
  {
    title: "AI Apply",
    description: "Apply AI in real-world projects, boosting your practical skills.",
    icon: <MovieIcon sx={{ fontSize: 50, color: "black" }} />,
  },
];

export default function AISection() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        py: 15,
        backgroundColor: 'white'
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        sx={{ color: "black", mb: 4 }}
      >
        Explore Our AI Features
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                p: 3,
                background: `linear-gradient(180deg, #b2d8ff, #ffffff)`,
                margin:'20px',
                color: "black",
                textAlign: "center",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "10px 10px 20px rgba(0,0,0,0.3)",
                },
                maxWidth: 300, // Reduced width
                margin: "0 auto", // Center the card
              }}
            >
              <Box mb={2}>{feature.icon}</Box>
              <Typography variant="h6" fontWeight="bold">
                {feature.title}
              </Typography>
              <Typography variant="body2">{feature.description}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
