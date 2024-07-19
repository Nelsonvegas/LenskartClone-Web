import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GiCheckedShield } from "react-icons/gi";
import { LiaArrowCircleRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import BillDetails from "../billdetails/BillDetails";

const PaymentPage = () => {
  const [active, setActive] = useState(null);
  const [show, setShow] = useState(false);
  const addressIDParam = new URLSearchParams(window.location.search);
  const addressId = addressIDParam.get("addressId");
  const total = addressIDParam.get("total");
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState({
    paymentMode: "Online",
    discount: 0,
    paymentId: "",
  });
  const [paymentDetail, setPaymentDetail] = useState({
    paymentId: null,
    paymentAmount: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clearCart = (data, payId) => {
    console.log(orderDetail);
    const url = `http://localhost:8080/createOrder/${addressId}/${orderDetail.paymentMode}/${orderDetail.discount}/${payId}`;
    const url1 = "http://localhost:8080/savePaymentDetails";

    axios
      .post(url, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        axios
          .post(
            url1,
            { paymentId: payId, paymentAmount: total },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            navigate("/AccountInfo");
          })
          .catch((err) => console.log("Error saving payment details "));
      })
      .catch((err) => console.log("Error saving order details "));
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const paymentHandler = async () => {
    const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("failed to load");
      return;
    }

    const result = await axios.post(
      `http://localhost:8080/createPaymentOrder/${total}`,
      null,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      }
    );
    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_FpurvsDpzlCYvx",
      amount: amount,
      currency: currency,
      name: "Nelson Corp.",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: function (response) {
        const data = {
          paymentId: response.razorpay_payment_id,
          paymentAmount: total,
        };
        if (response.razorpay_payment_id) {
          setPaymentDetail((pre) => ({ ...pre, paymentAmount: total }));
          setPaymentDetail((pre) => ({
            ...pre,
            paymentId: response.razorpay_payment_id,
          }));
          setOrderDetail((pre) => ({
            ...pre,
            paymentId: response.razorpay_payment_id,
          }));

          clearCart(data, response.razorpay_payment_id);
        }
      },
      prefill: {
        name: "Nelson",
        email: "Nelson@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "ITPL",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div style={{ backgroundColor: "#fbf9f7" }}>
      {console.log(orderDetail)}

      <Navbar style={{ backgroundColor: "white" }}>
        <Container>
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="127"
              height="37"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
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

      <Container>
        <Row>
          <Col md={7}>
            <Row
              style={{ color: "#000048", fontSize: "2rem", padding: "10px" }}
            >
              Payment Methods
            </Row>

            <Row>
              <div
                className="border rounded m-2 p-4"
                onClick={(e) => {
                  handleShow();
                }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  backgroundColor: "white",
                }}
              >
                <div>
                  <Form.Check
                    inline
                    name="group1"
                    type="radio"
                    id="inline-radio-1"
                    value="radiobtn"
                  />{" "}
                  Apply Coupon
                </div>
                <div>
                  <LiaArrowCircleRightSolid
                    fontSize={30}
                  ></LiaArrowCircleRightSolid>
                </div>
              </div>
            </Row>

            <>
              <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Apply Coupon</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex">
                  <Form.Control
                    className="m-3 w-75"
                    style={{ height: "40px" }}
                    placeholder="ENTER COUPON CODE"
                    name="email"
                    aria-describedby="basic-addon1"
                  />
                  <Button
                    variant="outline-dark"
                    className="m-3"
                    style={{ height: "40px" }}
                  >
                    APPLY
                  </Button>
                </Offcanvas.Body>
              </Offcanvas>
            </>

            <Row className="" style={{ padding: "10px", fontSize: "1.3rem" }}>
              Online Payment
            </Row>
            <Row>
              <div
                className="border rounded m-2 p-4"
                style={{ backgroundColor: "white" }}
              >
                <div className="d-flex ">
                  <Form.Check
                    inline
                    name="group1"
                    type="radio"
                    id="inline-radio-4"
                    onChange={() => {
                      setActive("phonepe");
                    }}
                  />{" "}
                  <span>Online</span>
                </div>
                {active == "phonepe" && (
                  <div className="d-flex justify-content-end">
                    {" "}
                    <Button
                      className="w-25"
                      onClick={() => paymentHandler()}
                      style={{
                        backgroundColor: "#11daac",

                        padding: "15px",
                      }}
                    >
                      Pay Now <span style={{ size: "20px" }}>&gt;</span>{" "}
                    </Button>
                  </div>
                )}
              </div>
            </Row>
          </Col>

          <Col md={4} className="ms-5">
            <Row
              style={{ color: "#000048", fontSize: "2rem", padding: "10px" }}
            >
              Bill Details
            </Row>
            <Row style={{ margin: "8px" }}>
              <BillDetails total={total}></BillDetails>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PaymentPage;
