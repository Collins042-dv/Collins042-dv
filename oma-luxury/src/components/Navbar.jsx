import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import brand from '../config/brand';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const navLinks = [
  { to: '/shop', label: 'SHOP' },
  { to: '/collections', label: 'COLLECTIONS' },
  { to: '/lookbook', label: 'LOOKBOOK' },
  { to: '/about', label: 'ABOUT' },
  { to: '/contact', label: 'CONTACT' },
];

function IconSearch() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>;
}

function IconAccount() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" /><path d="M4 20a8 8 0 0 1 16 0" /></svg>;
}

function IconHeart() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10Z" /></svg>;
}

function IconBag() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8Z" /><path d="M9 9V7a3 3 0 0 1 6 0v2" /></svg>;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const { itemIds } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <button type="button" className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label={`Open ${brand.name} menu`}>
          <span />
          <span />
        </button>

        <Link to="/" className="navbar-brand" aria-label={brand.name}>
          <span>{brand.monogram}</span>
          <div>
            <strong>{brand.name}</strong>
            <small>{brand.tagline}</small>
          </div>
        </Link>

        <nav className="navbar-links" aria-label={`${brand.name} navigation`}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link to="/shop" className="navbar-icon" aria-label={`Search ${brand.name} products`}><IconSearch /></Link>
          <Link to="/account" className="navbar-icon" aria-label={`${brand.name} account`}><IconAccount /></Link>
          <Link to="/wishlist" className="navbar-icon" aria-label={`${brand.name} wishlist`}>
            <IconHeart />
            {itemIds.length ? <span className="count-badge">{itemIds.length}</span> : null}
          </Link>
          <Link to="/cart" className="navbar-icon" aria-label={`${brand.name} cart`}>
            <IconBag />
            {itemCount ? <span className="count-badge">{itemCount}</span> : null}
          </Link>
        </div>
      </div>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button type="button" className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label={`Close ${brand.name} menu`}>
          ×
        </button>
        <div className="mobile-menu-content">
          <span className="eyebrow">{brand.monogram}</span>
          <p>{brand.description}</p>
          <nav>
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/wishlist" onClick={() => setMenuOpen(false)}>WISHLIST</NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)}>CART</NavLink>
            <NavLink to="/account" onClick={() => setMenuOpen(false)}>ACCOUNT</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
