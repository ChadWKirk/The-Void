import { React, useEffect, useState } from "react";

const NotFoundPage = () => {
  return (
    <div className="container">
      <h1>404</h1>
      <div style={{ width: "100%" }}>
        <div
          style={{
            height: "0",
            paddingBottom: "19.70833333333333%",
            position: "relative",
            margin: "auto",
            width: "100%",
            maxWidth: "480px",
          }}
        >
          <iframe
            allowfullscreen=""
            frameBorder="0"
            height="100%"
            src="https://giphy.com/embed/GZcT1Q6C4Sd5vZSnQY/video"
            style={{ left: "0", position: "absolute", top: "0" }}
            width="100%"
          ></iframe>
        </div>
      </div>
      <a href="/" style={{ color: "White", marginTop: "2rem" }}>
        Return Home
      </a>
    </div>
  );
};

export default NotFoundPage;
