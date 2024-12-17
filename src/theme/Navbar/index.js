import React, { useState } from "react";
import OriginalNavbar from "@theme-original/Navbar";
import { useAuth } from "../../context/AuthContext";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import "./customNavbar.css";

export default function Navbar(props) {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowDropdown(false);
    } catch (err) {
      setError("Login fehlgeschlagen: " + err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <OriginalNavbar {...props} />
      <div className="navbar__login">
        {user ? (
          <button className="custom-login-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button
            className="custom-login-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Login
          </button>
        )}
        {showDropdown && !user && (
          <div className="custom-login-dropdown">
            <form className="custom-login-form" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            {error && <p className="custom-login-error">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
