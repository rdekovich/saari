import { biography } from "../../config/content";
import { sectionLabels } from "../../config/site";
import { chefPortrait } from "../../config/artwork";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../../components/SectionLabel";
export function About() {
  return (
    <section
      id="about"
      className="menu-section menu-section--tinted about"
      aria-labelledby="about-heading"
    >
      <SectionLabel number="i." label={sectionLabels.about} />
      <h2 id="about-heading" className="section-heading">
        {biography.title}
      </h2>
      <img
        className="about__portrait"
        {...chefPortrait}
        sizes="(max-width: 700px) 280px, (max-width: 1000px) 25vw, 260px"
        loading="lazy"
        decoding="async"
      />
      <div className="about__story">
        {biography.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <div className="kitchen-notes">
        <p className="eyebrow">{biography.kitchensLabel}</p>
        <ul aria-label={biography.kitchensLabel}>
          {biography.kitchens.map((k) => (
            <li key={k.name}>
              {k.href ? (
                <a
                  className="kitchen-notes__link"
                  href={k.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${k.name}${k.distinction ? `, ${k.distinction.label}` : ""} (opens in a new tab)`}
                  title={k.distinction?.label}
                >
                  <span className="kitchen-notes__name">
                    {k.distinction && (
                      <span
                        className={`kitchen-notes__mark kitchen-notes__mark--${k.distinction.mark}`}
                        aria-hidden="true"
                      />
                    )}
                    {k.name}
                    <ArrowUpRight
                      className="kitchen-notes__arrow"
                      size={15}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              ) : (
                <span className="kitchen-notes__plain">{k.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
