import { React, useEffect, useState } from "react";

const ChatServerPage = () => {
  useEffect(() => {
    async function AddName() {
      await fetch("/api/test", {
        METHOD: "GET",
        headers: { "Content-type": "Application/json" },
        body: "TestName",
      }).then((response) => {
        console.log(response);
      });
    }
    AddName();
  }, []);
  return (
    <div className="container">
      <input placeholder="Message" className="nameInput" maxLength="16"></input>
      <button>Submit Message</button>
    </div>
  );
};

export default ChatServerPage;
