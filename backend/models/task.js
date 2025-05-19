const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Task = sequelize.define('Task', {
  task_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  priority: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['High', 'Medium', 'Low']]
    }
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'To Do',
    validate: {
      isIn: [['To Do', 'In Progress', 'Completed']]
    }
  },
  recurrence_pattern: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  recurrence_end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  parent_task_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tasks',
      key: 'task_id'
    },
    onDelete: 'SET NULL'
  },
  is_group_task: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  group_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'groups',
      key: 'group_id'
    },
    onDelete: 'SET NULL'
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  last_updated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  feedback_avg_rating: {
    type: DataTypes.DECIMAL(3, 2),
    allowNull: true,
    defaultValue: 0.0
  },
  total_feedbacks: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  attachment_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  engagement_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: 'tasks'
});

module.exports = Task;
