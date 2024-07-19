import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { LiaRupeeSignSolid } from "react-icons/lia";
import axios from "axios";
import Ratio from "react-bootstrap/Ratio";
import { toast } from "sonner";

const OrdersComponent = () => {
  const [showOrderDetails, setShowOrderDetails] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [deleteFlag, setDeleteflag] = useState(false);
  useEffect(() => {
    const url = `http://localhost:8080/getAllOrders`;

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);

        setOrderDetails(res.data.sort((a, b) => (a.date > b.date ? 1 : -1)));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteFlag]);

  const cancelOrder = (orderId) => {
    const url = `http://localhost:8080/deleteOrder/${orderId}`;

    axios
      .delete(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setDeleteflag(!deleteFlag);
        toast.error("Order Cancelled");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (orderId, prodId) => {
    const url = `http://localhost:8080/deleteOrderedProduct/${orderId}/${prodId}`;

    axios
      .delete(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setDeleteflag(!deleteFlag);
        toast.error("Product Cancelled");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div
        className="p-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          textWrap: "nowrap",
        }}
      >
        <div>
          <img
            src="https://static.lenskart.com/media/desktop/img/25-July-19/whatsapp.png"
            height={40}
            width={40}
          ></img>
          &nbsp;
          <span>Get Order Updates On Watsapp</span>
          <span>
            <Form.Check
              className="d-inline-block "
              type="switch"
              id="custom-switch"
            />
          </span>
        </div>
        <div>
          {" "}
          <Button className="save-changes-btn">Logout</Button>
        </div>
      </div>

      {orderDetails?.map((order) => (
        <>
          <div className="border rounded me-2 ms-2 mb-5 mt-2">
            <div
              className="d-flex p-4"
              style={{ justifyContent: "space-between" }}
            >
              <div className="pe-3"> OrderId: {order.orderId}</div>
              <div>
                Order Date: {order.orderDate?.split("T")[0]}{" "}
                {order.orderDate?.split("T")[1].split(".")[0]}
              </div>
              <div>Payment Mode: {order.paymentMode}</div>
              <div>
                Total Price:{" "}
                {order.orderItemsDTO.reduce(
                  (accumulator, currentValue) =>
                    accumulator +
                    currentValue.productDTO.price * currentValue.quantity,
                  0
                )}
              </div>
            </div>

            {order.orderItemsDTO.map((orderItem) => (
              <div className="border p-4 ">
                <Row>
                  <Col sm={3}>
                    <Ratio aspectRatio={1 / 2}>
                      <img
                        src={
                          "data:image/jpeg;base64," +
                          orderItem.productDTO.prodImg
                        }
                        rounded
                      ></img>
                    </Ratio>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-between pb-4">
                      {orderItem.productDTO.prodName}
                      {order.orderItemsDTO.length > 1 && (
                        <Button
                          variant="outline-dark"
                          onClick={() => {
                            deleteProduct(
                              order.orderId,
                              orderItem.productDTO.prodId
                            );
                          }}
                        >
                          Cancel Product
                        </Button>
                      )}
                    </div>
                    <div className="d-flex pb-4">
                      Quantity: {orderItem.quantity}
                    </div>
                    <div className="d-flex">
                      <p>
                        <LiaRupeeSignSolid></LiaRupeeSignSolid>&nbsp;
                        {orderItem.productDTO.price}
                      </p>
                    </div>
                  </Col>
                </Row>
                <Row></Row>
              </div>
            ))}

            {showOrderDetails == order.orderId && (
              <div className="border p-4">
                <Row>
                  <Col md={6}>
                    <div className=" d-flex text-align-left pb-3">
                      <b>Delivery Address:</b>
                    </div>

                    <div className=" d-flex text-align-left pb-1">
                      {order.deliveryAddressDTO.firstName}&nbsp;
                      {order.deliveryAddressDTO.lastName}
                    </div>

                    <div className=" d-flex text-align-left pb-1">
                      {order.deliveryAddressDTO.addressLine1}
                    </div>
                    <div className=" d-flex text-align-left pb-1">
                      {order.deliveryAddressDTO.addressLine2}
                    </div>
                    <div className=" d-flex text-align-left pb-1">
                      {order.deliveryAddressDTO.city},{" "}
                      {order.deliveryAddressDTO.state},{" "}
                      {order.deliveryAddressDTO.country}-
                      {order.deliveryAddressDTO.postalCode}
                    </div>

                    <br></br>

                    <div className=" d-flex text-align-left pb-1">
                      {order.deliveryAddressDTO.email}
                    </div>

                    <div className=" d-flex text-align-left pb-1">
                      {order.deliveryAddressDTO.phoneNumber}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className=" d-flex text-align-left pb-3">
                      <b>Price Breakup:</b>
                    </div>
                    <Row>
                      <Col md={8} className="col1">
                        Item Total
                      </Col>
                      <Col md={4} className="col2">
                        <LiaRupeeSignSolid></LiaRupeeSignSolid>&nbsp;{" "}
                        {order.orderItemsDTO.reduce(
                          (accumulator, currentValue) =>
                            accumulator +
                            currentValue.productDTO.price *
                              currentValue.quantity,
                          0
                        )}
                      </Col>
                    </Row>

                    <Row>
                      <Col md={8} className="col1">
                        Discount
                      </Col>
                      <Col md={4} className="col2">
                        <LiaRupeeSignSolid></LiaRupeeSignSolid>&nbsp;{" "}
                        {order.discount}
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col md={8} className="col1">
                        <b>Net Amount</b>
                      </Col>
                      <Col md={4} className="col2">
                        <b>
                          <LiaRupeeSignSolid></LiaRupeeSignSolid>&nbsp;
                          {order.orderItemsDTO.reduce(
                            (accumulator, currentValue) =>
                              accumulator +
                              currentValue.productDTO.price *
                                currentValue.quantity,
                            0
                          ) - order.discount}
                        </b>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8} className="col1">
                        Convenience Fees
                      </Col>
                      <Col md={4} className="col2">
                        Free
                      </Col>
                    </Row>
                    <hr></hr>
                    <Row>
                      <Col md={8} className="col1">
                        <b>Total</b>
                      </Col>
                      <Col md={4} className="col2">
                        <b>
                          <LiaRupeeSignSolid></LiaRupeeSignSolid>&nbsp;
                          {order.orderItemsDTO.reduce(
                            (accumulator, currentValue) =>
                              accumulator +
                              currentValue.productDTO.price *
                                currentValue.quantity,
                            0
                          ) - order.discount}
                        </b>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="pb-3 pt-3 text-start">
                  <Col>
                    <b>Order Status:&nbsp;</b>
                    {order.orderStatus}
                  </Col>
                  <Col>
                    <b>Expected Delivery:&nbsp;</b>
                    {order.expectedDeliveryDate.split("T")[0]}
                  </Col>
                </Row>
              </div>
            )}
            {showOrderDetails != order.orderId && (
              <div className="d-flex justify-content-between p-3">
                {" "}
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    cancelOrder(order.orderId);
                  }}
                >
                  Cancel Order
                </Button>
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    setShowOrderDetails(order.orderId);
                  }}
                >
                  Order Details
                </Button>
              </div>
            )}
            {showOrderDetails == order.orderId && (
              <div className="d-flex justify-content-end p-3 ">
                {" "}
                <Button
                  variant="outline-dark"
                  onClick={() => {
                    setShowOrderDetails(null);
                  }}
                >
                  Back
                </Button>
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default OrdersComponent;
