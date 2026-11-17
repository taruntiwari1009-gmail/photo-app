import { useState } from "react";
import { data } from "./content/data";
import Modal from "./modal/modal";
import Header from "./components/Header";
import "./App.css";

function App() {
  const [selectedContent, setSelectedContent] = useState(null);

  return (
    <main className="gallery-page">
      <Header title="Photo Gallery" subtitle="A small collection of photographs" />
      <section className="gallery-grid" aria-label="Photo collection">
        {data.map((imageData) => (
          <button
            type="button"
            className="photo-card"
            key={imageData.name}
            onClick={() => setSelectedContent(imageData)}
            aria-label={`Open ${imageData.name}`}
          >
            <img
              src={imageData.url}
              alt={imageData.name}
              loading="lazy"
            />
            <span>{imageData.name}</span>
          </button>
        ))}
      </section>

      {selectedContent && (
        <Modal
          content={selectedContent}
          data={data}
          setSelectedContent={setSelectedContent}
        />
      )}
    </main>
  );
}

export default App;
