import PropTypes from "prop-types";
import { useEffect, useState, useRef } from "react";
import styles from "./MusicHome.module.css";
import { Link, NavLink } from "react-router-dom";

//==================================== Music Home  ==========================================
export default function MusicHome() {
  const [musicData, setMusicData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [playlist, setPlaylist] = useState(
    JSON.parse(localStorage.getItem("playlist")) || []
  );
  const [showMessage, setShowMessage] = useState(false);
  const searchInputRef = useRef(null);

  const fetchMusic = async (searchQuery) => {
    const url = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(
      searchQuery
    )}&type=multi&offset=0&limit=10&numberOfTopResults=5`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "06d6087b29msh8a43894100a519dp1e200ajsn020f8f4b76fb",
        "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
      },
    };

    try {
      setLoading(true);
      const response = await fetch(url, options);
      const result = await response.json();
      setMusicData(result.albums.items);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.length >= 2) {
      fetchMusic(query);
    }
  };

  const focusSearchInput = () => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const addToPlaylist = (album) => {
    setPlaylist([...playlist, album]);
    localStorage.setItem("playlist", JSON.stringify([...playlist, album]));
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const removeFromPlaylist = (album) => {
    const updatedPlaylist = playlist.filter(
      (item) => item.data.uri !== album.data.uri
    );
    setPlaylist(updatedPlaylist);
    localStorage.setItem("playlist", JSON.stringify(updatedPlaylist));
  };

  useEffect(() => {
    if (query.length >= 2) {
      fetchMusic(query);
    } else {
      setMusicData([]);
    }
  }, [query]);

  return (
    <div className={styles.mainContainer}>
      <Navigation
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        searchInputRef={searchInputRef}
      />
      <Toggle />

      {loading && <p>Loading...</p>}
      {error && <p>Error fetching music data: {error.message}</p>}
      {!loading &&
        !error &&
        musicData.length === 0 &&
        playlist.length === 0 && (
          <EmptyModal focusSearchInput={focusSearchInput} />
        )}
      <SearchResult musicData={musicData} addToPlaylist={addToPlaylist} />
      {playlist.length > 0 && (
        <Playlist playlist={playlist} removeFromPlaylist={removeFromPlaylist} />
      )}
      {showMessage && (
        <div className={styles.messageContainer}>
          <p className={styles.message}>Added to playlist!</p>
        </div>
      )}
    </div>
  );
}

//==================================== Navigation  ==========================================
Navigation.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchInputRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

function Navigation({ query, setQuery, handleSearch, searchInputRef }) {
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
        <NavLink to="/" exact className={styles.active}>
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
        <form onSubmit={handleSearch}>
          <input
            className={styles.input}
            ref={searchInputRef}
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
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

//==================================== Toggle  ==========================================
function Toggle() {
  return (
    <section className={styles.contentSection}>
      <nav className={styles.navContainer}>
        <div className={styles.activeNavItem}>Music</div>
        <Link to="/" className={styles.toggleContainer}>
          <div className={styles.navItem}>Movies</div>
        </Link>
      </nav>
    </section>
  );
}

EmptyModal.propTypes = {
  focusSearchInput: PropTypes.func.isRequired,
};

//==================================== Empty Modal ==========================================

function EmptyModal({ focusSearchInput }) {
  const handleAddManuallyClick = () => {
    focusSearchInput();
  };

  return (
    <section className={styles.container}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/932ff3c495933030162484d1169bf40db5a72bcc058bc25ecc387612cd5cad66?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
        alt="Linked connection illustration"
        className={styles.image}
      />
      <h2 className={styles.heading}>There&rsquo;s nothing to see here</h2>
      <p className={styles.description}>
        You have no Linked connections. Not to worry, You can add manually!
      </p>
      <button className={styles.button} onClick={handleAddManuallyClick}>
        Add Manually
      </button>
    </section>
  );
}

// SearchResult.propTypes = {
//   musicData: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       // Add other properties of the music object as needed
//     })
//   ).isRequired,
//   addToPlaylist: PropTypes.func.isRequired,
// };

//==================================== Search Result  ==========================================

const SearchResult = ({ musicData, addToPlaylist }) => (
  <div className={styles.musicList}>
    {musicData.map((album) => (
      <div key={album.data.uri} className={styles.album}>
        <div className={styles.imageTitleContainer}>
          <img
            src={album.data.coverArt.sources[0].url}
            alt={album.data.name}
            className={styles.albumImage}
          />
          <p className={styles.albumName}>{album.data.name}</p>
        </div>
        <div className={styles.artistButtonContainer}>
          <p className={styles.albumArtist}>
            {album.data.artists.items[0].profile.name}
          </p>
          <button
            onClick={() => addToPlaylist(album)}
            className={styles.plusButton}
          >
            +
          </button>
        </div>
      </div>
    ))}
  </div>
);

// Playlist.propTypes = {
//   playlist: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//       title: PropTypes.string.isRequired,
//       // Add other properties of the playlist item as needed
//     })
//   ).isRequired,
//   removeFromPlaylist: PropTypes.func.isRequired,
// };

//==================================== PlayList  ==========================================
const Playlist = ({ playlist, removeFromPlaylist }) => (
  <>
    <h2 className={styles.playlistHeader}>My Playlist</h2>
    <div className={styles.musicList}>
      {playlist.map((album) => (
        <div className={styles.album} key={album.data.uri}>
          <div className={styles.imageTitleContainer}>
            <img
              src={album.data.coverArt.sources[0].url}
              alt={album.data.name}
              className={styles.albumImage}
            />
            <p className={styles.albumName}>{album.data.name}</p>
          </div>
          <button
            className={styles.plusButton}
            onClick={() => removeFromPlaylist(album)}
          >
            -
          </button>
        </div>
      ))}
    </div>
  </>
);
