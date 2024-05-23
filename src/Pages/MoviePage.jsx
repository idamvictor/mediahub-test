

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import PropTypes from "prop-types";
// import styles from "./MoviePage.module.css";

// function MoviePage({ selectedMovieId }) {
//   const { id } = useParams(); // Get the movie ID from the URL params if needed
//   const [movie, setMovie] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(`http://www.omdbapi.com/?apikey=cba680cd&i=${selectedMovieId || id}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch movie details");
//         }
//         const data = await response.json();
//         setMovie(data);
//         console.log(data)
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMovieDetails();
//   }, [selectedMovieId, id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!movie) {
//     return <div>Movie not found</div>;
//   }

//   return (
//     <>
//       <section className={styles.container}>
//         <img
//           loading="lazy"
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/bd4c66db982b1b259a256b918ecdb3e6795b3a33464849a0d1a989906de59e06?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
//           className={styles.logo}
//           alt="Movie logo"
//         />
//         <div className={styles.mainContent}>
//           <div className={styles.hero}>
//             <img
//               loading="lazy"
//               src={movie.Poster}
//               className={styles.backgroundImage}
//               alt=""
//             />
//           </div>
//           <h1 className={styles.movieTitle}>{movie.Title}</h1>
//           <p className={styles.movieGenre}>{movie.Genre}</p>
//           <p className={styles.movieDescription}>{movie.Plot}</p>
//           <div className={styles.actions}>
//             <button className={styles.watchNowButton}>Watch Now</button>
//             <button className={styles.addToWatchlistButton}>Add to Watchlist</button>
//           </div>
//           <h2 className={styles.additionalContentTitle}>Other parts</h2>
//           <WatchSection title="Trailer : Movie" genre="Genre" />
//           <WatchSection title="Part 1" genre="Genre" />
//         </div>
//       </section>
//     </>
//   );
// }

// MoviePage.propTypes = {
//   selectedMovieId: PropTypes.string,
// };

// export default MoviePage;

// function WatchSection({ title, genre }) {
//   return (
//     <div className={styles.watchSection}>
//       <img
//         loading="lazy"
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/a425790046687f15377f21ca0d5593167f5877ddd3a5aa71d18b4f850ff04e99?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
//         className={styles.sectionImage}
//         alt={`${title} cover`}
//       />
//       <div className={styles.sectionDetails}>
//         <div className={styles.title}>{title}</div>
//         <div className={styles.genre}>{genre}</div>
//       </div>
//     </div>
//   );
// }

// WatchSection.propTypes = {
//   title: PropTypes.string.isRequired,
//   genre: PropTypes.string.isRequired,
// };


//=======================================================================

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./MoviePage.module.css";

MoviePage.propTypes = {
  selectedMovieId: PropTypes.string,
  addToWatchlist: PropTypes.func.isRequired,
};

function MoviePage({ selectedMovieId, addToWatchlist }) {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://www.omdbapi.com/?apikey=cba680cd&i=${selectedMovieId || id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        const data = await response.json();
        setMovie(data);
        fetchRelatedMovies(data.Genre.split(",")[0]); // Fetch related movies based on the first genre
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedMovies = async (genre) => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=cba680cd&s=${genre}&type=movie`);
        if (!response.ok) {
          throw new Error("Failed to fetch related movies");
        }
        const data = await response.json();
        if (data.Response === "True") {
          setRelatedMovies(data.Search);
        }
      } catch (error) {
        console.error("Error fetching related movies:", error);
      }
    };

    fetchMovieDetails();
  }, [selectedMovieId, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <>
      <section className={styles.container}>
        <button className={styles.closeButton}> x </button>
        <div className={styles.mainContent}>
          <div className={styles.hero}>
            <img
              loading="lazy"
              src={movie.Poster}
              className={styles.backgroundImage}
              alt={movie.Title}
            />
          </div>
          <h1 className={styles.movieTitle}>{movie.Title}</h1>
          <p className={styles.movieGenre}>{movie.Genre}</p>
          <p className={styles.movieDescription}>{movie.Plot}</p>
          {/* <div className={styles.actions}>
            <button className={styles.watchNowButton}>Watch Now</button>
            <button className={styles.addToWatchlistButton} onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
          </div> */}
        </div>
      </section>

      <section className={styles.relatedMoviesContainer}>
        <h2 className={styles.relatedMoviesTitle}>Related Movies</h2>
        <div className={styles.relatedMoviesGrid}>
          {relatedMovies.map((relatedMovie) => (
            <div key={relatedMovie.imdbID} className={styles.relatedMovieCard}>
              <img
                loading="lazy"
                src={relatedMovie.Poster}
                alt={relatedMovie.Title}
                className={styles.relatedMoviePoster}
              />
              <h3 className={styles.relatedMovieTitle}>{relatedMovie.Title}</h3>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

MoviePage.propTypes = {
  selectedMovieId: PropTypes.string,
  addToWatchlist: PropTypes.func.isRequired,
};

export default MoviePage;
