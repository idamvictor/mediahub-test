import styles from './Button.module.css'
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";


export default function Button({navigateTo}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateTo); // Replace with the target page route
  };

  return (
    <button type="submit" className={styles.submitButton} onClick={handleClick} >
      Sign Up
    </button>
  );
}

Button.propTypes = {
  navigateTo: PropTypes.string.isRequired,
};