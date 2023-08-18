import { React, useEffect, useState } from "react";

const ChatServerPage = () => {
  return (
    <div className="container">
      <input placeholder="Message" className="nameInput" maxLength="16"></input>
      <button>Submit Message</button>
    </div>
  );
};

export default ChatServerPage;
