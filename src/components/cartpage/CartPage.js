import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { GiCheckedShield } from "react-icons/gi";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import goldrush from "../../img/goldrushcart.jpg";
import logo from "../../img/logo.png";
import BillDetails from "../billdetails/BillDetails";
import CartCard from "../cartcard/CartCard";
import "../cartpage/CartPage.css";
import GoldMembershipCard from "../goldmembershipcard/GoldMembershipCard";
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { state } = useLocation();
  const [total, setTotal] = useState(0);
  const [change, setChange] = useState(false);

  const handleChange = () => {
    setChange(!change);
  };

  useEffect(() => {
    const url = `http://localhost:8080/getCartItems`;

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setCartItems(res.data);
        console.log(res);
      })
      .catch((err) => console.log("Error adding to cart"));
  }, [change]);

  useEffect(() => {
    let total1 = 0;

    cartItems.cartItem?.map((item) => {
      total1 = total1 + item.productDTO?.price * item?.quantity;
    });

    setTotal(total1);
  });

  return (
    <div style={{ backgroundColor: "#fbf9f7" }}>
      <Navbar style={{ backgroundColor: "white" }}>
        <Container>
          <Navbar.Brand>
            <Link to={"/"}>
              <img
                src={logo}
                width="127"
                height="37"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="me-1 ">
              {" "}
              <GiCheckedShield fontSize={25} />
            </Navbar.Text>
            <Navbar.Text className="me-1 "> 100% safe and secure</Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br></br>

      {cartItems.cartItem?.length > 0 && (
        <Container className="container1">
          <Row>
            <Col md={8}>
              <Link to={"/goldMembership"}>
              <Row>
                <img src={goldrush}></img>
              </Row>
              </Link>
              <br></br>
              <Row
                style={{ color: "#000048", fontSize: "2rem", padding: "10px" }}
              >
                Cart ({cartItems.cartItem?.length})
              </Row>
              <br></br>

              {cartItems.cartItem &&
                cartItems.cartItem.map((item) => {
                  return (
                    <>
                      <Row>
                        <CartCard item={item} change={handleChange}></CartCard>
                      </Row>
                      <br></br>
                    </>
                  );
                })}
            </Col>

            <Col md={4}>
              <Row
                style={{ color: "#000048", fontSize: "2rem", padding: "10px" }}
              >
                Bill Details
              </Row>
              <Row style={{ margin: "8px" }}>
                <BillDetails total={total}></BillDetails>
              </Row>
              <Row style={{ margin: "8px" }}>
                <GoldMembershipCard></GoldMembershipCard>
              </Row>
              <Row style={{ padding: "20px" }}>
                <Card
                  className="main-card shadow p-3 mb-2 bg-white rounded"
                  style={{ width: "25rem" }}
                >
                  <Card.Body bg="" className="main-card-body">
                    <Row>
                      <Col md={10} className="col1">
                        <b>Apply Coupon</b> <br></br> Check available offers
                      </Col>
                      <Col md={2}>
                        <IoArrowForwardCircleOutline />
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Row>
              <Row style={{ margin: "8px" }}>
                <Button bg="" className="btn-cart">
                  <Link
                    to={`/cart/address?total=${total}`}
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {" "}
                    Proceed To Checkout{" "}
                    <span style={{ size: "20px" }}>&gt;</span>{" "}
                  </Link>
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      )}

      {cartItems.cartItem?.length == 0 && (
        <Container
          style={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container>
            <div className="m-4" color="#000042">
              <h3>Your shopping cart is empty !</h3>
            </div>
            <div>
              <Button style={{ width: "400px" }} bg="" className="btn-cart p-2">
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "#000042" }}
                >
                  {" "}
                  <h3>Continue Shoppping</h3>{" "}
                </Link>
              </Button>
            </div>
          </Container>
        </Container>
      )}
    </div>
  );
};

export default CartPage;
