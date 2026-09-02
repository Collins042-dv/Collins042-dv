import brand from '../config/brand';
import EditorialCard from '../components/EditorialCard';
import SectionHeading from '../components/SectionHeading';

const collections = [
  {
    title: "Women's Wear",
    subtitle: 'Timeless silhouettes, elegant tailoring, and fluid movement.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80',
    link: '/shop?category=clothing',
  },
  {
    title: 'Bags',
    subtitle: 'Signature leather pieces that balance structure and softness.',
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=1200&q=80',
    link: '/shop?category=bags',
  },
  {
    title: 'Perfumes',
    subtitle: 'Sophisticated fragrances for day, evening, and every memory between.',
    image: 'https://images.unsplash.com/photo-1619994403073-2cec3c907dce?w=1200&q=80',
    link: '/shop?category=perfumes',
  },
  {
    title: 'New Arrivals',
    subtitle: `Fresh edits from the latest ${brand.name} drop.`,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80',
    link: '/shop',
  },
];

export default function Collections() {
  return (
    <div className="page-shell">
      <section className="page-hero slim collections-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{brand.monogram} Collections</span>
          <h1>The Signature World of {brand.name}</h1>
          <p>Discover focused luxury edits that define the modern feminine wardrobe.</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHeading
            align="left"
            eyebrow="Curated Edits"
            title="Designed to be collected, worn, and remembered."
            subtitle="Explore each collection through immersive editorial storytelling."
          />
          <div className="editorial-grid stacked">
            {collections.map((collection) => (
              <EditorialCard key={collection.title} {...collection} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
