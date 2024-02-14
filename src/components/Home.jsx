import React, { useEffect, useState } from "react";
import SideNav from "../partials/Sidenav";
import Topnav from "../partials/Topnav";
import Header from "../partials/Header";
import axios from "../utils/axios";
import HorizontalCards from "../partials/HorizontalCards";
import Dropdown from "../partials/Dropdown";
import Loading from "../partials/Loading";

const Home = () => {
  const [wallpaper, setwallpaper] = useState(null);
  const [trending, settrending] = useState(null);
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      // Fetch data from API
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      // Update search results state
      setwallpaper(randomdata);
    } catch (error) {
      console.log(error);
    }
  };

  const GetTrending = async () => {
    try {
      // Fetch data from API
      const { data } = await axios.get(`/trending/${category}/day`);
      // Update search results state
      settrending(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  document.title = "CineverseHub | Homepage";

  return wallpaper && trending ? (
    <>
      <SideNav />
      <div className=" w-[80%] h-full overflow-auto overflow-x-hidden ">
        <Topnav />
        <Header data={wallpaper} />

        <div className=" p-5 flex justify-between">
          <h1 className=" text-2xl text-zinc-400 font-bold">Trending</h1>

          <Dropdown title="filter" options={["tv", "movie", "all"]} func={(e) => (setcategory(e.target.value))} />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : (
   <Loading/>
  );
};

export default Home;
