import React from "react";
import { Link } from "react-router-dom";

// Header component
const Header = ({ data }) => {
  return (
    // Container for the header section with dynamic background image
    <div
      style={{
        // Setting background image using inline style
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center 5%",
        backgroundSize: "cover",
      }}
      className="w-full h-[60vh] flex flex-col justify-end items-start p-[5%]"
    >
      {/* Title */}
      <h1 className="w-[70%] text-4xl font-black text-white">
        {" "}
        {/* Displaying title or name */}
        {data.name ||
          data.title ||
          data.original_name ||
          data.original_title}{" "}
      </h1>
      {/* Overview */}
      <p className="w-[60%] mt-3 mb-3 text-white">
        {/* Displaying overview with a link to read more */}
        {data.overview.slice(0, 200)}...{" "}
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-700"
        >
          more
        </Link>
      </p>
      {/* Release date and media type */}
      <p className="text-white">
        {/* Icons for release date and media type */}
        <i className="text-yellow-400 ri-megaphone-fill"></i>
        {data.release_date || "No Information"}
        <i className="ml-5 text-yellow-400 ri-album-fill"></i>
        {data.media_type.toUpperCase()}
      </p>
      {/* Button to watch trailer */}
      <Link
        to={`/${data.media_type}/details/${data.id}/trailer`}
        className="mt-5 bg-[#6556CD] p-3 rounded text-white "
      >
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
