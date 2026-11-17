import { useEffect } from "react";

const Modal = ({ data, content, setSelectedContent }) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setSelectedContent(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
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
        className="photo-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-modal-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="photo-modal-title">{name}</h2>
            <p>{description}</p>
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
            <img src={url} alt={name} />
          </div>
          <dl className="photo-metadata">
            <div>
              <dt>Date</dt>
              <dd>{date}</dd>
            </div>
            <div>
              <dt>File type</dt>
              <dd>{type}</dd>
            </div>
          </dl>
        </div>

        <div className="thumbnail-strip" aria-label="Choose another photo">
          {data.map((imageData) => (
            <button
              type="button"
              key={imageData.name}
              className={imageData.name === name ? "thumbnail active" : "thumbnail"}
              onClick={() => setSelectedContent(imageData)}
              aria-label={`View ${imageData.name}`}
              aria-pressed={imageData.name === name}
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
