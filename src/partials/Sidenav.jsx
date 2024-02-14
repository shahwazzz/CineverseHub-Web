import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Sidebar component for navigation
const SideNav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-200 p-8">
      
      {/* Logo */}
      <h1 className="text-xl text-white font-bold">
        <i className="text-[#6556CD] ri-tv-fill mr-2"></i>
        <span className="text-xl">CineverseHub</span>
      </h1>
      
      {/* Navigation links */}
      <nav className="flex flex-col text-zinc-400 text-md gap-3">
        <h1 className="text-white font-semibold text-md mt-10 mb-5">
          New Feeds
        </h1>
        {/* Trending */}
        <Link to ="/trending" className="hover:bg-[#6556CD] p-3 rounded-lg hover:text-white duration-300 active:scale-90 transition-all ">
          <i className="mr-2 ri-fire-fill"></i>Trending
        </Link>
        {/* Popular */}
        <Link to="/popular" className="hover:bg-[#6556CD] p-3 rounded-lg hover:text-white duration-300 active:scale-90 transition-all">
          <i className="mr-2 ri-bard-fill"></i>Popular
        </Link>
        {/* Movies Shows */}
        <Link to="/movie" className="hover:bg-[#6556CD] p-3 rounded-lg hover:text-white duration-300 active:scale-90 transition-all">
          <i className="mr-2 ri-movie-fill"></i>Movies Shows
        </Link>
        {/* Tv Shows */}
        <Link to="/tv" className="hover:bg-[#6556CD] p-3 rounded-lg hover:text-white duration-300 active:scale-90 transition-all">
          <i className="mr-2 ri-tv-2-fill"></i>Tv Shows
        </Link>
        {/* People */}
        <Link to="/person" className="hover:bg-[#6556CD] p-3 rounded-lg hover:text-white duration-300 active:scale-90 transition-all">
          <i className="mr-2 ri-team-fill"></i>People
        </Link>
      </nav>
      
      {/* Separator */}
      <hr className="border-none h-[1px] bg-zinc-400 mt-2"/>
      
      {/* Website Information */}
      <nav className="flex flex-col text-zinc-400 text-md gap-3">
        <h1 className="text-white font-semibold text-md mt-10 mb-5">
          Website Information
        </h1>
        {/* About CineverseHub */}
        <Link className="hover:bg-[#6556CD] p-3 rounded-lg hover:text-white duration-300 active:scale-90 transition-all">
          <i className="mr-2 ri-information-fill"></i>About CineverseHub
        </Link>
        {/* Contact Us */}
        <Link className="hover:bg-[#6556CD] p-3 rounded-lg hover:text-white duration-300 active:scale-90 transition-all">
          <i className="mr-2 ri-phone-fill"></i>Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default SideNav;
