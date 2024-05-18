import Button from "./Button";
import styles from "./Modal.module.css";

export default function Modal() {
  return (
    <main>
      <div className={styles.verificationBackground}>
        <section className={styles.verificationContainer}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/724e3129c85906179baebd9a0e2b3e4271dfcf93f5d94bb4f52799c79eb7a475?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
            alt="Company Logo"
            className={styles.logo}
          />
          <div className={styles.innerContainer}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/addedbb2b506c55a7622982c27e3b427ec6e77caa34bbc5a2bfdc6bd0fbe7fb1?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
              alt="Verification Illustration"
              className={styles.illustration}
            />
            <h1 className={styles.title}>Verify its you.</h1>
            <p className={styles.instructions}>
              We sent verification code to mariaj@gmail.com. To verify your
              email address, please check your inbox and enter the code below.
            </p>
            <form className={styles.verificationForm}>
              <input
                className={styles.input}
                type="text"
                id="verificationCode"
                placeholder="Enter 4 digits code"
              />
              <Button />
            </form>
            <p className={styles.resendPrompt}>
              Didn’t receive an email?{" "}
              <a href="/" className={styles.tryAgainLink}>
                Try Again
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
