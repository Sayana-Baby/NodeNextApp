'use client';
import React, { useState } from 'react';

export default function ManagerDashboard() {


  const dashboard = {
    group: { name: 'Alpha Team' },
    users: [
      { id: 1, username: 'alice', email: 'alice@example.com' },
      { id: 2, username: 'bob', email: 'bob@example.com' },
      { id: 3, username: 'carol', email: 'carol@example.com' },
    ],
    tasks: [
      { id: 101, title: 'Prepare Report', status: 'completed' },
      { id: 102, title: 'Team Meeting', status: 'pending' },
      { id: 103, title: 'Review Code', status: 'in progress' },
    ],
    stats: {
      totalTasks: 3,
      completed: 1,
      pending: 2,
    },
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f9fafb' }}>
      {/* Sidebar */}
      <aside style={{ width: '220px', background: '#f3f4f6', padding: '1rem', boxShadow: '0 2px 12px rgba(79,140,255,0.1)' }}>
        <h2 style={{ color: '#3b82f6' }}>Manager Dashboard</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><a href="/manager/dashboard" style={{ color: '#6366f1', textDecoration: 'none' }}>Dashboard</a></li>
          <li><a href="/manager/tasks" style={{ color: '#6366f1', textDecoration: 'none' }}>Tasks</a></li>
          <li><a href="/manager/users" style={{ color: '#6366f1', textDecoration: 'none' }}>Users</a></li>
          <li><a href="/manager/settings" style={{ color: '#6366f1', textDecoration: 'none' }}>Settings</a></li>
        </ul>
      </aside>

      {/* Main Dashboard Content */}
      <main style={{
        flex: 1,
        padding: '2rem',
        background: '#fff',
        borderRadius: '1rem',
        margin: '2rem',
        boxShadow: '0 4px 24px rgba(79,140,255,0.07)',
        maxWidth: '1000px'
      }}>
        <h1 style={{ color: '#3b82f6', marginBottom: '1.5rem' }}>Manager Dashboard</h1>
        <h2 style={{ color: '#6366f1' }}>Group: {dashboard.group.name}</h2>

        <h3 style={{ marginTop: '2rem' }}>Users</h3>
        <ul>
          {dashboard.users.map((u) => (
            <li key={u.id}>{u.username} ({u.email})</li>
          ))}
        </ul>

        <h3 style={{ marginTop: '2rem' }}>Tasks</h3>
        <ul>
          {dashboard.tasks.map((t) => (
            <li key={t.id}>{t.title} - <b>{t.status}</b></li>
          ))}
        </ul>

        <h3 style={{ marginTop: '2rem' }}>Stats</h3>
        <p>Total Tasks: {dashboard.stats.totalTasks}</p>
        <p>Completed: {dashboard.stats.completed}</p>
        <p>Pending: {dashboard.stats.pending}</p>

       
      </main>
    </div>
  );
}
