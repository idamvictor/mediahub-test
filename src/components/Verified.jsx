import Button from "./Button";
import styles from "./Verified.module.css";

export default function Verified() {
  return (
    <div className={styles.verificationBackground}>
      <section className={styles.mainSection}>
        <div className={styles.contentWrapper}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/17b96016fd38a90d57a4d07b61829eee940e53bb88b089075c7be7be6c7e6e8f?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
            alt="Verified Badge"
            className={styles.imageFallback}
          />
          <p className={styles.verifiedText}>Verified</p>
          <Button />
        </div>
      </section>{" "}
    </div>
  );
}
