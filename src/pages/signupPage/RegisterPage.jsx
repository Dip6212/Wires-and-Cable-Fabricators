import React, { useState } from "react";
import { useFirebase } from "../../context/firebase";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate=useNavigate();
  const firebase=useFirebase();
  console.log("this is firebase",firebase);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      // Handle user signup
      await firebase.signupUserWithEmailPassword(formData.email, formData.password);
      // Store user data in the database
      await firebase.putData("/users/" + formData.name, {
        email: formData.email,
        password: formData.password,
      });

      
      console.log("User signed up and data saved successfully!");
      toast.success(`Welcome ${formData.name}`);
      navigate("/");
    } catch (error) {
      console.error("Error signing up or saving data: ", error);
      toast.error(error.message)
    }
  };

  return (
    <div className="form-background">
      <div className="form-container">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="submit-btn-group">

          <button type="submit">Sign Up</button>
          <button onClick={firebase.signupWithGoogle} type="submit">Sign Up with Google</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
