import PropTypes from "prop-types";
import styles from './FormItem.module.css'

FormItem.propTypes = {
  label: PropTypes.string.isRequired,
  iconSrc: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,

};

export default function FormItem({ label, iconSrc, type = "text", value, onChange }) {
  return (
    <div className={styles.formItem}>
       {/* <label className={styles.label} htmlFor={label}>
        {label}
      </label> */}
      <input
        className={styles.input}
        type={type}
        id={label}
        placeholder={label}
        aria-label={label}
        value={value}
        onChange={onChange}
        name={label.replace(" ", "_").toLowerCase()}
      />
      <img src={iconSrc} className={styles.icon} alt="" />
    </div>
  );
}

