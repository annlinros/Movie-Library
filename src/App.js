import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Movie from "./components/Movie";
import Library from "./components/Library";
import Header from "./components/Header";
import MovieSearch from "./components/MovieSearch";

const API_KEY = "5093026f";

class App extends Component {
  state = {
    userInput: "",
    movieIDs: [],
    movieLibrary: ["movie", "movie", "movie", "movie"]
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
  };

  render() {
    const { movieLibrary } = this.state;

    return (
      <div className="App">
        <Router>
          <Header />
          <Route path="/library" component={Library} />
          <Route
            path="/search"
            component={() => (
              <MovieSearch
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            )}
          >
            {this.state.movieIDs.map(id => (
              <Movie id={id} />
            ))}
          </Route>
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
