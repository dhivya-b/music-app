import React from "react";
import AlbumsList from "./../Common/AlbumsList";
import SongsList from "./../Common/SongsList";

class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <h2>Most Popular albums</h2>
        {this.props.albums.length > 0 ? (
          <AlbumsList
            albums={this.props.albums.slice(0, 5)}
            songs={this.props.songs}
          />
        ) : (
          <p>No albums available</p>
        )}
        <h2>All Songs</h2>
        {this.props.songs.length > 0 ? (
          <SongsList songs={this.props.songs} />
        ) : (
          <p>No songs available</p>
        )}
      </div>
    );
  }
}

export default Home;
