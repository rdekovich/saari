import { Instagram } from "lucide-react";
import { social } from "../config/site";

export function InstagramLink({
  label,
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      className={`social-link${label ? " social-link--labelled" : ""} ${className}`.trim()}
      href={social.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label ? `${label} — ` : ""}Instagram: ${social.instagram.handle} (opens in a new tab)`}
      title={`Instagram: ${social.instagram.handle}`}
    >
      <Instagram size={18} strokeWidth={1.5} aria-hidden="true" />
      {label && <span>{label}</span>}
    </a>
  );
}
