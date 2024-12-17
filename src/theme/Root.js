import React from "react";
import { AuthProvider } from "../context/AuthContext";
import OriginalRoot from "@theme-original/Root";
import ProtectedWrapper from "../components/ProtectedWrapper";

export default function Root(props) {
  return (
    <AuthProvider>
      <ProtectedWrapper>
        <OriginalRoot {...props} />
      </ProtectedWrapper>
    </AuthProvider>
  );
}
