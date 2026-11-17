import { useEffect, useRef } from "react";

const FOCUSABLE_ELEMENTS =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Modal = ({ data, content, setSelectedContent }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeButton = dialogRef.current?.querySelector(".modal-close");
    closeButton?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setSelectedContent(null);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll(FOCUSABLE_ELEMENTS)
      );
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === "function") {
        previouslyFocused.focus();
      }
    };
  }, [setSelectedContent]);

  if (!content) return null;

  const { name, url, description, date, type } = content;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) setSelectedContent(null);
      }}
    >
      <section
        ref={dialogRef}
        className="photo-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-modal-title"
        aria-describedby={description ? "photo-modal-description" : undefined}
      >
        <div className="modal-header">
          <div>
            <h2 id="photo-modal-title">{name}</h2>
            {description && <p id="photo-modal-description">{description}</p>}
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={() => setSelectedContent(null)}
            aria-label="Close photo details"
          >
            ×
          </button>
        </div>

        <div className="modal-details">
          <div className="modal-image-panel">
            <img src={url} alt={name || "Selected gallery photo"} />
          </div>
          <dl className="photo-metadata">
            <div>
              <dt>Date</dt>
              <dd>{date || "Not provided"}</dd>
            </div>
            <div>
              <dt>File type</dt>
              <dd>{type || "Not provided"}</dd>
            </div>
          </dl>
        </div>

        <div className="thumbnail-strip" aria-label="Choose another photo">
          {data.map((imageData, index) => (
            <button
              type="button"
              key={imageData.url + imageData.name}
              className={imageData.name === name ? "thumbnail active" : "thumbnail"}
              onClick={() => setSelectedContent(imageData)}
              aria-label={`Select ${imageData.name || `photo ${index + 1}`} thumbnail`}
              aria-current={imageData.name === name ? "true" : undefined}
            >
              <img src={imageData.url} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Modal;
