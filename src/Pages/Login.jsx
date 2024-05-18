import Logo from "../components/Logo";
import styles from "./Login.module.css";
import FormItem from "../components/FormItem.jsx";
import Button from "../components/Button";
import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    full_name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://data-be-2.onrender.com/api/v1/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful", data);
        // Handle successful registration (e.g., navigate to another page)
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <main>
      <Logo />
      <h1 className={styles.heading}>Let’s get you started</h1>
      <p className={styles.subheading}>
        Become a MediaHubber today and Keep track of all your Media consumption
      </p>
      <form onSubmit={handleSubmit}>
        <FormItem
          label="Full Name"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e14c8a1f524b615dea79c06a22d816a10137dc7f61f57d044f5d0c1ef8b7eadd?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
          value={formData.full_name}
          onChange={handleChange}

        />
        <FormItem
          label="Password"
          iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e14c8a1f524b615dea79c06a22d816a10137dc7f61f57d044f5d0c1ef8b7eadd?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
          value={formData.password}
          onChange={handleChange}
        />
        <Button navigateTo="/dashboard"/>
      </form>
    </main>
  );
}

export default Login;
