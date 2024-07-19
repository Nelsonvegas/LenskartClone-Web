import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import Ratio from "react-bootstrap/Ratio";
import { IoClose } from "react-icons/io5";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { toast } from "sonner";
import "../wishlist/Wislist.css";

const Wishlist = (props) => {
  const [flag, setFlag] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [hovered, setHovered] = useState();

  useEffect(() => {
    const url = `http://localhost:8080/getwishlist`;

    axios
      .get(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setWishlistItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag, props.dataWishlist]);

  useEffect(() => {
    setFlag(!flag);
  }, []);

  const removeFromWishlist = (data) => {
    const url = `http://localhost:8080/removeFromWishlist/${data}`;

    axios
      .delete(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setFlag(!flag);
        props.dataFromChild();
        toast.error("removed from wishlist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Offcanvas scroll={true} backdrop={false} {...props}>
      <Offcanvas.Header
        closeButton
        style={{ backgroundColor: "#329b91", color: "white" }}
      >
        <Offcanvas.Title>Wishlist</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <>
              <Row
                onMouseLeave={() => {
                  setHovered(null);
                }}
                onMouseEnter={() => {
                  setHovered(item.wishlistId);
                }}
                style={
                  hovered === item.wishlistId
                    ? { backgroundColor: "#f4c1bb" }
                    : { backgroundColor: "white" }
                }
              >
                <Col md={3} className="pt-2">
                  <Ratio aspectRatio={1 / 2}>
                    <img
                      src={"data:image/jpeg;base64," + item.productDTO?.prodImg}
                      rounded
                    />
                  </Ratio>
                </Col>
                <Col md={9}>
                  <Row>
                    <Col md={10}>
                      <span style={{ fontSize: "10px" }}>
                        {item.productDTO?.prodName}
                      </span>
                    </Col>
                    <Col md={2}>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          removeFromWishlist(item.productDTO?.prodId);
                        }}
                      >
                        <IoClose></IoClose>
                      </span>
                    </Col>
                  </Row>
                  <Row>
                    <span>
                      <LiaRupeeSignSolid></LiaRupeeSignSolid>&nbsp;
                      {item.productDTO?.price}
                    </span>
                  </Row>
                </Col>
                <hr className="mt-1 mb-0"></hr>
              </Row>
            </>
          ))
        ) : (
          <>Add products to wishlist to view here</>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Wishlist;
