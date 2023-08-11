import { useState, useEffect } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./normalize.css";
import "./App.css";
import HomePage from "./pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<HomePage />}></Route>)
);

function App({ routes }) {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
