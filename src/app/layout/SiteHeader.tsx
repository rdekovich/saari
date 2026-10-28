import { business, navigation } from "../../config/site";
import { ThemeSwitch } from "../../features/theme/ThemeSwitch";
import { pages, type PageName } from "../../config/pages";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { InstagramLink } from "../../components/InstagramLink";
import { introduction } from "../../config/content";

export function SiteHeader({ page }: { page: PageName }) {
  const menu = useRef<HTMLDetailsElement>(null);
  const [menuOpen, setMenuOpen] = useState<boolean | undefined>();
  useEffect(() => {
    setMenuOpen(menu.current?.open ?? false);
    const outside = (event: PointerEvent) => {
      if (menu.current?.open && !menu.current.contains(event.target as Node))
        menu.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        menu.current.open = false;
        menu.current.querySelector("summary")?.focus();
      }
    };
    const desktop = matchMedia("(min-width: 701px)");
    const resize = () => {
      if (desktop.matches && menu.current) menu.current.open = false;
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      desktop.removeEventListener("change", resize);
    };
  }, []);
  const links = navigation.map((item) => (
    <a
      href={item.href}
      key={item.href}
      aria-current={item.href === pages[page].path ? "page" : undefined}
      onClick={() => {
        if (menu.current) menu.current.open = false;
      }}
    >
      {item.label}
    </a>
  ));
  return (
    <header className="site-header">
      <a className="site-name" href="/" aria-label="Jacob Saari, home">
        <span>{business.name}</span>
        <span className="site-name__location">{business.location}</span>
      </a>
      <nav className="site-nav-desktop" aria-label="Main navigation">
        {links}
      </nav>
      <div className="site-header__controls">
        <ThemeSwitch />
        <details
          className="mobile-menu"
          ref={menu}
          onToggle={(event) => setMenuOpen(event.currentTarget.open)}
        >
          <summary
            role="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu
              className="mobile-menu__open"
              size={20}
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <X
              className="mobile-menu__close"
              size={20}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </summary>
          <div id="mobile-navigation" className="mobile-menu__panel">
            <nav aria-label="Main navigation">{links}</nav>
            <InstagramLink label={introduction.instagramAction} />
          </div>
        </details>
      </div>
    </header>
  );
}
