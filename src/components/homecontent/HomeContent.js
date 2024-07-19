import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../homecontent/HomeContent.css";
import {Link} from 'react-router-dom';
const HomeContent = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <div>
        <Link to={"/goldMembership"}>
      
        <img
          src="https://static5.lenskart.com/media/uploads/1920x520-gantan.png"
          className="image-1"
        ></img>
        </Link>
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item interval={1000}>
          <img
            className="carosal-img"
            src="https://static1.lenskart.com/media/desktop/img/oct9/holiday-edit/Desktop.jpg"
          ></img>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="carosal-img"
            src="https://static1.lenskart.com/media/desktop/img/nov23/gulmarg/Web-banner%20option%201-min.png"
          ></img>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="carosal-img"
            src="https://static5.lenskart.com/media/uploads/Turban-DesktopBanner.jpg"
          ></img>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div>
        <img
          src="https://static1.lenskart.com/media/desktop/img/Apr22/Bannerforexport.jpg"
          className="image-1"
        ></img>
      </div>
    </div>
  );
};

export default HomeContent;
