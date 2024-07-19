import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { IoIosInformationCircleOutline } from "react-icons/io";
import "../goldmembershipcard/GoldMembershipCard.css";

const GoldMembershipCard = () => {
  return (
    <Card
      className="main-card"
      style={{ width: "25rem", backgroundColor: "#ffefce" }}
    >
      <Card.Body bg="" className="main-card-body">
        <Row>
          <Col md={10} className="col1">
            Gold Membership added for Free!
          </Col>
          <Col md={2}>
            <IoIosInformationCircleOutline />
          </Col>
        </Row>
        <Row>
          <Col md={10} className="col1">
            Buy 1 Get 1 + 60% Off on 3rd item onwards applied
          </Col>
          <Col md={2}></Col>
        </Row>
        <Row>
          <Col md={10} className="col1">
            You are saving ₹3700 on this order.
          </Col>
          <Col md={2}></Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default GoldMembershipCard;
