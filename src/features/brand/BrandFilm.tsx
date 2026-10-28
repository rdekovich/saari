import { useRef, useState } from "react";
import { ArrowDownToLine, Pause, Play } from "lucide-react";
import { brandCopy } from "../../config/brand";

export function BrandFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  async function toggle() {
    if (!video.current) return;
    if (playing) video.current.pause();
    else {
      try {
        await video.current.play();
      } catch {
        setFailed(true);
      }
    }
  }

  return (
    <div className="section-body brand-film">
      <div>
        <h2 id="brand-film-heading">{brandCopy.film.title}</h2>
        <p className="section-intro">{brandCopy.film.description}</p>
        <div className="brand-film__actions">
          <button
            type="button"
            className="brand-action requires-script"
            onClick={() => void toggle()}
            aria-controls="brand-film"
            aria-pressed={playing}
          >
            {playing ? "pause film" : "play film"}
            {playing ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
          </button>
          <a className="brand-action" href="/motion/tin-reveal.mp4" download>
            download film <ArrowDownToLine size={16} aria-hidden="true" />
          </a>
        </div>
        {failed && (
          <p className="brand-note" role="status">
            the preview couldn’t play. you can still download the film.
          </p>
        )}
      </div>
      <video
        ref={video}
        id="brand-film"
        muted
        loop
        playsInline
        preload="none"
        poster="/motion/tin-closed.webp"
        width={1000}
        height={1000}
        aria-label="Sardine tin opening animation"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src="/motion/tin-reveal.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
