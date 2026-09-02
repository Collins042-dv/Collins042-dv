import brand from '../config/brand';
import SectionHeading from '../components/SectionHeading';

const frames = [
  {
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80',
    caption: 'Tonal layers, fluid pleats, and quiet confidence.',
  },
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80',
    caption: 'Tailoring softened with effortless movement.',
  },
  {
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1000&q=80',
    caption: 'The signature dress — sculpted, luminous, unforgettable.',
  },
  {
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=80',
    caption: 'Accessories that complete the story with polish.',
  },
  {
    image: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1000&q=80',
    caption: 'Soft glamour with a sharp point of view.',
  },
  {
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1000&q=80',
    caption: `${brand.name} in motion, from daylight to evening.` ,
  },
];

export default function Lookbook() {
  return (
    <div className="page-shell">
      <section className="page-hero slim lookbook-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{brand.monogram} Lookbook</span>
          <h1>Editorial styling from the world of {brand.name}</h1>
          <p>Immersive imagery that captures the atmosphere, elegance, and movement of each collection.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading align="left" eyebrow="Stories in Motion" title="An evolving visual journal of modern luxury." subtitle="Each frame reflects the confidence, softness, and structure at the heart of the brand." />
          <div className="masonry-grid lookbook-grid">
            {frames.map((frame) => (
              <figure key={frame.image} className="masonry-item editorial-frame">
                <img src={frame.image} alt={frame.caption} />
                <figcaption>{frame.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
