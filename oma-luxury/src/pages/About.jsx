import brand from '../config/brand';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

const values = [
  {
    title: 'Refined Craft',
    copy: 'We believe luxury lives in the precision of cut, texture, and finishing — the details that linger.',
  },
  {
    title: 'Modern Femininity',
    copy: 'Every collection balances strength and softness, designed for women who move with quiet confidence.',
  },
  {
    title: 'Intentional Living',
    copy: 'From clothing to fragrance, we create pieces that elevate rituals, mood, and everyday presence.',
  },
];

export default function About() {
  return (
    <div className="page-shell">
      <section className="page-hero about-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">About {brand.name}</span>
          <h1>Luxury for women who live beautifully and intentionally.</h1>
          <p>{brand.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container split-layout">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our Story"
              title="Born in Lagos, designed for the global modern muse."
              subtitle={`${brand.name} was imagined as a house of elegant essentials — pieces that feel intimate, polished, and quietly powerful.`}
            />
            <p className="long-copy">Our collections celebrate a wardrobe and lifestyle built on beautiful silhouettes, elevated details, and pieces that move with grace. We are drawn to thoughtful craftsmanship, tonal palettes, and objects that become part of a woman’s signature presence.</p>
            <Button to="/lookbook">View Lookbook</Button>
          </div>
          <div className="image-stack">
            <img src="https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1200&q=80" alt={`${brand.name} editorial`} />
            <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80" alt={`${brand.name} atelier mood`} />
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHeading title="Our mission & values" subtitle="To create a premium fashion and lifestyle universe grounded in beauty, confidence, and elevated everyday living." />
          <div className="value-grid">
            {values.map((value) => (
              <article key={value.title} className="value-card">
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
