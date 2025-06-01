const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');

const Notification = sequelize.define('Notification', {
  notification_id: {
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
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  notification_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  related_task_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tasks',
      key: 'task_id'
    },
    onDelete: 'SET NULL'
  },
  related_group_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'groups',
      key: 'group_id'
    },
    onDelete: 'SET NULL'
  },
  priority: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['Low', 'Medium', 'High']]
    }
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  scheduled_for: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'notifications'
});

module.exports = Notification;
