export function BrandMark({
  className = "",
  aligned = false,
}: {
  className?: string;
  aligned?: boolean;
}) {
  return (
    <span
      className={`brand-mark ${aligned ? "brand-mark--aligned" : ""} ${className}`}
      role="img"
      aria-label="Jacob Saari — three sardines in an open tin"
    >
      <img
        className="brand-mark__black"
        src="/brand/logo-black.svg"
        width="1254"
        height="1254"
        alt=""
        aria-hidden="true"
      />
      <img
        className="brand-mark__white"
        src="/brand/logo-white.svg"
        width="1254"
        height="1254"
        alt=""
        aria-hidden="true"
      />
    </span>
  );
}
