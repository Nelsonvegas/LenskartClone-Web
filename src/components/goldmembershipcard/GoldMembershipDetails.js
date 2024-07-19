import React from "react";
import { Button, Image } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import "../goldmembershipcard/GoldMembershipDetails.css";
const GoldMembershipDetails = () => {
  return (
    <div className="gold-membership-details">
      <div className="pt-5">
        <Image
          className="image-top"
          style={{ height: "8rem", width: "24rem" }}
          src="https://static1.lenskart.com/media/desktop/img/jul23/POD/LK%20gold%20logo.png"
        ></Image>
      </div>
      <div className="d-flex justify-content-center">
        <div className="pt-5">
          <Image
            style={{ height: "8rem", width: "24rem" }}
            src="https://static5.lenskart.com/media/uploads/Gold_-_Buy_1_Get_1_Free_-_New.png"
          ></Image>
        </div>
        <div className="pt-5">
          <Image
            style={{ height: "8rem", width: "24rem" }}
            src="https://static5.lenskart.com/media/uploads/Gold_-_Free_Eyetest_-_New.png"
          ></Image>
        </div>
      </div>
      <div className="pt-5">
        <Image
          style={{ height: "8rem", width: "24rem" }}
          src="https://static5.lenskart.com/media/uploads/Gold_-_10__off_on_aqualens.png"
        ></Image>
      </div>
      <div className="d-flex justify-content-center pt-5">
        <div className="border rounded">
          <div
            className="d-flex jutify-content-between p-3"
            style={{ borderColor: "#e0c67c" }}
          >
            <div
              className="me-5"
              style={{ fontSize: "1.5rem", color: "#e0c67c" }}
            >
              <b>1 Year Membership</b>
            </div>
            <div style={{ fontSize: "1.5rem" }}>
              <b>
                {" "}
                <LiaRupeeSignSolid></LiaRupeeSignSolid>&nbsp;500
              </b>
            </div>
          </div>
          <div className="pt-2 pb-3">
            <Button
              bg=""
              className="btn-cart"
              style={{
                background: "#e0c67c",
                borderRadius: "10px",
                width: "22rem",
              }}
            >
              <Link style={{ textDecoration: "none", color: "#020242" }}>
                {" "}
                Buy Gold Membership <span style={{ size: "18px" }}>
                  &gt;
                </span>{" "}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <Image
            height={80}
            width={600}
            src="https://static1.lenskart.com/media/desktop/img/sep2023/gold/Gold%20-%20More%20reason%20to%20buy.png"
          ></Image>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <Image
            height={400}
            width={800}
            src="https://static5.lenskart.com/media/uploads/Gold_-_Big_deals_on_brands.png"
          ></Image>
        </div>
      </div>
      <div className="mt-5">
        <div>
          <Image
            height={80}
            width={600}
            src="https://static1.lenskart.com/media/desktop/img/sep2023/gold/Gold%20-%20FAQ.png"
          ></Image>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-center">
        <div style={{ Width: "50rem", maxWidth: "50rem", minWidth: "50rem" }}>
          <Accordion className="goldmembership-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <span style={{ marginRight: "15rem", fontSize: "1.5rem" }}>
                  How many times can I avail Buy1 Get1 free?
                </span>
              </Accordion.Header>
              <Accordion.Body style={{fontSize:"1.3rem"}}>
                Benefits can be availed on 2 orders per month & 12 orders per
                year for every individual email
              </Accordion.Body>
            </Accordion.Item>
            <hr></hr>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span style={{ marginRight: "15rem", fontSize: "1.5rem" }}>
                  Can I buy anything with the Buy1 Get1 offer?
                </span>
              </Accordion.Header>
              <Accordion.Body style={{fontSize:"1.3rem"}}>
                Yes you get buy on get one on every products
              </Accordion.Body>
            </Accordion.Item>
            <hr></hr>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <span style={{ marginRight: "15rem", fontSize: "1.5rem" }}>
                  Which brands is Buy1 Get1 free applicable on?
                </span>
              </Accordion.Header>
              <Accordion.Body style={{fontSize:"1.3rem"}}>On all of the brands</Accordion.Body>
            </Accordion.Item>
            <hr></hr>
            <Accordion.Item eventKey="3">
              <Accordion.Header>
                <span style={{ marginRight: "15rem", fontSize: "1.5rem" }}>
                  Is Buy1 Get1 applicable on progressive powers?
                </span>
              </Accordion.Header>
              <Accordion.Body style={{fontSize:"1.3rem"}}>
                Yes, Buy1 Get1 can be availed on progressive and advanced power
                glasses as well
              </Accordion.Body>
            </Accordion.Item>
            <hr></hr>
            <Accordion.Item eventKey="4">
              <Accordion.Header>
                <span style={{ marginRight: "15rem", fontSize: "1.5rem" }}>
                  How can I share my Lenskart Gold membership with friends and
                  family?
                </span>
              </Accordion.Header>
              <Accordion.Body style={{fontSize:"1.3rem"}}>
                Share Membership with friends and family by sharing your email
                with them. Your email acts as your membership id{" "}
              </Accordion.Body>
            </Accordion.Item>
            <hr></hr>
          </Accordion>
        </div>
      </div>
      <div className="d-flex justify-content-center pt-5 pb-5">
        <div className="border rounded">
          <div
            className="d-flex jutify-content-between p-3"
            style={{ borderColor: "#e0c67c" }}
          >
            <div
              className="me-5"
              style={{ fontSize: "1.5rem", color: "#e0c67c" }}
            >
              <b>1 Year Membership</b>
            </div>
            <div style={{ fontSize: "1.5rem" }}>
              <b>
                {" "}
                <LiaRupeeSignSolid></LiaRupeeSignSolid>&nbsp;500
              </b>
            </div>
          </div>
          <div className="pt-2 pb-3">
            <Button
              bg=""
              className="btn-cart"
              style={{
                background: "#e0c67c",
                borderRadius: "10px",
                width: "22rem",
              }}
            >
              <Link style={{ textDecoration: "none", color: "#020242" }}>
                {" "}
                Buy Gold Membership <span style={{ size: "18px" }}>
                  &gt;
                </span>{" "}
              </Link>
            </Button>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default GoldMembershipDetails;
