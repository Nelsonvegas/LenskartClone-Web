import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import "../accountInfoPage/AddressInput.css";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

const AddressInput = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: props.isAddressUpdate == true ? props?.addressDetails : null,
  });

  const onSubmit = (data) => {
    if (props.isAddressUpdate) {
      const url = `http://localhost:8080/saveAddress`;

      axios
        .post(url, data, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          props.onAddressInput();
          props.hideAddress();
          toast.success("Address Updated");
        })
        .catch((err) => console.log("Error updating customer"));
    } else {
      const url = `http://localhost:8080/saveAddress`;

      axios
        .post(url, data, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          props.onAddressInput();
          props.hideAddress();
          toast.success("Address added");
        })
        .catch((err) => console.log("Error updating customer"));
    }
  };

  return (
    <div className="border rounded m-2 p-4">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6} className="text-left">
            <Form.Check.Input type="radio" checked="true" />
            <Form.Check.Label>Add New Address</Form.Check.Label>
          </Col>
          <Col md={6} className="text-right">
            <Button className="save-changes-btn " onClick={props.hideAddress}>
              Back
            </Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            {" "}
            <Form.Control
              className="mb-3"
              placeholder="First Name*"
              // value={props.isAddressUpdate==true?updateAdddressDetails?.firstName:null}
              name="firstName"
              onChange={(e) => ({ ...register, firstName: e.target.value })}
              aria-describedby="basic-addon1"
              {...register("firstName", {
                required: true,
                pattern: /^([a-zA-Z ]){2,30}$/,
              })}
            />
            {errors.firstName && (
              <p style={{ color: "red" }}>Please enter valid first name</p>
            )}
          </Col>
          <Col>
            <Form.Control
              className="mb-3"
              placeholder="Last Name*"
              // value={props.isAddressUpdate==true?updateAdddressDetails?.lastName:null}
              name="lastName"
              aria-describedby="basic-addon1"
              {...register("lastName", {
                required: true,
                pattern: /^([a-zA-Z ]){2,30}$/,
              })}
            />
            {errors.lastName && (
              <p style={{ color: "red" }}>Please enter valid last name</p>
            )}
          </Col>
        </Row>

        <Row className="mt-3 text-left">
          <Col className="d-flex ">
            <p className="me-3">Gender*</p>
            <Form.Check
              inline
              label="Male"
              name="group1"
              type="radio"
              value="Male"
              id="Male"
              {...register("gender")}
              // checked={props.isAddressUpdate?(updateAdddressDetails?.gender==="Male"?true:false):true}
            />
            <Form.Check
              inline
              label="Female"
              name="group1"
              value="Female"
              type="radio"
              id="Female"
              {...register("gender")}
              // checked={props.isAddressUpdate?(updateAdddressDetails?.gender==="Female"?true:false):false}
            />
          </Col>
        </Row>

        <Row className="mt-3 mb-3">
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Phone Number*"
                // value={props.isAddressUpdate==true?updateAdddressDetails?.phoneNumber:null}
                name="phoneNumber"
                aria-describedby="basic-addon1"
                {...register("phoneNumber", {
                  required: true,
                  pattern: /^([0-9]){10}$/,
                })}
              />
            </InputGroup>
            {errors.phoneNumber && (
              <p style={{ color: "red" }}>Please enter valid phone number</p>
            )}
          </Col>
          <Col>
            <Form.Control
              className="mb-3"
              placeholder="Email*"
              // value={props.isAddressUpdate==true?updateAdddressDetails?.email:null}
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>Please enter valid email</p>
            )}
          </Col>
        </Row>
        <hr></hr>

        <Row className="mt-3">
          <Col>
            {" "}
            <Form.Control
              className="mb-3"
              placeholder="Address Line 1*"
              // value={props.isAddressUpdate==true?updateAdddressDetails?.addressLine1:null}
              name="addressLine1"
              aria-describedby="basic-addon1"
              {...register("addressLine1", {
                required: true,
                pattern: /^([a-zA-Z ]){2,30}$/,
              })}
            />
            {errors.addressLine1 && (
              <p style={{ color: "red" }}>Please enter valid address</p>
            )}
          </Col>
          <Col>
            <Form.Control
              className="mb-3"
              placeholder="Address Line 2*"
              // value={props.isAddressUpdate==true?updateAdddressDetails?.addressLine2:null}
              name="addressLine2"
              aria-describedby="basic-addon1"
              {...register("addressLine2", {
                required: true,
                pattern: /^([a-zA-Z ]){2,30}$/,
              })}
            />
            {errors.addressLine2 && (
              <p style={{ color: "red" }}>Please enter valid address</p>
            )}
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            {" "}
            <Form.Control
              className="mb-3"
              placeholder="Zip/Postal Code *"
              // value={props.isAddressUpdate==true?updateAdddressDetails?.postalCode:null}
              name="postalCode"
              aria-describedby="basic-addon1"
              {...register("postalCode", {
                required: true,
                pattern: /^([0-9]){6}$/,
              })}
            />
            {errors.postalCode && (
              <p style={{ color: "red" }}>Please enter valid postal code</p>
            )}
          </Col>
          <Col>
            <Form.Control
              className="mb-3"
              placeholder="City/District*"
              // value={props.isAddressUpdate==true?updateAdddressDetails?.city:null}
              name="city"
              aria-describedby="basic-addon1"
              {...register("city", {
                required: true,
                pattern: /^([a-zA-Z ]){2,30}$/,
              })}
            />
            {errors.city && (
              <p style={{ color: "red" }}>Please enter valid city</p>
            )}
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            {" "}
            <Form.Select
              aria-label="Default select example"
              {...register("country")}
            >
              <option>Country*</option>
              <option value="India" selected={true}>
                India
              </option>
            </Form.Select>
          </Col>
          <Col>
            {" "}
            <Form.Select
              aria-label="Default select example"
              {...register("state")}
            >
              {/* selected={props.isAddressUpdate==true?(updateAdddressDetails?.state==="Karnataka"?true:false):true} */}
              {/* selected={props.isAddressUpdate==true?(updateAdddressDetails?.state==="Tamil Nadu"?true:false):false}
              selected={props.isAddressUpdate==true?(updateAdddressDetails?.state==="Andra Pradesh"?true:false):false} */}
              <option >State/Province*</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Andra Pradesh">Andra Pradesh</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mt-3 text-left">
          <Form.Check
            type="checkbox"
            name="isDefaultAddress"
            {...register("isDefaultAddress")}
            label="Default address"
          />
        </Row>

        <Row className="mt-3">
          <Col>
            <Button
              className="save-changes-btn w-100"
              onClick={props.hideAddress}
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button className="save-changes-btn w-100" type="submit">
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddressInput;
