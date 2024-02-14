import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import noimage from "../../public/no image.jpg";

const Topnav = () => {
  // State for search query
  const [query, setQuery] = useState("");

  // State for storing search results
  const [searches, setSearches] = useState([]);

  // Function to fetch search results
  const getSearches = async () => {
    try {
      // Fetch data from API
      const { data } = await axios.get(`/search/multi?query=${query}`);
      // Update search results state
      setSearches(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  // Effect hook to fetch search results whenever query changes
  useEffect(() => {
    getSearches();
  }, [query]);

  // Return statement rendering the Topnav component
  return (
    // Topnav container
    <div className="w-[80%] h-[10vh] relative mx-auto flex items-center">
      {/* Search icon */}
      <i className="text-zinc-400 text-2xl ri-search-2-line"></i>
      {/* Search input */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-[50%] text-zinc-200 mx-10 p-5 text-md outline-none border-none bg-transparent"
        type="text"
        placeholder="Search anything"
      />
      {/* Close icon (displayed when query length > 0) */}
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="cursor-pointer text-zinc-400 text-3xl ri-close-fill"
        ></i>
      )}

      {/* Container to display search results */}
      <div className="z-[90] absolute top-[100%] left-[5%] w-[50%] max-h-[50vh] bg-zinc-200 overflow-auto">
        {/* Mapping over search results */}
        {searches.map((s, i) => (
          // Link to search result
          <Link
            to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-full p-8 flex justify-start items-center border-b-2 border-zinc-100 " 
          >
            {/* Displaying image or placeholder if not available */}
            <img
              className="w-[10vh] h-[10vh] object-cover rounded-full mr-5 shadow-lg"
              src={
                s.backdrop_path || s.profile_path
                  ? `https://image.tmdb.org/t/p/original/${
                      s.backdrop_path || s.profile_path
                    }`
                  : noimage
              }
              alt=""
            />
            {/* Displaying name/title */}
            <span>
              {s.name || s.title || s.original_name || s.original_title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
