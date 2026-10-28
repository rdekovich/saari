export function SectionLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="section-margin">
      <span className="section-number">{number}</span>
      <p>{label}</p>
    </div>
  );
}
