"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./styles/home.module.css";

export default function Home() {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error("Error submitting contact form:", err);
    }
  };

  return (
    <main className={styles.container}>
      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>
          <Link href="/">Effort Engine</Link>
        </div>
        <ul className={styles.navLinks}>
          <li>
            <a href="#aboutus" className={styles.navLink}>
              About Us
            </a>
          </li>
          <li>
            <a href="#features" className={styles.navLink}>
              Features
            </a>
          </li>
          <li>
            <a href="#contact" className={styles.navLink}>
              Contact
            </a>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <section className={styles.hero} id="aboutus">
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            <span className={styles.highlight}>Smarter Task</span> Management
            Starts Here
          </h1>
          <p className={styles.subtitle}>
            Plan, assign, and track your work with AI-powered insights — built
            for individuals, teams, and communities.
          </p>
          <div className={styles.buttonGroup}>
            <Link href="/register" className={styles.primaryButton}>
              <span>🚀</span> Get Started
            </Link>
            <Link href="/login" className={styles.secondaryButton}>
              <span>🔑</span> Login
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className={styles.features} id="features">
        <h2 className={styles.featuresTitle}>Features That Empower You</h2>
        <div className={styles.featureCards}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🤖</span>
            <h3>AI Task Suggestions</h3>
            <p>
              Get personalized recommendations based on history and workload.
            </p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>👥</span>
            <h3>Group Management</h3>
            <p>Organize teams, assign roles, and manage members.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>📅</span>
            <h3>Smart Scheduling</h3>
            <p>Flexible timelines with AI-assisted recurrence.</p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className={styles.contactForm} id="contact">
        <h2 className={styles.contactTitle}>Contact Us</h2>
        <p className={styles.contactDesc}>
          Questions, suggestions, or support? Reach out — we’d love to help!
        </p>
        {submitted ? (
          <p className={styles.success}>
            ✅ Thank you! We'll get back to you shortly.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formGrid} noValidate>
            <div className={styles.formRow}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Your Name"
                required
                value={contact.name}
                onChange={handleChange}
                className={styles.input}
                autoComplete="name"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                required
                value={contact.email}
                onChange={handleChange}
                className={styles.input}
                autoComplete="email"
              />
            </div>
            <div className={styles.formRow}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your Message"
                required
                value={contact.message}
                onChange={handleChange}
                className={styles.textarea}
                rows={4}
              />
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              aria-label="Send message"
            >
              Send Message
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
