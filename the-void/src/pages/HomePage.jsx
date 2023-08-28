import { React, useEffect, useState } from "react";

const HomePage = () => {
  const [name, setName] = useState();

  async function enterChatServer(e) {
    e.preventDefault();

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
      <div id="space">
        <div class="stars"></div>
        <div class="stars"></div>
        <div class="stars"></div>
        <div class="stars"></div>
        <div class="stars"></div>
      </div>
      <h1 id="the-void">The Void</h1>
      <h2 id="enter-name">Please Enter Your Name</h2>
      <form onSubmit={(e) => enterChatServer(e)}>
        <input
          placeholder="Name"
          className="nameInput"
          maxLength="16"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="btn-1" type="submit">
          Enter Chat Server
        </button>
      </form>
    </div>
  );
};

export default HomePage;

//NOTES

//click button
//button uses fetch to hit server telling it to add a user with a random token and the name that the user has typed in
//upon success, redicrect to /token/name (ex: /123456/Chad)
