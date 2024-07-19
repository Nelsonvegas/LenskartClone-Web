import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SearchBar = (props) => {
  const [query, setQuery] = useState(null);
  const navigate = useNavigate();

  const handleChange = (val) => {
    props.showSuggestion(true);
    setQuery(val);
  };

  useEffect(() => {}, [query]);

  const handleSearch = (e) => {
    console.log(query);
    props.onDataFromSearch(query);

    if (e.key === "Enter") {
      props.showSuggestion(false);

      // navigate("/products", { state: query });
      window.location.href = `/products?query=${query}`;
    }
  };

  return (
    <Form.Control
      style={{ width: "18rem" }}
      placeholder="What are you looking for?"
      value={query}
      name="query"
      onChange={(e) => {
        handleChange(e.target.value);
      }}
      onKeyPress={(e) => {
        handleSearch(e);
      }}
    />
  );
};

export default SearchBar;
