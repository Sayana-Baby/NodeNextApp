'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/dashboard.module.css';

export default function DashboardPage() {
  const [userName, setUserName] = useState('John');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design homepage', status: 'To Do' },
    { id: 2, title: 'Finish backend API', status: 'In Progress' },
    { id: 3, title: 'Review pull request', status: 'Completed' },
  ]);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.header}>👋 Welcome, {userName}</h1>

      <div className={styles.summarySection}>
        {['To Do', 'In Progress', 'Completed'].map((status) => {
          const count = tasks.filter((t) => t.status === status).length;
          return (
            <div key={status} className={styles.card}>
              <h3>{status}</h3>
              <p>{count} task{count !== 1 ? 's' : ''}</p>
            </div>
          );
        })}
      </div>

      <div className={styles.recentSection}>
        <h2>📝 Recent Tasks</h2>
        <ul className={styles.taskList}>
          {tasks.map((task) => (
            <li key={task.id} className={styles.taskItem}>
              <strong>{task.title}</strong>
              <span className={styles[`status${task.status.replace(/\s/g, '')}`]}>
                {task.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.aiSection}>
        <h2>🤖 AI Suggestions</h2>
        <p>No suggestions available yet.</p>
      </div>
    </div>
  );
}
