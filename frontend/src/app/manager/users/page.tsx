import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/users.module.css';

// Sample user data
const sampleUsers = [
    {
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Developer',
        tasks: 3,
        completed: 15,
        onTime: 95,
        feedback: 4.8,
        status: 'Active',
        skills: ['React', 'Node.js']
    },
    {
        id: 2,
        name: 'Bob Smith',
        email: 'bob@example.com',
        role: 'Designer',
        tasks: 1,
        completed: 8,
        onTime: 88,
        feedback: 4.5,
        status: 'Idle',
        skills: ['Figma', 'UX']
    },
    // Add more mock users as needed
];

export default function ManageUsers() {
    const [users, setUsers] = useState(sampleUsers);
    const [filters, setFilters] = useState({
        role: '',
        status: '',
        skill: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    // Filtering logic
    const filteredUsers = users.filter((user) => {
        const roleMatch = filters.role ? user.role === filters.role : true;
        const statusMatch = filters.status ? user.status === filters.status : true;
        const skillMatch = filters.skill
            ? user.skills.some(skill => skill.toLowerCase().includes(filters.skill.toLowerCase()))
            : true;
        return roleMatch && statusMatch && skillMatch;
    });

    return (
        <div className={styles.container}>
            <h1>Manage Users</h1>

            {/* Filters */}
            <div className={styles.filters}>
                <select name="role" onChange={handleFilterChange}>
                    <option value="">All Roles</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                </select>

                <select name="status" onChange={handleFilterChange}>
                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Idle">Idle</option>
                </select>

                <input
                    type="text"
                    name="skill"
                    placeholder="Search by skill"
                    onChange={handleFilterChange}
                />
            </div>

            {/* Table */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Current Tasks</th>
                        <th>Tasks Completed</th>
                        <th>On-Time %</th>
                        <th>Feedback</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.tasks}</td>
                            <td>{user.completed}</td>
                            <td>{user.onTime}%</td>
                            <td>{user.feedback}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
