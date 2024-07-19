import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../footer/Footer";
import NavbarMain from "../navbarmain/NavbarMain";
import ProductDetail from "../productdetail/ProductDetail";
import SubNavbar from "../subnavbar/SubNavbar";

const ProductPage = () => {
  const { state } = useLocation();
  const [flag, setFlag] = useState(0);
  const queryParam = new URLSearchParams(window.location.search);
  const query = queryParam.get("query");

  const handleDataFromWishlist = () => {
    setFlag(!flag);
  };

  return (
    <>
      <NavbarMain onDataWishlist={handleDataFromWishlist}></NavbarMain>
      <SubNavbar></SubNavbar>
      <ProductDetail
        onDataWishlist={handleDataFromWishlist}
        detail={query}
      ></ProductDetail>
      <Footer></Footer>
    </>
  );
};

export default ProductPage;
