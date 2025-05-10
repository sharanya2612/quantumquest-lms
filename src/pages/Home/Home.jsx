import React from "react";
import Header from "../../components/Header/Header";
import AISection from "../../components/SubHeader/SubHeader";
import { Box } from "@mui/material";
import AiInfo from "../../components/AIInfo/AiInfo";
import Testimonials from "../../components/Testimonials/Testimonials";
import AILearningServices from "../../components/Courses/Courses";
import OurTeam from "../../components/Team/Team";
import Footer from "../../components/Footer/Footer";

const Home = () => {
  return (
      <Box>
        <Header />
        <AISection />
        <AILearningServices/>
        <AiInfo/>
        <Testimonials/>
        <OurTeam/>
        <Footer/>
      </Box>
    
  );
};

export default Home;
