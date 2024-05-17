import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Home.module.css";
import queenOfTears from "../assets/queenOfTears.png";
import netflixLogo from "../assets/netflixLogo.png";

export default function Home() {
  return (
    <div>
      <Navigation />
      <Toggle />
      <RecommendationSection secTitle="Recommendations" />
      <RecommendationSection secTitle="Continue Watching" />
      <RecommendationSection secTitle="My Watch list" />
    </div>
  );
}

function Navigation() {
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
          to="/"
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
        <div className={styles.userProfile}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb8cfeaac51aea68de15b0a78683e025e39fe695466e5e0e1de64221555e78af?apiKey=bc155cd4463f4c48a216b01c1991193c&"
            alt="User profile"
            className={styles.profileIcon}
          />
        </div>
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
  secTitle: PropTypes.string,
}

function RecommendationSection({ secTitle }) {
  const recommendations = [
    {
      imgSrc: queenOfTears,
      title: "True Beauty",
      genre: "Romance",
      genreImg: netflixLogo,
    },
    {
      imgSrc: queenOfTears,
      title: "Palm Springs",
      genre: "Romance",
      genreImg: netflixLogo,
    },
    {
      imgSrc: queenOfTears,
      title: "Palm Springs",
      genre: "Romance",
      genreImg: netflixLogo,
    },
    {
      imgSrc: queenOfTears,
      title: "Palm Springs",
      genre: "Romance",
      genreImg: netflixLogo,
    },
    {
      imgSrc: queenOfTears,
      title: "Palm Springs",
      genre: "Romance",
      genreImg: netflixLogo,
    },
    {
      imgSrc: queenOfTears,
      title: "Palm Springs",
      genre: "Romance",
      genreImg: netflixLogo,
    },
    {
      imgSrc: queenOfTears,
      title: "Palm Springs",
      genre: "Romance",
      genreImg: netflixLogo,
    },
    {
      imgSrc: queenOfTears,
      title: "Palm Springs",
      genre: "Romance",
      genreImg: netflixLogo,
    },
    {
      imgSrc: queenOfTears,
      title: "Palm Springs",
      genre: "Romance",
      genreImg: netflixLogo,
    },
  ];

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
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={index}
              imgSrc={rec.imgSrc}
              title={rec.title}
              genre={rec.genre}
              genreImg={rec.genreImg}
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
