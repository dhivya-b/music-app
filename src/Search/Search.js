import React from "react";
import "./Search.scss";
import SearchBar from "../Common/SearchBar";
import SongsList from "./../Common/SongsList";

class Search extends React.Component {
  state = {
    searchText: "",
    songs: [],
  };

  handleOnChange = (evt) => {
    const searchText = evt.target.value;
    this.setState({ searchText: searchText });
    const songsList = this.props.songs.filter(
      (x) => x.title.indexOf(searchText) !== -1
    );
    this.setState({ songs: songsList });
  };

  clearSearch = () => {
    this.setState({ searchText: "" });
  };

  render() {
    return (
      <div className="search">
        <SearchBar
          handleChange={this.handleOnChange}
          searchText={this.state.searchText}
          clearSearch={this.clearSearch}
        />
        {this.state.searchText.length > 0 && (
          <div>
            {this.state.songs.length > 0 ? (
              <div>
                <h2>Top results</h2>
                <SongsList songs={this.state.songs} />
              </div>
            ) : (
              <p>No results founds</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
