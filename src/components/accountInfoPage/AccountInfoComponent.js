import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "../accountInfoPage/AccountInfoComponent.css";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { toast } from "sonner";

const AccountInfoComponent = () => {
  const [passwordCheckbox, setPasswordCheckbox] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    firstName: null,
    lastName: null,
    password: null,
    gender: null,
    newPassword: null,
    isPasswordUpdated: "no",
  });
  const [firstNameMsg, setFirstNameMsg] = useState("");
  const [lastNameMsg, setLastNameMsg] = useState("");
  const [passwordMsg, setPasswordMsg] = useState();
  const [reEnteredPasswordMsg, setReEnteredPasswordMsg] = useState("");
  const [newPasswordMsg, setNewPasswordMsg] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [formComplete, setFormComplete] = useState(true);

  const namereg = /^([a-zA-Z ]){2,30}$/;

  const passwordreg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const handleInput = (e) => {
    const { name, value } = e?.target;
    setCustomerDetails((pre) => ({ ...pre, [name]: value }));
  };

  useEffect(() => {
    const url = `http://localhost:8080/getCustomer`;

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setCustomerDetails((pre) => ({
          ...pre,
          firstName: res.data.firstName,
        }));
        setCustomerDetails((pre) => ({ ...pre, lastName: res.data.lastName }));

        setCustomerDetails((pre) => ({ ...pre, gender: res.data.gender }));

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const validateFirstName = () => {
    if (!namereg.test(customerDetails.firstName)) {
      setFirstNameMsg("Enter valid first Name");
      setFormComplete(false);
    } else {
      setFirstNameMsg("");
      if (
        lastNameMsg === "" &&
        newPasswordMsg === "" &&
        reEnteredPasswordMsg === ""
      ) {
        setFormComplete(true);
      }
    }
  };

  const validateLastName = () => {
    if (!namereg.test(customerDetails.lastName)) {
      setLastNameMsg("Enter valid last Name");
      setFormComplete(false);
    } else {
      setLastNameMsg("");
      if (
        firstNameMsg === "" &&
        newPasswordMsg === "" &&
        reEnteredPasswordMsg === ""
      ) {
        setFormComplete(true);
      }
    }
  };

  const validateNewPassword = (val) => {
    if (!passwordreg.test(newPassword)) {
      setNewPasswordMsg("Enter valid password");
      setFormComplete(false);
    } else {
      setNewPasswordMsg("");
      if (
        firstNameMsg === "" &&
        lastNameMsg === "" &&
        reEnteredPasswordMsg === ""
      ) {
        setFormComplete(true);
      }
    }
  };
  const validateReEnteredPassword = (e) => {
    setReEnteredPassword(e.target.value);
    if (newPassword === e.target.value) {
      setCustomerDetails((pre) => ({ ...pre, newPassword: newPassword }));
      setReEnteredPasswordMsg("");
    } else {
      setReEnteredPasswordMsg("Password does not match");
      setFormComplete(false);
    }
    if (firstNameMsg === "" && lastNameMsg === "" && newPasswordMsg === "") {
      setFormComplete(true);
    }
  };
  const handleSubmit = () => {
    console.log(customerDetails);

    const url = `http://localhost:8080/updateCustomer`;

    axios
      .put(url, customerDetails, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        toast.success("Cutomer details Updated");
      })
      .catch((err) => console.log("Error updating customer"));
  };

  const setNewPasswordVal = (e) => {
    setNewPassword(e.target.value);
    validateNewPassword(e.target.value);
  };

  return (
    <div>
      <Row className="text-left mb-4 mt-4">
        <h2>Edit Account Information</h2>
      </Row>
      <Row className="text-left mb-4 ">
        <h3>Edit Account Information</h3>
      </Row>
      <Form>
        <Row className="text-left">
          <Col sm={3}>
            <Form.Label>First name</Form.Label>

            <Form.Control
              className="mb-3"
              placeholder={customerDetails.firstName}
              name="firstName"
              value={customerDetails.firstName}
              aria-describedby="basic-addon1"
              onChange={(e) => {
                handleInput(e);
                validateFirstName();
              }}
            />
            <span style={{ color: "red" }}>{firstNameMsg}</span>
          </Col>
          <Col sm={3}>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              className="mb-3"
              placeholder={customerDetails.lastName}
              name="lastName"
              value={customerDetails.lastName}
              aria-describedby="basic-addon1"
              onChange={(e) => {
                handleInput(e);
                validateLastName();
              }}
            />
            <span style={{ color: "red" }}>{lastNameMsg}</span>
          </Col>
          <Row>
            <Col sm={3}>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={customerDetails.gender}
                onChange={(e) => {
                  setCustomerDetails((pre) => ({
                    ...pre,
                    gender: e.target.value,
                  }));
                }}
                aria-label="Default select example"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col sm={3}>
              <Form.Check
                label="Change Password"
                name="passwordCheckbox"
                id="passwordCheckbox"
                value={passwordCheckbox}
                onChange={(e) => {
                  setPasswordCheckbox(e.target.checked);
                  setCustomerDetails((pre) => ({
                    ...pre,
                    isPasswordUpdated: e.target.checked ? "yes" : "no",
                  }));
                }}
              />
            </Col>
          </Row>

          {passwordCheckbox == true && (
            <>
              <Row className="mt-3">
                <Col sm={3}>Current Password</Col>
                <Col sm={3}>
                  <Form.Control
                    className="mb-3"
                    name="password"
                    placeholder=""
                    // value={customerDetails.password}
                    aria-describedby="basic-addon1"
                    onChange={(e) => handleInput(e)}
                  />
                  <span style={{ color: "red" }}>{passwordMsg}</span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col sm={3}>New Password</Col>
                <Col sm={3}>
                  <Form.Control
                    className="mb-3"
                    name="newPassword"
                    value={newPassword}
                    aria-describedby="basic-addon1"
                    onChange={(e) => setNewPasswordVal(e)}
                  />
                  <span style={{ color: "red" }}>{newPasswordMsg}</span>
                </Col>
              </Row>
              <Row className="mt-3 mb-3">
                <Col sm={3}>Confirm New Password</Col>
                <Col sm={3}>
                  <Form.Control
                    className="mb-3"
                    name="reEnteredPassword"
                    value={reEnteredPassword}
                    aria-describedby="basic-addon1"
                    onChange={(e) => validateReEnteredPassword(e)}
                  />
                  <span style={{ color: "red" }}>{reEnteredPasswordMsg}</span>
                </Col>
              </Row>
            </>
          )}
          <hr className="hr-2 mt-3"></hr>

          <Row>
            <Col sm={3}>
              <Button
                disabled={!formComplete}
                className="save-changes-btn"
                onClick={handleSubmit}
              >
                Save & Continue
              </Button>
            </Col>
          </Row>
        </Row>
      </Form>
    </div>
  );
};

export default AccountInfoComponent;
