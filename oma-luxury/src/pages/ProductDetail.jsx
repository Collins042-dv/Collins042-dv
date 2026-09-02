import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import brand from '../config/brand';
import products from '../data/products';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((entry) => entry.id === id);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState('');
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();

  useEffect(() => {
    setSelectedSize(product?.sizes?.[0] || '');
    setQty(1);
  }, [product]);

  const relatedProducts = useMemo(
    () => products.filter((entry) => entry.category === product?.category && entry.id !== product?.id).slice(0, 3),
    [product],
  );

  if (!product) {
    return (
      <div className="page-shell">
        <section className="section">
          <div className="container not-found-card">
            <SectionHeading title="Product not found" subtitle={`Return to ${brand.name} shop to continue exploring.`} />
            <Button to="/shop">Back to Shop</Button>
          </div>
        </section>
      </div>
    );
  }

  const gallery = [product.image, `${product.image}&sat=-10`, `${product.image}&exp=5`];

  const handleAddToCart = () => {
    if (product.sizes.length && !selectedSize) {
      setStatus('Please select a size before adding to bag.');
      return;
    }

    addItem(product, qty, selectedSize);
    setStatus('Added to your bag.');
  };

  return (
    <div className="page-shell">
      <section className="section product-detail-section">
        <div className="container product-detail-grid">
          <div className="product-gallery">
            {gallery.map((image, index) => (
              <div key={`${image}-${index}`} className={index === 0 ? 'product-gallery-main' : 'product-gallery-thumb'}>
                <img src={image} alt={`${product.name} view ${index + 1}`} />
              </div>
            ))}
          </div>

          <div className="product-info-panel">
            <span className="eyebrow">{brand.monogram} / {product.category}</span>
            <h1>{product.name}</h1>
            <p className="detail-price">{product.formattedPrice}</p>
            <p className="detail-copy">{product.description}</p>

            {product.sizes.length ? (
              <div className="detail-block">
                <h3>Select Size</h3>
                <div className="size-row">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`size-chip ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="detail-block">
              <h3>Quantity</h3>
              <div className="qty-control">
                <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))}>−</button>
                <span>{qty}</span>
                <button type="button" onClick={() => setQty((value) => value + 1)}>+</button>
              </div>
            </div>

            <div className="detail-actions">
              <Button onClick={handleAddToCart}>Add to Cart</Button>
              <Button variant="secondary" onClick={() => toggleItem(product.id)}>
                {isWishlisted(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
            {status ? <p className="form-note">{status}</p> : null}

            <div className="detail-meta">
              <p>Complimentary standard delivery within Nigeria on select orders.</p>
              <p><Link to="/contact">Contact our concierge</Link> for personal shopping guidance.</p>
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length ? (
        <section className="section section-cream">
          <div className="container">
            <SectionHeading title="You may also like" subtitle={`More from the ${product.category} edit.`} />
            <div className="product-grid">
              {relatedProducts.map((entry) => (
                <ProductCard key={entry.id} product={entry} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
