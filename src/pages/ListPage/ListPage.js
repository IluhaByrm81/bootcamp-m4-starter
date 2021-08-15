import React, { Component } from "react";
import "./ListPage.css";
import { getNewIdMovies } from "../../getAPI";

export default class ListPage extends Component {
  state = {
    title: "",
    movies: [],
  };

  componentDidMount() {
    const id = this.props.match.params.listId;
    console.log(id);
    getNewIdMovies(id).then((list) => {
      this.setState(list);
    });
  }
  render() {
    return (
      <div className="list-page">
        <h1 className="list-page-title">My List</h1>
        <div className="list-page-flex">
          {this.state.movies.map((item) => {
            return (
              <div key={item.imdbID} className="list-page-block">
                <a
                  className="list-page-link"
                  href={`https://www.imdb.com/title/${item.imdbID}/`}
                  target="_blank"
                >
                  {item.Title} {item.Year}
                </a>
                <img
                  src={item.Poster}
                  alt={item.Title}
                  className="list-page-img"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
