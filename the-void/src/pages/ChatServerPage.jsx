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
  //put message that is received in a div element
  const [messageReceived, setMessageReceived] = useState(<div></div>);
  //a que of messages that are already sent that are waiting to be shown
  const [messageQue, setMessageQue] = useState([]);
  //happens when form is submitted
  function sendMessage(e) {
    console.log("sendMessage activated");
    e.preventDefault();
    socket.emit("send_message", { name: name, message: message });
    //clear input field when message gets submitted
    document.getElementById("msgInput").value = "";
    //flip socket state just to get useEffect to fire
    setSocketState(!socketState);
  }
  const [socketState, setSocketState] = useState(true);
  //when socket gets a "receive_message" from express, show the message to everyone by pushing it to messageQue
  useEffect(() => {
    console.log("sending msg");
    socket.on("receive_message", (data) => {
      setMessageQue((messageQue) => [
        ...messageQue,
        <div id="messageReceived">
          {data.name}:{" "}
          <p style={{ fontWeight: "400", display: "inline" }}>{data.message}</p>
        </div>,
      ]);
    });
  }, [socketState]);
  //set up what message to show
  //the message that is displayed in the DOM
  const [showMsg, setShowMsg] = useState();
  useEffect(() => {
    console.log(messageQue.length, " length");
    console.log(messageQue, " que");
    //when messageQue is changed, show the first entry in messageQue array
    setShowMsg(messageQue[0]);
    //if messageQue.length > 0, every x seconds chop off first entry and show new first entry
    if (messageQue.length > 0) {
      setTimeout(() => {
        let messageQueCopy = messageQue;
        //cut off first 2 because for some reason it is adding the same thing twice when a user sends a message
        messageQueCopy.shift();
        messageQueCopy.shift();
        setMessageQue(messageQueCopy);
        setShowMsg(messageQue[0]);
        console.log(messageQue.length, " length");
        console.log(messageQue, " que");
        //need to make sure timer time is the same as css animation time for fade in/out
      }, 4000);
    }
  }, [messageQue]);
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
      <div id="space">
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>
      <div id="chatContainer">
        {showMsg}
        {/* <div id="messageReceived">
          Chad:
          <p
            style={{
              fontWeight: "400",
              display: "inline",
            }}
          >
            This is a long
          </p>
        </div> */}
        <form id="chatForm" onSubmit={(e) => sendMessage(e)}>
          <input
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            maxLength="20"
            id="msgInput"
          ></input>
          <button type="submit" className="btn-1">
            Submit Message
          </button>
          <button
            type="button"
            className="exitBtn"
            onClick={() => exitChatServer()}
          >
            Exit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatServerPage;
