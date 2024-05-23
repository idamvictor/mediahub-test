import { useRef, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link, NavLink } from "react-router-dom";
import styles from "./Home.module.css";
import SearchResults from "../components/SearchResults";
import MovieDetails from "../components/MovieDetails";
import EmptyModal from "../components/EmptyModal";

const key = "cba680cd";

Home.propTypes = {
  onMovieSelect: PropTypes.func.isRequired,
};

function Home({ onMovieSelect }) {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const searchInputRef = useRef(null); // Create a ref for the search input
  const [watchlist, setWatchlist] = useState(() => {
    // Retrieve watchlist from localStorage
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });
  const [message, setMessage] = useState(""); // State for message

  useEffect(() => {
    // Store watchlist in localStorage whenever it changes
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const handleMovieClick = async (imdbID) => {
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${imdbID}&plot=full`
      );
      if (!res.ok)
        throw new Error("Something went wrong with fetching movie details");

      const movie = await res.json();
      setSelectedMovie(movie);
      onMovieSelect(imdbID); // Pass the selected movie ID to the App component
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const focusSearchBar = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const clearSearch = () => {
    setQuery("");
    setMovies([]);
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.some((item) => item.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
      setMessage(`${movie.Title} has been added to your watchlist`); // Set message
      setTimeout(() => {
        setMessage(""); // Clear message after a delay
      }, 3000); // Adjust the delay as needed
    } else {
      setMessage(`${movie.Title} is already in your watchlist`); // Set message
      setTimeout(() => {
        setMessage(""); // Clear message after a delay
      }, 3000); // Adjust the delay as needed
    }
  };

  const removeFromWatchlist = (imdbID) => {
    setWatchlist(watchlist.filter((movie) => movie.imdbID !== imdbID));
  };

  return (
    <div className={styles.mainContainer}>
      <Navigation
        movies={movies}
        setMovies={setMovies}
        query={query}
        setQuery={setQuery}
        searchInputRef={searchInputRef} // Pass the ref to Navigation
      />
      <Toggle />
      {query.length > 1 ? (
        <SearchResults
          movies={movies}
          onMovieClick={handleMovieClick}
          addToWatchlist={addToWatchlist}
          clearSearch={clearSearch} // Pass the clearSearch function to SearchResults
        />
      ) : (
        <>
          {watchlist.length === 0 && (
            <EmptyModal focusSearchBar={focusSearchBar} />
          )}
          {watchlist.length > 0 && (
            <Watchlist
              movies={watchlist}
              removeFromWatchlist={removeFromWatchlist}
            />
          )}
        </>
      )}
      {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      )}
      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
}

Navigation.propTypes = {
  setMovies: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  searchInputRef: PropTypes.object.isRequired,
};

export default Home;

function Navigation({ setMovies, query, setQuery, searchInputRef }) {
  useEffect(
    function () {
      async function fetchMovies() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        return;
      }

      fetchMovies();
    },
    [query, setMovies]
  );

  return (
    <header className={styles.header}>
      <button
        className={styles.logoContainer}
        onClick={() => console.log("Logo clicked")}
      >
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fbbed71bfde5bc61aa9af09ab8de4ceb80a9215577f0a8f44ec4371901be0319?apiKey=bc155cd4463f4c48a216b01c1991193c&"
          alt="Logo"
          className={styles.logo}
        />
        <h1 className={styles.logoText}>Media Hub</h1>
      </button>
      <nav className={styles.navigation}>
        <NavLink
          to="Home"
          className={styles.active}
        >
          Home
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Services
        </NavLink>
      </nav>
      <div className={styles.userControls}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          ref={searchInputRef} // Attach the ref to the input element
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d9ccd3c0f798dd4b0085cb65b3daa5df09d6f3bf7d588fa1f52b1bb56ba1816?apiKey=bc155cd4463f4c48a216b01c1991193c&"
          alt="User settings"
          className={styles.settingsIcon}
        />
      </div>
    </header>
  );
}

Navigation.propTypes = {
  setMovies: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  searchInputRef: PropTypes.object.isRequired,
};

function Toggle() {
  return (
    <section className={styles.contentSection}>
      <nav className={styles.navContainer}>
        <Link to="/MusicHome" className={styles.toggleContainer}>
          <div className={styles.navItem}>Music</div>
        </Link>
        <div className={styles.activeNavItem}>Movies</div>
      </nav>
    </section>
  );
}

function Watchlist({ movies, removeFromWatchlist }) {
  return (
    <section className={styles.watchlist}>
      <h2 className={styles.watchlistTitle}>Your Watchlist</h2>
      <ul className={styles.cardContainer}>
        {movies.map((movie) => (
          <li className={styles.card} key={movie.imdbID}>
            <img
              className={styles.cardImage}
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
            />
            <div className={styles.cardTitle}>{movie.Title}</div>
            <button
              className={styles.plusButton}
              onClick={() => removeFromWatchlist(movie.imdbID)}
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

Watchlist.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeFromWatchlist: PropTypes.func.isRequired,
};
