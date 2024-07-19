import axios from "axios";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "../cartcard/CartCard.css";

const CartCard = (props) => {
  const handleRemove = () => {
    const url = `http://localhost:8080/removeProduct/${props.item.cartItemId}`;
    axios
      .delete(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        props.change();
        toast.error("product removed from cart");
      })
      .catch((err) => console.log("Error removing from cart"));
  };

  const handleRepeat = () => {
    const url = `http://localhost:8080/repeatProduct/${props.item.cartItemId}`;
    axios
      .put(url, null, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        props.change();
        toast.success("product repeated");
      })
      .catch((err) => console.log("Error adding to cart"));
  };

  return (
    <div>
      <Card style={{ width: "47rem" }} className="main-card">
        <Row>
          <Col md={4} className="left-row">
            <Card.Img
              src={"data:image/jpeg;base64," + props.item.productDTO?.prodImg}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Row>
                <Col md={10} className="col1">
                  {props.item.productDTO?.prodName}
                </Col>
                <Col md={2} className="col2">
                  {props.item.productDTO?.price}
                </Col>
              </Row>
              <br></br>

              <Row>
                <Col md={10} className="col1">
                  Anti-Glare Premium
                </Col>
                <Col md={2} className="col2">
                  {0}
                </Col>
              </Row>
              <br></br>
              <Row>
                <Col className="col1">
                  You Can Upload Prescription After Payment{" "}
                </Col>
              </Row>
              <hr className="hr1" />
              <Row>
                <Col md={10} className="col1 blue-text">
                  Final Price
                </Col>
                <Col md={2} className="col2 blue-text">
                  {props.item.productDTO?.price - 0}
                </Col>
              </Row>
              <hr className="hr1" />
              <Row>
                <Col md={10} className="col1 blue-text">
                  Quantity
                </Col>
                <Col md={2} className="col2 blue-text">
                  {props.item?.quantity}
                </Col>
              </Row>
              <hr className="hr1" />
              <Row>
                <Col md={10} className="col1">
                  <Link className="link blue-text" onClick={handleRemove}>
                    Remove
                  </Link>{" "}
                  &nbsp;&nbsp;|&nbsp;&nbsp;
                  <Link className="link blue-text" onClick={handleRepeat}>
                    Repeat
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CartCard;
