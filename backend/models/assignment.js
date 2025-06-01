const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');

const Assignment = sequelize.define('Assignment', {
  assignment_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
  assigned_to: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'CASCADE'
  },
  assigned_by: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'SET NULL'
  },
  assigned_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  role_in_task: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isIn: [['Leader', 'Contributor', 'Reviewer']]
    }
  }
}, {
  tableName: 'assignments',
  timestamps: false
});

module.exports = Assignment;
