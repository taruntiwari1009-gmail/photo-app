import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("opens a photo in the accessible details modal", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "Open Photo 1" }));

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Photo 1" })).toBeInTheDocument();
});

test("closes the photo modal with Escape", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Open Photo 2" }));

  fireEvent.keyDown(window, { key: "Escape" });

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("switches photos from the thumbnail strip", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Open Photo 1" }));
  fireEvent.click(screen.getByRole("button", { name: "View Photo 2" }));

  expect(screen.getByRole("heading", { name: "Photo 2" })).toBeInTheDocument();
});
