import axios from "axios";
import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../img/logo.png";
import "../navbarmain/NavbarMain.css";

import NavDropdown from "react-bootstrap/NavDropdown";
import { BsHandbag } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Login from "../login/Login";
import SearchBar from "../seachBar/SearchBar";
import SearchResultList from "../searchresultlist/SearchResultList";
import SignUp from "../signup/SignUp";
import Wishlist from "../wishlist/Wishlist";

const NavbarMain = (props) => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [wishListCount, setWishlistCount] = useState(0);
  const [query, setQuery] = useState("");
  const [productDetail, setProductDetail] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [dataFromChild, setDataFromChild] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [modalShowSignup, setModalShowSignup] = useState(false);
  const [modalShowSignin, setModalShowSignin] = useState(false);
  // const[dataWishlist,setDataWishlist]=useState(props.dataWishlist);
  const [showWishlist, setShowWishlist] = useState(false);
  const handleCloseWishlist = () => setShowWishlist(false);
  const handleShowWishlist = () => setShowWishlist(true);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("loggedIn")
  );
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [flag, setFlag] = useState(false);

  const handleDataFromWishlist = () => {
    setDataFromChild(!dataFromChild);
    props.onDataWishlist();
  };
  const handleSuggestion = (data) => {
    setShowSuggestion(data);
  };

  useEffect(() => {
    const url = `http://localhost:8080/categoryList/${query}`;
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => console.log("Error fetching category result"));
  }, [query]);

  const handleDataFromChild = (data) => {
    setQuery(data);
  };

  const handleDataFromSearch = (data) => {
    setQuery(data);
  };

  useEffect(() => {
    const url = `http://localhost:8080/cartCount`;
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setCartCount(res.data);
      })
      .catch((err) => console.log("Error fetching cart count"));
  });

  useEffect(() => {
    const url = `http://localhost:8080/getWishListProductIds`;
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setWishlistCount(res.data.length);
      })
      .catch((err) => console.log("Error fetching wishlist length"));
  });

  useEffect(() => {
    const url = `http://localhost:8080/searchresults/${query}`;
    console.log(searchResult);
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((err) => console.log("Error fetching search result"));
  }, [query]);

  const setLogin = (data) => {
    setIsLoggedIn(data);
  };
  useEffect(() => {
    const url = `http://localhost:8080/currentusername`;

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        localStorage.setItem("username", res.data);
        setUsername(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);

  useEffect(() => {
    setUsername(localStorage.getItem("username"));
  }, [username]);
  const handleLogout = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("loggedIn", false);
    localStorage.setItem("username", "");
    setIsLoggedIn(false);
  };

  const setUser = () => {
    setFlag(!flag);
  };

  return (
    <>
      <Navbar style={{ background: "#f8f9fa" }}>
        <Container>
          <Navbar.Brand href="#home">
            <Link to={"/"}>
              <img
                src={logo}
                width="127"
                height="37"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>

          <Nav.Link href="#home">
            <FaPhone /> <b>99998-99998</b>
          </Nav.Link>

          <Nav.Link href="#home">
            {
              <SearchBar
                onDataFromSearch={handleDataFromSearch}
                queryVal={query}
                showSuggestion={handleSuggestion}
              ></SearchBar>
            }
          </Nav.Link>
          {
            <div id="search-result-list">
              {searchResult.length > 0 && showSuggestion && (
                <SearchResultList
                  onDataFromChild={handleDataFromChild}
                  category={categoryList}
                  products={searchResult}
                ></SearchResultList>
              )}
            </div>
          }

          <Nav.Link href="#home">Track Order</Nav.Link>

          {isLoggedIn && username != "" ? (
            <Nav.Link>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title={username}
                menuVariant="light"
              >
                <NavDropdown.Item href="#action/3.1">
                  <Link
                    to={"/AccountInfo"}
                    style={{ textDecoration: "none", color: "Black" }}
                  >
                    Orders
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <Link
                    to={"/AccountInfo"}
                    style={{ textDecoration: "none", color: "Black" }}
                  >
                    Account Information
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Link>
          ) : (
            <Nav.Link href="#features">
              <span variant="primary" onClick={() => setModalShowSignin(true)}>
                Sign In
              </span>
              <Login
                show={modalShowSignin}
                onHide={() => setModalShowSignin(false)}
                showSignup={() => setModalShowSignup(true)}
                onLogin={setLogin}
                onUserChange={setUser}
              ></Login>
              &
              <span variant="primary" onClick={() => setModalShowSignup(true)}>
                Sign Up
              </span>
              <SignUp
                show={modalShowSignup}
                showSignin={() => setModalShowSignin(true)}
                onHide={() => setModalShowSignup(false)}
              ></SignUp>
            </Nav.Link>
          )}

          <Nav.Link href="#pricing" onClick={handleShowWishlist}>
            <Badge pill className="badge1" bg="">
              <span>{wishListCount}</span>
            </Badge>
            <FaRegHeart fontSize={20} />
            &nbsp;&nbsp; Wishlist
          </Nav.Link>
          <Wishlist
            dataWishlist={wishListCount}
            dataFromChild={handleDataFromWishlist}
            className="d-flex align-content-center "
            style={{ width: "30rem", height: "40vh" }}
            show={showWishlist}
            onHide={handleCloseWishlist}
            placement="bottom"
            name="bottom"
          ></Wishlist>
          <Nav.Link href="#pricing" onClick={() => navigate("/cart")}>
            <BsHandbag fontSize={20} />
            <Badge bg="" className="badge2" pill>
              <span>{cartCount}</span>
            </Badge>
            &nbsp;&nbsp; Cart
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarMain;
