import React, { useEffect, useState } from "react";
import "../billdetails/BillDetails.css";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const BillDetails = (props) => {
  const [total, setTotal] = useState(0);

  return (
    <Card
      className="main-card shadow p-3 mb-3 bg-white rounded"
      style={{ width: "25rem" }}
    >
      <Card.Body>
        <Row>
          <Col md={8} className="col1">
            Item Total
          </Col>
          <Col md={4} className="col2">
            {props.total}
          </Col>
        </Row>

        <Row>
          <Col md={8} className="col1">
            Total Offer Discount
          </Col>
          <Col md={4} className="col2 green">
            -{0}
          </Col>
        </Row>

        <Row>
          <Col md={8} className="col1">
            Net Item Total
          </Col>
          <Col md={4} className="col2">
            {props.total - 0}
          </Col>
        </Row>
        <hr className="hr1" />

        <Row>
          <Col md={8} className="col1">
            Gold Membership Discount
          </Col>
          <Col md={4} className="col2 green">
            -{0}
          </Col>
        </Row>

        <Row>
          <Col md={8} className="col1 ">
            Total After Discount
          </Col>
          <Col md={4} className="col2 ">
            {props.total - 0 - 0}
          </Col>
        </Row>
        <hr className="hr1" />
        <Row>
          <Col md={8} className="col1 blue-text">
            Total Payable
          </Col>
          <Col md={4} className="col2 blue-text">
            {props.total - 0 - 0}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BillDetails;
