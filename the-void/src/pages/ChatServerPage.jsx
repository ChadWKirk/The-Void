import { React, useEffect, useState } from "react";

const ChatServerPage = () => {
  return (
    <div className="container">
      <h1 id="the-void">The Void</h1>
      <h2 id="enter-name">Please Enter Your Name</h2>
      <input placeholder="Name" className="nameInput" maxLength="16"></input>
      <a className="aBtn" href="/token/name">
        Enter Chat Server
      </a>
    </div>
  );
};

export default ChatServerPage;
