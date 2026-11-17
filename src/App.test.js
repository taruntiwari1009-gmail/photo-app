import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("opens a photo in the accessible details modal", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: "Open Photo 1" }));

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Photo 1" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Close photo details" })).toHaveFocus();
});

test("closes the photo modal with Escape and restores focus to the gallery card", () => {
  render(<App />);
  const photoCard = screen.getByRole("button", { name: "Open Photo 2" });
  fireEvent.click(photoCard);

  fireEvent.keyDown(window, { key: "Escape" });

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(photoCard).toHaveFocus();
});

test("keeps keyboard focus inside the dialog", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Open Photo 1" }));

  const closeButton = screen.getByRole("button", { name: "Close photo details" });
  const lastThumbnail = screen.getByRole("button", { name: "Select Photo 9 thumbnail" });

  lastThumbnail.focus();
  fireEvent.keyDown(window, { key: "Tab" });
  expect(closeButton).toHaveFocus();

  fireEvent.keyDown(window, { key: "Tab", shiftKey: true });
  expect(lastThumbnail).toHaveFocus();
});

test("switches photos from the thumbnail strip", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Open Photo 1" }));
  fireEvent.click(screen.getByRole("button", { name: "Select Photo 2 thumbnail" }));

  expect(screen.getByRole("heading", { name: "Photo 2" })).toBeInTheDocument();
});

test("closes the photo modal when the backdrop is clicked", () => {
  render(<App />);
  fireEvent.click(screen.getByRole("button", { name: "Open Photo 1" }));

  fireEvent.mouseDown(screen.getByRole("presentation"));

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
