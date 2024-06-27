import React, { useState } from "react";
import "./style.css";
import { useFirebase } from "../../context/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const navigate=useNavigate();
  const { loginUserWithEmailAndPassword } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUserWithEmailAndPassword(email, password);
      setError(null); // Clear error on successful login
      navigate("/");
      toast.success("Welcome to Wires And Cable Fabricators")
    } catch (error) {
      toast.error(error.message);
      setError(error.message); // Set error message on failure
    }
  };

  return (
    <div className="form-background">
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" 
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            name="password" required />
          </div>
          <button type="submit">Login</button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};
