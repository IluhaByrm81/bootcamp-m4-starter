import React, { Component } from "react";
import "./SearchBox.css";

export default class SearchBox extends Component {
  state = {
    searchLine: "",
  };
  searchLineChangeHandler = (event) => {
    this.setState({ searchLine: event.target.value });
  };
  searchBoxSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onSearch(this.state.searchLine);
  };

  render() {
    const { searchLine } = this.state;

    return (
      <div className="search-box">
        <form
          className="search-box__form"
          onSubmit={this.searchBoxSubmitHandler}
        >
          <label className="search-box__form-label">
            Искать фильм по названию:
            <input
              value={searchLine}
              type="text"
              className="search-box__form-input"
              placeholder="Введите название фильма"
              onChange={this.searchLineChangeHandler}
            />
          </label>
          <button
            type="submit"
            className="search-box__form-submit"
            disabled={!searchLine}
          >
            Искать
          </button>
        </form>
      </div>
    );
  }
}
