import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../style/form.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(username, password, email).then((res) => {
      if (res?.success) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(res?.error || "Registration failed");
      }
    });
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onInput={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onInput={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onInput={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
