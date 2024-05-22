import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styles from "./SearchResults.module.css";
import { FaRegBookmark } from "react-icons/fa";

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
      <FaRegBookmark onClick={() => addToWatchlist(movie)}
        className={styles.watchlistButton} />
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
    <>
      <header className={styles.header}>
        <button onClick={handleClose} className={styles.closeButton}>
          X
        </button>
        <h2 className={styles.resultsTitle}>Results</h2>
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
    </>
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
