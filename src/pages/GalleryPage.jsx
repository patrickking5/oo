import { useEffect, useState } from "react";

const photos = [
  ["2025", "IMG_9844.jpg", "Aug 19"],
  ["2025", "IMG_9873.jpg", "Aug 22"],
  ["2025", "IMG_9882.jpg", "Aug 23"],
  ["2025", "IMG_9891.jpg", "Aug 24"],
  ["2025", "IMG_9897.jpg", "Aug 24"],
  ["2025", "IMG_3622.jpg", "Aug 24"],
  ["2024", "IMG_6825.jpg", "Jul 14"],
  ["2024", "IMG_6832.jpg", "Jul 14"],
  ["2024", "IMG_6842.jpg", "Jul 14"],
  ["2024", "IMG_6848.jpg", "Jul 14"],
  ["2023", "IMG_3792.jpg", "Jul 14"],
  ["2023", "IMG_3808.jpg", "Jul 15"],
  ["2023", "IMG_3834.jpg", "Jul 16"],
  ["2023", "IMG_1722.jpg", "Jul 16"],
  ["2023", "IMG_3840.jpg", "Jul 16"],
  ["2020", "IMG_2647.jpg", "Jul 10"],
  ["2020", "IMG_2662.jpg", "Jul 11"],
  ["2020", "IMG_2674.jpg", "Jul 11"],
  ["2020", "IMG_2680.jpg", "Jul 11"],
  ["2020", "IMG_2683.jpg", "Jul 11"],
  ["2020", "IMG_2706.jpg", "Jul 12"],
  ["2020", "IMG_2709.jpg", "Jul 12"],
  ["2020", "IMG_2717.jpg", "Jul 13"],
].map(([year, file, date]) => ({
  year,
  file,
  date,
  src: `/photos/through-the-years/${file}`,
}));

export default function GalleryPage() {
  const [active, setActive] = useState(null);
  const years = [...new Set(photos.map((photo) => photo.year))];

  useEffect(() => {
    if (active === null) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight")
        setActive((index) => (index + 1) % photos.length);
      if (event.key === "ArrowLeft")
        setActive((index) => (index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return (
    <div className="page-section page-top">
      <div className="section-head">
        <div>
          <div className="kicker">THROUGH THE YEARS</div>
          <h2>The gallery</h2>
          <p>
            A look back at the people, places, and moments that make the Oll
            Open.
          </p>
        </div>
      </div>
      {years.map((year) => (
        <section className="gallery-year" key={year}>
          <div className="gallery-year-head">
            <h3>{year}</h3>
            <span>
              {photos.filter((photo) => photo.year === year).length} PHOTOS
            </span>
          </div>
          <div className="gallery-grid">
            {photos.map(
              (photo, index) =>
                photo.year === year && (
                  <button
                    className="gallery-card"
                    onClick={() => setActive(index)}
                    key={photo.file}
                  >
                    <img
                      src={photo.src}
                      alt={`Oll Open, ${photo.date} ${photo.year}`}
                      loading="lazy"
                    />
                    <span className="photo-label">
                      <small>
                        {photo.date} · {photo.year}
                      </small>
                      <b>View photo</b>
                    </span>
                  </button>
                ),
            )}
          </div>
        </section>
      ))}
      <div className="gallery-note">
        <span>+</span>
        <div>
          <h3>The archive is growing</h3>
          <p>More memories will be added to the photo library.</p>
        </div>
      </div>
      {active !== null && (
        <div className="lightbox">
          <button
            className="lightbox-close"
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="lightbox-prev"
            onClick={() =>
              setActive((active - 1 + photos.length) % photos.length)
            }
            aria-label="Previous photo"
          >
            ←
          </button>
          <img
            className="lightbox-photo"
            src={photos[active].src}
            alt={`Oll Open, ${photos[active].date} ${photos[active].year}`}
          />
          <button
            className="lightbox-next"
            onClick={() => setActive((active + 1) % photos.length)}
            aria-label="Next photo"
          >
            →
          </button>
          <h3>
            {photos[active].date}, {photos[active].year}
          </h3>
          <p>
            {active + 1} of {photos.length} ·{" "}
            <a href={photos[active].src} download>
              Download original
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
