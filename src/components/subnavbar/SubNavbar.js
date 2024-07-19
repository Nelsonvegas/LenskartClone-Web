import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "../subnavbar/SubNavbar.css";
import { Link } from "react-router-dom";
const SubNavbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar style={{ backgroundColor: "#fbf9f7" }} className="">
        <Container>
          <Nav.Link
            className="me-3 section"
            href="#home"
            onClick={() => navigate("/products", { state: "EyeGlasses" })}
          >
            EYE GLASSES
          </Nav.Link>
          <Nav.Link
            className="me-3 section"
            href="#home"
            onClick={() => navigate("/products", { state: "Computer Glasses" })}
          >
            COMPUTER GLASSES
          </Nav.Link>

          <Nav.Link
            className="me-3 section"
            href="#home"
            onClick={() => navigate("/products", { state: "ContactLenses" })}
          >
            CONTACT LENSES
          </Nav.Link>
          <Nav.Link
            className="me-3 section"
            href="#home"
            onClick={() => navigate("/products", { state: "SunGlasses" })}
          >
            SUNGLASSES
          </Nav.Link>
          <Nav.Link className="me-3 section" href="#home">
            HOME EYE-TEST
          </Nav.Link>
          <Nav.Link className="me-3 section" href="#home">
            STORE LOCATOR
          </Nav.Link>

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="me-1 ">
              {" "}
              <Button className="threedtryonbtn">3D TRY ON</Button>
            </Navbar.Text>
            <Navbar.Text className="me-1 ">
              {" "}
              <Button className="blubtn">BLU</Button>{" "}
            </Navbar.Text>
            <Navbar.Text>
              {" "}
             <Link to={"/goldMembership"}> <Button className="goldbtn" style={{}}>
                GOLD
              </Button></Link>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default SubNavbar;
