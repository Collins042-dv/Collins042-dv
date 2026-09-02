import { Link } from 'react-router-dom';
import brand from '../config/brand';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <span className="eyebrow">{brand.monogram}</span>
          <h3>{brand.name}</h3>
          <p>{brand.description}</p>
          <ul className="footer-meta">
            <li>{brand.contact.email}</li>
            <li>{brand.contact.phone}</li>
            <li>{brand.contact.address}</li>
          </ul>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">New Arrivals</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/shop?category=bags">Bags</Link></li>
            <li><Link to="/shop?category=perfumes">Fragrances</Link></li>
          </ul>
        </div>

        <div>
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/account">My Account</Link></li>
            <li><Link to="/cart">Shipping & Orders</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h4>Social</h4>
          <ul>
            <li><a href={brand.social.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href={brand.social.tiktok} target="_blank" rel="noreferrer">TikTok</a></li>
            <li><a href={brand.social.facebook} target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href={brand.social.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} {brand.name}. {brand.tagline}</p>
      </div>
    </footer>
  );
}
