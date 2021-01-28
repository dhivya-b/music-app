import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home/Home";
import Search from "./Search/Search";
import Playlist from "./Playlist/Playlist";
import Sidebar from "./Sidebar/Sidebar";

import "./App.scss";

class App extends React.Component {
  state = {
    songs: [],
    albums: [],
    fetching: false,
    error: false,
  };

  componentDidMount() {
    try {
      this.setState({ fetching: true });
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then((response) => response.json())
        .then((result) => {
          const albums = result;
          this.setState({ albums: albums });
        });
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then((response) => response.json())
        .then((result) => {
          const songs = result;
          this.setState({ songs: songs });
        });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ fetching: false });
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.fetching ? (
          <p>Fetching songs and albums for you...!!</p>
        ) : this.state.error ? (
          <p>OOPS...Something went wrong..!!</p>
        ) : (
          this.state.songs.length > 0 &&
          this.state.albums.length > 0 && (
            <>
              <Sidebar />
              <div className="router-content">
                <Switch>
                  <Route
                    path="/"
                    exact
                    component={() => (
                      <Home
                        songs={this.state.songs}
                        albums={this.state.albums}
                      />
                    )}
                  />
                  <Route
                    path="/search"
                    exact
                    component={() => (
                      <Search
                        songs={this.state.songs}
                        albums={this.state.albums}
                      />
                    )}
                  />
                  <Route
                    path="/playlist"
                    component={() => (
                      <Playlist
                        songs={this.state.songs}
                        albums={this.state.albums}
                      />
                    )}
                  />
                </Switch>
              </div>
            </>
          )
        )}
      </div>
    );
  }
}

export default App;
