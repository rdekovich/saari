import { Hero } from "../../features/content/Hero";
import { About } from "../../features/content/About";
import { AtYourTable } from "../../features/content/AtYourTable";
import { Contact } from "../../features/inquiry/Contact";
import { Gallery } from "../../features/gallery/Gallery";
export function HomePage() {
  return (
    <main id="main" className="home-page" tabIndex={-1}>
      <Hero />
      <About />
      <Gallery />
      <AtYourTable />
      <Contact />
    </main>
  );
}
