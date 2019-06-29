import React from "react";

export default function MovieSearch(props) {
  return (
    <div className="searchBar">
      <input
        className="searchBox"
        type="search"
        placeholder="Type in a movie name.."
        onChange={props.handleChange}
      />
      <button className="searchBtn" type="submit" onClick={props.handleSubmit}>
        GO!
      </button>
    </div>
  );
}
