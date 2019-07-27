import React from "react";
import Movie from "./Movie";
import "./Movie.css";

export default function MovieSearch(props) {
  return (
    <div>
      <div className="searchBar">
        <input
          className="searchBox"
          type="search"
          placeholder="Type in a movie name.."
          onChange={props.handleChange}
        />
        <button
          className="searchBtn"
          type="submit"
          onClick={props.handleSubmit}
        >
          GO!
        </button>
      </div>
      {props.movieFound ? (
        props.movieIDs.map(id => (
          <Movie id={id} key={id} libraryItem={props.libraryItem} />
        ))
      ) : (
        <h1 style={{ textAlign: "center", color: "black" }}>
          Movie not found,Search again!
        </h1>
      )}
    </div>
  );
}
