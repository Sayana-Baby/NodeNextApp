const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ActivityLog = sequelize.define('ActivityLog', {
  log_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  activity_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  activity_details: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tasks',
      key: 'task_id'
    },
    onDelete: 'SET NULL'
  },
  old_status: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  new_status: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'activity_logs'
});

module.exports = ActivityLog;
