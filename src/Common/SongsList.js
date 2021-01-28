import { findAllByTitle } from "@testing-library/react";
import React from "react";
import "./Common.scss";

const SongsList = ({ songs, addtoPlaylist }) => {
  return (
    <div className="card-container">
      {songs.map((song) => {
        return (
          <div className="song-card">
            <div className="flex-container justify-content-center align-items-center">
              <div>
                <img src={song.thumbnailUrl} alt="song" />
              </div>
              <span className="title">{song.title}</span>
            </div>
            {addtoPlaylist && (
              <p className="cursor-pointer" onClick={() => addtoPlaylist(song)}>
                Add to playlist
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SongsList;
