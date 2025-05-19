const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const ScheduleAdjustment = sequelize.define('ScheduleAdjustment', {
  adjustment_id: {
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
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'task_id'
    },
    onDelete: 'CASCADE'
  },
  original_start_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  original_end_time: {
    type: DataTypes.DATE,
    allowNull: true
  },
  suggested_start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  suggested_end_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  adjustment_reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'Pending' // options: Accepted, Rejected, Pending
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  decided_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'schedule_adjustments'
});

module.exports = ScheduleAdjustment;
