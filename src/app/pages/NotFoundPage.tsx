import { BrandMark } from "../../components/BrandMark";
import { BackToHome } from "../../components/BackToHome";
export function NotFoundPage() {
  return (
    <main className="text-page not-found" id="main" tabIndex={-1}>
      <BrandMark />
      <p className="eyebrow">404</p>
      <h1>nothing on the menu here.</h1>
      <p>let’s get you back to the good stuff.</p>
      <BackToHome />
    </main>
  );
}
