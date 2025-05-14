import React from "react";
import {
    Box,
    Button,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    CircularProgress
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();  // create navigate function

    const handleStartLearning = () => {
        navigate('/login');  // navigate to the login page
    };
    return (
        <Container maxWidth={false} sx={{ background: `linear-gradient(180deg, #b2d8ff, #ffffff)` }}>
            {/* Header */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={3}
            >
                <Typography variant="h5" fontWeight="bold">
                    QuantumQuest
                </Typography>
                <Box display="flex" gap={3}>
                    <Button color="inherit" onClick={() => navigate('/about')}>About</Button>
                    <Button color="inherit" onClick={() => navigate('/all-courses')}>Courses</Button>
                    <Button color="inherit" onClick={() => navigate('/faculty')}>Instructors</Button>
                    <Button color="inherit" onClick={() => navigate('/contact')}>Contact</Button>
                    <Button
                        variant="outlined"
                        sx={{ borderRadius: "30px", textTransform: "none" }}
                        onClick={handleStartLearning}
                    >
                        Start Learning
                    </Button>
                </Box>
            </Box>

            {/* Hero Section */}
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        Unlock Your AI Potential with <br />
                        QuantumQuest!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Embark on an AI learning journey with QuantumQuest. Master the
                        latest trends and shape the future of technology.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ mt: 3, borderRadius: "30px" }}
                        onClick={handleStartLearning}
                    >
                        Start Learning
                    </Button>
                </Grid>

                {/* AI Tools Section */}
                <Grid item xs={12} md={6} display="flex" justifyContent="center">
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 400,
                            height: 400,
                            backgroundImage: 'url(${process.env.PUBLIC_URL}/assets/images/header_1.png)', // Path to your image in the public folder
                            backgroundSize: "cover",  // Ensures the image covers the entire Box
                            backgroundPosition: "center",  // Centers the image
                            borderRadius: "50%",
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            gap: 2,
                            p: 3,
                        }}
                    >

                        {/* Stats Cards */}
                        <Card
                            sx={{
                                position: "absolute",
                                top: 20,
                                left: -30,
                                background: "white",
                                p: 1,
                                borderRadius: "12px",
                                boxShadow: 3,
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <PeopleIcon color="primary" />
                                    <Typography sx={{ ml: 1 }} variant="body2">
                                        50+ Tutors
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card
                            sx={{
                                position: "absolute",
                                top: 60,
                                right: -40,
                                background: "white",
                                p: 1,
                                borderRadius: "12px",
                                boxShadow: 3,
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center">
                                    <PeopleIcon color="primary" />
                                    <Typography sx={{ ml: 1 }} variant="body2">
                                        3k+ AI
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                        <Card
                            sx={{
                                position: "absolute",
                                bottom: -40,
                                left: "40%",
                                transform: "translateX(-50%)",
                                background: "white",
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                borderRadius: "12px",
                                boxShadow: 3,
                            }}
                        >
                            {/* Circular Progress with Percentage in Center */}
                            <Box position="relative" display="inline-flex" mr={2}>
                                <CircularProgress
                                    variant="determinate"
                                    value={97}
                                    size={50} // Adjust the size
                                    thickness={2} // Thickness of the progress circle
                                    sx={{ color: "#007bff" }} // Blue color matching the design
                                />
                                <Box
                                    sx={{
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        position: "absolute",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography variant="body2" fontWeight="bold" color="black">
                                        97%
                                    </Typography>
                                </Box>
                            </Box>

                            {/* AI Label */}
                            <Box>
                                <Typography variant="body1" fontWeight="bold">
                                    AI
                                </Typography>
                                <Typography variant="caption" color="gray">
                                    AI
                                </Typography>
                            </Box>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Header;