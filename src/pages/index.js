import React from "react";
import Layout from "@theme/Layout";

const HomePage = () => {
  return (
    <Layout title="Willkommen" description="Willkommen auf dem Portal">
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h1>Willkommen beim Portal</h1>
        <p>Bitte logge dich ein, um Zugang zu den Inhalten zu erhalten.</p>
      </div>
    </Layout>
  );
};

export default HomePage;
