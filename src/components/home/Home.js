import React from "react";
import NavbarMain from "../navbarmain/NavbarMain";

import Footer from "../footer/Footer";
import HomeContent from "../homecontent/HomeContent";
import SubNavbar from "../subnavbar/SubNavbar";
const Home = () => {
  return (
    <>
      <NavbarMain></NavbarMain>
      <SubNavbar></SubNavbar>
      <HomeContent></HomeContent>

      <Footer></Footer>
    </>
  );
};

export default Home;
