import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./normalize.css";
import "./App.css";

function App() {
  useEffect(() => {
    async function testGet() {
      await fetch("/", {
        method: "GET",
        headers: { "Content-type": "application/json" },
      }).then((response) => console.log("response"));
    }
    testGet();
  }, []);
  return (
    <div className="container">
      <h1 id="the-void">The Void</h1>
      <h2 id="enter-name">Please Enter Your Name</h2>
      <input placeholder="Name" className="nameInput" maxLength="16"></input>
      <a className="aBtn">Enter Chat Server</a>
    </div>
  );
}

export default App;
