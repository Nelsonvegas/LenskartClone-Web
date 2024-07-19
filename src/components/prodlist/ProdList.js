import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProdCard from "../card/ProdCard";
const ProdList = (props) => {
  return (
    <Row xs={3} md={3} className="g-3">
      {props.productDetail?.map((item) => (
        <Col key={item}>
          <ProdCard wishlistChange={props.wishlistChange} onDataWishlist={props.onDataWishlist} detail={item}></ProdCard>
        </Col>
      ))}
    </Row>
  );
};

export default ProdList;
