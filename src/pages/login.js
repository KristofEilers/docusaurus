import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  OAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "@docusaurus/router";
import "./login.css"; // Importiere die CSS-Datei für das Styling

const LoginPage = () => {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Microsoft-Login-Funktion mit Redirect
  const handleMicrosoftLogin = async () => {
    const provider = new OAuthProvider("microsoft.com");
    setError("");
    setLoading(true);

    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      setError("Microsoft Login fehlgeschlagen: " + err.message);
      setLoading(false);
    }
  };

  // Redirect-Ergebnis nach Anmeldung mit Microsoft verarbeiten
  useEffect(() => {
    const processRedirectResult = async () => {
      try {
        console.log("Versuche, getRedirectResult aufzurufen...");
        const result = await getRedirectResult(auth);
        console.log("Redirect-Ergebnis:", result);
        if (result) {
          console.log("Erfolgreich angemeldet mit Microsoft:", result.user);
        } else {
          console.log("Kein Redirect-Ergebnis vorhanden.");
        }
      } catch (err) {
        console.error("Fehler beim Redirect:", err);
        if (err.code === "auth/account-exists-with-different-credential") {
          const pendingCred = err.credential;
          const email = err.customData.email;

          setError(
            `Diese E-Mail-Adresse (${email}) ist bereits mit einem anderen Anbieter verknüpft. Bitte melde dich zuerst mit der ursprünglichen Methode an.`
          );

          try {
            const password = prompt(
              "Bitte gib dein Passwort ein, um die Konten zu verknüpfen:"
            );
            if (password) {
              const emailUser = await signInWithEmailAndPassword(
                auth,
                email,
                password
              );
              await linkWithCredential(emailUser.user, pendingCred);
              console.log("Konten erfolgreich verknüpft!");
            } else {
              setError(
                "Passwort ist erforderlich, um die Konten zu verknüpfen."
              );
            }
          } catch (linkErr) {
            setError("Fehler beim Verknüpfen der Konten: " + linkErr.message);
          }
        } else {
          setError("Fehler beim Redirect: " + err.message);
        }
      }
    };

    processRedirectResult();
  }, []);

  // E-Mail/Passwort-Login-Funktion
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Login fehlgeschlagen: " + err.message);
    }
    setLoading(false);
  };

  if (user) {
    console.log("Benutzer eingeloggt:", user);
    return <Redirect to="/" />;
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Willkommen zurück!</h2>
        <p className="login-subtitle">
          Bitte melde dich mit deinen Zugangsdaten an
        </p>

        {/* E-Mail und Passwort-Formular */}
        <form className="login-form" onSubmit={handleEmailLogin}>
          <div className="input-group">
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              placeholder="Deine E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Passwort</label>
            <input
              type="password"
              id="password"
              placeholder="Dein Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? "Anmelden..." : "Anmelden"}
          </button>
        </form>

        <div className="divider">oder</div>

        {/* Microsoft Login-Button */}
        <button
          className="microsoft-login-button"
          onClick={handleMicrosoftLogin}
          disabled={loading}
        >
          <span className="microsoft-logo" />
          Mit Microsoft anmelden
        </button>

        {error && <p className="login-error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
