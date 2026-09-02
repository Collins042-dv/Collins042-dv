import brand from '../config/brand';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { useWishlist } from '../context/WishlistContext';

export default function Wishlist() {
  const { items, removeItem } = useWishlist();

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container">
          <SectionHeading align="left" eyebrow="Wishlist" title={`Saved favourites from ${brand.name}`} subtitle="Keep your most-loved pieces close and return whenever inspiration strikes." />
          {items.length ? (
            <div className="wishlist-grid">
              {items.map((product) => (
                <div key={product.id} className="wishlist-card-wrap">
                  <ProductCard product={product} />
                  <button type="button" className="text-link wishlist-remove" onClick={() => removeItem(product.id)}>
                    Remove from Wishlist
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="panel empty-state">
              <p>No saved items yet.</p>
              <Button to="/shop">Discover Pieces</Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
