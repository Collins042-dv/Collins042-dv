import brand from '../config/brand';

export default function SectionHeading({ title, subtitle, align = 'center', eyebrow }) {
  return (
    <div className={`section-heading section-heading-${align}`} data-brand={brand.monogram}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
