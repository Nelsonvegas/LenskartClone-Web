import React from "react";
import SearchResult from "../searchresult/SearchResult";

const SearchResultList = (props) => {
  return (
    <div className="results-list">
      {props.category && props.category.length > 0 && <h4>Categories</h4>}

      {props.category.map((item, id) => {
        return (
          <SearchResult
            onDataFromGrandChild={props.onDataFromChild}
            product={item}
            key={id}
          />
        );
      })}

      {props.category && props.products.length > 0 && (
        <h4>Matching Products</h4>
      )}

      {props.products.map((item, id) => {
        return (
          <SearchResult
            onDataFromGrandChild={props.onDataFromChild}
            product={item[0]}
            key={id}
          />
        );
      })}
    </div>
  );
};

export default SearchResultList;
