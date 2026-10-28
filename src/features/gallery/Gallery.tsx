import { RotateCcw } from "lucide-react";
import { SectionLabel } from "../../components/SectionLabel";
import { gallery, galleryPhotos } from "../../config/gallery";
import { sectionLabels } from "../../config/site";

export function Gallery() {
  return (
    <section
      id="gallery"
      className="menu-section gallery"
      aria-labelledby="gallery-heading"
    >
      <SectionLabel number="ii." label={sectionLabels.gallery} />
      <div className="section-body">
        <h2 id="gallery-heading">{gallery.title}</h2>
        <p className="section-intro">{gallery.description}</p>
      </div>
      <p className="gallery__instruction">{gallery.instruction}</p>
      <div className="gallery__grid">
        {galleryPhotos.map((photo, index) => (
          <details className="photo-card" key={photo.id}>
            <summary>
              <span className="photo-card__image">
                <img
                  src={`/images/gallery/${photo.id}-480.webp`}
                  srcSet={[480, 960, 1440]
                    .map(
                      (width) =>
                        `/images/gallery/${photo.id}-${width}.webp ${width}w`,
                    )
                    .join(", ")}
                  sizes={
                    index === 0 || index === galleryPhotos.length - 1
                      ? "(max-width: 700px) 90vw, (max-width: 1272px) 45vw, 560px"
                      : "(max-width: 700px) 43vw, (max-width: 1272px) 22vw, 270px"
                  }
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="photo-card__caption">
                <span>
                  <span className="photo-card__number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {photo.label}
                </span>
                <span className="photo-card__toggle">
                  <span className="photo-card__show">notes</span>
                  <span className="photo-card__hide">photo</span>
                  <RotateCcw size={14} strokeWidth={1.5} aria-hidden="true" />
                </span>
              </span>
            </summary>
            <div className="photo-card__back">
              <p className="eyebrow">{photo.label}</p>
              <h3>{photo.dish || gallery.placeholderDish}</h3>
              <p className="photo-card__note">
                {photo.note || gallery.placeholderNote}
              </p>
              <dl>
                <div>
                  <dt>place</dt>
                  <dd>{photo.place || "—"}</dd>
                </div>
                <div>
                  <dt>date</dt>
                  <dd>{photo.date || "—"}</dd>
                </div>
              </dl>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
