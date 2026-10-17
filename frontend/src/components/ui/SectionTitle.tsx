interface Props {
  eyebrow?: string;
  title: string;
}

export default function SectionTitle({ eyebrow, title }: Props) {
  return (
    <div className="section-title">
      {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
    </div>
  );
}
