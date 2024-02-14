import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "../partials/Loading";
import HorizontalCards from "../partials/HorizontalCards";
import noimage from "../../public/no image.jpg";

const Tvdetails = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { info } = useSelector((state) => state.tv);

  useEffect(() => {
    dispatch(asyncloadtv(id));

    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        // Setting background image using inline style
        background: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.5), rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center 5%",
        backgroundSize: "cover",
      }}
      className=" relative w-screen h-[215vh] px-[10%]"
    >
      {/* part 1 navigation */}
      <nav className="w-full h-[10vh] text-zinc-100 flex gap-10 text-xl items-center">
        <Link to={"/"}>
          <i class="ri-home-4-line"></i>
        </Link>
        <Link
          onClick={() => navigate(-1)}
          className=" cursor-pointer hover:text-[#6556CD] mr-2 ri-arrow-left-fill"
        ></Link>

        <a target="_blank" href={info.detail.homepage}>
          <i className="ri-external-link-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
        >
          <i className="ri-earth-fill"></i>
        </a>

        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* Part2 poster and details */}
      <div className=" w-full flex">
        <img
          className=" shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[60vh] object-cover"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />

        <div className="text-white ml-[5%]">
          <h1 className=" text-4xl font-black ">
            {info.detail.name ||
              info.detail.title ||
              info.detail.original_name ||
              info.detail.original_title}

            <small className=" text-2xl font-bold text-zinc-300">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className=" mt-3 mb-5 flex text-white items-center gap-5">
            <span
              className="rounded-full text-lg font-semibold bg-yellow-600 text-white w-[7vh] h-[7vh] 
              flex justify-center items-center"
            >
              {(info.detail.vote_average * 10).toFixed()} <sup>%</sup>
            </span>

            <h1 className=" w-[60px] font-semibold text-xl leading-5">
              User score
            </h1>

            <h1>{info.detail.release_date}</h1>

            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>

            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className=" text-xl font-semibold italic text-zinc-200">
            {info.detail.tagline}
          </h1>

          <h1 className=" text-xl mb-3 mt-5">Overview</h1>
          <p>{info.detail.overview}</p>

          <h1 className=" text-xl mb-3 mt-5">Movie Translated</h1>
          <p className=" mb-10">{info.translations.join(", ")}</p>

          <Link
            to={`${pathname}/trailer`}
            className="p-4 bg-[#6556cd] rounded-lg"
          >
            Play Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 Available on Platform */}
      <div className="w-[80%] flex flex-col gap-y-5 mt-10">
        {info.watchproviders && info.watchproviders.flatrate && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Platfotms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.rent && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}

        {info.watchproviders && info.watchproviders.buy && (
          <div className="flex gap-x-10 items-center text-white">
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-[5vh] h-[5vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt=""
              />
            ))}
          </div>
        )}
      </div>

      {/*Part 4 Seasons  */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h1 className=" text-3xl font-bold text-white">Seasons</h1>
      <div className="w-[100%] flex overflow-y-hidden mb-5 p-5 ">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div key={i} className="w-[15vw] mr-4">
              <img
                className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] min-w-[14vw] h-[40vh] object-cover"
                src={
                  s.poster_path
                    ? `https://image.tmdb.org/t/p/original/${s.poster_path}`
                    : noimage
                }
                alt=""
              />
              <h1 className="text-2xl text-zinc-300 mt-3 font-semibold ">
                {s.name}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-3xl mt-5 text-white font-black text-center">
            Nothing to show
          </h1>
        )}
      </div>

      {/*Part 5 Recommendation and similar stuff  */}
      <hr className=" mt-10 mb-5 border-none  h-[2px] bg-zinc-500" />

      <h1 className=" text-2xl font-bold text-white">
        Recommendation & similar
      </h1>

      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
        title="tv"
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
};

export default Tvdetails;
