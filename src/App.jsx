import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Trending from "./components/Trending";
import Popular from "./components/Popular";
import Movie from "./components/Movie";
import TvShows from "./components/TvShows";
import People from "./components/People";
import Moviedetails from "./components/Moviedetails";
import Tvdetails from "./components/Tvdetails";
import Persondetails from "./components/Persondetails";
import Trailer from "./partials/Trailer";
import Notfound from "./partials/notfound"

const App = () => {
  return (
    <div className="bg-[#1F1E24] w-screen h-screen flex">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />}/>
        <Route path="/movie/details/:id" element={<Moviedetails />}>

          <Route path="/movie/details/:id/trailer" element={<Trailer/>}/>

        </Route>
        <Route path="/tv" element={<TvShows />}/>
        <Route path="/tv/details/:id" element={<Tvdetails />}>

           <Route path="/tv/details/:id/trailer" element={<Trailer/>}/>

        </Route>
        <Route path="/person" element={<People />}/>
        <Route path="/person/details/:id" element={<Persondetails />} />
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </div>
  );
};

export default App;
