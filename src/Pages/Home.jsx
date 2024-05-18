import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Home.module.css";
import netflixLogo from "../assets/netflixLogo.png";
import { useEffect, useState } from "react";
import SearcResults from "../components/SearchResults";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  return (
    <div>
      <Navigation
        movies={movies}
        setMovies={setMovies}
        query={query}
        setQuery={setQuery}
      />
      <Toggle />
      {query.length > 1 ? (
        <SearcResults movies={movies} />
      ) : (
        <>
          <RecommendationSection secTitle="Recommendations" movies={movies} query= 'interstellar' />
          <RecommendationSection secTitle="Continue Watching" movies={movies} query= 'inception'/>
          <RecommendationSection secTitle="My Watch list" movies={movies} query= 'batman'/>
        </>
      )}
    </div>
  );
}

Navigation.propTypes = {
  setMovies: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

const key = "cba680cd";

function Navigation({ setMovies, query, setQuery }) {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          // setIsLoading(true);
          // setError("");
          const res =
            await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}
        `);

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);

          // setIsLoading(false);
        } catch (err) {
          console.error(err.message);
          // setError(err.message);
        } finally {
          // setIsLoading(false);
        }
      }

      // if (query.length < 3) {
      //   setMovies([]);
      //   setError("");
      //   return;
      // }

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
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
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
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

function Toggle() {
  return (
    <>
      <section className={styles.contentSection}>
        <nav className={styles.navContainer}>
          <div className={styles.navItem}>Music</div>
          <div className={styles.activeNavItem}>Movies</div>
        </nav>
      </section>
    </>
  );
}

RecommendationSection.propTypes = {
  secTitle: PropTypes.string.isRequired,
  query: PropTypes.string,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function RecommendationSection({ secTitle, query }) {
  const [tempMovies, setTempMovies] = useState([]);
  const [tempQuery, setTempQuery] = useState(query);

  // setTempQuery(query)

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          // setIsLoading(true);
          // setError("");
          const res =
            await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${tempQuery}
        `);

          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");

          setTempMovies(data.Search);

          // setIsLoading(false);
        } catch (err) {
          console.error(err.message);
          // setError(err.message);
        } finally {
          // setIsLoading(false);
        }
      }

      // if (query.length < 3) {
      //   setMovies([]);
      //   setError("");
      //   return;
      // }

      fetchMovies();
    },
    [tempQuery, setTempMovies]
  );

  useEffect(() => {
    setTempQuery(query);
  }, [query]);


  return (
    <>
      <section className={styles.recommendationsContainer}>
        <header className={styles.header}>
          <h2 className={styles.headerTitle}>{secTitle}</h2>
          <Link to="" className={styles.seeAllLink} tabIndex="0">
            See all
          </Link>
        </header>
        <div className={styles.recommendationsGrid}>
          {tempMovies.map((movie) => (
            <RecommendationCard
              key={movie.imdbID}
              imgSrc={movie.Poster}
              title={movie.Title}
              genre={movie.Year}
              genreImg={netflixLogo}
            />
          ))}
        </div>
      </section>
    </>
  );
}

RecommendationCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  genre: PropTypes.string,
  genreImg: PropTypes.string,
};

function RecommendationCard({ imgSrc, title, genre, genreImg }) {
  return (
    <article className={styles.recommendationCard}>
      <img loading="lazy" src={imgSrc} className={styles.recommendationImage} />
      <section className={styles.recommendationContent}>
        <h3 className={styles.recommendationTitle}>{title}</h3>
        <div className={styles.genreContainer}>
          <span className={styles.genreLabel}>{genre}</span>
          <img loading="lazy" src={genreImg} className={styles.genreImage} />
        </div>
      </section>
    </article>
  );
}
