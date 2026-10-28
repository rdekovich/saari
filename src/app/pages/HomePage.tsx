import { Hero } from "../../features/content/Hero";
import { About } from "../../features/content/About";
import { AtYourTable } from "../../features/content/AtYourTable";
import { Contact } from "../../features/inquiry/Contact";
export function HomePage() {
  return (
    <main id="main" className="home-page" tabIndex={-1}>
      <Hero />
      <About />
      <AtYourTable />
      <Contact />
    </main>
  );
}
