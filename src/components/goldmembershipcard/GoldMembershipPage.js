import React from 'react'
import NavbarMain from '../navbarmain/NavbarMain'
import SubNavbar from '../subnavbar/SubNavbar'
import GoldMembershipDetails from './GoldMembershipDetails'
import Footer from '../footer/Footer'
import { useState } from 'react'
import "../goldmembershipcard/GoldMembershipPage.css"
const GoldMembershipPage = () => {
  const [flag, setFlag] = useState(0);
  const handleDataFromWishlist = () => {
    setFlag(!flag);
  };
  return (
    <>
    <NavbarMain onDataWishlist={handleDataFromWishlist}></NavbarMain>
    <SubNavbar></SubNavbar>
    <GoldMembershipDetails></GoldMembershipDetails>
    <Footer></Footer>
    </>
  )
}

export default GoldMembershipPage