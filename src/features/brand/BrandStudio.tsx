import { useEffect, useState, type CSSProperties } from "react";
import { ArrowDownToLine, Check, Copy, RotateCcw } from "lucide-react";
import { brandAssets, inkColors } from "../../config/brand";
import {
  defaultSelection,
  readSelection,
  selectionPath,
  type BrandSelection,
} from "./brandState";

export function BrandStudio() {
  const [selection, setSelection] = useState(defaultSelection);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const asset = brandAssets.find((item) => item.id === selection.artwork)!;

  useEffect(() => {
    const restore = () => {
      const next = readSelection(location.search);
      setSelection(next);
      setShareUrl(new URL(selectionPath(next), location.origin).href);
    };
    restore();
    window.addEventListener("popstate", restore);
    return () => window.removeEventListener("popstate", restore);
  }, []);

  function change(patch: Partial<BrandSelection>) {
    const next = { ...selection, ...patch };
    setSelection(next);
    setStatus("");
    const url = new URL(selectionPath(next), location.origin);
    history.replaceState(null, "", url);
    setShareUrl(url.href);
  }

  async function download(format: "svg" | "png") {
    setBusy(true);
    setStatus("");
    try {
      const { exportArtwork, saveArtwork } = await import("./brandExport");
      const blob = await exportArtwork(asset, selection, format);
      saveArtwork(
        blob,
        `jacob-saari-${asset.id}-${selection.ink.slice(1)}.${format}`,
      );
      setStatus("your file is ready.");
    } catch {
      setStatus(
        "couldn’t prepare that file. try again, or use an original below.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setStatus("link copied — the artwork and colors are included.");
    } catch {
      setStatus("select and copy the link below.");
    }
  }

  return (
    <section className="brand-studio" aria-label="Artwork colors and downloads">
      <div className="brand-choices" aria-label="Choose artwork">
        {brandAssets.map((item, index) => (
          <button
            key={item.id}
            className="brand-choice"
            type="button"
            aria-pressed={item.id === asset.id}
            onClick={() => change({ artwork: item.id })}
          >
            <span className="brand-choice__number" aria-hidden="true">
              0{index + 1}
            </span>
            {item.label}
          </button>
        ))}
      </div>
      <div className="brand-workspace">
        <div
          className={`brand-preview${selection.transparent ? " brand-preview--transparent" : ""}`}
          style={{
            backgroundColor: selection.transparent
              ? undefined
              : selection.paper,
          }}
        >
          <span
            className="brand-preview__art"
            role="img"
            aria-label={`${asset.label}, ${selection.ink} ink${selection.transparent ? ", transparent background" : ` on ${selection.paper}`}`}
            style={
              {
                maskImage: `url("${asset.src}")`,
                backgroundColor: selection.ink,
                aspectRatio: `${asset.width} / ${asset.height}`,
              } as CSSProperties
            }
          />
        </div>
        <div className="brand-controls">
          <div className="brand-controls__heading">
            <h2>make it yours.</h2>
            <button
              type="button"
              className="brand-reset"
              aria-label="Reset artwork and colors"
              title="reset"
              onClick={() => change(defaultSelection)}
            >
              <RotateCcw size={16} strokeWidth={1.5} />
            </button>
          </div>
          <fieldset className="brand-fieldset">
            <legend>ink</legend>
            <div className="brand-swatches">
              {inkColors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className="brand-swatch"
                  style={{ "--swatch": color.value } as CSSProperties}
                  aria-label={color.name}
                  aria-pressed={selection.ink === color.value}
                  onClick={() => change({ ink: color.value })}
                >
                  {selection.ink === color.value && (
                    <Check
                      size={16}
                      strokeWidth={2}
                      style={{
                        color: color.name === "paper" ? "#171916" : "#fbfaf6",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
            <label className="brand-color">
              <span>custom ink</span>
              <span className="brand-color__value">{selection.ink}</span>
              <input
                aria-label="Custom ink color"
                type="color"
                value={selection.ink}
                onChange={(event) => change({ ink: event.target.value })}
              />
            </label>
          </fieldset>
          <fieldset className="brand-fieldset">
            <legend>background</legend>
            <label className="brand-color">
              <span>paper</span>
              <span className="brand-color__value">{selection.paper}</span>
              <input
                aria-label="Background color"
                type="color"
                disabled={selection.transparent}
                value={selection.paper}
                onChange={(event) => change({ paper: event.target.value })}
              />
            </label>
            <label className="brand-checkbox">
              <input
                type="checkbox"
                checked={selection.transparent}
                onChange={(event) =>
                  change({ transparent: event.target.checked })
                }
              />{" "}
              transparent background
            </label>
          </fieldset>
          <div className="brand-downloads">
            {asset.format === "svg" && (
              <button
                type="button"
                className="brand-action"
                disabled={busy}
                onClick={() => void download("svg")}
              >
                download svg <ArrowDownToLine size={16} aria-hidden="true" />
              </button>
            )}
            <button
              type="button"
              className="brand-action"
              disabled={busy}
              onClick={() => void download("png")}
            >
              download png <ArrowDownToLine size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="brand-action"
              onClick={() => void copyLink()}
            >
              copy this look <Copy size={16} aria-hidden="true" />
            </button>
          </div>
          <p className="brand-status" role="status">
            {busy ? "preparing your file…" : status}
          </p>
          <details className="brand-share">
            <summary>shareable link</summary>
            <label htmlFor="brand-share-url">
              opens this artwork with these colors
            </label>
            <input
              id="brand-share-url"
              value={shareUrl}
              readOnly
              onFocus={(event) => event.target.select()}
            />
          </details>
        </div>
      </div>
      <noscript>
        <p className="brand-note">
          color controls need javascript. all original files are available
          below.
        </p>
      </noscript>
    </section>
  );
}
