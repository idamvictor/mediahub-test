import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./SearchResults.module.css";

function ImageCard({
  imageSrc,
  title,
  altText,
  onClick,
  addToWatchlist,
  movie,
}) {
  return (
    <div className={styles.card}>
      <img
        src={imageSrc}
        alt={altText}
        className={styles.cardImage}
        onClick={onClick}
      />
      <div className={styles.cardTitle}>{title}</div>
      <button
        onClick={() => addToWatchlist(movie)}
        className={styles.plusButton}
      >
        +
      </button>
    </div>
  );
}

ImageCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  addToWatchlist: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
};

export default function SearchResults({
  movies,
  onMovieClick,
  addToWatchlist,
  clearSearch,
}) {
  const navigate = useNavigate();

  const handleClick = (imdbID) => {
    onMovieClick(imdbID);
    navigate(`/MoviePage`);
  };

  const handleClose = () => {
    clearSearch();
    navigate(-1);
  };

  return (
    <div className={styles.searchResultContainer}>
      <header className={styles.header}>
        <h2 className={styles.resultsTitle}>Results</h2>
        <button onClick={handleClose} className={styles.closeButton}>
          X
        </button>
      </header>
      <main>
        <section className={styles.imageGallery}>
          {movies.map((movie) => (
            <ImageCard
              key={movie.imdbID}
              imageSrc={movie.Poster}
              title={movie.Title}
              altText={`${movie.Title} Poster`}
              onClick={() => handleClick(movie.imdbID)}
              addToWatchlist={addToWatchlist}
              movie={movie}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

SearchResults.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
    })
  ).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  addToWatchlist: PropTypes.func.isRequired,
  clearSearch: PropTypes.func.isRequired,
};
