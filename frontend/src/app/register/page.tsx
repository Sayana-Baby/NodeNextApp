'use client';
import { useState } from 'react';
import styles from '../styles/register.module.css';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    role: 'user',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    groupName: '',
    groupDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const payload = {
    email: formData.email,
    first_name: formData.username.split(" ")[0] || formData.username,
    last_name: formData.username.split(" ")[1] || "", 
    password: formData.password,
    role: formData.role,
    profile_picture: "", 
    notification_prefs: {
      email: true,
      push: false,
    },
  };

  try {
    const res = await fetch("http://localhost:4000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully!");
      console.log("Token:", data.data?.token);
    
    } else {
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    console.error("Registration error:", err);
    alert("Something went wrong");
  }
};


  const isManager = formData.role === 'manager';

  return (
    <>
      {/* Navbar*/}
      <nav className={styles.navbar}>
        <span className={styles.navTitle}>Smart Task Manager</span>
        <ul className={styles.navLinks}>
          <li>
            <Link href="/" className={styles.navLink}>Home</Link>
          </li>
          <li>
            <Link href="/login" className={styles.navLink}>Login</Link>
          </li>
        </ul>
      </nav>
    
      <main style={{ padding: '2rem', maxWidth: 600, margin: 'auto' }} className={styles.container}>
        <h1>Register as {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <label style={{ flex: 1 }}>
              Role:
              <select name="role" value={formData.role} onChange={handleChange} className={styles.input}>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
            </label>
            <input
              className={styles.input}
              style={{ flex: 1 }}
              type="text"
              name="username"
              placeholder="Username"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              className={styles.input}
              style={{ flex: 1 }}
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              style={{ flex: 1 }}
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              className={styles.input}
              style={{ flex: 1 }}
              type="password"
              name="password"
              placeholder="Password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className={styles.input}
              style={{ flex: 1 }}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
              minLength={8}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              className={styles.input}
              style={{ flex: 1 }}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <div style={{ flex: 1 }} />
          </div>

          {isManager && (
            <>
              <h3>Manager Details</h3>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <input
                  className={styles.input}
                  style={{ flex: 1 }}
                  type="text"
                  name="groupName"
                  placeholder="Group Name"
                  required
                  value={formData.groupName}
                  onChange={handleChange}
                />
                <input
                  className={styles.input}
                  style={{ flex: 1 }}
                  type="text"
                  name="groupDescription"
                  placeholder="Group Description"
                  value={formData.groupDescription}
                  onChange={handleChange}
                />
              </div>
            </>
          )}

          <button className={styles.button} type="submit">Register</button>
        </form>
      </main>
    </>
  );
}
