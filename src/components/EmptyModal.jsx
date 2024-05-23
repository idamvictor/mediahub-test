import styles from "./EmptyModal.module.css";
import PropTypes from "prop-types";

function EmptyModal({ focusSearchBar }) {
  return (
    <section className={styles.container}>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/932ff3c495933030162484d1169bf40db5a72bcc058bc25ecc387612cd5cad66?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
        alt="Linked connection illustration"
        className={styles.image}
      />
      <h2 className={styles.heading}>There’s nothing to see here</h2>
      <p className={styles.description}>
        You have no Linked connections. Not to worry, You can add manually!
      </p>
      <button className={styles.button} onClick={focusSearchBar}>
        Add Manually
      </button>
    </section>
  );
}

EmptyModal.propTypes = {
  focusSearchBar: PropTypes.func.isRequired,
};

export default EmptyModal;
