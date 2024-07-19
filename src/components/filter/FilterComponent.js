import Slider from "@material-ui/core/Slider";
import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "../filter/FilterComponent.css";
const FilterComponent = (props) => {
  const [categories, setCategories] = useState([
    "Eye Glasses",
    "Computer Glasses",
    "Sun Glasses",
    "Contact Lenses",
  ]);

  const [val, setVal] = useState([0, 10000]);

  const rangeSelect = (event, newVal) => {
    setVal(newVal);

    props.priceFilterFunc(newVal);
  };

  return (
    <div>
      <Accordion defaultActiveKey={["0"]}>
        <Accordion.Item eventKey="0">
          <Accordion.Header>CATEGORY</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {categories.map((category, index) => {
                return (
                  <ListGroup.Item>
                    <Form.Check
                      label={category}
                      name="category"
                      id={category}
                      value={category}
                      onChange={(e) => {
                        props.categoryFilterFunc(e);
                      }}
                    />
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <hr></hr>
        <Accordion.Item eventKey="1">
          <Accordion.Header>PRICE</Accordion.Header>
          <Accordion.Body>
            <ListGroup.Item>
              <Slider
                value={val}
                onChange={rangeSelect}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
              ></Slider>

              <div>Min price:{val[0]}</div>
              <div>Max price:{val[1]}</div>
            </ListGroup.Item>
          </Accordion.Body>
        </Accordion.Item>
        <hr></hr>
      </Accordion>
    </div>
  );
};

export default FilterComponent;
