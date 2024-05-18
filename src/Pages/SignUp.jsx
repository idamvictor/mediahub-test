import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import Logo from "../components/Logo";
import Form from "../components/Form";

export default function SignUp() {
  return (
    <main className={styles.mainContainer}>
      <Logo />
      <h1 className={styles.heading}>Let’s get you started</h1>
      <p className={styles.subheading}>
        Become a MediaHubber today and Keep track of all your Media consumption
      </p>
      <Form />
      <p className={styles.orText}>Or</p>
      <section className={styles.socialSection}>
        <div className={styles.socialIconContainer}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/6a564c30640f971d4dec88f8b4b115b3648ad32253564592b5094e7c9d795794?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
            className={styles.socialIcon}
            alt="Sign up with Google"
          />
        </div>
        <div className={styles.socialIconContainer}>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5220ac6808577307483f4c6309ba82b2f918bee7db497bec7b6c16a4295cbe5a?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
            className={styles.socialIcon}
            alt="Sign up with Facebook"
          />
        </div>
      </section>
      <p className={styles.signinText}>
        Already have an account? <Link to="">Sign in</Link>
      </p>
    </main>
  );
}




