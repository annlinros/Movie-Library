import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Library from "./components/Library";
import Header from "./components/Header";
import MovieSearch from "./components/MovieSearch";

const API_KEY = "5093026f";

class App extends Component {
  state = {
    userInput: "",
    movieIDs: [],
    movieLibrary: []
  };

  handleSubmit = e => {
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${this.state.userInput}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);

        this.setState({
          movieIDs: data.Search.map(movie => movie.imdbID)
        });
        console.log(this.state.movieIDs);
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    this.setState({
      userInput: e.target.value
    });
    console.log(this.state.userInput);
  };
  addLibraryItem = item => {
    this.setState({
      movieLibrary: [...this.state.movieLibrary, item]
    });
  };
  render() {
    const { movieLibrary, movieIDs } = this.state;

    return (
      <div className="App">
        <Router>
          <Header />
          <Route
            path="/library"
            render={() =>
              movieLibrary.map(item => <Library movieItem={item} />)
            }
          />
          <Route
            path="/search"
            render={() => (
              <MovieSearch
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                libraryItem={this.addLibraryItem}
                movieIDs={movieIDs}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

{
  /* <button
  onClick={() =>
    movieLibrary.map(movie => <Library movie={movie} />)
  }
>
  Library
</button> */
}
export default App;
