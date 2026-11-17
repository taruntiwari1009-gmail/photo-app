import { useEffect } from "react";

const Modal = ({ data, content, onSelect, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!content) return null;

  const { name, url, description, date, type } = content;

  return (
    <div
      style={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        style={styles.modalContent}
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-modal-title"
      >
        <header style={styles.modalHeader}>
          <h2 id="photo-modal-title" style={styles.modalTitle}>{name}</h2>
          <button
            type="button"
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close photo details"
          >
            ×
          </button>
        </header>

        <div style={styles.detailsLayout}>
          <div style={styles.photoColumn}>
            <img style={styles.modalImage} src={url} alt={name || "Selected gallery photo"} />
            {description && <p style={styles.description}>{description}</p>}
          </div>

          <dl style={styles.metadata}>
            <div style={styles.metadataRow}>
              <dt>Date</dt>
              <dd>{date || "Not provided"}</dd>
            </div>
            <div style={styles.metadataRow}>
              <dt>Type</dt>
              <dd>{type || "Not provided"}</dd>
            </div>
          </dl>
        </div>

        <div style={styles.picker} aria-label="Choose another photo">
          {data.map((imageData, index) => (
            <button
              type="button"
              key={imageData.url + imageData.name}
              style={styles.pickerButton}
              onClick={() => onSelect(imageData)}
              aria-label={`View ${imageData.name || `photo ${index + 1}`}`}
              aria-current={imageData.url === url ? "true" : undefined}
            >
              <img
                src={imageData.url}
                alt=""
                style={styles.pickerImage}
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

const styles = {
  backdrop: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.72)",
    position: "fixed",
    inset: 0,
    zIndex: 10,
    padding: 16,
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    width: "min(900px, 100%)",
    maxHeight: "90vh",
    overflowY: "auto",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    gap: 16,
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  modalTitle: {
    margin: 0,
    fontSize: "1.5rem",
    color: "#111827",
  },
  closeButton: {
    border: 0,
    background: "transparent",
    color: "#111827",
    fontSize: "2rem",
    cursor: "pointer",
    lineHeight: 1,
  },
  detailsLayout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.5fr) minmax(180px, 1fr)",
    gap: 20,
  },
  photoColumn: {
    minWidth: 0,
  },
  modalImage: {
    display: "block",
    width: "100%",
    maxHeight: "55vh",
    objectFit: "contain",
    background: "#f3f4f6",
  },
  description: {
    color: "#4b5563",
    lineHeight: 1.5,
  },
  metadata: {
    margin: 0,
  },
  metadataRow: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: "10px 0",
    borderBottom: "1px solid #e5e7eb",
  },
  picker: {
    display: "flex",
    gap: 8,
    overflowX: "auto",
    paddingBottom: 4,
  },
  pickerButton: {
    flex: "0 0 76px",
    padding: 0,
    border: "2px solid transparent",
    borderRadius: 6,
    background: "transparent",
    cursor: "pointer",
  },
  pickerImage: {
    display: "block",
    width: 72,
    height: 72,
    objectFit: "cover",
    borderRadius: 4,
  },
};

export default Modal;
