import { ArrowUpRight } from "lucide-react";

export function BackToHome() {
  return (
    <a className="editorial-link" href="/">
      back to the kitchen{" "}
      <ArrowUpRight size={18} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
