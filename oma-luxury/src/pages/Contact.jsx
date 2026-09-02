import { useState } from 'react';
import brand from '../config/brand';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page-shell">
      <section className="page-hero slim contact-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow">{brand.monogram} Concierge</span>
          <h1>We would love to hear from you.</h1>
          <p>Contact {brand.name} for client care, order support, and personal shopping assistance.</p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-grid">
          <div>
            <SectionHeading align="left" eyebrow="Contact" title="Client care and boutique inquiries" subtitle="Reach our team with any questions and we will respond as soon as possible." />
            <ul className="contact-list">
              <li><strong>Email</strong><span>{brand.contact.email}</span></li>
              <li><strong>Phone</strong><span>{brand.contact.phone}</span></li>
              <li><strong>Address</strong><span>{brand.contact.address}</span></li>
            </ul>
            <div className="social-row">
              <a href={brand.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={brand.social.tiktok} target="_blank" rel="noreferrer">TikTok</a>
              <a href={brand.social.facebook} target="_blank" rel="noreferrer">Facebook</a>
              <a href={brand.social.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
          <form className="panel form-panel" onSubmit={handleSubmit}>
            <label>
              Name
              <input type="text" name="name" placeholder="Your full name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="you@example.com" required />
            </label>
            <label>
              Message
              <textarea name="message" rows="6" placeholder={`Tell ${brand.name} how we can help`} required />
            </label>
            <Button type="submit">Send Message</Button>
            {submitted ? <p className="form-note">Your message has been noted. {brand.name} will be in touch soon.</p> : null}
          </form>
        </div>
      </section>
    </div>
  );
}
