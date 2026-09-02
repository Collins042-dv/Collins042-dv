import { Link } from 'react-router-dom';
import brand from '../config/brand';

export default function EditorialCard({ title, subtitle, image, link, tone = 'light' }) {
  return (
    <Link
      to={link}
      className={`editorial-card editorial-card-${tone}`}
      style={{ backgroundImage: `linear-gradient(180deg, rgba(10,10,10,0.08), rgba(10,10,10,0.55)), url(${image})` }}
      aria-label={`${brand.name} ${title}`}
    >
      <div className="editorial-card-content">
        <span className="eyebrow">{brand.monogram}</span>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </Link>
  );
}
