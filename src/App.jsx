import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./Pages/Home.jsx";
import SignUp from "./Pages/SignUp.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import Login from "./Pages/Login.jsx";
import Modal from "./components/Modal.jsx";
import Verified from "./components/Verified.jsx";
import SearchResults from "./components/SearchResults.jsx";
import MoviePage from "./Pages/MoviePage.jsx";
import MusicHome from "./Pages/MusicHome.jsx";




function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const handleMovieSelect = (id) => {
    setSelectedMovieId(id);
  };

  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => {
      if (prevWatchlist.find((item) => item.imdbID === movie.imdbID)) {
        return prevWatchlist;
      }
      return [...prevWatchlist, movie];
    });
  };

  console.log(watchlist)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="Login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="Modal" element={<Modal />} />
          <Route path="Verified" element={<Verified />} />
          <Route path="SearchResults" element={<SearchResults />} />
          <Route path="MusicHome" element={<MusicHome />} />
          {/* <Route path="MoviePage" element={<MoviePage />} />
          <Route path="Home" element={<Home />} /> */}
          <Route
            path="Home"
            element={<Home onMovieSelect={handleMovieSelect} addToWatchlist={addToWatchlist}/>}
          />
          <Route
            path="/MoviePage"
            element={<MoviePage selectedMovieId={selectedMovieId} addToWatchlist={addToWatchlist} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

