import { useState, useEffect } from "react";
import { Route, Routes, Router } from "react-router-dom";
//css
import "./normalize.css";
import "./App.css";
import "./stars.css";
//fonts
import "../space-font/Space-lmX5.ttf";
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
