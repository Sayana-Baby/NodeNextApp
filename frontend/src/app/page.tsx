'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './styles/home.module.css';

export default function Home() {
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: any) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error('Error submitting contact form:', err);
    }
  };

  return (
    <main className={styles.container}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>TaskManager</div>
        <ul className={styles.navLinks}>
          <li>
            <a href="#aboutus" className={styles.navLink}>About Us</a>
          </li>
          <li>
            <a href="#features" className={styles.navLink}>Features</a>
          </li>
          <li>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </li>
          <li>
            <a href="/dashboard" className={styles.navLink}>Dashbaord</a>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className={styles.hero} id="aboutus">
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Smarter Task Management Starts Here</h1>
          <p className={styles.subtitle}>
            Plan, assign, and track your work with AI-powered insights — built for individuals, teams, and communities.
          </p>
          <div className={styles.buttonGroup}>
            <Link href="/register" className={styles.linkButton}>Get Started</Link>
            <Link href="/login" className={styles.linkButtonAlt}>Login</Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className={styles.features} id="features">
        <h2>Features That Empower You</h2>
        <div className={styles.featureCards}>
          <div className={styles.card}>
            <h3>AI Task Suggestions</h3>
            <p>Get personalized recommendations based on your past behavior and current workload.</p>
          </div>
          <div className={styles.card}>
            <h3>Group Management</h3>
            <p>Organize your team, assign leaders, and manage roles efficiently at scale.</p>
          </div>
          <div className={styles.card}>
            <h3>Smart Scheduling</h3>
            <p>Flexible task timelines with AI-assisted daily, weekly, or custom recurrence.</p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className={styles.contactForm} id="contact">
        <h2>Contact Us</h2>
        <p>Have a question, suggestion, or need help? Reach out — we’d love to hear from you!</p>
        {submitted ? (
          <p className={styles.success}>✅ Thank you! We'll get back to you shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div className={styles.formRow}>
          <input
            name="name"
            placeholder="Your Name"
            required
            value={contact.name}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            required
            value={contact.email}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.formRow}>
          <textarea
            name="message"
            placeholder="Your Message"
            required
            value={contact.message}
            onChange={handleChange}
            className={styles.textarea}
            rows={4}
          />
        </div>
        <button type="submit" className={styles.submitButton}>Send Message</button>
          </form>
        )}
      </section>
    </main>
  );
}
