import { Github, Linkedin, RotateCcw } from "lucide-react";
import { business, social } from "../../config/site";
import { replayArrival } from "../../features/arrival/arrival";
import { InstagramLink } from "../../components/InstagramLink";
import { credit } from "../../config/brand";
export function SiteFooter({ showArrival }: { showArrival: boolean }) {
  return (
    <footer className="site-footer">
      <p className="site-footer__identity">
        <span>{business.name}</span>
        <span>{business.location}</span>
      </p>
      <nav className="site-footer__socials" aria-label="Social profiles">
        <InstagramLink />
        <a
          className="social-link"
          href={social.linkedin.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn: ${social.linkedin.name} (opens in a new tab)`}
          title={`LinkedIn: ${social.linkedin.name}`}
        >
          <Linkedin size={18} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </nav>
      <div className="site-footer__utilities">
        {showArrival && (
          <button
            type="button"
            className="text-button requires-script"
            onClick={replayArrival}
          >
            open the tin again{" "}
            <RotateCcw size={13} strokeWidth={1.5} aria-hidden="true" />
          </button>
        )}
        <a href="/privacy/">privacy</a>
      </div>
      <div className="site-footer__credit">
        <p>
          <span>{credit.short}</span> <a href={credit.url}>{credit.name}</a>
        </p>
        <a
          className="social-link"
          href={credit.repository}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View website source on GitHub (opens in a new tab)"
          title="Website source on GitHub"
        >
          <Github size={18} strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
