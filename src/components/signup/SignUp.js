import axios from "axios";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "./SignUp.css";

const SignUp = (props) => {
  const [customerDetails, setCustomerDetails] = useState({
    firstName: null,
    lastName: null,
    mobileNo: null,
    email: null,
    password: null,
  });

  const [firstName, setFirstName] = useState(null);
  const [lastName, setlastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);
  const [password, setPassword] = useState(null);

  const namereg = /^([a-zA-Z ]){2,30}$/;
  const emailreg = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const passwordreg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const mobilereg = /^([0-9]){9}$/;
  const [formComplete, setformComplete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const validateFirstName = () => {
    if (!namereg.test(customerDetails.firstName)) {
      setFirstName("Enter valid first Name");
      setformComplete(false);
    } else {
      setFirstName("");
      if (email === "" && password === "" && mobile === "" && lastName === "") {
        setformComplete(true);
      }
    }
  };

  const validateLastName = () => {
    if (!namereg.test(customerDetails.lastName)) {
      setlastName("Enter valid last Name");
      setformComplete(false);
    } else {
      setlastName("");
      if (
        email === "" &&
        password === "" &&
        mobile === "" &&
        firstName === ""
      ) {
        setformComplete(true);
      }
    }
  };

  const validateMobile = () => {
    if (!mobilereg.test(customerDetails.mobileNo)) {
      setMobile("Enter valid mobile number");
      setformComplete(false);
    } else {
      setMobile("");
      if (
        email === "" &&
        password === "" &&
        lastName === "" &&
        firstName === ""
      ) {
        setformComplete(true);
      }
    }
  };

  const validateEmail = () => {
    if (!emailreg.test(customerDetails.email)) {
      setEmail("Enter valid email");
      setformComplete(false);
    } else {
      setEmail("");
      if (
        mobile === "" &&
        password === "" &&
        lastName === "" &&
        firstName === ""
      ) {
        setformComplete(true);
      }
    }
  };

  const validatePassword = () => {
    if (!passwordreg.test(customerDetails.password)) {
      setPassword("Enter valid password");
      setformComplete(false);
    } else {
      setPassword("");
      if (
        email === "" &&
        mobile === "" &&
        lastName === "" &&
        firstName === ""
      ) {
        setformComplete(true);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = `http://localhost:8080/createCustomer`;

    axios
      .post(url, customerDetails, { headers: null })
      .then((res) => {
        console.log(res);
        props.onHide();
        props.showSignin();
        toast.success("Signup Successful")
      })
      .catch((err) => {
        console.log("Error creating customer");
        console.log(err);
        setErrorMessage(err.response?.data);
      });
  };

  const handleInput = (e) => {
    const { name, value } = e?.target;
    setCustomerDetails((pre) => ({ ...pre, [name]: value }));
    setErrorMessage(null);
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="px-5 text-color">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            Create an Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => handleSubmit(event)}>
            <span style={{ color: "red" }}>{firstName}</span>
            <Form.Control
              className="mb-3"
              placeholder="FirstName*"
              name="firstName"
              value={customerDetails.firstName}
              aria-describedby="basic-addon1"
              onChange={(e) => {
                handleInput(e);
                validateFirstName();
              }}
              required
            />
            <span style={{ color: "red" }}>{lastName}</span>

            <Form.Control
              className="mb-3"
              placeholder="Lastname*"
              name="lastName"
              value={customerDetails.lastName}
              aria-describedby="basic-addon1"
              onChange={(e) => {
                handleInput(e);
                validateLastName();
              }}
              required
            />
            <span style={{ color: "red" }}>{mobile}</span>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Mobile*"
                name="mobileNo"
                value={customerDetails.mobileNo}
                aria-describedby="basic-addon1"
                onChange={(e) => {
                  handleInput(e);
                  validateMobile();
                }}
                required
              />
            </InputGroup>
            <span style={{ color: "red" }}>{email}</span>

            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Email*"
              name="email"
              value={customerDetails.email}
              aria-describedby="basic-addon1"
              onChange={(e) => {
                handleInput(e);
                validateEmail();
              }}
              required
            />
            <span style={{ color: "red" }}>{password}</span>

            <Form.Control
              type="text"
              className="mb-3"
              placeholder="Password*"
              name="password"
              value={customerDetails.password}
              aria-describedby="basic-addon1"
              onChange={(e) => {
                handleInput(e);
                validatePassword();
              }}
              required
            />
            <p class="text-left">
              <Link className="link-text" href="#">
                Got a Referral Code?
              </Link>{" "}
              (Optional)
            </p>
            <input
              class="form-check-input "
              type="checkbox"
              value=""
              id="getup"
            />
            <label className="form-check-label  mb-3">
              <span className="small-text">Get Updates on Whatsapp</span>
            </label>

            <p className="mb-2 small-text">
              {" "}
              By creating this account you are agreeing to{" "}
              <Link className="link-text" href="#">
                Privacy Policy
              </Link>
            </p>
            <div className="mb-2" style={{ color: "red" }}>
              {errorMessage}
            </div>
            <button
              type="submit"
              disabled={!formComplete}
              className=" mb-3 btn btn-dark w-100 log"
            >
              Create an Account
            </button>
            <p className="small-text text-center mx-auto">
              Have an account?{" "}
              <Link
                className="link-text"
                onClick={() => {
                  props.onHide();
                  props.showSignin();
                }}
              >
                Sign in
              </Link>
            </p>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default SignUp;
