'use client';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../styles/login.module.css';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // ✅ Store token (or use HTTP-only cookies for security)
      localStorage.setItem('token', data.token);

      // Optionally decode the token to get the role
      const payload = JSON.parse(atob(data.token.split('.')[1]));

      // ✅ Redirect based on role
      if (payload.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (payload.role === 'manager') {
        router.push('/manager/dashboard');
      } else {
        router.push('/dashboard'); // default user dashboard
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Try again.');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
  <><nav className={styles.navbar}>
      <span className={styles.navTitle}>Smart Task Manager</span>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" className={styles.navLink}>Home</Link>
        </li>
        <li>
          <Link href="/register" className={styles.navLink}>Register</Link>
        </li>
      </ul>
    </nav><section className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h1>

          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter username"
              minLength={5}
              name="username"
              required
              value={formData.username}
              onChange={handleChange} />
          </div>

          <div className={styles.inputGroup}>
            <input
              className={styles.input}
              type="password"
              placeholder="Enter password"
              minLength={8}
              name="password"
              required
              value={formData.password}
              onChange={handleChange} />
          </div>

          <button className={styles.button} type="submit">
            Login
          </button>
        </form>
      </section></>
  );
}
