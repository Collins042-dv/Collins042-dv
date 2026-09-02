import { Link } from 'react-router-dom';
import brand from '../config/brand';
import { useWishlist } from '../context/WishlistContext';

export default function ProductCard({ product }) {
  const { toggleItem, isWishlisted } = useWishlist();
  const active = isWishlisted(product.id);

  return (
    <article className="product-card" data-brand={brand.monogram}>
      <div className="product-card-media">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        <div className="product-card-overlay">
          <button
            type="button"
            className={`icon-chip ${active ? 'active' : ''}`}
            aria-label={`${active ? 'Remove' : 'Add'} ${product.name} ${brand.name} wishlist`}
            onClick={() => toggleItem(product.id)}
          >
            ♥
          </button>
          <Link to={`/product/${product.id}`} className="icon-chip" aria-label={`View ${product.name} at ${brand.name}`}>
            View
          </Link>
        </div>
        {product.new ? <span className="product-badge">New</span> : null}
      </div>
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>
        <Link to={`/product/${product.id}`} className="product-card-title">{product.name}</Link>
        <p className="product-card-price">{product.formattedPrice}</p>
      </div>
    </article>
  );
}
