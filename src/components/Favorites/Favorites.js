import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";
import { postMoviesID } from "../../getAPI";

export default class Favorites extends Component {
  state = {
    title: "",
    id: "",
  };

  addPostMovies = () => {
    postMoviesID(this.state.title, this.props.favorites).then((res) => {
      this.setState({
        id: res.id,
      });
    });
  };

  searchMovieTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  render() {
    return (
      <div className="favorites">
        <input
          value={this.state.title}
          className="favorites__name"
          onChange={this.searchMovieTitle}
        />
        <ul className="favorites__list">
          {this.props.favorites.map((item, index) => {
            return (
              <li className="favorites__list-item" key={item.imdbID}>
                {item.Title} ({item.Year})
                <button
                  className="favorites-delete"
                  onClick={() => this.props.delete(index)}
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
        {this.state.id ? (
          <Link to={`/list/${this.state.id}`} className="favorites-link">
            Мой список Фильмов
          </Link>
        ) : (
          <button
            onClick={this.addPostMovies}
            type="button"
            className="favorites__save"
          >
            Сохранить список
          </button>
        )}
      </div>
    );
  }
}
