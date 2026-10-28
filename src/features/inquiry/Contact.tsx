import { business, sectionLabels } from "../../config/site";
import { contact } from "../../config/content";
import { InkIllustration } from "../../components/InkIllustration";
import { InstagramLink } from "../../components/InstagramLink";
import { Mail } from "lucide-react";
import { SectionLabel } from "../../components/SectionLabel";

export function Contact() {
  return (
    <section
      id="contact"
      className="menu-section menu-section--tinted contact"
      aria-labelledby="contact-heading"
    >
      <SectionLabel number="iii." label={sectionLabels.contact} />
      <div className="section-body contact__content illustrated-row">
        <div className="contact__copy">
          <h2 id="contact-heading">{contact.title}</h2>
          <p className="section-intro">{contact.eyebrow}</p>
          <div className="contact__links">
            <a
              className="social-link social-link--labelled contact__email"
              href={`mailto:${business.email}`}
            >
              <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
              <span>{business.email}</span>
            </a>
            <InstagramLink label="instagram" />
          </div>
        </div>
        <InkIllustration
          name="contact"
          className="contact__drawing"
          sizes="(max-width: 1000px) 240px, 220px"
        />
      </div>
    </section>
  );
}
