import React, { Component } from "react";
import "./MainPage.css";
import { getMovies } from "../../getAPI";

import Header from "../../components/Header/Header";
import SearchBox from "../../components/SearchBox/SearchBox";
import Movies from "../../components/Movies/Movies";
import Favorites from "../../components/Favorites/Favorites";

export default class MainPage extends Component {
  state = {
    movies: [],
    favorites: [],
  };

  loadMoviesList = (search) => {
    getMovies(search).then((moviesList) => {
      this.setState({
        movies: moviesList,
      });
    });
  };

  addToFavoritesMovie = (movie) => {
    const onlyOne = this.state.favorites.find(
      (movieOne) => movieOne.imdbID === movie.imdbID
    );
    if (onlyOne) {
      return;
    }
    const newFavoritesMovie = [...this.state.favorites, movie];
    this.setState({
      favorites: newFavoritesMovie,
    });
  };

  deleteMovie = (elemDelete) => {
    const filteredMovieId = this.state.favorites.filter((elemId, index) => {
      return index !== elemDelete;
    });
    this.setState({
      favorites: filteredMovieId,
    });
  };

  render() {
    return (
      <div className="main-page">
        <Header />
        <main className="main-page__content">
          <section className="main-page__main-section">
            <div className="main-page__search-box">
              <SearchBox onSearch={this.loadMoviesList} />
            </div>
            <div className="main-page__movies">
              <Movies
                movies={this.state.movies}
                addToFavoritesMovie={this.addToFavoritesMovie}
              />
            </div>
          </section>
          <aside className="main-page__favorites">
            <Favorites
              favorites={this.state.favorites}
              delete={this.deleteMovie}
            />
          </aside>
        </main>
      </div>
    );
  }
}
