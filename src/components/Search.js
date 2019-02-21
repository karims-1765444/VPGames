import React from "react";

const Search = ({ onChange }) => (
  <input class="search"
    type="text"
    onChange={onChange}
    placeholder="Enter your favorite team..."
    autoFocus
  />
);

export default Search;
