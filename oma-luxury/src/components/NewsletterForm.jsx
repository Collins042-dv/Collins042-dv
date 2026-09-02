import { useState } from 'react';
import brand from '../config/brand';
import Button from './Button';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="newsletter-shell">
      <div className="container newsletter-card">
        <div>
          <span className="eyebrow">{brand.monogram} Private List</span>
          <h3>Join the world of {brand.name}.</h3>
          <p>Receive collection drops, styling notes, and first access to signature pieces.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={`Your email for ${brand.name}`}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-label={`${brand.name} email address`}
          />
          <Button type="submit">Subscribe</Button>
        </form>
        {submitted ? <p className="form-note">Thank you for subscribing to {brand.name} updates.</p> : null}
      </div>
    </section>
  );
}
