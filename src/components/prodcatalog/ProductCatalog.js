import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import { useLocation } from "react-router-dom";
import FilterComponent from "../filter/FilterComponent";
import Footer from "../footer/Footer";
import NavbarMain from "../navbarmain/NavbarMain";
import ProdList from "../prodlist/ProdList";
import SubNavbar from "../subnavbar/SubNavbar";
import { Link } from "react-router-dom";
const ProductCatalog = (props) => {
  const [productDetail, setProductDetail] = useState([]);
  const { state } = useLocation();
  const [filteredProductDetail, setFilteredProductDetail] = useState([]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterPrice, setFilterPrice] = useState([0, 10000]);
  const sort = ["Price: Low to High", "Price: High to Low"];
  const [sortVal, setSortVal] = useState();
  const [reload, setReload] = useState(false);
  const [flag, setFlag] = useState(false);

  const queryParam = new URLSearchParams(window.location.search);
  const query = queryParam.get("query");

  const categoryFilterFunc = (e) => {
    if (e.target.checked == true) {
      setFilterCategories((pre) => [...pre, e.target.value]);
    } else {
      setFilterCategories((pre) => pre.filter((f) => f != e.target.value));
    }
  };

  const handleResetFilter = () => {};

  const priceFilterFunc = (val) => {
    setFilterPrice(val);
  };

  const sortFunc = (sortValue) => {
    setSortVal(sortValue);
  };

  useEffect(() => {
    setFilteredProductDetail(
      productDetail
        .filter(
          (product) =>
            (filterCategories.length >= 1
              ? filterCategories.includes(
                  product.subCategory.parentCategory?.categoryName
                )
              : true) &&
            product.price > filterPrice[0] &&
            product.price < filterPrice[1]
        )
        .sort(
          sortVal === "Price: Low to High"
            ? (a, b) => (a.price > b.price ? 1 : -1)
            : (a, b) => (a.price < b.price ? 1 : -1)
        )
    );
  }, [filterCategories, filterPrice, sortVal]);

  useEffect(() => {
    const url = `http://localhost:8080/search/${query}`;
    console.log(state);
    setReload(!reload);
    console.log("Bearer " + localStorage.getItem("token"));
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })

      .then((res) => {
        setProductDetail(res.data);
        setFilteredProductDetail(res.data);
        console.log(res);
      })
      .catch((err) => console.log("Error in fetchig product details"));
  }, [query, flag]);

  const setDataWishlist = () => {
    setFlag(!flag);
  };

  const handleDataFromWishlist = () => {
    setFlag(!flag);
  };

  return (
    <>
      <NavbarMain onDataWishlist={handleDataFromWishlist}></NavbarMain>
      <SubNavbar></SubNavbar>

      <div className="border rounded p-1">
      <Link to={"/goldMembership"}>
        <img
          src="https://static1.lenskart.com/media/desktop/img/republic/plp-3x/Desktop-PLP-Banner-Gold-rush-b1g1.png"
          style={{ width: "98vw", height: "15vh" }}
        ></img>
        </Link>
        <Row>
          <Col md={3}>
            <FilterComponent
              categoryFilterFunc={categoryFilterFunc}
              priceFilterFunc={priceFilterFunc}
            ></FilterComponent>
          </Col>
          <Col>
            <Row>
              <Navbar
                className="bg-body-tertiary"
                style={{ width: "57rem", height: "3.4rem" }}
              >
                <Container>
                  <Navbar.Brand href="#home">
                    Search results for: <b>{state}</b>
                  </Navbar.Brand>
                  <Navbar.Toggle />
                  <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="me-5">
                      <Navbar.Collapse id="navbar-dark-example">
                        <Nav>
                          <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="SORT BY"
                          >
                            {sort.map((s) => (
                              <NavDropdown.Item onClick={() => sortFunc(s)}>
                                {s}
                              </NavDropdown.Item>
                            ))}
                          </NavDropdown>
                        </Nav>
                      </Navbar.Collapse>
                    </Navbar.Text>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </Row>
            <Row>
              <ProdList
                onDataWishlist={setDataWishlist}
                productDetail={filteredProductDetail}
                wishlistChange={flag}
              ></ProdList>
            </Row>
          </Col>
        </Row>
        <div style={{ minHeight: "100vh" }}></div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default ProductCatalog;
