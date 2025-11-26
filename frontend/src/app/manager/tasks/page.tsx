'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ManagerUsers() {
  const [showForm, setShowForm] = useState(true);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch('http://localhost:4000/api/manager/users');
        const taskRes = await fetch('http://localhost:4000/api/manager/tasks');
        const userData = await userRes.json();
        const taskData = await taskRes.json();
        setUsers(userData);
        setTasks(taskData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <style>{`
        .container {
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          background: #f4f6f8;
          min-height: 100vh;
        }

        h2 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          color: #111827;
        }

        .button-primary, .button-cancel {
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease, transform 0.2s ease;
        }

        .button-primary {
          background-color: #3b82f6;
          color: white;
        }

        .button-primary:hover {
          background-color: #2563eb;
          transform: scale(1.02);
        }

        .button-cancel {
          background-color: #ef4444;
          color: white;
        }

        .button-cancel:hover {
          background-color: #dc2626;
          transform: scale(1.02);
        }

        .button-back {
          background-color: #e0e7ef;
          color: #3b82f6;
          border: none;
          border-radius: 0.5rem;
          padding: 0.5rem 1.2rem;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1.5rem;
          transition: background 0.2s;
        }
        .button-back:hover {
          background-color: #dbeafe;
        }

        .form-box {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        }

        .form-box h3 {
          font-size: 1.25rem;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .form-box input,
        .form-box select {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          font-size: 1rem;
          transition: border 0.3s ease, box-shadow 0.3s ease;
        }

        .form-box input:focus,
        .form-box select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
          outline: none;
        }

        .form-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        .status-box {
          background: #ffffff;
          border: 1px solid #d1d5db;
          padding: 1.25rem;
          border-radius: 0.75rem;
        }

        .status-box select {
          margin-top: 0.5rem;
          width: 100%;
        }
      `}</style>

      <div className="container">
        {/* Back Button */}
        <button className="button-back" onClick={() => router.back()}>
          &#8592; Back
        </button>

        <h2>Task Creation</h2>

        <button className="button-primary" onClick={() => setShowForm(true)}>
          Add
        </button>

        {showForm && (
          <>
            {/* Create Task Form */}
            <form
              action="http://localhost:4000/api/Manager/task"
              method="POST"
              className="form-box"
            >
              <h3>Create a New Task</h3>

              <input type="text" name="task" placeholder="Task title" required />
              <input type="text" name="description" placeholder="Task description" required />

              <select name="priority" required>
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <input type="datetime-local" name="dueDate" required />

              <select name="user" id="user" required>
                <option value="">Select a user type</option>
                <option value="Group">Group</option>
                <option value="user">User</option>
              </select>

              <select name="t-assign" id="assign">
                <option value="">Select a user/Group</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.username} ({u.email})
                  </option>
                ))}
              </select>

              <select name="task" id="task">
                <option value="">Select a task</option>
                {tasks.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title || t.task}
                  </option>
                ))}
              </select>

              <div className="form-buttons">
                <button type="submit" className="button-primary">
                  Submit
                </button>

                <button
                  type="button"
                  className="button-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        )}

        {/* Task Details */}
        <section className="status-box">
          <h2>Update Task Status</h2>
          <div>
            {tasks.map((task) => (
              <div key={task.id} style={{ marginBottom: '1rem' }}>
                <strong>{task.title || task.task}</strong>
                <div>
                  Current status: <b>{task.status}</b>
                </div>
                <select style={{ marginTop: '0.5rem', width: '100%' }}>
                  <option value="">Update the status</option>
                  <option value="completed">Completed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="not-completed">Not Completed</option>
                </select>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
