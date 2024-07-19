import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FaHome } from "react-icons/fa";
import { GiCheckedShield } from "react-icons/gi";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { LiaArrowCircleRightSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import "../Checkout/SelectAddressPage.css";
import AddressInput from "../accountInfoPage/AddressInput";
import BillDetails from "../billdetails/BillDetails";
const SelectAddressPage = () => {
  const [userAddresses, setUserAddresses] = useState([]);
  const [addressIdPass, setAddressIdPass] = useState(null);
  const totalParam = new URLSearchParams(window.location.search);
  const total = totalParam.get("total");
  const [onDatafromChild, setOnDataFromChild] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [isAddressUpdate, setIsAddressUpdate] = useState(false);
  const [addressId, setAdddressId] = useState(null);
  const [addressDetails, setAdddressDetails] = useState(null);

  const handleHideAddress = () => {
    setShowAddress(false);
  };

  const handleAddressInput = () => {
    setOnDataFromChild(!onDatafromChild);
  };

  const handleAddressId = (data) => {
    setAddressIdPass(data);
  };

  const handleClick = () => {
    window.location.href = `/cart/payment?addressId=${addressIdPass}&total=${total}`;
  };

  useEffect(() => {
    const url = `http://localhost:8080/getAllAddress`;

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setUserAddresses(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [onDatafromChild]);

  return (
    <div style={{ backgroundColor: "#fbf9f7" }}>
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
              Select Address
            </Row>
            <Row className="" style={{ padding: "10px", fontSize: "1.3rem" }}>
              Saved Addresses
            </Row>

            <Row>
              {userAddresses.map((address) => (
                <div
                  onClick={() => {
                    handleAddressId(address.addressId);
                  }}
                  className="border rounded m-2 p-4"
                  style={
                    addressIdPass == address.addressId
                      ? { backgroundColor: "#d8e1e5", borderColor: "red" }
                      : { backgroundColor: "#f5f5ff" }
                  }
                >
                  <Row>
                    <Col className="text-left">
                      {address.addressId == "Work" ? (
                        <IoBagOutline size={25}></IoBagOutline>
                      ) : (
                        <FaHome size={25}></FaHome>
                      )}{" "}
                      &nbsp; {address.addressType}
                    </Col>
                    <Col className="text-right">
                      {(addressIdPass == address.addressId ||
                        address.defaultAddress) && (
                        <IoIosCheckmarkCircle size={25}></IoIosCheckmarkCircle>
                      )}
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col md={10}>
                      <div className=" d-flex text-align-left pb-1">
                        {address.firstName} &nbsp; {address.lastName}
                      </div>

                      <div className=" d-flex text-align-left pb-1">
                        {address.addressLine1}
                      </div>
                      <div className=" d-flex text-align-left pb-1">
                        {address.addressLine2}
                      </div>

                      <div className=" d-flex text-align-left pb-1">
                        {address.city}, {address.state}, {address.country}-{" "}
                        {address.postalCode}
                      </div>

                      <div className=" d-flex text-align-left pb-1">
                        Phone-{address.phoneNumber}
                      </div>
                    </Col>

                    <Col
                      md={2}
                      className="d-flex justify-content-centre align-items-centre"
                    >
                      {/* <Link className="link-color" onClick={()=>{setAdddressDetails(address);setAdddressId(address.addressId);setIsAddressUpdate(true);setShowAddress(true)}}>Delete</Link>&nbsp; &nbsp;{" "}
                      <Link className="link-color">Edit</Link>{" "} */}
                    </Col>
                  </Row>
                </div>
              ))}
            </Row>

            <Row>
              <div
                className="border rounded m-2 p-4"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsAddressUpdate(false);
                  setShowAddress(true);
                }}
              >
                <div>Add New Address</div>
                <div>
                  <LiaArrowCircleRightSolid
                    fontSize={30}
                  ></LiaArrowCircleRightSolid>
                </div>
              </div>
            </Row>
            <Row>
              {showAddress && (
                <AddressInput
                  hideAddress={handleHideAddress}
                  onAddressInput={handleAddressInput}
                  isAddressUpdate={isAddressUpdate}
                  addressId={addressId}
                  addressDetails={addressDetails}
                ></AddressInput>
              )}
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

            <Row style={{ margin: "8px" }}>
              <Button
                bg=""
                style={{
                  backgroundColor: "#11daac",
                  width: "100%",
                  padding: "15px",
                }}
                disabled={addressIdPass == null}
              >
                <Link
                  onClick={handleClick}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {" "}
                  Proceed To Payment <span style={{ size: "20px" }}>
                    &gt;
                  </span>{" "}
                </Link>
              </Button>
            </Row>
            <Row>
              {addressIdPass == null && (
                <p style={{ color: "red" }}>Please select an address</p>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SelectAddressPage;
