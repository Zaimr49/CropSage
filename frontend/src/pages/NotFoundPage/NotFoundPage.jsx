import React from "react";
import MatrixParallax from "react-matrix-parallax";

const NotFoundPage = () => (
  <React.Fragment>
    <MatrixParallax color="#1a9c1a" backgroundColor="white">
      <div style={{ fontSize: "1.7rem" }}>
        <h1>404</h1>
        <h3 style={{ maxWidth: "100vw" }}>Page Not Found</h3>
      </div>
    </MatrixParallax>
  </React.Fragment>
);

export default NotFoundPage;
