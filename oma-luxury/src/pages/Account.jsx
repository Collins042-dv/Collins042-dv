import { useState } from 'react';
import brand from '../config/brand';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

export default function Account() {
  const [tab, setTab] = useState('sign-in');

  return (
    <div className="page-shell">
      <section className="section">
        <div className="container narrow">
          <SectionHeading eyebrow="Account" title={`Welcome to ${brand.name}`} subtitle="Sign in to your account or create one to enjoy a more seamless shopping experience." />
          <div className="panel account-panel">
            <div className="tab-row">
              <button type="button" className={tab === 'sign-in' ? 'active' : ''} onClick={() => setTab('sign-in')}>Sign In</button>
              <button type="button" className={tab === 'register' ? 'active' : ''} onClick={() => setTab('register')}>Register</button>
            </div>
            {tab === 'sign-in' ? (
              <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
                <label>
                  Email Address
                  <input type="email" placeholder="you@example.com" />
                </label>
                <label>
                  Password
                  <input type="password" placeholder="••••••••" />
                </label>
                <Button type="submit">Sign In</Button>
              </form>
            ) : (
              <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
                <label>
                  Full Name
                  <input type="text" placeholder="Your full name" />
                </label>
                <label>
                  Email Address
                  <input type="email" placeholder="you@example.com" />
                </label>
                <label>
                  Password
                  <input type="password" placeholder="Create a password" />
                </label>
                <Button type="submit">Create Account</Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
