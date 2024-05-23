import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";

import Home from "./Pages/Home.jsx";

import PageNotFound from "./Pages/PageNotFound.jsx";

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

  console.log(watchlist);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route index element={<Home />} /> */}
          <Route
            path="/"
            element={
              <Home
                onMovieSelect={handleMovieSelect}
                addToWatchlist={addToWatchlist}
              />
            }
          />
          <Route
            path="/MoviePage"
            element={
              <MoviePage
                selectedMovieId={selectedMovieId}
                addToWatchlist={addToWatchlist}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route path="MusicHome" element={<MusicHome />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
