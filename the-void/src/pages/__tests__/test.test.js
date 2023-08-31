// import { enableFetchMocks } from "jest-fetch-mock";
// enableFetchMocks();
import { render, screen, cleanup, getByTestId } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import HomePage from "../HomePage.jsx";

// beforeEach(() => {
//   fetchMock.doMock();
// });

test("should render home page", () => {
  render(<HomePage />);
  const container = screen.getByTestId("container");
  expect(container).toBeInTheDocument;
});

//test for entering chat server page
//run enterChatServer from homepage > const chatForm = screen.getByTestId("chatForm") > expect(chatForm).toBeInTheDocument;

test("entering ChatServerPage from HomePage", () => {
  // global.window = { location: { pathname: null } };
  fetch.mockResponse(JSON.stringify({ mockResponse: "12345" }));
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
  // expect(global.window.location.pathname).toContain("testName");
  expect(homeForm).toBeNull();
});
