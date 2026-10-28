import { BrandMark } from "../../components/BrandMark";
import { introduction } from "../../config/content";
import { sectionLabels } from "../../config/site";
import { InstagramLink } from "../../components/InstagramLink";
import { ArrowDown, ArrowUpRight } from "lucide-react";
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__drawing">
        <BrandMark aligned />
      </div>
      <div className="hero__copy">
        <p className="eyebrow">{introduction.eyebrow}</p>
        <h1 id="hero-heading">
          {introduction.headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="hero__description">{introduction.description}</p>
        <div className="hero__actions">
          <a className="hero__action" href="#table">
            <span>{introduction.action}</span>
            <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
          </a>
          <InstagramLink
            label={introduction.instagramAction}
            className="hero__action"
          />
        </div>
      </div>
      <div className="hero__colophon">
        <a href="#about">
          {sectionLabels.about}{" "}
          <ArrowDown size={16} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
