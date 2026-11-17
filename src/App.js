import { useState } from "react";
import { data } from "./content/data";
import Modal from "./modal/modal";
import Header from "./components/Header";

function App() {
  const [selectedContent, setSelectedContent] = useState(null);

  const closeModal = () => setSelectedContent(null);

  return (
    <main style={styles.main}>
      <Header title="Photo Gallery" subtitle="A small collection of photographs" />
      <section style={styles.container} aria-label="Photo gallery">
        {data.map((imageData, index) => (
          <button
            type="button"
            key={imageData.url + imageData.name}
            style={styles.imageButton}
            className="gallery-image-button"
            onClick={() => setSelectedContent(imageData)}
            aria-label={`View ${imageData.name}`}
          >
            <img
              style={styles.image}
              src={imageData.url}
              alt={imageData.name || `Gallery photo ${index + 1}`}
              loading="lazy"
            />
            <span style={styles.imageDescription}>
              <span style={styles.imageDescriptionText}>{imageData.name}</span>
            </span>
          </button>
        ))}
      </section>

      {selectedContent && (
        <Modal
          content={selectedContent}
          data={data}
          onClose={closeModal}
          onSelect={setSelectedContent}
        />
      )}
    </main>
  );
}

const styles = {
  main: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f0f0f0",
    flexDirection: "column",
    paddingBottom: 32,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 12,
    width: "min(100% - 32px, 1100px)",
    marginTop: 24,
  },
  imageButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    padding: 0,
    border: 0,
    background: "#000",
    cursor: "pointer",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    aspectRatio: "1 / 1",
    objectFit: "cover",
  },
  imageDescription: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
    backgroundColor: "#000000",
    color: "#ffffff",
  },
  imageDescriptionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default App;
