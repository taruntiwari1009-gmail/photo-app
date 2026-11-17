import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders the photo gallery", () => {
  render(<App />);

  expect(screen.getByRole("heading", { name: "Photo Gallery" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "View Photo 1" })).toBeInTheDocument();
});

test("opens photo details and switches to another photo", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "View Photo 1" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Photo 1" })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "View Photo 2" }));
  expect(screen.getByRole("heading", { name: "Photo 2" })).toBeInTheDocument();
});

test("closes photo details with the Escape key", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "View Photo 1" }));
  fireEvent.keyDown(window, { key: "Escape" });

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
