import React, { Component } from "react";

class Movie extends Component {
  state = {
    movie: {}
  };
  componentDidMount() {
    fetch(
      `http://www.omdbapi.com/?apikey=5093026f&i=${this.props.id}&plot=short`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          movie: data
        });
      })
      .catch(error => console.log(error));
  }
  addToLibrary = () => {
    this.props.libraryItem(this.state.movie.Title);
    console.log(this.state.movie);
  };
  render() {
    const { Poster, Year, Title, imdbRating, Plot } = this.state.movie;

    return (
      <div className="movie-item-container">
        <div className="image-container">
          <div
            className="bg-image"
            style={{ backgroundImage: `url(${Poster})` }}
          />
        </div>
        <div className="movie-info">
          <h1>{Title}</h1>
          <small>Year: {Year}</small>
          <h4>Rating: {imdbRating} / 10</h4>
          <p>{Plot}</p>
          <button className="addMovieBtn" onClick={this.addToLibrary}>
            {" "}
            + Add Movie
          </button>
        </div>
      </div>
    );
  }
}

export default Movie;
