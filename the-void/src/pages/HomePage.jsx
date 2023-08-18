import { React, useEffect, useState } from "react";

const HomePage = () => {
  const [name, setName] = useState();

  async function enterChatServer() {
    await fetch("/api/addUser", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ name: `${name}` }),
    }).then((response) =>
      response
        .json()
        .then((resJSON) => JSON.stringify(resJSON))
        .then((stringJSON) => JSON.parse(stringJSON))
        .then((parsedJSON) => {
          console.log(parsedJSON);
          window.location.href = `/${parsedJSON.insertId}/${name}`;
        })
    );
  }
  return (
    <div className="container">
      <h1 id="the-void">The Void</h1>
      <h2 id="enter-name">Please Enter Your Name</h2>
      <input
        placeholder="Name"
        className="nameInput"
        maxLength="16"
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button className="joinBtn" onClick={() => enterChatServer()}>
        Enter Chat Server
      </button>
    </div>
  );
};

export default HomePage;

//NOTES

//click button
//button uses fetch to hit server telling it to add a user with a random token and the name that the user has typed in
//upon success, redicrect to /token/name (ex: /123456/Chad)
