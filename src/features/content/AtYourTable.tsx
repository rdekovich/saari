import { offerings, table } from "../../config/content";
import { sectionLabels } from "../../config/site";
import { InkIllustration } from "../../components/InkIllustration";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "../../components/SectionLabel";
export function AtYourTable() {
  return (
    <section
      id="table"
      className="menu-section table-section"
      aria-labelledby="table-heading"
    >
      <SectionLabel number="ii." label={sectionLabels.table} />
      <div className="section-body">
        <h2 id="table-heading">{table.title}</h2>
        <p className="section-intro">{table.description}</p>
        <div className="offerings">
          {offerings.map((item) => (
            <article className="offering illustrated-row" key={item.number}>
              <div className="offering__copy">
                <p className="eyebrow offering__eyebrow">
                  <span className="offering__number" aria-hidden="true">
                    {item.number}
                  </span>
                  <span>{item.subtitle}</span>
                </p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <a className="editorial-link" href="#contact">
                  {table.action}{" "}
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </a>
              </div>
              <InkIllustration
                name={item.illustration}
                className={`offering__art offering__art--${item.illustration}`}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
