// import { enableFetchMocks } from "jest-fetch-mock";
// enableFetchMocks();
import { render, screen, cleanup, getByTestId } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import HomePage from "../HomePage.jsx";

Object.defineProperty(window, "location", {
  writable: true,
  value: { assign: jest.fn() },
});

// beforeEach(() => {
//   fetchMock.doMock();
// });

test("should render home page", () => {
  render(<HomePage />);
  const container = screen.getByTestId("container");
  expect(container).toBeInTheDocument;
});

test("entering ChatServerPage from HomePage", () => {
  global.window = { location: { pathname: "http://127.0.0.1:5173/" } };
  fetch.mockResponse(JSON.stringify({ insertId: "1" }));
  render(<HomePage />);
  const enterChatServer = jest.fn();
  const homeForm = screen.getByTestId("homeForm");
  const nameInput = screen.getByTestId("nameInput");
  const inputValue = "testName";
  fireEvent.change(nameInput, {
    target: { value: inputValue },
  });
  // expect(screen.getByDisplayValue("testName")).toBeInTheDocument;
  fireEvent.submit(homeForm);
  expect(enterChatServer).toBeCalled;
  expect(global.window.location.pathname).toContain("testName");
  // expect(homeForm).toBeNull();
  // console.log(global.location);
});
