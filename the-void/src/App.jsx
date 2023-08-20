import { useState, useEffect } from "react";
import { Route, Routes, Router } from "react-router-dom";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");
//css
import "./normalize.css";
import "./App.css";
//pages
import HomePage from "./pages/HomePage";
import ChatServerPage from "./pages/ChatServerPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<NotFoundPage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/:id/:name" element={<ChatServerPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
