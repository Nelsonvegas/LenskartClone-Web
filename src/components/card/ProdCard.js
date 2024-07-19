import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Wishlist from "../wishlist/Wishlist";

const ProdCard = (props) => {
  const navigate = useNavigate();
  const [wishlistItems, setWishListItems] = useState([]);
  const [flag, setFlag] = useState(false);

  const [showWishlist, setShowWishlist] = useState(false);
  const handleCloseWishlist = () => setShowWishlist(false);
  const handleShowWishlist = () => setShowWishlist(true);

  const handleCardClick = (data) => {
    window.location.href = `/productDetail?query=${data}`;
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
  }, [flag, props.wishlistChange]);

  const removeFromWishlist = (data) => {
    const url = `http://localhost:8080/removeFromWishlist/${data}`;
    axios
      .delete(url, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        setFlag(!flag);
        props.onDataWishlist();
        toast.error("removed from wishlist");
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

  const handleDataFromWishlist = () => {
    props.onDataWishlist();
  };

  return (
    <Card
      style={{ width: "18rem", cursor: "pointer" }}
      onClick={() => {
        handleCardClick(props.detail.prodId);
      }}
    >
      <Col className="d-flex justify-content-end p-1">
        {wishlistItems.includes(props.detail.prodId) ? (
          <FaHeart
            onClick={(e) => {
              removeFromWishlist(props.detail.prodId);
              e.stopPropagation();
            }}
            style={{ fill: "red" }}
            fontSize={25}
          ></FaHeart>
        ) : (
          <FaRegHeart
            onClick={(e) => {
              addToWishlist(props.detail.prodId);
              e.stopPropagation();
            }}
            fontSize={25}
          ></FaRegHeart>
        )}{" "}
      </Col>
      <Wishlist
        dataFromChild={handleDataFromWishlist}
        className="d-flex align-content-center w-25"
        show={showWishlist}
        onHide={handleCloseWishlist}
        placement="bottom"
        name="bottom"
      ></Wishlist>

      <Card.Img
        variant="top"
        src={"data:image/jpeg;base64," + props.detail?.prodImg}
      />
      <Card.Body>
        <Card.Title>{props.detail?.prodName}</Card.Title>
        <Card.Text>
          <ListGroup variant="flush">
            <ListGroup.Item>{props.detail?.prodDescription}n</ListGroup.Item>
            <ListGroup.Item>{props.detail?.price}</ListGroup.Item>
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProdCard;
