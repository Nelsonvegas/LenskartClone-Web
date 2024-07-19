import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchResult = (props) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const sendDataToParent = () => {
    props.onDataFromGrandChild(props.product);
    navigate("/products", { state: props.product });
  };

  return (
    <div
      onClick={() => {
        sendDataToParent();
      }}
      className="search-result"
    >
      {props.product}
    </div>
  );
};

export default SearchResult;
