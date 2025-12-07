import AboutSection from "@/components/About";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import Logo from "@/components/Logo";
import MarketSection from "@/components/Market";
import NavBar from "@/components/Navbar";
import PlansSection from "@/components/Plans";
import SecuritySection from "@/components/Security";
import React from "react";

const Home = () => {
  return (
    <div>
      <NavBar />
      <HeroSection theme="dark" />
      <MarketSection theme="dark" />
      <AboutSection theme="dark" />
      <SecuritySection theme="dark" />
      <Faq theme="dark" />
      <PlansSection theme="dark" />
      <Footer mode="dark" />
    </div>
  );
};

export default Home;
