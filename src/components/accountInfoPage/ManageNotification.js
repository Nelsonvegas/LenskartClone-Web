import React from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../accountInfoPage/ManageNotification.css";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";

const ManageNotification = () => {
  return (
    <div>
      <Row className="text-left mt-3 mb-3">
        <h2>Manage Notifications</h2>
      </Row>
      <Row>
        <Col sm={1}>
          <Image src="https://static1.lenskart.com/media/desktop/img/June23/Whatsapp.svg"></Image>
        </Col>
        <Col sm={5} className="text-left">
          Whatssapp Notification
        </Col>
        <Col sm={5} className="text-right">
          <Form.Check type="switch" id="custom-switch" />
        </Col>
      </Row>
      <hr className="eighty-per-hr"></hr>

      <Row>
        <Col sm={1}>
          <Image src="https://static1.lenskart.com/media/desktop/img/June23/Sms.svg"></Image>
        </Col>
        <Col sm={5} className="text-left">
          SMS Notification
        </Col>
        <Col sm={5} className="text-right">
          <Form.Check type="switch" id="custom-switch" />
        </Col>
      </Row>
      <hr className="eighty-per-hr"></hr>

      <Row>
        <Col sm={1}>
          <Image src="https://static1.lenskart.com/media/desktop/img/June23/PushNotification.svg"></Image>
        </Col>
        <Col sm={5} className="text-left">
          Push Notification
        </Col>
        <Col sm={5} className="text-right">
          <Form.Check type="switch" id="custom-switch" />
        </Col>
      </Row>
      <hr className="eighty-per-hr"></hr>

      <Row>
        <Col sm={1}>
          <Image src="https://static1.lenskart.com/media/desktop/img/June23/EmailNotification.svg"></Image>
        </Col>
        <Col sm={5} className="text-left">
          Email Notification
        </Col>
        <Col sm={5} className="text-right">
          <Form.Check type="switch" id="custom-switch" />
        </Col>
      </Row>
      <hr className="eighty-per-hr"></hr>

      <Row>
        <Col sm={3} className="text-left ">
          <Button className="save-changes-btn w-75">Save</Button>
        </Col>
      </Row>
    </div>
  );
};

export default ManageNotification;
