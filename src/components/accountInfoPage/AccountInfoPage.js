import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "../accountInfoPage/AccountInfoPage.css";
import AccountInfoComponent from "./AccountInfoComponent";
import Footer from "../footer/Footer";
import NavbarMain from "../navbarmain/NavbarMain";
import SubNavbar from "../subnavbar/SubNavbar";
import ManageNotification from "./ManageNotification";
import AddressInput from "./AddressInput";
import OrdersComponent from "./OrdersComponent";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "sonner";
const AccountInfoPage = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [onDatafromChild, setOnDataFromChild] = useState(false);
  const [userAddresses, setUserAddresses] = useState(null);
  const [isAddressDeleted, setIsAddressDeleted] = useState(false);
  const [isAddressUpdate, setIsAddressUpdate] = useState(false);
  const [addressId, setAdddressId] = useState(null);
  const [addressDetails, setAdddressDetails] = useState(null);
  const handleHideAddress = () => {
    setShowAddress(false);
  };

  const handleAddressInput = () => {
    setOnDataFromChild(!onDatafromChild);
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
  }, [onDatafromChild, isAddressDeleted]);

  const handleDelete = (id) => {
    const url = `http://localhost:8080/deleteAddress/${id}`;
    axios
      .delete(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setIsAddressDeleted(!isAddressDeleted);
        toast.error("Address deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <NavbarMain></NavbarMain>
      <SubNavbar></SubNavbar>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={3}>
            <ListGroup className="list-group-left">
              <ListGroup.Item
                className="list-group-item-left"
                action
                href="#link1"
              >
                MY ORDERS
              </ListGroup.Item>
              <ListGroup.Item
                className="list-group-item-left"
                action
                href="#link2"
              >
                ACCOUNT INFORMATION
              </ListGroup.Item>
              <ListGroup.Item
                className="list-group-item-left"
                action
                href="#link3"
              >
                MANAGE NOTIFICATION
              </ListGroup.Item>
              <ListGroup.Item
                className="list-group-item-left"
                action
                href="#link4"
              >
                ADDRESS BOOK
              </ListGroup.Item>
              <ListGroup.Item
                className="list-group-item-left"
                action
                href="#link5"
              >
                SAVED CARDS
              </ListGroup.Item>
              <ListGroup.Item
                className="list-group-item-left"
                action
                href="#link6"
              >
                CHECK VOUCHER BALANCE
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col
            sm={9}
            style={{ overflowY: "scroll", position: "sticky", height: "80vh" }}
          >
            <Tab.Content>
              <Tab.Pane eventKey="#link1">
                {" "}
                <OrdersComponent></OrdersComponent>
              </Tab.Pane>
              <Tab.Pane eventKey="#link2">
                {" "}
                <AccountInfoComponent></AccountInfoComponent>
              </Tab.Pane>
              <Tab.Pane eventKey="#link3">
                {" "}
                <ManageNotification></ManageNotification>
              </Tab.Pane>
              <Tab.Pane eventKey="#link4">
                {showAddress && (
                  <AddressInput
                    hideAddress={handleHideAddress}
                    onAddressInput={handleAddressInput}
                    isAddressUpdate={isAddressUpdate}
                    addressId={addressId}
                    addressDetails={addressDetails}
                  ></AddressInput>
                )}
                <div className="m-2 p-4">
                  <div className="d-flex mb-3">
                    <h4>SAVED ADDRESS</h4>{" "}
                  </div>
                  <div
                    className="d-flex"
                    style={{ color: "aqua", cursor: "pointer" }}
                    onClick={() => {
                      setIsAddressUpdate(false);
                      setShowAddress(true);
                    }}
                  >
                    ADD NEW ADDRESS +
                  </div>

                  <hr className="w-100"></hr>
                  {userAddresses?.map((address) => (
                    <div className="border rounded mb-3 p-3">
                      <div
                        className=" d-flex pb-1"
                        style={{ justifyContent: "space-between" }}
                      >
                        <div>
                          {address.firstName} {address.lastName}
                        </div>
                        <div>
                          <MdEdit
                            onClick={() => {
                              setAdddressDetails(address);
                              setAdddressId(address.addressId);
                              setIsAddressUpdate(true);
                              setShowAddress(true);
                            }}
                            fontSize={20}
                            cursor="pointer"
                          ></MdEdit>
                          &nbsp; &nbsp;{" "}
                          <MdDelete
                            onClick={() => {
                              handleDelete(address.addressId);
                            }}
                            fontSize={20}
                            cursor="pointer"
                          ></MdDelete>
                        </div>
                      </div>

                      <div className=" d-flex text-align-left pb-1">
                        {address.addressLine1}
                      </div>
                      <div className=" d-flex text-align-left pb-1">
                        {address.addressLine2}
                      </div>

                      <div className=" d-flex text-align-left pb-1">
                        {address.city}, {address.state}, {address.country}-
                        {address.postalCode}
                      </div>

                      <div className=" d-flex text-align-left pb-1">
                        Phone -{address.phoneNumber}
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="#link5"> content 5</Tab.Pane>
              <Tab.Pane eventKey="#link6"> content 6</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      <Footer />
    </div>
  );
};

export default AccountInfoPage;
