import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Ratio from "react-bootstrap/Ratio";
import Row from "react-bootstrap/Row";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import goldrush from "../../img/goldrush.jpg";
import "../productdetail/ProductDetail.css";
import {Link} from 'react-router-dom';
const ProductDetail = (props) => {
  const [fill, setfill] = useState(false);
  const [wishlistItems, setWishListItems] = useState([]);
  const [flag, setFlag] = useState(false);
  const [productDetail, setProductDetail] = useState();

  const navigate = useNavigate();

  const addtocart = () => {
    const url = `http://localhost:8080/addToCart/${productDetail.prodId}`;

    axios
      .post(url, null, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);
        navigate("/cart");
        toast.success("Added to cart");
      })
      .catch((err) => console.log("Error adding to cart"));
  };

  useEffect(() => {
    const url = `http://localhost:8080/getWishListProductIds`;
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setWishListItems(res.data);
      })
      .catch((err) => console.log("Error fetching category result"));
  }, [flag]);

  const removeFromWishlist = (data) => {
    const url = `http://localhost:8080/removeFromWishlist/${data}`;
    axios
      .delete(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setFlag(!flag);
        props.onDataWishlist();
        toast.error("Removed from wishlist");
      })
      .catch((err) => console.log(err));
  };

  const addToWishlist = (data) => {
    const url = `http://localhost:8080/addToWishlist/${data}`;
    axios
      .post(url, null, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setFlag(!flag);
        props.onDataWishlist();
        toast.success("added to wishlist");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const url = `http://localhost:8080/getOneProduct/${props.detail}`;

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        setProductDetail(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col className="right-top-text">
            {productDetail?.subCategory.subCategoryName}:{" "}
            {productDetail?.prodName} &nbsp; E15911M-C2 - 210259
          </Col>
          <Col className="left-top-text">
            Problem in placing order ? Give a missed call{" "}
            <span className="phoneNo">1800-111-111</span>{" "}
          </Col>
        </Row>
        <Row>
          <Col className="rounded border image-box">
            <Ratio aspectRatio={1 / 2}>
              <img
                src={"data:image/jpeg;base64," + productDetail?.prodImg}
                rounded
              />
            </Ratio>
          </Col>

          <Col
            style={{ overflowY: "scroll", position: "sticky", height: "80vh" }}
          >
            <ListGroup className="list-group">
              <ListGroup.Item className="list-itemm category-wishlist">
                <div>
                  {productDetail?.subCategory.parentCategory?.categoryName}
                </div>
                <div>
                  {wishlistItems.includes(productDetail?.prodId) ? (
                    <FaHeart
                      onClick={(e) => {
                        removeFromWishlist(productDetail?.prodId);
                        e.stopPropagation();
                      }}
                      style={{ fill: "red", cursor: "pointer" }}
                      fontSize={25}
                    ></FaHeart>
                  ) : (
                    <FaRegHeart
                      onClick={(e) => {
                        addToWishlist(productDetail?.prodId);
                        e.stopPropagation();
                      }}
                      style={{ cursor: "pointer" }}
                      fontSize={25}
                    ></FaRegHeart>
                  )}
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="list-itemm">
                {productDetail?.prodName}
              </ListGroup.Item>
              <ListGroup.Item className="list-itemm size">
                Size:8-10 years
              </ListGroup.Item>
              <ListGroup.Item className="list-itemm">
                {productDetail?.price}
              </ListGroup.Item>
              <ListGroup.Item className="list-itemm">Color</ListGroup.Item>
              <ListGroup.Item className="list-itemm">
                <div className="buy1get1">
                  With Anti-Glare Lenses
                  <br />
                  Buy 1 Get 1 with Free Gold Membership
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="list-itemm">
              <Link to={"/goldMembership"}>
                <Ratio aspectRatio={1 / 7}>
                  <img src={goldrush} />
                </Ratio>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item className="list-itemm">
                <Button
                  className="button"
                  onClick={() => {
                    addtocart();
                  }}
                >
                  SELECT LENSES
                  <br /> (With 1 year Warranty & 14 Days Return)
                </Button>
              </ListGroup.Item>
            </ListGroup>

            <Accordion className="accordion" defaultActiveKey="0">
              <Accordion.Item eventKey="0" className="accordion-item">
                <Accordion.Header>Technical information</Accordion.Header>
                <Accordion.Body>
                  <Table className="table">
                    <tbody>
                      <tr className="row-1">
                        <td>Product id</td>
                        <td>{productDetail?.prodId}</td>
                      </tr>
                      <tr className="row-1">
                        <td className="col-1">Model No.</td>
                        <td>1</td>
                      </tr>
                      <tr className="row-1">
                        <td className="col-1">Frame Size</td>
                        <td>1</td>
                      </tr>
                      <tr className="row-1">
                        <td className="col-1">Frame Width</td>
                        <td>1</td>
                      </tr>
                      <tr className="row-1">
                        <td className="col-1">Frame Dimension</td>
                        <td>1</td>
                      </tr>
                      <tr className="row-1">
                        <td className="col-1">Suited For</td>
                        <td>1</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
                <hr />
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="accordion-item">
                <Accordion.Header>Visit Nearby Store</Accordion.Header>
                <Accordion.Body></Accordion.Body>
                <hr />
              </Accordion.Item>

              <Accordion.Item eventKey="2" className="accordion-item">
                <Accordion.Header>Check Delivery Options</Accordion.Header>
                <Accordion.Body></Accordion.Body>
                <hr />
              </Accordion.Item>
              <Accordion.Item eventKey="3" className="accordion-item">
                <Accordion.Header>Review(0)</Accordion.Header>
                <Accordion.Body></Accordion.Body>
                <hr />
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;
