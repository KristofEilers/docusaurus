import React from "react";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "@docusaurus/router";

const ProtectedWrapper = ({ children }) => {
  const { user, loading } = useAuth();

  // Ladezustand anzeigen, bis der Authentifizierungsstatus geladen ist
  if (loading) {
    return <div>Lade...</div>;
  }

  // Login-Seite nicht schützen
  if (typeof window !== "undefined" && window.location.pathname === "/login") {
    return <>{children}</>;
  }

  // Benutzer zur Login-Seite umleiten, wenn sie nicht eingeloggt sind
  if (!user) {
    return <Redirect to="/login" />;
  }

  // Inhalt anzeigen, wenn der Benutzer eingeloggt ist
  return <>{children}</>;
};

export default ProtectedWrapper;
