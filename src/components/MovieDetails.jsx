import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MovieDetails.module.css";

function MovieDetails({ movie, onClose }) {
  const navigate = useNavigate();
  const handleNavigateToMoviePage = () => {
    navigate("/MoviePage");
    onClose(); // Close the modal after navigation
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.detailsContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <img
          src={movie.Poster}
          alt={`${movie.Title} poster`}
          className={styles.poster}
          onClick={handleNavigateToMoviePage}
        />
        <div className={styles.info}>
          <h2>{movie.Title}</h2>
          <p>
            <strong>Year:</strong> {movie.Year}
          </p>
          <p>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <div className={styles.buttonContainer}>
            {/* Use Link component for navigation */}
            <Link to={`/movies/${movie.id}`} className={styles.watchNowButton}>
              Watch Now
            </Link>
              <button
                className={styles.watchListButton}
                
              >
                Add to Watch List
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    Title: PropTypes.string,
    Year: PropTypes.string,
    Genre: PropTypes.string,
    Plot: PropTypes.string,
    Director: PropTypes.string,
    Actors: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MovieDetails;


