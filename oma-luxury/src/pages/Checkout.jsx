import { useState } from 'react';
import { Link } from 'react-router-dom';
import brand from '../config/brand';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import { useCart } from '../context/CartContext';

const formatPrice = (price) => `${brand.currency.symbol}${price.toLocaleString('en-NG')}`;

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setPlaced(true);
    clearCart();
  };

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container cart-layout">
          <div>
            <SectionHeading align="left" eyebrow="Checkout" title="Complete your order" subtitle={`Secure your ${brand.name} selections with our simple checkout flow.`} />
            {placed ? (
              <div className="panel empty-state align-left">
                <h3>Order placed</h3>
                <p>Thank you for shopping with {brand.name}. Our team will confirm your order details shortly.</p>
                <Button to="/shop">Continue Shopping</Button>
              </div>
            ) : (
              <form className="panel checkout-form" onSubmit={handleSubmit}>
                <div className="form-grid two-column">
                  <label>
                    First Name
                    <input type="text" required />
                  </label>
                  <label>
                    Last Name
                    <input type="text" required />
                  </label>
                  <label>
                    Email Address
                    <input type="email" required />
                  </label>
                  <label>
                    Phone Number
                    <input type="tel" required />
                  </label>
                </div>
                <label>
                  Shipping Address
                  <input type="text" placeholder="Street address" required />
                </label>
                <div className="form-grid three-column">
                  <label>
                    City
                    <input type="text" required />
                  </label>
                  <label>
                    State
                    <input type="text" required />
                  </label>
                  <label>
                    Postal Code
                    <input type="text" required />
                  </label>
                </div>
                <fieldset className="payment-options">
                  <legend>Payment Method</legend>
                  <label><input type="radio" name="payment" defaultChecked /> Card Payment</label>
                  <label><input type="radio" name="payment" /> Bank Transfer</label>
                  <label><input type="radio" name="payment" /> Pay on Delivery</label>
                </fieldset>
                <Button type="submit">Place Order</Button>
              </form>
            )}
          </div>

          <aside className="panel summary-panel">
            <h3>Order Summary</h3>
            {items.length ? (
              <div className="summary-items">
                {items.map((item) => (
                  <div key={item.lineId} className="summary-item">
                    <div>
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                      <span>{item.qty} × {item.formattedPrice}</span>
                    </div>
                    <strong>{formatPrice(item.price * item.qty)}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p className="muted">No items in your order yet.</p>
            )}
            <div className="summary-row total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
          </aside>
        </div>
      </section>
    </div>
  );
}
