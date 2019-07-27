import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Library from "./components/Library/Library";
import Header from "./components/Header/Header.js";
import MovieSearch from "./components/Movie/MovieSearch";

const API_KEY = "5093026f";

class App extends Component {
  state = {
    userInput: "",
    movieIDs: [],
    movieFound: true,
    movieLibrary: [] 
  };

  handleSubmit = e => {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.userInput}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        data.Response === "True"
          ? this.setState({
            movieIDs: data.Search.map(movie => movie.imdbID),
            movieFound: true
            })
          : this.setState({
              movieFound: false
            });
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    this.setState({
      userInput: e.target.value
    });
  };

  addMovieToLibrary = movie => {
    const newMovie = {
      title: movie.Title,
      year: movie.Year,
      plot: movie.Plot,
      poster: movie.Poster,
      imdbRating: movie.imdbRating
    };
    const newMovieLibrary = [...this.state.movieLibrary];

    newMovieLibrary.push(newMovie);
    this.setState({
      movieLibrary: [...newMovieLibrary]
    });
  };
  render() {
    const { movieLibrary, movieIDs, movieFound } = this.state;

    return (
      <div className="App">
        <Router>
          <Header />
          <Route
            path="/"
            exact
            render={() => (
              <MovieSearch
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                libraryItem={this.addMovieToLibrary}
                movieIDs={movieIDs}
                movieFound={movieFound}
              />
            )}
          />
          <Route
            path="/library"
            render={() =>
              movieLibrary.map(movie => <Library movieItem={movie} />)
            }
          />
        </Router>
      </div>
    );
  }
}

export default App;
