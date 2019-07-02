import React, { Component } from "react";
import "./Movie.css";

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
        this.setState({
          movie: data
        });
      })
      .catch(error => console.log(error));
  }
  addToLibrary = () => {
    this.props.libraryItem(this.state.movie);
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
          <p >Year: {Year}</p>
          <p >Rating: {imdbRating} / 10</p>
          <p className='plot'>{Plot}</p>
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
