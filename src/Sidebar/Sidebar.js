import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../assets/music-logo.svg";
import "./Sidebar.scss";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-desktop">
        <div className="flex-container align-items-center">
          <img className="logo-image" alt="logo" src={logo} />
          <span className="company-title">VBI Music</span>
        </div>
        <ul className="nav-links">
          <Link to="/">
            <li className={`${location.pathname === "/" ? "active" : null}`}>
              <i className="fa fa-home"></i>Home
            </li>
          </Link>
          <Link to="/search">
            <li
              className={`${location.pathname === "/search" ? "active" : null}`}
            >
              <i className="fa fa-search"></i>Search
            </li>
          </Link>
          <Link to="/playlist">
            <li
              className={`${
                location.pathname === "/playlist" ? "active" : null
              }`}
            >
              <i className="fa fa-music"></i>Playlists
            </li>
          </Link>
        </ul>
      </div>
      <div className="sidebar-mobile">
        <div className="flex-container align-items-center">
          <img className="logo-image" alt="logo" src="/music-logo.svg" />
        </div>
        <ul className="nav-links">
          <Link to="/">
            <li className={`${location.pathname === "/" ? "active" : null}`}>
              <i className="fa fa-home"></i>
            </li>
          </Link>
          <Link to="/search">
            <li
              className={`${location.pathname === "/search" ? "active" : null}`}
            >
              <i className="fa fa-search"></i>
            </li>
          </Link>
          <Link to="/playlist">
            <li
              className={`${
                location.pathname === "/playlist" ? "active" : null
              }`}
            >
              <i className="fa fa-music"></i>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
