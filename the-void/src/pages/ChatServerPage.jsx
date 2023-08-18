import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChatServerPage = () => {
  let { id } = useParams();
  async function exitChatServer() {
    await fetch("/api/removeUser", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: `${id}` }),
    }).then((response) => {
      console.log(response);
      window.location.href = `/`;
    });
  }
  return (
    <div className="container">
      <input placeholder="Message" className="nameInput" maxLength="16"></input>
      <button>Submit Message</button>
      <button onClick={() => exitChatServer()}>Exit</button>
    </div>
  );
};

export default ChatServerPage;
