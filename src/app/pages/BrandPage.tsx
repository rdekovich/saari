import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { brandAssets, brandCopy, credit } from "../../config/brand";
import { SectionLabel } from "../../components/SectionLabel";
import { BrandFilm } from "../../features/brand/BrandFilm";
import { BrandStudio } from "../../features/brand/BrandStudio";

export function BrandPage() {
  return (
    <main id="main" tabIndex={-1} className="brand-page">
      <header className="brand-heading">
        <p className="eyebrow">{brandCopy.eyebrow}</p>
        <h1>{brandCopy.title}</h1>
        <p>{brandCopy.description}</p>
      </header>
      <BrandStudio />
      <section
        className="menu-section menu-section--tinted brand-originals"
        aria-labelledby="brand-originals-heading"
      >
        <SectionLabel number="i." label={brandCopy.originals.label} />
        <div className="section-body">
          <h2 id="brand-originals-heading">{brandCopy.originals.title}</h2>
          <p className="section-intro">{brandCopy.originals.description}</p>
          <ul className="brand-file-list">
            {brandAssets.map((asset) => (
              <li key={asset.id}>
                <a href={asset.src} download>
                  <span>{asset.label}</span>
                  <span className="brand-file-list__format">
                    {asset.format}
                    <ArrowDownToLine size={16} aria-hidden="true" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="brand-note">{brandCopy.originals.note}</p>
        </div>
      </section>
      <section className="menu-section" aria-labelledby="brand-film-heading">
        <SectionLabel number="ii." label={brandCopy.film.label} />
        <BrandFilm />
      </section>
      <section
        className="menu-section menu-section--tinted brand-colophon"
        aria-labelledby="brand-credit-heading"
      >
        <SectionLabel number="iii." label={brandCopy.colophon.label} />
        <div className="section-body">
          <p className="eyebrow" id="brand-credit-heading">
            {credit.full}
          </p>
          <a className="brand-credit" href={credit.url}>
            {credit.name}
            <ArrowUpRight size={24} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <p className="brand-note">{brandCopy.colophon.note}</p>
        </div>
      </section>
    </main>
  );
}
