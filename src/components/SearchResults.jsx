import PropTypes from "prop-types";
import styles from "./SearchResults.module.css";

ImageCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

function ImageCard({ imageSrc, title, altText }) {
  return (
    <div className={styles.card}>
      <img src={imageSrc} alt={altText} className={styles.cardImage} />
      <div className={styles.cardTitle}>{title}</div>
    </div>
  );
}

SearcResults.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Poster: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default function SearcResults({ movies }) {
  console.log(movies);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          {/* <div className={styles.logoContainer}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e7e61e94618bbebfb5190e2d1f23acc407d71b668c795ed779f0486dc86b4da?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
              alt="Logo"
              className={styles.logoImage}
            />
          </div>
          <h1 className={styles.pageTitle}>Search</h1> */}
        </div>
        <h2 className={styles.resultsTitle}>Results</h2>
      </header>
      <main>
        <section className={styles.imageGallery}>
          {movies.map((image) => (
            <ImageCard
              key={image.imdbID}
              imageSrc={image.Poster}
              title={image.Title}
              altText={image.alt}
            />
          ))}
        </section>
      </main>
    </>
  );
}

// Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg";
// Title: "Interstellar";
// Type: "movie";
// Year: "2014";
// imdbID: "tt0816692";
