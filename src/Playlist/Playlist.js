import React from "react";
import Modal from "../Common/Modal";
import SongsList from "./../Common/SongsList";
import SearchBar from "../Common/SearchBar";
import { shuffleArray } from "../Common/Utils";
import { v4 as uuidv4 } from "uuid";
import "./Playlist.scss";

class Playlist extends React.Component {
  state = {
    playLists: [],
    searchText: "",
    showModal: false,
    showSongsList: false,
    searchSongs: [],
    songsPlayList: [],
  };

  playlistId = null;

  componentDidMount() {
    const playLists = JSON.parse(localStorage.getItem("playlists"));
    if (playLists && playLists.length > 0) {
      this.setState({ playLists: playLists });
    }
  }

  openPlayList = (id) => {
    this.playlistId = id;
    const currentPlaylist = [...this.state.playLists];
    const index = currentPlaylist.findIndex((x) => x.id === id);
    if (index !== -1) {
      this.setState({ songsPlayList: currentPlaylist[index].songs });
    }
    this.setState({ showSongsList: true });
  };

  closePlayList = () => {
    this.playlistId = null;
    this.setState({ showSongsList: false });
  };

  toggleSongsList = () => {
    this.setState((state) => {
      this.setState(!state.showSongsList);
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  addtoPlaylist = (songDetail) => {
    if (songDetail) {
      const currentPlaylist = [...this.state.playLists];
      const index = currentPlaylist.findIndex((x) => x.id === this.playlistId);
      if (index !== -1) {
        currentPlaylist[index].songs.push(songDetail);
        this.setState({
          playLists: currentPlaylist,
          songsPlayList: currentPlaylist[index].songs,
        });
        this.saveLocalStorage(currentPlaylist);
      }
    }
  };

  clearAllPlaylists = () => {
    this.setState({ playLists: [] });
    this.saveLocalStorage([]);
  };

  saveLocalStorage = (playList) => {
    localStorage.setItem("playlists", JSON.stringify(playList));
  };

  handleOnChange = (evt) => {
    const searchText = evt.target.value;
    this.setState({ searchText: searchText });
    const songsList = this.props.songs.filter(
      (x) => x.title.indexOf(searchText) !== -1
    );
    this.setState({ searchSongs: songsList });
  };

  clearSearch = () => {
    this.setState({ searchText: "", searchSongs: [] });
  };

  shuffleSongs = () => {
    const currentSongsList = [...this.state.songsPlayList];
    if (currentSongsList.length > 0) {
      const shuffledArray = shuffleArray(currentSongsList);
      this.setState({ songsPlayList: shuffledArray });
    }
  };

  savePlaylist = (name, description) => {
    const currentPlaylists = this.state.playLists;
    currentPlaylists.push({
      id: uuidv4(),
      name: name,
      description: description,
      songs: [],
    });
    this.setState({ playLists: currentPlaylists, showModal: false });
    this.saveLocalStorage(currentPlaylists);
  };

  ListComponenet = ({ selectedPlayList }) => {
    return (
      <div className="songs-list">
        <span className="cursor-pointer" onClick={this.closePlayList}>
          <i className="fa fa-arrow-left"></i> Back to playlist
        </span>
        <h2>{selectedPlayList.name}</h2>
        <SearchBar
          handleChange={this.handleOnChange}
          searchText={this.state.searchText}
          clearSearch={this.clearSearch}
        />
        <p>Search a song you want to add to this playlist.</p>
        <div className="search-area">
          <SongsList
            songs={this.state.searchSongs}
            addtoPlaylist={this.addtoPlaylist}
          />
        </div>
        <div className="shuffle-text">
          <h2>Songs in playlist</h2>
          <i
            onClick={this.shuffleSongs}
            className="fa fa-random cursor-pointer"
            aria-hidden="true"
          >
            <span>Shuffle Songs</span>
          </i>
        </div>

        {selectedPlayList.songs.length > 0 ? (
          <SongsList songs={this.state.songsPlayList} />
        ) : (
          <p>No songs in this playlist</p>
        )}
      </div>
    );
  };

  render() {
    const currentPlaylists = this.state.playLists;
    const selectedPlayList = currentPlaylists.find(
      (x) => x.id === this.playlistId
    );
    return (
      <>
        {this.state.showModal && (
          <Modal
            name={`My Playlist#${this.state.playLists.length + 1}`}
            onClose={this.closeModal}
            onSave={this.savePlaylist}
          ></Modal>
        )}
        {this.state.showSongsList ? (
          <this.ListComponenet selectedPlayList={selectedPlayList} />
        ) : (
          <div className="playlist">
            <h1>Your Playlists</h1>
            {this.state.playLists.length === 0 ? (
              <p>
                You don't have any playlist now, click below button to create
                one
              </p>
            ) : (
              <div className="card-container">
                {this.state.playLists?.map((item) => {
                  let imageURL = null;
                  if (item.songs.length > 0) {
                    imageURL = item.songs[0].url;
                  }
                  return (
                    <div
                      onClick={() => this.openPlayList(item.id)}
                      className="album-card"
                    >
                      {imageURL === null ? (
                        <p>No songs Added</p>
                      ) : (
                        <img src={imageURL} alt="playlist" />
                      )}
                      <p>{item.name}</p>
                    </div>
                  );
                })}
              </div>
            )}
            <button onClick={() => this.setState({ showModal: true })}>
              Create Playlist
            </button>
            {this.state.playLists.length > 0 && (
              <button onClick={this.clearAllPlaylists}>Clear All</button>
            )}
          </div>
        )}
      </>
    );
  }
}

export default Playlist;
