import React from "react";
import "./Common.scss";

const SearchBar = ({ clearSearch, searchText, handleChange }) => {
  return (
    <div className="search-bar">
      <i className="fa fa-search"></i>
      <input
        placeholder="Search your favourite songs or albums"
        onChange={handleChange}
        value={searchText}
        type="text"
      ></input>
      {searchText.length > 0 && (
        <i onClick={clearSearch} className="fa fa-close cursor-pointer"></i>
      )}
    </div>
  );
};

export default SearchBar;
