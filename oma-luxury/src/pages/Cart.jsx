import { Link } from 'react-router-dom';
import brand from '../config/brand';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import { useCart } from '../context/CartContext';

const formatPrice = (price) => `${brand.currency.symbol}${price.toLocaleString('en-NG')}`;

export default function Cart() {
  const { items, removeItem, updateQty, total } = useCart();

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container cart-layout">
          <div>
            <SectionHeading align="left" eyebrow="Shopping Bag" title="Your curated selections" subtitle={`Review your ${brand.name} pieces and proceed to checkout when ready.`} />
            {items.length ? (
              <div className="cart-list">
                {items.map((item) => (
                  <article key={item.lineId} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                      <p>{item.formattedPrice}</p>
                      {item.selectedSize ? <span>Size: {item.selectedSize}</span> : null}
                      <div className="qty-control compact">
                        <button type="button" onClick={() => updateQty(item.lineId, item.qty - 1)}>−</button>
                        <span>{item.qty}</span>
                        <button type="button" onClick={() => updateQty(item.lineId, item.qty + 1)}>+</button>
                      </div>
                    </div>
                    <div className="cart-item-side">
                      <strong>{formatPrice(item.price * item.qty)}</strong>
                      <button type="button" className="text-link" onClick={() => removeItem(item.lineId)}>Remove</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="panel empty-state">
                <p>Your bag is currently empty.</p>
                <Button to="/shop">Continue Shopping</Button>
              </div>
            )}
          </div>

          <aside className="panel summary-panel">
            <h3>Order Summary</h3>
            <div className="summary-row"><span>Subtotal</span><strong>{formatPrice(total)}</strong></div>
            <div className="summary-row"><span>Delivery</span><strong>{items.length ? 'Calculated at checkout' : '—'}</strong></div>
            <div className="summary-row total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            <Button to="/checkout" className={!items.length ? 'disabled-link' : ''} aria-disabled={!items.length}>Proceed to Checkout</Button>
          </aside>
        </div>
      </section>
    </div>
  );
}
