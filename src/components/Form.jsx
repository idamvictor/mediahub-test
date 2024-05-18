import styles from "./Form.module.css";
import FormItem from "./FormItem";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://data-be-2.onrender.com/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        navigate("/dashboard");
        // Handle successful registration (e.g., navigate to another page, show success message)
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Handle registration error (e.g., show error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error
    }
  };

  

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <FormItem
        label="Full Name"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e14c8a1f524b615dea79c06a22d816a10137dc7f61f57d044f5d0c1ef8b7eadd?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
        value={formData.full_name}
        onChange={handleChange}
      />
      <FormItem
        label="Email"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/9289fca467c502ecbb4d0187c2e60bc1e0fc55654d31c45c370420546d5031fa?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <FormItem
        label="Password"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/5d26047cded3a5802436f93e53fc4527404831dbbda31c1cbc8991bf6a5d03b3?apiKey=df44ca8e15de4475b0d7b182ebb1db7c&"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button />
    </form>
  );
}
