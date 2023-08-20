import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//socket.io
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const ChatServerPage = () => {
  let { id } = useParams();
  let { name } = useParams();
  useEffect(() => {
    //if id in url is not a number
    if (isNaN(id)) {
      window.location.href = `/nouserfound`;
    }

    async function checkUserInUrl() {
      await fetch("/api/checkUser", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id: `${id}`, name: `${name}` }),
      }).then((response) =>
        response
          .json()
          .then((resJSON) => JSON.stringify(resJSON))
          .then((stringJSON) => JSON.parse(stringJSON))
          .then((parsedJSON) => {
            console.log(parsedJSON);
            //if name and id don't match to an existing user in database
            if (parsedJSON.length == 0) {
              window.location.href = `/nouserfound`;
            } else {
              if (parsedJSON[0].name !== name) {
                window.location.href = `/nouserfound`;
              }
            }
          })
      );
    }
    //if id in url is a number
    if (!isNaN(id)) {
      checkUserInUrl();
    }
  }, []);
  //create message from input field
  const [message, setMessage] = useState();
  //when socket gets a "receive_message" from express, show the message to everyone
  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);
  function sendMessage() {
    socket.emit("send_message", { message: message });
    //clear input field when message gets submitted
    document.getElementById("msgInput").value = "";
  }
  //when user exits server, delete the user from database
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
      <form onSubmit={sendMessage}>
        <input
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          className="nameInput"
          maxLength="16"
          id="msgInput"
        ></input>
        <button type="submit">Submit Message</button>
      </form>

      <button onClick={() => exitChatServer()}>Exit</button>
    </div>
  );
};

export default ChatServerPage;
