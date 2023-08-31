import { render, screen, cleanup } from "@testing-library/react";
import HomePage from "../HomePage.jsx";

test("should render home page", () => {
  render(<HomePage />);
  const container = screen.getByTestId("container");
  expect(container).toBeInTheDocument;
});

// test("input field should reflect key pressed", () => {
//     render(<HomePage/>);
//     const nameInput = screen.getByTestId("nameInput");

// })
