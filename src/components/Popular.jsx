import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Loading from "../partials/Loading";
import Topnav from "../partials/Topnav";
import Cards from "../partials/Cards";
import Dropdown from "../partials/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";

const Popular = () => {
  const navigate = useNavigate();

  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "CineverseHub | Popular " + category.toUpperCase()

  const GetPopular = async () => {
    try {
      // Fetch data from API
      const { data } = await axios.get(
        `${category}/popular?page=${page}`
    );
      // Update search results state
      if (data.results.length > 0) {
        setpopular((prevState) => [...prevState, ...data.results]);
        setpage((prev) => setpage(prev + 1));
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setpage(1);
      setpopular([]);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen h-screen ">
      <div className=" px-[5%] w-full flex items-center justify-between">
        <h1 className="text-xl text-zinc-400 font-semibold">
          <i
            onClick={() => navigate(-1)}
            className=" cursor-pointer hover:text-[#6556CD] mr-2 ri-arrow-left-fill"
          ></i>
          Popular<small className=" text-sm ml-2 text-zinc-600">({category})</small>
        </h1>

        <div className=" flex items-center w-[80%]">
          <Topnav />

          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setcategory(e.target.value)}
          />
          <div className="w-[2%]"></div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
};

export default Popular;
