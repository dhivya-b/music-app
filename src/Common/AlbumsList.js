import React from "react";
import "./Common.scss";

const AlbumsList = ({ albums, songs }) => {
  return (
    <div className="albums-list card-container">
      {albums.map((album, index) => {
        const image = songs.find((song) => song.albumId === album.id);
        return (
          <div className="album-card" style={{ backgroundImage: image.url }}>
            <img src={image.url} alt={`${index}-songs`} />
            <p className="title">{album.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AlbumsList;
