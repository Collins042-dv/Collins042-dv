import brand from '../config/brand';
import { featuredProducts } from '../data/products';
import Button from '../components/Button';
import EditorialCard from '../components/EditorialCard';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import NewsletterForm from '../components/NewsletterForm';

const collectionCards = [
  {
    title: "Women's Wear",
    subtitle: 'Fluid silhouettes designed to move from meetings to midnight.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=80',
    link: '/shop?category=clothing',
  },
  {
    title: 'Bags',
    subtitle: 'Statement leather shapes with everyday sophistication.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80',
    link: '/shop?category=bags',
  },
  {
    title: 'Perfumes',
    subtitle: 'Captivating scents with a luxurious, lingering signature.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80',
    link: '/shop?category=perfumes',
  },
  {
    title: 'New Arrivals',
    subtitle: 'Fresh pieces curated for the modern wardrobe.',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80',
    link: '/shop',
  },
];

const lookbookImages = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80',
  'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=900&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80',
];

export default function Home() {
  return (
    <>
      <section
        className="hero"
        style={{ backgroundImage: "linear-gradient(90deg, rgba(10,10,10,0.62), rgba(10,10,10,0.22)), url('https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=1600&q=80')" }}
      >
        <div className="container hero-content">
          <span className="eyebrow">{brand.monogram} / Lagos</span>
          <h1>ELEVATE YOUR EVERYDAY.</h1>
          <p>{brand.description}</p>
          <div className="hero-actions">
            <Button to="/shop">Shop the Edit</Button>
            <Button to="/collections" variant="secondary">Explore Collections</Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Collections"
            title="A wardrobe of poised essentials and statement signatures."
            subtitle={`Discover the world of ${brand.name} through distinct edits of fashion, bags, fragrance, and modern accessories.`}
          />
          <div className="editorial-grid four-up">
            {collectionCards.map((card) => (
              <EditorialCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <SectionHeading
            eyebrow="The OMA Edit"
            title="Featured pieces for the refined wardrobe."
            subtitle="Considered textures, polished structure, and effortless glamour define our signature selection."
          />
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section statement-section">
        <div className="container narrow">
          <p className="statement-quote">
            {`“${brand.name} creates a world where craftsmanship, femininity, and quiet confidence meet in every detail.”`}
          </p>
        </div>
      </section>

      <section className="section split-feature">
        <div className="container split-layout">
          <div className="split-media">
            <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1200&q=80" alt={`${brand.name} bags`} />
          </div>
          <div className="split-copy">
            <span className="eyebrow">Bags</span>
            <h2>Objects of desire for every entrance.</h2>
            <p>From sculptural top handles to versatile daily totes, our bag collection is designed to carry presence with grace.</p>
            <Button to="/shop?category=bags">Shop Bags</Button>
          </div>
        </div>
      </section>

      <section className="section section-dark split-feature reverse">
        <div className="container split-layout reverse">
          <div className="split-copy">
            <span className="eyebrow">Fragrance</span>
            <h2>Leave an unforgettable trail.</h2>
            <p>Each perfume is composed to feel intimate, luminous, and deeply memorable from first impression to final note.</p>
            <Button to="/shop?category=perfumes" variant="secondary">Discover Fragrance</Button>
          </div>
          <div className="split-media">
            <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&q=80" alt={`${brand.name} perfumes`} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Lookbook"
            title="Editorial moments from the house of OMA."
            subtitle="A glimpse into styling, mood, and movement across our newest pieces."
          />
          <div className="masonry-grid preview-grid">
            {lookbookImages.map((image, index) => (
              <figure key={image} className="masonry-item">
                <img src={image} alt={`${brand.name} lookbook ${index + 1}`} />
              </figure>
            ))}
          </div>
          <div className="section-cta centered">
            <Button to="/lookbook" variant="ghost">View Full Lookbook</Button>
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container split-layout teaser-layout">
          <div>
            <span className="eyebrow">About {brand.monogram}</span>
            <h2>Rooted in softness, structure, and confidence.</h2>
            <p>{brand.name} is a luxury womenswear and lifestyle brand inspired by elegant living, expressive femininity, and timeless design.</p>
            <Button to="/about">Read Our Story</Button>
          </div>
          <div className="teaser-panel">
            <img src="https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1200&q=80" alt={`${brand.name} about`} />
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
