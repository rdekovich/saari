import { illustrations, type IllustrationName } from "../config/artwork";
export function InkIllustration({
  name,
  className = "",
  sizes = "240px",
}: {
  name: IllustrationName;
  className?: string;
  sizes?: string;
}) {
  const { width, height } = illustrations[name];
  return (
    <img
      className={`ink-illustration ${className}`}
      src={`/illustrations/${name}-480.webp`}
      srcSet={`/illustrations/${name}-480.webp 480w, /illustrations/${name}-960.webp 960w`}
      sizes={sizes}
      width={width}
      height={height}
      alt=""
      loading="lazy"
      decoding="async"
    />
  );
}
