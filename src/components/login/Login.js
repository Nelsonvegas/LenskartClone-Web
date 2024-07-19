import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import "../login/Login.css";

const Login = (props) => {
  const [loginDetails, setLoginDetails] = useState({
    email: null,
    password: null,
  });
  const [responseStatus, setResponseStatus] = useState();
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setLoginDetails((pre) => ({ ...pre, [name]: value }));
  };
  useEffect(() => {
    if (responseStatus == 200) {
      // navigate("/products")
      console.log(responseStatus);
    }
  }, [responseStatus]);

  const authenticateUser = (e) => {
    e.preventDefault();
    const url = `http://localhost:8080/auth/login`;

    axios
      .post(url, loginDetails, { headers: null })
      .then((res) => {
        console.log(res);
        console.log(localStorage.getItem("token"));
        setResponseStatus(res.response?.status);
        console.log(res.response?.status);
        if (res.request?.status == 200) {
          localStorage.setItem("loggedIn", true);
          localStorage.setItem("token", res.data.jwtToken);
          props.onLogin(true);
          props.onUserChange();
          toast.success("Login successful");
        }
      })
      .catch((err) => {
        console.log(err);
        setResponseStatus(err.response?.status);
      });
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton
        className="modal-header"
        style={{
          backgroundImage:
            'url("https://static1.lenskart.com/media/desktop/img/DesignStudioIcons/DesktopLoginImage.svg")',
          backgroundSize: "cover",
          backgroundPosition: "top",
          width: "100%",
          height: "300px",
        }}
      ></Modal.Header>

      <Modal.Body className="px-5">
        <h3>Sign In</h3>

        <Form onSubmit={(e) => authenticateUser(e)}>
          <Form.Control
            className="mb-3"
            placeholder="Email*"
            name="email"
            value={loginDetails.email}
            aria-describedby="basic-addon1"
            onChange={handleInput}
          />
          <Form.Control
            className="mb-3"
            placeholder="Password*"
            type="password"
            name="password"
            value={loginDetails.password}
            aria-describedby="basic-addon1"
            onChange={handleInput}
          />

          {responseStatus == 404 && (
            <>
              <span style={{ color: "red" }}>Invalid Username or Password</span>
              <br></br>
            </>
          )}
          <input
            class="form-check-input "
            type="checkbox"
            value=""
            id="getup"
          />
          <label className="form-check-label  mb-3">
            <span className="small-text">Get Updates on Whatsapp</span>
          </label>

          <button type="submit" className=" mb-3 btn btn-dark w-100 log">
            Sign In
          </button>
          <p className="small-text text-center mx-auto">
            New Member?
            <Link
              className="link-text"
              onClick={() => {
                props.onHide();
                props.showSignup();
              }}
            >
              Create an Account
            </Link>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
