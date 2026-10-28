import { useEffect } from "react";
import { SiteHeader } from "./layout/SiteHeader";
import { SiteFooter } from "./layout/SiteFooter";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { BrandPage } from "./pages/BrandPage";
import type { PageName } from "../config/pages";
import { useBrowserTheme } from "../features/theme/useBrowserTheme";

export default function App({ page }: { page: PageName }) {
  useBrowserTheme();
  useEffect(() => {
    const anchor = () => {
      if (!location.hash) return;
      try {
        document
          .getElementById(decodeURIComponent(location.hash.slice(1)))
          ?.scrollIntoView();
      } catch {}
    };
    if (document.documentElement.dataset.arrival === "complete") anchor();
    window.addEventListener("saari:arrived", anchor);
    return () => window.removeEventListener("saari:arrived", anchor);
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        skip to content
      </a>
      <div className="page-wrap">
        <SiteHeader page={page} />
        {page === "home" ? (
          <HomePage />
        ) : page === "brand" ? (
          <BrandPage />
        ) : page === "privacy" ? (
          <PrivacyPage />
        ) : (
          <NotFoundPage />
        )}
        <SiteFooter showArrival={page === "home"} />
      </div>
    </>
  );
}
