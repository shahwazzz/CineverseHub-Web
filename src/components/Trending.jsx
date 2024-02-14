import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "../partials/Topnav";
import Dropdown from "../partials/Dropdown";
import Cards from "../partials/Cards";
import Loading from "../partials/Loading";
import axios from "../utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  const navigate = useNavigate();

  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "CineverseHub | Trending " + category.toUpperCase()

  const GetTrending = async () => {
    try {
      // Fetch data from API
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${page}`
      );
      // Update search results state
      if (data.results.length > 0) {
        settrending((prevState) => [...prevState, ...data.results]);
        setpage((prev) => setpage(prev + 1));
      }
      else{
        sethasMore(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (trending.length === 0) {
      GetTrending();
    } else {
      setpage(1);
      settrending([]);
      GetTrending();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-[5%] w-full flex items-center justify-between">
        <h1 className="text-xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className=" cursor-pointer hover:text-[#6556CD] mr-2 ri-arrow-left-fill"
          ></i>
          Trending<small className=" text-sm ml-2 text-zinc-600">({category})</small>
        </h1>

        <div className=" flex items-center w-[80%]">
          <Topnav />

          <Dropdown
            title="Category"
            options={["movie", "tv", "all"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
          <Dropdown
            title="Durations"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={trending} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Trending;
